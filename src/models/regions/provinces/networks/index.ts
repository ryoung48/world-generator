import PriorityQueue from 'js-priority-queue'

import { decorated_profile } from '../../../utilities/performance'
import { BasicCache, memoize } from '../../../utilities/performance/memoization'
import { Province } from '../types'

type province_distances = Record<string, number>

const _traverse__network = (province: Province) => {
  const { land, sea } = window.world.routes
  const distance_by_road: province_distances = {}
  const queue = new PriorityQueue({
    comparator: (a: { n: Province; dist: number }, b: { n: Province; dist: number }) =>
      a.dist - b.dist
  })
  queue.queue({ n: province, dist: 1 })
  while (queue.length > 0) {
    const { n: curr, dist } = queue.dequeue()
    if (distance_by_road[curr.idx] === undefined) {
      distance_by_road[curr.idx] = dist
      curr.neighbors
        .filter(n => distance_by_road[n] === undefined)
        .forEach(n => {
          const land_route = land[curr.trade.land[n]]?.length ?? Infinity
          const sea_route = sea[curr.trade.sea[n]]?.length ?? Infinity
          const n_dist = dist + Math.min(land_route, sea_route)
          queue.queue({ n: window.world.provinces[n], dist: n_dist })
        })
    }
  }
  return distance_by_road
}

const traverse__network = memoize(_traverse__network, {
  store: (): BasicCache<province_distances> => ({}),
  get: (cache, province) => cache[province.idx],
  set: (cache, res, province) => {
    cache[province.idx] = res
  }
})

export const province__network = decorated_profile(traverse__network)
