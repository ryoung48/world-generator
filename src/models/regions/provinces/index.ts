import PriorityQueue from 'js-priority-queue'

import { ARRAY } from '../../utilities/array'
import { MATH } from '../../utilities/math'
import { POINT } from '../../utilities/math/points'
import { dayMS } from '../../utilities/math/time'
import { PERFORMANCE } from '../../utilities/performance'
import { decorateText } from '../../utilities/text/decoration'
import { WORLD } from '../../world'
import { BIOME } from '../../world/climate'
import { HUB } from './hubs'
import * as Province from './types'

const distanceTo = (c1: Province.Province, c2: Province.Province) => {
  const c1Cell = PROVINCE.cell(c1)
  const c2Cell = PROVINCE.cell(c2)
  return POINT.distance.geo({ points: [c1Cell, c2Cell] })
}

export const PROVINCE = {
  /**
   * All roads lead to Rome: attach to an arterial network
   * @param city the city to attach to the network
   * @param idx the index of the arterial network to attach to
   */
  attach: ({ province, idx }: Province.ProvinceAttachParams) => {
    // attach myself
    province.artery = [idx]
    const visited: Record<string, boolean> = {}
    const queue: Province.Province[] = [province]
    // attach all of my unconnected neighbors (and their neighbors)
    while (queue.length > 0) {
      const curr = queue.shift()
      if (!visited[curr.idx]) {
        visited[curr.idx] = true
        const neighbors = PROVINCE.sort({
          provinces: PROVINCE.neighbors({ province: curr, type: 'local' }),
          ref: curr,
          type: 'closest'
        }).filter(n => !PROVINCE.connected(n))
        neighbors.forEach(n => {
          n.artery = [curr.idx]
        })
        queue.push(...neighbors)
      }
    }
  },
  biome: (province: Province.Province) => {
    const cell = PROVINCE.cell(province)
    return BIOME.holdridge[cell.biome]
  },
  biomes: (province: Province.Province) =>
    province.cells.land.map(c => window.world.cells[c].biome),
  isBorder: (province: Province.Province) => {
    return PROVINCE.neighbors({ province, type: 'foreign' }).length > 0
  },
  cell: (province: Province.Province) => window.world.cells[province.hub.cell],
  climate: (province: Province.Province): Province.Province['environment']['climate'] => {
    const lat = Math.abs(province.hub.y)
    return lat < 23
      ? 'tropical'
      : lat < 35
      ? 'subtropical'
      : lat < 60
      ? 'temperate'
      : lat < 75
      ? 'subarctic'
      : 'arctic'
  },
  connected: (province: Province.Province) =>
    province.artery.length > 0 || PROVINCE.isCapital(province),
  cultures: (province: Province.Province) => {
    const region = window.world.regions[province.region]
    const nation = PROVINCE.nation(province)
    return { local: region, ruling: nation }
  },
  decorate: (provinces: Province.Province[]) =>
    provinces
      .sort((a, b) => b.hub.population - a.hub.population)
      .map(province => decorateText({ link: province, tooltip: province.hub.type }))
      .join(', '),
  demographics: PERFORMANCE.decorate({
    name: 'PROVINCE.demographics',
    f: (province: Province.Province): Province.Demographics => {
      const common: Record<string, number> = {}
      window.world.cultures.forEach(k => (common[k.idx] = 0))
      const { hub } = province
      const popScale = MATH.scale([0, 100000], [20, 200], hub.population)
      const origins = MATH.scale([0, 100000], [0.9, 0.6], hub.population)
      const network = PROVINCE.network(province)
      Object.entries(network)
        .map(([k, v]) => {
          const mod = v / popScale + 1
          const provinceIdx = parseInt(k)
          const traffic = 1 / v ** mod
          const { local, ruling } = PROVINCE.cultures(window.world.provinces[provinceIdx])
          return {
            province: {
              idx: provinceIdx,
              value: traffic
            },
            regional: {
              culture: local.culture,
              value: traffic * origins
            },
            national: {
              culture: ruling.culture,
              value: traffic * (1 - origins)
            }
          }
        })
        .forEach(({ regional, national }) => {
          common[regional.culture] += regional.value * 0.3
          common[national.culture] += national.value * 0.7
        })
      const commonDist = Object.entries(common)
        .map(([k, v]) => {
          return { w: v, v: parseInt(k) }
        })
        .sort((a, b) => b.w - a.w)
      const { ruling, local } = PROVINCE.cultures(province)
      return {
        common: MATH.buildDistribution(commonDist),
        native: MATH.buildDistribution(
          commonDist.filter(({ v }) => v === local.culture || v === ruling.culture)
        ),
        foreign: MATH.buildDistribution(
          commonDist.filter(({ v }) => v !== local.culture && v !== ruling.culture)
        )
      }
    },
    dirty: province => {
      const dirty = province.demographics < window.world.date
      if (dirty) province.demographics = window.world.date + 10 * dayMS
      return dirty
    }
  }),
  find: ({ provinces, ref, type }: Province.ProvinceFindParams): Province.Province => {
    const closest = ({ candidate, selected }: Province.ProvinceFindOrderParams) =>
      candidate < selected
    const furthest = ({ candidate, selected }: Province.ProvinceFindOrderParams) =>
      candidate > selected
    const order = type === 'closest' ? closest : furthest
    const start = closest ? Infinity : -Infinity
    return provinces.reduce(
      (selected, province) => {
        const d = distanceTo(ref, province)
        return order({ candidate: d, selected: selected.d }) ? { d, province: province } : selected
      },
      { d: start, province: undefined }
    ).province
  },
  isCapital: (province: Province.Province) => {
    return PROVINCE.nation(province).capital === province.idx
  },
  move: ({ province, nation }: Province.ProvinceMoveParams) => {
    nation.provinces.push(province.idx)
    province.nation = nation.idx
  },
  nation: (province: Province.Province) => window.world.regions[province.nation],
  neighboringRegions: (provinces: Province.Province[]) =>
    ARRAY.unique(
      provinces
        .map(t => {
          return PROVINCE.neighbors({ province: t, type: 'foreign' }).map(
            n => PROVINCE.nation(n).idx
          )
        })
        .flat()
    ),
  neighbors: ({ province, type }: Province.ProvinceNeighborParams) => {
    const neighbors = province.neighbors.map(n => window.world.provinces[n])
    if (!type) return neighbors
    const foreign = (n: Province.Province) => PROVINCE.nation(n) !== PROVINCE.nation(province)
    const local = (n: Province.Province) => PROVINCE.nation(n) === PROVINCE.nation(province)
    return neighbors.filter(type === 'local' ? local : foreign)
  },
  network: PERFORMANCE.decorate({
    name: 'PROVINCE.network',
    f: (province: Province.Province) => {
      const { land, sea } = window.world.routes
      const distanceByRoad: Record<string, number> = {}
      type QueueDistance = { n: Province.Province; dist: number }
      const queue = new PriorityQueue<QueueDistance>({
        comparator: (a: QueueDistance, b: QueueDistance) => a.dist - b.dist
      })
      queue.queue({ n: province, dist: 1 })
      while (queue.length > 0) {
        const { n: curr, dist } = queue.dequeue()
        if (distanceByRoad[curr.idx] === undefined) {
          distanceByRoad[curr.idx] = dist
          curr.neighbors
            .filter(n => distanceByRoad[n] === undefined)
            .forEach(n => {
              const landRoute = land[curr.trade.land[n]]?.length ?? Infinity
              const seaRoute = sea[curr.trade.sea[n]]?.length ?? Infinity
              const nDist = dist + Math.min(landRoute, seaRoute)
              queue.queue({ n: window.world.provinces[n], dist: nDist })
            })
        }
      }
      return distanceByRoad
    }
  }),
  populationDensity: (province: Province.Province) => {
    const cellArea = WORLD.cell.area()
    return province.population / (cellArea * province.cells.land.length)
  },
  region: (province: Province.Province) => window.world.regions[province.region],
  sharedWaterSource: (c1: Province.Province, c2: Province.Province) => {
    const c1Cell = PROVINCE.cell(c1)
    const c2Cell = PROVINCE.cell(c2)
    const waterSources = Array.from(c1Cell.waterSources ?? [])
    return waterSources.some(w => c2Cell.waterSources?.has?.(w))
  },
  sort: ({ provinces, ref, type }: Province.ProvinceSortParams) => {
    const closest = (a: number, b: number) => a - b
    const furthest = (a: number, b: number) => b - a
    const order = type === 'closest' ? closest : furthest
    return provinces.sort((a, b) => {
      const aDist = distanceTo(ref, a)
      const bDist = distanceTo(ref, b)
      return order(aDist, bDist)
    })
  },
  spawn: ({ cell, capital }: Province.ProvinceSpawnParams) => {
    const idx = window.world.provinces.length
    const region = window.world.regions[cell.region]
    cell.province = idx
    const province: Province.Province = {
      idx,
      tag: 'province',
      name: '',
      capital: capital,
      region: cell.region,
      nation: cell.region,
      cell: cell.idx,
      trade: { land: {}, sea: {} },
      hub: HUB.spawn({ cell }),
      cells: { land: [] },
      islands: {},
      lakes: {},
      land: 0,
      ocean: 0,
      mountains: 0,
      population: 0,
      neighbors: [],
      artery: [],
      actors: []
    }
    if (capital) {
      region.capital = province.idx
    }
    region.provinces.push(province.idx)
    window.world.provinces.push(province)
    return province
  },
  terrain: (province: Province.Province): Province.Province['environment']['terrain'] => {
    // Get the cell for the given province, along with other information needed
    const cell = window.world.cells[province.hub.cell]
    const mountainous = province.mountains > 0
    const biome = PROVINCE.biome(province)
    const zone = BIOME.zone[biome.latitude]
    const glacial = biome.latitude === 'polar'
    // Generate a chance of a marsh given certain criteria
    const coastal = window.world.cells[province.hub.cell].beach && window.dice.random > 0.8
    const lakeside = Object.keys(province.lakes).length > 0
    if (cell.isMountains) return 'mountainous'
    if (!coastal && window.dice.random > 0.9) return 'subterranean'
    if (mountainous && window.dice.random > 0.8) return 'mountainous'
    if (!province.hub.coastal && window.dice.random > 0.8) return 'hills'
    if (coastal && window.dice.random > 0.5) return window.dice.choice(['oceanic', 'coastal'])
    if (!glacial && (coastal || lakeside)) return 'marsh'
    if (biome.terrain === 'forest') return zone === 'tropical' ? 'jungle' : 'forest'
    return biome.terrain
  }
}
