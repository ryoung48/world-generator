import PriorityQueue from 'js-priority-queue'

import { Province } from '../../regions/provinces/types'
import { distance } from '../../utilities/math'
import { ExteriorCell } from '../cells/types'
import { RouteTypes } from './types'

interface PathArgs {
  start: number
  end: number
}

export interface ShortestPathArgs extends PathArgs {
  limit?: number
  type: RouteTypes
  roads?: number
}

interface PathElement {
  idx: number
  p: number
  d: number
}

const validPath: Record<RouteTypes, (_cell: ExteriorCell) => boolean> = {
  land: (cell: ExteriorCell) => !cell.isWater,
  sea: (cell: ExteriorCell) => cell.isWater
}

interface RestorePathArgs extends PathArgs {
  visited: Record<string, number>
}

export const restorePath = ({ start, end, visited }: RestorePathArgs) => {
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

export const shortestPath = ({
  start,
  end,
  type,
  roads = 0.5,
  limit = Infinity
}: ShortestPathArgs) => {
  const pathing = validPath[type]
  const cells = window.world.dim.cells
  const cellLimit = limit * cells
  // initialize the priority queue to compare cell priorities
  const queue = new PriorityQueue({
    comparator: (a: PathElement, b: PathElement) => a.p - b.p
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
    cell.n.forEach(next => {
      const neighbor = window.world.cells[next]
      if (pathing(neighbor) || next === end) {
        // only consider neighbors that haven't already been visited
        if (visited[next] === undefined) {
          const [nx, ny] = [neighbor.x, neighbor.y]
          const [cx, cy] = [cell.x, cell.y]
          const [dx, dy] = [destination.x, destination.y]
          // start the cost at the distance between cells
          const cost = distance([nx, cx], [ny, cy])
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
          const priority = prospect + distance([nx, dx], [ny, dy])
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

export const routeBlacklist = () => {
  const locs = window.world.provinces.map(city => window.world.cells[city.hub.cell])
  return {
    blacklist: locs.reduce((org: Record<string, number[]>, town) => {
      org[town.province] = []
      return org
    }, {}),
    locs
  }
}

export const addPath = (params: {
  src: Province
  dst: Province
  path: number[]
  blacklist: Record<string, number[]>
  type: RouteTypes
  imperial?: boolean
}) => {
  const { src, dst, path, blacklist, type, imperial } = params
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
}

export const addTradePath = (
  src: Province,
  dst: Province,
  path: number[],
  blacklist: Record<string, number[]>,
  type: RouteTypes
) => {
  const idx = addPath({ src, dst, path, blacklist, type })
  if (idx !== false) {
    src.trade[type][dst.idx] = idx
    if (!src.neighbors.includes(dst.idx)) src.neighbors.push(dst.idx)
    dst.trade[type][src.idx] = idx
    if (!dst.neighbors.includes(src.idx)) dst.neighbors.push(src.idx)
  }
}
