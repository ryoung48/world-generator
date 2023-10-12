import { MATH } from '../utilities/math'
import { Dice } from '../utilities/math/dice'
import { POINT } from '../utilities/math/points'
import { dayMS, daysPerYear } from '../utilities/math/time'
import { Vertex } from '../utilities/math/voronoi/types'
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
    return e.h >= WORLD.elevation.seaLevel
  })
const land = PERFORMANCE.memoize.decorate({ f: _land })

const _mountains = () => land().filter(p => p.mountain !== undefined)
const mountains = PERFORMANCE.memoize.decorate({ f: _mountains })

const _water = () =>
  window.world.cells.filter(e => {
    return e.h < WORLD.elevation.seaLevel
  })
const water = PERFORMANCE.memoize.decorate({ f: _water })

export const WORLD = PERFORMANCE.profile.wrapper({
  label: 'WORLD',
  ignore: ['spawn'],
  o: {
    borders() {
      return land().filter(p => CELL.isNationBorder(p) || p.isCoast)
    },
    cell: {
      base: 16000,
      scale: () => window.world.resolution / 4,
      count: () => window.world.resolution * WORLD.cell.base,
      area: () => {
        const surfaceArea = 4 * Math.PI * window.world.radius ** 2
        return surfaceArea / WORLD.cell.count()
      },
      length: () => {
        return WORLD.cell.area() ** 0.5
      }
    },
    dayDuration: (latitude: number) => {
      const angularVelocity = 360 / window.world.rotation
      return (hourAngle(latitude) * 2) / angularVelocity
    },
    distance: { coastal: () => Math.max(1, Math.round(160 / WORLD.cell.length())) },
    elevation: { seaLevel: 0.1, mountains: 0.5, max: 0.95 },
    features: (type: 'water' | 'land') => {
      const water = (v: World['landmarks'][number]) => v.water
      const land = (v: World['landmarks'][number]) => !v.water
      const filter = type === 'water' ? water : land
      return Object.entries(window.world.landmarks)
        .filter(([, v]) => filter(v))
        .map(([k]) => parseInt(k))
    },
    heightToKM: (h: number) =>
      MATH.scale(
        [WORLD.elevation.seaLevel, WORLD.elevation.mountains, WORLD.elevation.max],
        [0, 0.6, 6],
        h
      ),
    heightToMI: (h: number) => MATH.kmToMi(WORLD.heightToKM(h)),
    land: () => land(),
    mountains() {
      return mountains()
    },
    placement: ({ blacklist = [], whitelist, count, spacing }: WorldPlacementParams) => {
      const placed: Cell[] = []
      // create a quad tree to quickly find the nearest city
      const tree: Vertex[] = []
      // everything in the blacklist starts in the quad tree
      blacklist.forEach(({ x, y }) => {
        tree.push([x, y])
      })
      const closestPoint = (referencePoint: Vertex) =>
        tree.reduce((acc, curr) => {
          if (acc === null) return curr

          const currDistance = MATH.distanceCheap(referencePoint, curr)
          const accDistance = MATH.distanceCheap(referencePoint, acc)

          return currDistance < accDistance ? curr : acc
        }, null)

      // place cities by iterating through the (pre-sorted) whitelist
      for (let i = 0; i < whitelist.length && placed.length < count; i++) {
        const cell = whitelist[i]
        const { x, y } = cell
        const closest = closestPoint([x, y])
        const dist = closest
          ? POINT.distance({ points: [{ x: closest[0], y: closest[1] }, cell] })
          : Infinity
        if (dist > spacing) {
          placed.push(cell)
          tree.push([x, y])
        }
      }
      if (placed.length < count) console.log(`placement failure: ${placed.length} / ${count}`)
      return placed
    },
    placementRatio: () => WORLD.land().length / window.world.cells.length / 0.2,
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
      const world: World = {
        id: seed,
        resolution: res,
        cells: [],
        landmarks: {},
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
        radius: 3.959e3, // miles
        date,
        firstNewMoon,
        lunarCycle: 28,
        rotation: 24,
        tilt: 23.5
      }
      return world
    },
    temperature: {
      summer: [30, 4],
      winter: [30, -30]
    },
    water() {
      return water()
    }
  }
})
