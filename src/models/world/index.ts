import { quadtree } from 'd3'

import { canvasDims } from '../utilities/dimensions'
import { MATH } from '../utilities/math'
import { Dice } from '../utilities/math/dice'
import { POINT } from '../utilities/math/points'
import { Point } from '../utilities/math/points/types'
import { dayMS, daysPerYear } from '../utilities/math/time'
import { PERFORMANCE } from '../utilities/performance'
import { CELL } from './cells'
import { Cell } from './cells/types'
import { World, WorldPlacementParams, WorldSpawn } from './types'

// day of the year 1-365 (not 100% accurate)
const dayOfYear = (date: number) => {
  const today = new Date(date)
  const start = new Date(today.getFullYear(), 0).getTime()
  return (date - start) / (1000 * 60 * 60 * window.world.rotation)
}
// sun declination (degrees)
const sunDeclination = (days = dayOfYear(window.world.date)) => {
  const position = (days / daysPerYear) * 360
  return Math.asin(Math.sin(MATH.radians(-window.world.tilt)) * Math.cos(MATH.radians(position)))
}
// https://en.wikipedia.org/wiki/Hour_angle
const hourAngle = (latitude: number) => {
  const pre = -Math.tan(MATH.radians(latitude)) * Math.tan(sunDeclination())
  return MATH.degrees(Math.acos(pre > 1 ? 1 : pre < -1 ? -1 : pre))
}

const _land = () =>
  window.world.cells.filter(e => {
    return e.h >= window.world.seaLevelCutoff && e.n.length > 0
  })
const land = PERFORMANCE.memoize.decorate({ f: _land })

const _mountains = () => land().filter(p => p.mountain !== undefined)
const mountains = PERFORMANCE.memoize.decorate({ f: _mountains })

const _water = () =>
  window.world.cells.filter(e => {
    return e.h < window.world.seaLevelCutoff
  })
const water = PERFORMANCE.memoize.decorate({ f: _water })

export const WORLD = PERFORMANCE.profile.wrapper({
  label: 'WORLD',
  ignore: ['spawn'],
  o: {
    borders() {
      return land().filter(p => CELL.isNationBorder(p) || p.isCoast)
    },
    center: (spacing: number) => {
      const { w, h } = window.world.dim
      return WORLD.land().filter(
        ({ x, y }) => x > spacing && x < w - spacing && y > spacing && y < h - spacing
      )
    },
    dayDuration: (latitude: number) => {
      const angularVelocity = 360 / window.world.rotation
      return (hourAngle(latitude) * 2) / angularVelocity
    },
    features: (type: 'water' | 'land') => {
      const water = (v: World['landmarks'][number]) => v.water
      const land = (v: World['landmarks'][number]) => !v.water
      const filter = type === 'water' ? water : land
      return Object.entries(window.world.landmarks)
        .filter(([, v]) => filter(v))
        .map(([k]) => parseInt(k))
    },
    gps: ({ x, y }: Point) => {
      return {
        latitude: MATH.scale([window.world.dim.h, 0], window.world.latitude, y),
        longitude: MATH.scale([0, window.world.dim.w], window.world.longitude, x)
      }
    },
    heightToKM: (h: number) => MATH.scale([window.world.seaLevelCutoff, 1.5], [0, 6], h),
    heightToMI: (h: number) => WORLD.heightToKM(h) / 1.609,
    land() {
      return land()
    },
    mountains() {
      return mountains()
    },
    placement: ({ blacklist = [], whitelist, count, spacing }: WorldPlacementParams) => {
      const placed: Cell[] = []
      // create a quad tree to quickly find the nearest city
      const tree = quadtree().extent([
        [0, 0],
        [window.world.dim.w, window.world.dim.h]
      ])
      // everything in the blacklist starts in the quad tree
      blacklist.forEach(({ x, y }) => {
        tree.add([x, y])
      })
      // place cities by iterating through the (pre-sorted) whitelist
      for (let i = 0; i < whitelist.length && placed.length < count; i++) {
        const cell = whitelist[i]
        const { x, y } = cell
        const closest = tree.find(x, y)
        const dist = closest
          ? POINT.distance({ points: [{ x: closest[0], y: closest[1] }, cell] })
          : Infinity
        if (dist > spacing) {
          placed.push(cell)
          tree.add([x, y])
        }
      }
      if (placed.length < count) console.log(`placement failure: ${placed.length} / ${count}`)
      return placed
    },
    reshape: () => {
      PERFORMANCE.memoize.remove(_land)
      PERFORMANCE.memoize.remove(_water)
    },
    spawn: ({ seed, res }: WorldSpawn) => {
      console.log(seed)
      window.dice = new Dice(seed)
      window.profiles = {
        history: PERFORMANCE.profile.spawn('Total'),
        current: PERFORMANCE.profile.spawn('Total')
      }
      PERFORMANCE.profile.switch(window.profiles.history)
      PERFORMANCE.memoize.clear()
      // start date
      const year = window.dice.randint(3000, 4000)
      const month = window.dice.randint(0, 11)
      const day = window.dice.randint(0, 28)
      const hours = window.dice.randint(0, 23)
      const minutes = window.dice.randint(0, 59)
      const date = new Date(year, month, day, hours, minutes).getTime()
      const firstNewMoon = date - dayMS * window.dice.randint(0, 30)
      // dimensions
      const cells = 16000 * res
      const latitude: [number, number] = [-10, 90]
      const longitude: [number, number] = [0, 80]
      // average voronoi cell area (square miles)
      const milesPerDegree = { lat: 69, long: 54 }
      const milesLat = milesPerDegree.lat * (latitude[1] - latitude[0])
      const milesLong = milesPerDegree.long * (longitude[1] - longitude[0])
      const cellArea = (milesLat * milesLong) / cells
      const cellLength = cellArea ** 0.5
      // MATH.scaled height & width (used in distance calculations)
      const sh = milesLat / canvasDims.h
      const sw = milesLong / canvasDims.w
      const world: World = {
        id: seed,
        cells: [],
        latitude,
        longitude,
        landmarks: {},
        seaLevelCutoff: 0.06,
        mountains: [],
        routes: {
          land: [],
          sea: []
        },
        display: {
          routes: {
            land: [],
            sea: []
          },
          islands: [],
          lakes: [],
          regions: {},
          icons: [],
          icebergs: []
        },
        coasts: [],
        dim: {
          res,
          // display image width / height (pixels)
          ...canvasDims,
          // voronoi cell resolution
          cells,
          // noise resolution
          noise: 256,
          // total map area (square miles)
          rh: milesLat,
          rw: milesLong,
          // MATH.scale + cell metrics
          sh,
          sw,
          // cell dimensions
          cellArea,
          cellLength
        },
        regions: [],
        provinces: [],
        cultures: [],
        religions: [],
        courts: [],
        ruins: [],
        npcs: [],
        conflicts: [],
        quests: [],
        uniqueNames: {},
        date,
        firstNewMoon,
        lunarCycle: 28,
        rotation: 24,
        tilt: 23.5
      }
      // select hemisphere
      if (window.dice.flip) world.latitude = [-90, 10]
      return world
    },
    water() {
      return water()
    }
  }
})
