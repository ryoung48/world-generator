import { ARRAY } from '../utilities/array'
import { POINT } from '../utilities/math/points'
import { VORONOI } from '../utilities/math/voronoi'
import { PERFORMANCE } from '../utilities/performance'
import { Cell, CellNeighborsParams, CellSpawnParams } from './types'

const _distCache: Record<number, Record<number, number>> = {}

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
      const neighbors = CELL.neighbors({ cell })
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
          const prospects = CELL.neighbors({ cell: b })
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
      f: (): [number, number][][] => {
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
            const prospects = CELL.neighbors({ cell })
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
  commonEdge: (i: number, j: number) => {
    const iData = CELL.data(i)
    const jData = CELL.data(j)
    return VORONOI.commonEdge(iData, jData)
  },
  data: (i: number) => window.world.diagram.polygons[i].map(p => window.world.diagram.centers[p]),
  distance: (src: Cell, dst: Cell) => {
    if (_distCache[src.idx]?.[dst.idx] === undefined) {
      const dist = POINT.distance.geo({ points: [src, dst] })
      if (!_distCache[src.idx]) _distCache[src.idx] = {}
      _distCache[src.idx][dst.idx] = dist
      if (!_distCache[dst.idx]) _distCache[dst.idx] = {}
      _distCache[dst.idx][src.idx] = dist
    }
    return _distCache[src.idx][dst.idx]
  },
  hasRoads: ({ roads }: Cell) => roads.land.length > 0 || roads.sea.length > 0,
  isNationBorder: (cell: Cell) => {
    const nation = CELL.nation(cell)
    return CELL.neighbors({ cell }).some(n => {
      return CELL.nation(n) !== nation
    })
  },
  coastalEdge: (params: { cell: Cell; distance: number }) => {
    const { cell, distance } = params
    if (cell.coastalEdges?.length > 0) {
      return cell.coastalEdges
        .map(edge => {
          const neighbor = window.world.cells[edge.neighbor]
          const landmark = window.world.landmarks[neighbor.landmark]
          return {
            neighbor: edge.neighbor,
            priority: landmark.type === 'ocean' ? 1 : 0,
            point: POINT.isOnEdge.geo({ points: edge.vertices, distance })
          }
        })
        .sort((a, b) => b.priority - a.priority)
        .map(edge => edge)
    }
    return []
  },
  nation: (cell: Cell) => {
    const province = CELL.province(cell)
    return province.nation ?? province.idx
  },
  neighbors: ({ cell, depth = 1 }: CellNeighborsParams): Cell[] => {
    const neighbors = window.world.diagram.neighbors[cell.idx].map(n => window.world.cells[n])
    if (depth > 1)
      return ARRAY.unique(
        neighbors.concat(neighbors.map(n => CELL.neighbors({ cell: n, depth: depth - 1 })).flat())
      )
    return neighbors
  },
  distMiles: (cell: Cell) =>
    (!cell.isWater ? cell.oceanDist : cell.landDist) * window.world.cell.length,
  place: (cell: Cell) => {
    const province = CELL.province(cell)
    const hub = province?.hub
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
      province: -1,
      region: -1,
      h: 0,
      landmark: 0,
      oceanDist: 0,
      landDist: 0,
      mountainDist: -1,
      roads: { land: [], sea: [] },
      rain: { east: -1, west: -1, winter: -1, summer: -1, annual: -1 },
      heat: { min: -1, max: -1, mean: -1 }
    }
    return cell
  },
  wallBoundary: (params: { cells: Cell[]; boundary: (_cell: Cell) => boolean }) => {
    const { cells, boundary } = params
    const wallSegments: [number, number][][] = []

    // Find all shared edges between cells and boundary cells
    const edges: Record<string, { v: [number, number][] }[]> = {}

    cells.forEach(cell => {
      CELL.neighbors({ cell })
        .filter(boundary) // Only neighbors that match boundary condition
        .forEach(boundaryCell => {
          const edge = CELL.commonEdge(cell.idx, boundaryCell.idx)
          const key = `${Math.min(cell.idx, boundaryCell.idx)}-${Math.max(
            cell.idx,
            boundaryCell.idx
          )}`

          if (!edges[key]) {
            edges[key] = []
          }
          edges[key].push({ v: edge })
        })
    })

    // Order edges into continuous wall segments
    while (Object.keys(edges).length > 0) {
      const [startKey] = Object.keys(edges)
      const start = edges[startKey].pop()
      if (edges[startKey].length === 0) delete edges[startKey]

      let [, current] = start.v
      const [end] = start.v
      const ordered = [end, current]

      // Follow connected edges until we can't find more or complete a loop
      let foundNext = true
      while (foundNext) {
        foundNext = false

        // Look for an edge that connects to current vertex
        for (const [edgeKey, edgeList] of Object.entries(edges)) {
          if (edgeList.length === 0) continue

          for (let i = 0; i < edgeList.length; i++) {
            const { v } = edgeList[i]
            const [e1, e2] = v

            // Check if this edge connects to our current vertex
            if (POINT.sameEdge(e1, current) || POINT.sameEdge(e2, current)) {
              current = POINT.sameEdge(e1, current) ? e2 : e1
              ordered.push(current)

              // Remove this edge from consideration
              edgeList.splice(i, 1)
              if (edgeList.length === 0) delete edges[edgeKey]

              foundNext = true
              break
            }
          }
          if (foundNext) break
        }

        // Stop if we've completed a loop or reached a dead end
        if (POINT.sameEdge(end, current)) break
      }

      wallSegments.push(ordered)
    }

    // Connect wall segments that share ending edges
    let connected = true
    while (connected) {
      connected = false

      for (let i = 0; i < wallSegments.length; i++) {
        for (let j = i + 1; j < wallSegments.length; j++) {
          const segmentA = wallSegments[i]
          const segmentB = wallSegments[j]

          if (!segmentA || !segmentB) continue

          const aStart = segmentA[0]
          const aEnd = segmentA[segmentA.length - 1]
          const bStart = segmentB[0]
          const bEnd = segmentB[segmentB.length - 1]

          // Check all possible connections between segment endpoints
          if (POINT.sameEdge(aEnd, bStart)) {
            // Connect A end to B start: A + B (remove B's first point to avoid duplication)
            wallSegments[i] = [...segmentA, ...segmentB.slice(1)]
            wallSegments.splice(j, 1)
            connected = true
            break
          } else if (POINT.sameEdge(aEnd, bEnd)) {
            // Connect A end to B end: A + reverse(B) (remove B's last point to avoid duplication)
            wallSegments[i] = [...segmentA, ...segmentB.slice(0, -1).reverse()]
            wallSegments.splice(j, 1)
            connected = true
            break
          } else if (POINT.sameEdge(aStart, bStart)) {
            // Connect A start to B start: reverse(B) + A (remove A's first point to avoid duplication)
            wallSegments[i] = [...segmentB.reverse(), ...segmentA.slice(1)]
            wallSegments.splice(j, 1)
            connected = true
            break
          } else if (POINT.sameEdge(aStart, bEnd)) {
            // Connect A start to B end: B + A (remove A's first point to avoid duplication)
            wallSegments[i] = [...segmentB, ...segmentA.slice(1)]
            wallSegments.splice(j, 1)
            connected = true
            break
          }
        }
        if (connected) break
      }
    }

    return wallSegments
  }
}
