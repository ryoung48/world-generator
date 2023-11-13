import PriorityQueue from 'js-priority-queue'

import { MATH } from '../../utilities/math'
import { CELL } from '../cells'
import { Cell } from '../cells/types'
import { RouteTypes } from '../types'
import * as Navigation from './types'

const validPath: Record<RouteTypes, (_cell: Cell) => boolean> = {
  land: (cell: Cell) => !cell.isWater,
  sea: (cell: Cell) => cell.isWater
}

/**
 * Reconstructs the shortest path from the start cell to the end cell using the visited object.
 *
 * @param {Object} args - The arguments object.
 * @param {number} args.start - The index of the start cell.
 * @param {number} args.end - The index of the end cell.
 * @param {Object} args.visited - A record of visited cells, where the keys are the indices of the cells and the values are the indices of the previous cells in the path.
 * @returns {number[]} - An array of numbers representing the indices of the cells in the shortest path from the start cell to the end cell.
 *
 * @example
 * const start = 0;
 * const end = 5;
 * const visited = {
 *   1: 0,
 *   2: 1,
 *   3: 2,
 *   4: 3,
 *   5: 4
 * };
 * const path = restorePath({ start, end, visited });
 * console.log(path); // [0, 1, 2, 3, 4, 5]
 */
const restorePath = ({ start, end, visited }: Navigation.RestorePathParams) => {
  const path: number[] = []
  let current = end
  let prev = window.world.cells[current]
  path.push(prev.idx)
  // go from source to end
  while (current !== start) {
    // use the visited list to get the next cell in the path
    current = visited[current]
    const curr = window.world.cells[current]
    if (current === undefined) {
      return []
    }
    // add index to the path
    path.push(curr.idx)
    prev = curr
  }
  return path
}

export const NAVIGATION = {
  addRoute: ({ src, dst, limit, blacklist, type, imperial }: Navigation.AddRouteParams) => {
    const path = NAVIGATION.shortestPath({
      type,
      start: src.hub.cell,
      end: dst.hub.cell,
      limit
    })
    if (path.length > 0) {
      const dist = path.length * window.dice.uniform(0.8, 1.2)
      const idx = window.world.routes[type].length
      path.forEach(i => window.world.cells[i].roads[type].push(idx))
      window.world.routes[type].push({ path, length: dist, src: src.idx, dst: dst.idx, imperial })
      return idx
    } else {
      blacklist[src.idx].push(dst.idx)
      delete src.trade[type][dst.idx]
      blacklist[dst.idx].push(src.idx)
      delete dst.trade[type][src.idx]
      return false
    }
  },
  addTradeRoute: ({ src, dst, limit, blacklist, type }: Navigation.AddTradeRouteParams) => {
    const idx = NAVIGATION.addRoute({ src, dst, limit, blacklist, type })
    if (idx !== false) {
      src.trade[type][dst.idx] = idx
      if (!src.neighbors.includes(dst.idx)) src.neighbors.push(dst.idx)
      dst.trade[type][src.idx] = idx
      if (!dst.neighbors.includes(src.idx)) dst.neighbors.push(src.idx)
    }
  },
  get blacklist() {
    const locs = window.world.provinces.map(city => window.world.cells[city.hub.cell])
    return {
      blacklist: locs.reduce((org: Record<string, number[]>, town) => {
        org[town.province] = []
        return org
      }, {}),
      locs
    }
  },
  shortestPath: ({
    start,
    end,
    type,
    roads = 0.3,
    limit = Infinity
  }: Navigation.ShortestPathParams) => {
    const pathing = validPath[type]
    const cells = window.world.cells.length
    const cellLimit = limit * cells
    // initialize the priority queue to compare cell priorities
    const queue = new PriorityQueue({
      comparator: (a: Navigation.PathElement, b: Navigation.PathElement) => a.p - b.p
    })
    queue.queue({
      idx: start,
      p: 0,
      d: 0
    })
    const destination = window.world.cells[end]
    const origin = window.world.cells[end]
    // total cost from a cell
    const totals = { [start]: 0 }
    // visited cell list marking the next cell in the path
    const visited: { [index: string]: number | undefined } = {}
    let prev = start
    let len = 0
    while (queue.length > 0 && prev !== end && len < cellLimit) {
      // get the next item in the queue
      const { idx, d } = queue.dequeue()
      len = d + 1
      prev = idx
      const cell = window.world.cells[prev]
      // consider all neighbors that pass the validation condition (f)
      CELL.neighbors(cell).forEach(neighbor => {
        const next = neighbor.idx
        if (pathing(neighbor) || next === end) {
          // only consider neighbors that haven't already been visited
          if (visited[next] === undefined) {
            const [nx, ny] = [neighbor.x, neighbor.y]
            const [cx, cy] = [cell.x, cell.y]
            const [dx, dy] = [destination.x, destination.y]
            // start the cost at the distance between cells
            const cost = MATH.distance.geo([nx, ny], [cx, cy])
            let penalty = 1
            const foreignPath =
              ![destination.region, origin.region].includes(neighbor.region) && type === 'land'
            // mountains are difficult to traverse
            if (neighbor.isMountains) penalty += 1.5
            // prioritize coastal roads
            if (!neighbor.isCoast) penalty += 0.3
            // build inside of your own region if possible
            if (foreignPath) penalty += 3
            // prioritize already built roads
            if (neighbor.roads[type].length > 0) penalty *= roads
            // finalize the cost by adding it to the total cost to get to the previous cell
            const prospect = cost * penalty + totals[prev]
            totals[next] = prospect
            visited[next] = prev
            const priority = prospect + MATH.distance.geo([nx, ny], [dx, dy])
            // add cell w/ priority to the queue
            queue.queue({
              idx: next,
              p: priority,
              d: len
            })
          }
        }
      })
    }
    const success = prev === end
    return success ? restorePath({ start, end, visited }) : []
  }
}
