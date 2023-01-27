import { Delaunay, Voronoi } from 'd3'

import { edge__sameEdge, point__isOnEdge, voronoi__commonEdge } from '../../utilities/math/points'
import { profile } from '../../utilities/performance'
import { memoize } from '../../utilities/performance/memoization'
import { Cell, ExteriorCell } from './types'

export const ocean = 'Great Sea'

type Edge = [number, number][]
const _cell__commonEdge = (i: number, j: number): Edge => {
  return voronoi__commonEdge(window.world.cells[i].data, window.world.cells[j].data)
}
export const cell__commonEdge = memoize(_cell__commonEdge, {
  store: (): Record<number, Record<number, Edge>> => ({}),
  get: (cache, i, j) => cache[i]?.[j],
  set: (cache, edge, i, j) => {
    if (!cache[i]) cache[i] = {}
    cache[i][j] = edge
    if (!cache[j]) cache[j] = {}
    cache[j][i] = edge
  }
})

export const cell__mapEdge = (cell: Cell) => {
  return cell.data.some(
    ([x, y]) => x <= 0 || y <= 0 || x >= window.world.dim.h || y >= window.world.dim.h
  )
}

interface CellParams {
  idx: number
  point: [number, number]
  diagram: Voronoi<Delaunay.Point>
}

export const cell__spawn = ({ idx, point, diagram }: CellParams) => {
  const [x, y] = point
  const baseCell: Cell = {
    idx,
    data: diagram.cellPolygon(idx) as [number, number][],
    x,
    y,
    n: Array.from(diagram.neighbors(idx))
  }
  return baseCell
}

export const cell__spawnExterior = (params: CellParams) => {
  const baseCell = cell__spawn(params)
  const exteriorCell: ExteriorCell = {
    idx: params.idx,
    data: baseCell.data,
    x: baseCell.x,
    y: baseCell.y,
    n: baseCell.n,
    score: 0,
    region: -1,
    province: -1,
    h: 0,
    landmark: 0,
    oceanDist: 0,
    mountainDist: -1,
    roads: { land: [], sea: [] }
  }
  return exteriorCell
}

export const cell__neighbors = (cell: ExteriorCell) => {
  return cell.n.map(n => window.world.cells[n])
}
export const cell__province = (cell: ExteriorCell) => window.world.provinces[cell.province]
export const cell__nation = (cell: ExteriorCell) => cell__province(cell).nation
export const cell__isNationBorder = (cell: ExteriorCell) => {
  const nation = cell__nation(cell)
  return cell__neighbors(cell).some(n => {
    return cell__nation(n) !== nation
  })
}
export const cell__isRegionBorder = (cell: ExteriorCell) => {
  return cell__neighbors(cell).some(n => {
    return cell.region !== n.region
  })
}

export const cell__bfsNeighborhood = (params: {
  start: ExteriorCell
  spread: (_cell: ExteriorCell) => boolean
}) => {
  const { start, spread } = params
  const queue = [start]
  const visited = new Set([start.idx])
  while (queue.length > 0) {
    const node = queue.shift()
    const neighbors = cell__neighbors(node)
    const valid = neighbors.filter(cell => !visited.has(cell.idx) && spread(cell))
    valid.forEach(n => visited.add(n.idx))
    queue.push(...valid)
  }
  return Array.from(visited).map(i => window.world.cells[i])
}

export const cell__isHub = (cell: ExteriorCell) => {
  const province = window.world.provinces[cell.province]
  return province?.hub?.cell === cell.idx
}

export const cell__moveToCoast = (params: { cell: ExteriorCell; distance: number }) => {
  const { cell, distance } = params
  if (cell.coastalEdges?.length > 0) {
    // move location to the coast
    const points = window.dice.choice(cell.coastalEdges)
    return point__isOnEdge({ points, distance })
  }
  return false
}

export const cell__hasRoads = ({ roads }: ExteriorCell) => {
  return roads.land.length > 0 || roads.sea.length > 0
}

export const cells__boundary = (params: {
  cells: ExteriorCell[]
  boundary: (_cell: ExteriorCell) => boolean
}) => {
  const { cells, boundary } = params
  const boundaries: [number, number][][] = []
  // find edges that border other regions or water
  const edges = profile({
    label: 'edges',
    f: () => {
      return cells.reduce((dict: Record<string, { v: [number, number][]; i: number }[]>, b) => {
        const prospects = cell__neighbors(b)
          .filter(boundary)
          .map(n => {
            const edge = cell__commonEdge(b.idx, n.idx)
            return { v: edge, i: b.idx }
          })
        if (prospects.length > 0) dict[b.idx] = prospects
        return dict
      }, {})
    }
  })
  profile({
    label: 'ordering',
    f: () => {
      // iterate through all edge groups
      while (Object.keys(edges).length > 0) {
        // tslint:disable-next-line:prefer-const
        const [curr] = Object.keys(edges)
        const start = edges[curr].pop()
        if (edges[curr].length === 0) delete edges[curr]
        let [, current] = start.v
        const [end] = start.v
        let cell = window.world.cells[start.i]
        // pick a random edge to start
        const ordered = [end, current]
        // loop until we arrive at the end
        while (cell && !edge__sameEdge(end, current)) {
          const prospects = cell__neighbors(cell)
            .concat([cell])
            .map(p => edges[p.idx])
            .filter(edge => edge?.length > 0)
          cell = null
          for (const prospect of prospects) {
            // find the next edge in the segment
            for (let i = 0; i < prospect.length; i++) {
              const { v, i: idx } = prospect[i]
              const [e1, e2] = v
              // the next segment shares a vertex with the current segment
              if (edge__sameEdge(e1, current) || edge__sameEdge(e2, current)) {
                current = edge__sameEdge(e1, current) ? e2 : e1
                cell = window.world.cells[idx]
                // don't consider already visited points
                prospect.splice(i, 1)
                if (prospect.length === 0) delete edges[idx]
                break
              }
            }
            if (cell) break
          }
          if (!cell) {
            throw new Error('bad cell boundary')
          }
          ordered.push(current)
        }
        // add ordered path to the list of region borders
        boundaries.push(ordered)
      }
    }
  })
  return boundaries
}
