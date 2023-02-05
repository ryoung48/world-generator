import * as PriorityQueue from 'js-priority-queue'

import { buildDistribution, scale } from '../../utilities/math'
import { dayMS } from '../../utilities/math/time'
import { decoratedProfile } from '../../utilities/performance'
import { BasicCache, memoize } from '../../utilities/performance/memoization'
import {
  province__culture,
  province__isCapital,
  province__localNeighbors,
  province__sortClosest
} from '.'
import { Demographics, Province } from './types'

type ProvinceDistances = Record<string, number>
type QueueDistance = { n: Province; dist: number }

const _traverse__network = (province: Province) => {
  const { land, sea } = window.world.routes
  const distanceByRoad: ProvinceDistances = {}
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

const traverse__network = memoize(_traverse__network, {
  store: (): BasicCache<ProvinceDistances> => ({}),
  get: (cache, province) => cache[province.idx],
  set: (cache, res, province) => {
    cache[province.idx] = res
  }
})

export const province__network = decoratedProfile(traverse__network)

export const province__connected = (city: Province) => {
  return city.artery.length > 0 || province__isCapital(city)
}

// All roads lead to Rome: attach to an arterial network
export const province__attach = (city: Province, idx: number) => {
  // attach myself
  city.artery = [idx]
  const visited: Record<string, boolean> = {}
  const queue: Province[] = [city]
  // attach all of my unconnected neighbors (and their neighbors)
  while (queue.length > 0) {
    const curr = queue.shift()
    if (!visited[curr.idx]) {
      visited[curr.idx] = true
      const neighbors = province__sortClosest(province__localNeighbors(curr), curr).filter(
        n => !province__connected(n)
      )
      neighbors.forEach(n => {
        n.artery = [curr.idx]
      })
      queue.push(...neighbors)
    }
  }
}
// sever from an arterial network
export const province__sever = (city: Province) => {
  // sever myself
  city.artery = []
  const visited: Record<string, boolean> = {}
  const severed: Province[] = [city]
  const queue: Province[] = [city]
  // sever all other neighbors who on longer have arterial links
  // due to my severance
  while (queue.length > 0) {
    const curr = queue.shift()
    if (!visited[curr.idx]) {
      visited[curr.idx] = true
      const neighbors = province__localNeighbors(curr).filter(n => !visited[n.idx])
      neighbors.forEach(n => {
        n.artery = n.artery.filter(idx => idx !== curr.idx)
      })
      const lost = neighbors.filter(n => !province__connected(n))
      lost.filter(n => !severed.includes(n)).forEach(n => severed.push(n))
      queue.push(...lost)
    }
  }
  return severed
}

const _demographics = (province: Province): Demographics => {
  const common: Record<string, number> = {}
  window.world.cultures.forEach(k => (common[k.idx] = 0))
  const { hub } = province
  const popScale = scale([0, 100000], [20, 200], hub.population)
  const origins = scale([0, 100000], [0.9, 0.6], hub.population)
  const network = province__network(province)
  Object.entries(network)
    .map(([k, v]) => {
      const mod = v / popScale + 1
      const provinceIdx = parseInt(k)
      const traffic = 1 / v ** mod
      const { local, ruling } = province__culture(window.world.provinces[provinceIdx])
      return {
        province: {
          idx: provinceIdx,
          value: traffic
        },
        regional: {
          region: local.idx,
          ruling: local.culture.ruling,
          native: local.culture.native,
          value: traffic * origins
        },
        national: {
          region: ruling.idx,
          ruling: ruling.culture.ruling,
          native: ruling.culture.native,
          value: traffic * (1 - origins)
        }
      }
    })
    .forEach(({ regional, national }) => {
      common[regional.ruling] += regional.value * 0.3
      common[national.ruling] += national.value * 0.3
      common[regional.native] += regional.value * 0.7
      common[national.native] += national.value * 0.7
    })
  const commonDist = Object.entries(common)
    .map(([k, v]) => {
      return { w: v, v: parseInt(k) }
    })
    .sort((a, b) => b.w - a.w)
  const nativeIdx = window.world.regions[province.region].culture.native
  const rulingIdx = window.world.regions[province.nation].culture.ruling
  return {
    common: buildDistribution(commonDist),
    native: buildDistribution(commonDist.filter(({ v }) => v === nativeIdx || v === rulingIdx)),
    foreign: buildDistribution(commonDist.filter(({ v }) => v !== nativeIdx && v !== rulingIdx))
  }
}
const computeDemographics = memoize(_demographics, {
  store: (): BasicCache<Demographics> => ({}),
  get: (cache, province) => {
    // recompute very 10 days
    if (province.demographics === undefined || province.demographics < window.world.date) {
      province.demographics = window.world.date + 10 * dayMS
    } else {
      return cache[province.idx]
    }
  },
  set: (cache, res, province) => {
    cache[province.idx] = res
  }
})

export const province__demographics = decoratedProfile(computeDemographics)
