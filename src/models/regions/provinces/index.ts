import PriorityQueue from 'js-priority-queue'

import { WORLD } from '../..'
import { CELL } from '../../cells'
import { ARRAY } from '../../utilities/array'
import { MATH } from '../../utilities/math'
import { POINT } from '../../utilities/math/points'
import { dayMS } from '../../utilities/math/time'
import { PERFORMANCE } from '../../utilities/performance'
import { HUB } from '../sites/hubs'
import { Hub } from '../sites/hubs/types'
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
          group: PROVINCE.neighbors({ province: curr, type: 'local' }),
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
  climate: (province: Province.Province) => {
    const cell = PROVINCE.cell(province)
    return CELL.climate(cell)
  },
  coastal: (province: Province.Province) => {
    return PROVINCE.hub(province).coastal
  },
  isBorder: (province: Province.Province) => {
    const neighbors = province.neighbors.map(n => window.world.provinces[n])
    return neighbors.some(n => PROVINCE.nation(n) !== PROVINCE.nation(province))
  },
  cell: (province: Province.Province) => window.world.cells[PROVINCE.hub(province).cell],
  connected: (province: Province.Province) =>
    province.artery.length > 0 || PROVINCE.isCapital(province),
  cultures: (province: Province.Province) => {
    const region = window.world.regions[province.region]
    const nation = PROVINCE.nation(province)
    return { local: region, ruling: nation }
  },
  demographics: PERFORMANCE.decorate({
    name: 'PROVINCE.demographics',
    f: (province: Province.Province): Province.Demographics => {
      const common: Record<string, number> = {}
      window.world.cultures.forEach(k => (common[k.idx] = 0))
      const hub = PROVINCE.hub(province)
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
  hub: (province: Province.Province) => province.sites[0] as Hub,
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
  spawn: ({ cell, capital }: Province.ProvinceSpawnParams) => {
    const idx = window.world.provinces.length
    const region = window.world.regions[cell.region]
    cell.province = idx
    const province: Province.Province = {
      idx,
      tag: 'province',
      capital: capital,
      region: cell.region,
      nation: cell.region,
      cell: cell.idx,
      sites: [HUB.spawn(cell)],
      trade: { land: {}, sea: {} },
      cells: { land: [] },
      islands: {},
      lakes: {},
      land: 0,
      ocean: 0,
      mountains: 0,
      population: 0,
      neighbors: [],
      artery: []
    }
    if (capital) region.capital = province.idx
    region.provinces.push(province.idx)
    window.world.provinces.push(province)
    return province
  }
}
