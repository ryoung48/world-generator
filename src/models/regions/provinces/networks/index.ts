import * as PriorityQueue from 'js-priority-queue'

import { decoratedProfile } from '../../../utilities/performance'
import { BasicCache, memoize } from '../../../utilities/performance/memoization'
import { Province } from '../types'

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
