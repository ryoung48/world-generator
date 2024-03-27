import { scaleLinear } from 'd3'

import { CELL } from './cells'
import { CLIMATE } from './cells/climate'
import { ClimateKey } from './cells/climate/types'
import { Cell } from './cells/types'
import { RemoveLakeParams, World, WorldPlacementParams, WorldSpawn } from './types'
import { MATH } from './utilities/math'
import { DICE } from './utilities/math/dice'
import { POINT } from './utilities/math/points'
import { dayMS, daysPerYear } from './utilities/math/time'
import { Vertex } from './utilities/math/voronoi/types'
import { PERFORMANCE } from './utilities/performance'

// day of the year 1-365 (not 100% accurate)
const dayOfYear = (date: number) => {
  const today = new Date(date)
  const start = new Date(today.getFullYear(), 0).getTime()
  return (date - start) / (1000 * 60 * 60 * window.world.rotation)
}
// sun declination (degrees)
const sunDeclination = (days = dayOfYear(window.world.date)) => {
  const position = (days / daysPerYear) * 360
  return Math.asin(
    Math.sin(MATH.conversion.angles.radians(-window.world.tilt)) *
      Math.cos(MATH.conversion.angles.radians(position))
  )
}
// https://en.wikipedia.org/wiki/Hour_angle
const hourAngle = (latitude: number) => {
  const pre = -Math.tan(MATH.conversion.angles.radians(latitude)) * Math.tan(sunDeclination())
  return MATH.conversion.angles.degrees(Math.acos(pre > 1 ? 1 : pre < -1 ? -1 : pre))
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
    climates: () => {
      return WORLD.land().reduce((dict: Partial<Record<ClimateKey, number>>, cell) => {
        if (!dict[cell.climate]) dict[cell.climate] = 0
        dict[cell.climate] += 1
        return dict
      }, {})
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
    habitability: () => {
      const land = WORLD.land()
      return (
        land.map(cell => CLIMATE.holdridge[cell.climate].habitability).reduce((a, b) => a + b, 0) /
        land.length
      )
    },
    heightToKM: (h: number) =>
      MATH.scale(
        [WORLD.elevation.seaLevel, WORLD.elevation.mountains, WORLD.elevation.max],
        [0, 0.6, 6],
        h
      ),
    heightToMI: (h: number) => MATH.conversion.distance.km.miles(WORLD.heightToKM(h)),
    lakes: () => WORLD.water().filter(cell => !cell.ocean),
    land: () => land(),
    mountains() {
      return mountains()
    },
    placement: {
      spacing: { regions: 0.1, provinces: 0.023 },
      limit: (spacing: number) => Math.ceil((spacing * window.world.radius) / WORLD.cell.length()),
      close: ({ blacklist = [], whitelist, count, spacing }: WorldPlacementParams) => {
        const placed: Cell[] = []
        // create a quad tree to quickly find the nearest city
        const visited = new Set<number>()
        // everything in the blacklist starts in the quad tree
        blacklist.forEach(({ idx }) => {
          visited.add(idx)
        })

        // place cities by iterating through the (pre-sorted) whitelist
        const distance = scaleLinear([0, 0.1, 0.2, 0.6, 1], [2, 1.6, 1.4, 1.2, 1])
        for (let i = 0; i < whitelist.length && placed.length < count; i++) {
          const cell = whitelist[i]
          const { habitability } = CLIMATE.holdridge[cell.climate]
          const coast = cell.isCoast ? 0.4 : 0
          const mod = Math.max(distance(habitability) - coast, 1)
          const close = CELL.bfsNeighborhood({ start: cell, maxDepth: 5 })
            .filter(n => visited.has(n.idx))
            .some(n => POINT.distance.geo({ points: [n, cell] }) <= spacing * mod)
          if (!close) {
            placed.push(cell)
            visited.add(cell.idx)
          }
        }
        if (placed.length < count) console.log(`placement failure: ${placed.length} / ${count}`)
        return placed
      },
      far: ({ blacklist = [], whitelist, count, spacing }: WorldPlacementParams) => {
        const placed: Cell[] = []
        // create a quad tree to quickly find the nearest city
        const visited: Vertex[] = []
        // everything in the blacklist starts in the quad tree
        blacklist.forEach(({ x, y }) => {
          visited.push([x, y])
        })
        const closestPoint = (referencePoint: Vertex) =>
          visited.reduce((acc, curr) => {
            if (acc === null) return curr

            const currDistance = MATH.distance.geoCheap(referencePoint, curr)
            const accDistance = MATH.distance.geoCheap(referencePoint, acc)

            return currDistance < accDistance ? curr : acc
          }, null)

        // place cities by iterating through the (pre-sorted) whitelist
        for (let i = 0; i < whitelist.length && placed.length < count; i++) {
          const cell = whitelist[i]
          const { x, y } = cell
          const closest = closestPoint([x, y])
          const dist = closest
            ? POINT.distance.geo({ points: [{ x: closest[0], y: closest[1] }, cell] })
            : Infinity
          if (dist > spacing) {
            placed.push(cell)
            visited.push([x, y])
          }
        }
        if (placed.length < count) console.log(`placement failure: ${placed.length} / ${count}`)
        return placed
      },
      ratio: () => 2 ** (WORLD.land().length / window.world.cells.length / 0.2 - 1)
    },
    removeLake: ({ lakes, lake, regional }: RemoveLakeParams) => {
      const lakeCells = lakes.filter(cell => cell.landmark === lake)
      const shallow = lakeCells.find(cell => cell.shallow)
      const { landmark } = CELL.neighbors(shallow).find(cell => cell.landmark !== lake)
      lakeCells.forEach(cell => {
        cell.landmark = landmark
        cell.isWater = false
        cell.shallow = false
        cell.h = WORLD.elevation.seaLevel
        if (regional) regional[cell.region].push(cell)
        CELL.neighbors(cell)
          .filter(n => !n.isWater)
          .forEach(n => {
            const coast = CELL.neighbors(n).filter(p => p.isWater)
            n.isCoast = coast.length > 0
          })
      })
      delete window.world.landmarks[lake]
      window.world.landmarks[landmark].size += lakeCells.length
    },
    reshape: () => {
      PERFORMANCE.memoize.remove(_land)
      PERFORMANCE.memoize.remove(_water)
    },
    spawn: ({ seed, res }: WorldSpawn) => {
      console.log(seed)
      DICE.spawn(seed)
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
        oceanRegions: [],
        rivers: [],
        npcs: [],
        wars: [],
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
      land: {
        summer: [30, 4],
        winter: [30, -30]
      },
      sea: {
        summer: [30, -2],
        winter: [30, -7]
      }
    },
    water() {
      return water()
    }
  }
})
