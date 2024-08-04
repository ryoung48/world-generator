import { ARRAY } from '../utilities/array'
import { POINT } from '../utilities/math/points'
import { VORONOI } from '../utilities/math/voronoi'
import { PERFORMANCE } from '../utilities/performance'
import { CLIMATE } from './climate'
import { Cell, CellSpawnParams } from './types'

export const CELL = {
  bfsNeighborhood: (params: {
    start: Cell
    spread?: (_cell: Cell) => boolean
    maxDepth?: number
  }) => {
    const { start, spread, maxDepth = Infinity } = params
    const queue = [{ cell: start, depth: 0 }]
    const visited = new Set([start.idx])
    while (queue.length > 0) {
      const { cell, depth } = queue.shift()
      const deeper = depth + 1
      if (deeper >= maxDepth) break
      const neighbors = CELL.neighbors(cell)
      const valid = neighbors
        .filter(n => !visited.has(n.idx) && (spread?.(n) ?? true))
        .map(n => ({ cell: n, depth: deeper }))
      valid.forEach(n => visited.add(n.cell.idx))
      queue.push(...valid)
    }
    return Array.from(visited).map(i => window.world.cells[i])
  },
  boundary: (params: { cells: Cell[]; boundary: (_cell: Cell) => boolean }) => {
    const { cells, boundary } = params
    const boundaries: [number, number][][] = []
    // find edges that border other regions or water
    const edges = PERFORMANCE.profile.apply({
      label: 'edges',
      f: () => {
        return cells.reduce((dict: Record<string, { v: [number, number][]; i: number }[]>, b) => {
          const prospects = CELL.neighbors(b)
            .filter(boundary)
            .map(n => {
              const edge = CELL.commonEdge(b.idx, n.idx)
              return { v: edge, i: b.idx }
            })
          if (prospects.length > 0) dict[b.idx] = prospects
          return dict
        }, {})
      }
    })
    PERFORMANCE.profile.apply({
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
          while (cell && !POINT.sameEdge(end, current)) {
            const prospects = CELL.neighbors(cell)
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
                if (POINT.sameEdge(e1, current) || POINT.sameEdge(e2, current)) {
                  current = POINT.sameEdge(e1, current) ? e2 : e1
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
              console.error('bad cell boundary')
              return []
            }
            ordered.push(current)
          }
          // add ordered path to the list of region borders
          boundaries.push(ordered)
        }
      }
    })
    return boundaries
  },
  climate: (cell: Cell) => CLIMATE.holdridge[cell.climate],
  commonEdge: (i: number, j: number) => {
    const iData = CELL.data(i)
    const jData = CELL.data(j)
    return VORONOI.commonEdge(iData, jData)
  },
  data: (i: number) => window.world.diagram.polygons[i].map(p => window.world.diagram.centers[p]),
  hasRoads: ({ roads }: Cell) => roads.land.length > 0 || roads.sea.length > 0,
  isNationBorder: (cell: Cell) => {
    const nation = CELL.nation(cell)
    return CELL.neighbors(cell).some(n => {
      return CELL.nation(n) !== nation
    })
  },
  coastalEdge: (params: { cell: Cell; distance: number }) => {
    const { cell, distance } = params
    if (cell.coastalEdges?.length > 0) {
      return cell.coastalEdges.map(points => POINT.isOnEdge.geo({ points, distance }))
    }
    return []
  },
  nation: (cell: Cell) => CELL.province(cell).nation,
  neighbors: (cell: Cell, depth = 1): Cell[] => {
    const neighbors = window.world.diagram.neighbors[cell.idx].map(n => window.world.cells[n])
    if (depth > 1)
      return ARRAY.unique(neighbors.concat(neighbors.map(n => CELL.neighbors(n, depth - 1)).flat()))
    return neighbors
  },
  place: (cell: Cell) => {
    const province = CELL.province(cell)
    const hub = province?.sites?.[0]
    return hub?.cell === cell.idx ? hub : null
  },
  province: (cell: Cell) => window.world.provinces[cell.province],
  spawn: ({ idx, point }: CellSpawnParams) => {
    const [x, y] = point
    const cell: Cell = {
      idx,
      x,
      y,
      score: 0,
      region: -1,
      province: -1,
      h: 0,
      landmark: 0,
      oceanDist: 0,
      mountainDist: -1,
      roads: { land: [], sea: [] },
      rain: { east: -1, west: -1, winter: -1, summer: -1 }
    }
    return cell
  }
}
