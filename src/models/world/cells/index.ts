import { Delaunay, Voronoi } from 'd3'

import { point_on_edge, same_edge, voronoi__common_edge } from '../../utilities/math/points'
import { profile } from '../../utilities/performance'
import { memoize } from '../../utilities/performance/memoization'
import { Cell, ExteriorCell } from './types'

export const ocean = 'Great Sea'

type Edge = [number, number][]
const _cell__common_edge = (i: number, j: number): Edge => {
  return voronoi__common_edge(window.world.cells[i].data, window.world.cells[j].data)
}
export const cell__common_edge = memoize(_cell__common_edge, {
  store: (): Record<number, Record<number, Edge>> => ({}),
  get: (cache, i, j) => cache[i]?.[j],
  set: (cache, edge, i, j) => {
    if (!cache[i]) cache[i] = {}
    cache[i][j] = edge
    if (!cache[j]) cache[j] = {}
    cache[j][i] = edge
  }
})

export const cell__map_edge = (cell: Cell) => {
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
  const base_cell: Cell = {
    idx,
    data: diagram.cellPolygon(idx) as [number, number][],
    x,
    y,
    n: Array.from(diagram.neighbors(idx))
  }
  return base_cell
}

export const cell__spawn_exterior = (params: CellParams) => {
  const base_cell = cell__spawn(params)
  const exterior_cell: ExteriorCell = {
    idx: params.idx,
    data: base_cell.data,
    x: base_cell.x,
    y: base_cell.y,
    n: base_cell.n,
    score: 0,
    region: -1,
    province: -1,
    h: 0,
    landmark: 0,
    ocean_dist: 0,
    mountain_dist: -1,
    roads: { land: [], sea: [] }
  }
  return exterior_cell
}

export const cell__neighbors = (cell: ExteriorCell) => {
  return cell.n.map(n => window.world.cells[n])
}
export const cell__province = (cell: ExteriorCell) => window.world.provinces[cell.province]
export const cell__nation = (cell: ExteriorCell) => cell__province(cell).curr_nation
export const cell__is_nation_border = (cell: ExteriorCell) => {
  const nation = cell__nation(cell)
  return cell__neighbors(cell).some(n => {
    return cell__nation(n) !== nation
  })
}
export const cell__is_region_border = (cell: ExteriorCell) => {
  return cell__neighbors(cell).some(n => {
    return cell.region !== n.region
  })
}

export const cell__bfs_neighborhood = (params: {
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

export const cell__is_hub = (cell: ExteriorCell) => {
  const provinces = window.world.provinces[cell.province]
  const hub = window.world.locations[provinces?.hub]
  return hub?.cell === cell.idx
}

export const cell__move_to_coast = (params: { cell: ExteriorCell; distance: number }) => {
  const { cell, distance } = params
  if (cell.coastal_edges?.length > 0) {
    // move location to the coast
    const points = window.dice.choice(cell.coastal_edges)
    return point_on_edge({ points, distance })
  }
  return false
}

export const cell__has_roads = ({ roads }: ExteriorCell) => {
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
            const edge = cell__common_edge(b.idx, n.idx)
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
        while (cell && !same_edge(end, current)) {
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
              if (same_edge(e1, current) || same_edge(e2, current)) {
                current = same_edge(e1, current) ? e2 : e1
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
