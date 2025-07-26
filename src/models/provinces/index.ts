import { CELL } from '../cells'
import { PLACEMENT } from '../cells/placement'
import { Cell } from '../cells/types'
import { MATH } from '../utilities/math'
import { POINT } from '../utilities/math/points'
import { TIME } from '../utilities/math/time'
import { PERFORMANCE } from '../utilities/performance'
import { HUB } from './hubs'
import * as Province from './types'

const distanceTo = (c1: Province.Province, c2: Province.Province) => {
  const c1Cell = PROVINCE.cell(c1)
  const c2Cell = PROVINCE.cell(c2)
  return POINT.distance.geo({ points: [c1Cell, c2Cell] })
}

export const PROVINCE = {
  capital: (province: Province.Province) => province === PROVINCE.nation(province),
  climate: (province: Province.Province) => {
    const cell = PROVINCE.cell(province)
    return cell.climate
  },
  coastal: (province: Province.Province) => {
    return PROVINCE.hub(province).coastal
  },
  isBorder: (province: Province.Province) => {
    const neighbors = province.neighbors.map(n => window.world.provinces[n])
    return neighbors.some(n => PROVINCE.nation(n) !== PROVINCE.nation(province))
  },
  cell: (province: Province.Province) => window.world.cells[PROVINCE.hub(province).cell],
  cells: {
    get: (province: Province.Province) => province.cells.map(c => window.world.cells[c]),
    land: (province: Province.Province) =>
      PROVINCE.cells.get(province).filter(cell => !cell.isWater),
    water: (province: Province.Province) =>
      PROVINCE.cells.get(province).filter(cell => cell.isWater)
  },
  demographics: PERFORMANCE.decorate({
    name: 'PROVINCE.demographics',
    f: (province: Province.Province): Province.Demographics => {
      const common: Record<string, number> = {}
      window.world.cultures.forEach(k => (common[k.idx] = 0))
      const hub = PROVINCE.hub(province)
      const popScale = MATH.scale([0, 500000], [20, 200], hub.population)
      const origins = MATH.scale([0, 100000], [0.9, 0.6], hub.population)
      const network = PROVINCE.network(province)
      Object.entries(network)
        .map(([k, v]) => {
          const mod = v / popScale + 1
          const provinceIdx = parseInt(k)
          const province = window.world.provinces[provinceIdx]
          const nation = PROVINCE.nation(province)
          const traffic = 1 / v ** mod
          return {
            province: {
              idx: provinceIdx,
              value: traffic
            },
            regional: {
              culture: province.culture,
              value: traffic * origins * 0.5
            },
            minority: {
              culture: province.minority ?? province.culture,
              value: traffic * origins * 0.5
            },
            national: {
              culture: nation.culture,
              value: traffic * (1 - origins)
            }
          }
        })
        .forEach(({ regional, national, minority }) => {
          common[regional.culture] += regional.value
          common[minority.culture] += minority.value
          common[national.culture] += national.value
        })
      const commonDist = Object.entries(common)
        .map(([k, v]) => {
          return { w: v, v: parseInt(k) }
        })
        .sort((a, b) => b.w - a.w)
      const nation = PROVINCE.nation(province)
      const minority = province.minority ?? province.culture
      return {
        common: MATH.buildDistribution(commonDist),
        native: MATH.buildDistribution(
          commonDist.filter(
            ({ v }) => v === province.culture || v === nation.culture || v === minority
          )
        ),
        foreign: MATH.buildDistribution(
          commonDist.filter(
            ({ v }) => v !== province.culture && v !== nation.culture && v !== minority
          )
        )
      }
    },
    dirty: province => {
      const dirty = province.demographics < window.world.date
      if (dirty) province.demographics = window.world.date + 10 * TIME.constants.dayMS
      return dirty
    }
  }),
  development: {
    scale: {
      industrial: 4.25,
      enlightened: 3.6,
      advanced: 3.1,
      developing: 2.75,
      frontier: 1.7,
      tribal: 1.35,
      remote: 1.0
    },
    describe: (development: number) => {
      const scale = PROVINCE.development.scale
      const keys = Object.keys(scale)
      const values = Object.values(scale)
      const index = values.findIndex(v => v <= development)
      return (keys[index] ?? 'remote') as keyof typeof scale
    }
  },
  far: (p1: Province.Province, p2: Province.Province, cutoff = 3) => {
    return CELL.distance(PROVINCE.cell(p1), PROVINCE.cell(p2)) >= PLACEMENT.spacing.regions * cutoff
  },
  find: ({ group, ref, type }: Province.ProvinceFindParams): Province.Province => {
    const closest = ({ candidate, selected }: Province.ProvinceFindOrderParams) =>
      candidate < selected
    const furthest = ({ candidate, selected }: Province.ProvinceFindOrderParams) =>
      candidate > selected
    const order = type === 'closest' ? closest : furthest
    const start = closest ? Infinity : -Infinity
    return group.reduce(
      (selected, province) => {
        const d = distanceTo(ref, province)
        return order({ candidate: d, selected: selected.d }) ? { d, province: province } : selected
      },
      { d: start, province: undefined }
    ).province
  },
  hub: (province: Province.Province) => province.hub,
  nation: (province: Province.Province) => window.world.provinces[province.nation] ?? province,
  neighbors: ({ province, type, unpopulated }: Province.ProvinceNeighborParams) => {
    const neighbors = province.neighbors
      .map(n => window.world.provinces[n])
      .filter(p => unpopulated || !p.desolate)
    if (!type) return neighbors
    const foreign = (n: Province.Province) => PROVINCE.nation(n) !== PROVINCE.nation(province)
    const local = (n: Province.Province) => PROVINCE.nation(n) === PROVINCE.nation(province)
    return neighbors.filter(type === 'local' ? local : foreign)
  },
  network: PERFORMANCE.decorate({
    name: 'PROVINCE.network',
    f: (province: Province.Province) => {
      const distanceByRoad: Record<string, number> = {}
      window.world.provinces
        .filter(p => !p.desolate)
        .forEach(p => {
          const cells =
            POINT.distance.geo({ points: [PROVINCE.hub(p), PROVINCE.hub(province)] }) /
            window.world.cell.length
          distanceByRoad[p.idx] = cells + 1
        })
      return distanceByRoad
    }
  }),
  population: {
    density: (province: Province.Province) => province.population / province.area,
    scale: {
      fertile: 0.9,
      populous: 0.8,
      moderate: 0.7,
      rural: 0.6,
      low: 0.5,
      scattered: 0.3,
      sparse: 0.1,
      desolate: 0
    },
    describe: (density: number) => {
      const scale = PROVINCE.population.scale
      const keys = Object.keys(scale)
      const values = Object.values(scale)
      const index = values.findIndex(v => v <= density)
      return keys[index]
    }
  },
  sort: ({ group, ref, type }: Province.ProvinceSortParams) => {
    const closest = (a: number, b: number) => a - b

    const furthest = (a: number, b: number) => b - a
    const order = type === 'closest' ? closest : furthest
    return group.sort((a, b) => {
      const aDist = distanceTo(ref, a)
      const bDist = distanceTo(ref, b)
      return order(aDist, bDist)
    })
  },
  spawn: (cell: Cell) => {
    const idx = window.world.provinces.length
    cell.province = idx
    const hue = window.dice.randint(0, 360)
    const province: Province.Province = {
      idx,
      tag: 'province',
      name: 'test',
      culture: -1,
      cell: cell.idx,
      hub: HUB.spawn(cell),
      relations: {},
      heraldry: {
        color: window.dice.color([hue, hue]),
        hue,
        style: window.dice.weightedChoice([
          {
            v: 'dawn',
            w: 0.5
          },
          {
            v: 'dark chromatic',
            w: 0.2
          },
          {
            v: 'light chromatic',
            w: 0.2
          },
          {
            v: 'dusk',
            w: 0.1
          }
        ])
      },
      cells: [],
      locations: [],
      islands: {},
      lakes: {},
      land: 0,
      ocean: 0,
      mountains: 0,
      population: 0,
      neighbors: [],
      subjects: []
    }
    window.world.provinces.push(province)
    return province
  }
}
