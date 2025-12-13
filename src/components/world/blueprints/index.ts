import { Delaunay, Voronoi } from 'd3-delaunay'
import { polygonArea, polygonCentroid } from 'd3-polygon'
import { range } from 'd3-array'

import { Dice } from '../../../models/utilities/math/dice'
import { VORONOI } from '../../../models/utilities/math/voronoi'
import { BLOCK } from './blocks'
import { Block, Structure } from './blocks/types'
import { BLUEPRINT_CONSTANTS } from './constants'
import { DISTRICT } from './districts'
import { Blueprint } from './types'

const dimensions = BLUEPRINT_CONSTANTS.dimensions
const DISTRICT_SIZE = 1000

const placeOcean = (params: { map: Blueprint; blocks: Block[]; dice: Dice }) => {
  const { map, blocks, dice } = params
  const used = new Set<number>()
  const exterior = DISTRICT.exterior({ map, blocks })
  const docks = exterior
    .filter(district => district.dock !== undefined)
    .map(district => blocks[district.dock])
  docks.forEach(dock => {
    dock.land = false
    used.add(dock.idx)
  })
  const gates = exterior
    .filter(district => district.gate !== undefined)
    .map(district => blocks[district.gate])
  gates.forEach(gate => {
    gate.land = true
    used.add(gate.idx)
  })
  const queue = dice.shuffle(docks.concat(gates))
  while (queue.length > 0) {
    const curr = queue.shift()
    const next = curr.n.map(n => blocks[n]).filter(block => block.land === undefined)
    next.forEach(block => {
      block.land = curr.land
    })
    queue.push(...next)
  }
}

const calculateWallPoints = (params: { map: Blueprint; blocks: Block[] }) => {
  const { map, blocks } = params

  // First collect all unique edges that form the wall
  const wallEdges: Array<[[number, number], [number, number]]> = []
  const edgeSet = new Set<string>() // To track unique edges

  // Get all exterior districts
  const exteriorDistricts = DISTRICT.exterior({ map, blocks })

  exteriorDistricts.forEach(district => {
    const districtBlock = blocks[district.block]

    // For each neighboring block
    districtBlock.n.forEach(neighborIdx => {
      const neighborBlock = blocks[neighborIdx]

      // Check if the neighbor is a land block without a district
      if (neighborBlock.land === true && !neighborBlock.district) {
        // Find the shared vertices between the district block and the neighbor block
        const districtVertices = districtBlock.data
        const neighborVertices = neighborBlock.data

        // Find matching vertices (shared edge)
        for (let i = 0; i < districtVertices.length; i++) {
          const current = districtVertices[i]
          const next = districtVertices[(i + 1) % districtVertices.length]

          // Check if this edge is shared with the neighbor
          let isSharedEdge = false
          for (let j = 0; j < neighborVertices.length; j++) {
            const nCurrent = neighborVertices[j]
            const nNext = neighborVertices[(j + 1) % neighborVertices.length]

            // Check if the edge points match (in either direction)
            if (
              (current[0] === nCurrent[0] &&
                current[1] === nCurrent[1] &&
                next[0] === nNext[0] &&
                next[1] === nNext[1]) ||
              (current[0] === nNext[0] &&
                current[1] === nNext[1] &&
                next[0] === nCurrent[0] &&
                next[1] === nCurrent[1])
            ) {
              isSharedEdge = true
              break
            }
          }

          if (isSharedEdge) {
            // Create a unique key for this edge (normalizing direction)
            const edgeKey = createEdgeKey(current, next)

            // Only add if we haven't seen this edge before
            if (!edgeSet.has(edgeKey)) {
              wallEdges.push([current, next])
              edgeSet.add(edgeKey)
            }
          }
        }
      }
    })
  })

  // If no edges were found, return empty array
  if (wallEdges.length === 0) {
    return []
  }

  // Use a more robust approach to create ordered wall segments
  return createOrderedWallPath(wallEdges)
}

const generateRivers = (params: { map: Blueprint; blocks: Block[]; dice: Dice }) => {
  const { map, blocks, dice } = params
  const { w, h } = dimensions

  // Decide river count based on water presence
  const riverCount = 1
  const rivers: Array<Array<[number, number]>> = []

  // Build Graph (same as before)
  const graph = new Map<string, Set<string>>()
  const pointMap = new Map<string, [number, number]>()

  blocks.forEach(block => {
    const poly = block.data
    for (let i = 0; i < poly.length; i++) {
      const p1 = poly[i]
      const p2 = poly[(i + 1) % poly.length]

      const k1 = `${p1[0]},${p1[1]}`
      const k2 = `${p2[0]},${p2[1]}`

      pointMap.set(k1, p1)
      pointMap.set(k2, p2)

      if (!graph.has(k1)) graph.set(k1, new Set())
      if (!graph.has(k2)) graph.set(k2, new Set())

      graph.get(k1).add(k2)
      graph.get(k2).add(k1)
    }
  })

  const isBoundary = (x: number, y: number) => {
    const margin = 5
    return x <= margin || x >= w - margin || y <= margin || y >= h - margin
  }

  const isCoast = (x: number, y: number) => {
    return blocks.some(b =>
      b.land === false &&
      b.data.some(p => Math.abs(p[0] - x) < 1 && Math.abs(p[1] - y) < 1)
    )
  }

  // Find center of map/city
  // We can use the actual map center coordinates or the 'center' block determined in spawn
  // Let's find the vertex closest to (w/2, h/2) used by a block?
  // Easier: iterate all points in pointMap and find closest to center
  let centerKey = ''
  let minCenterDist = Infinity
  for (const [key, p] of pointMap.entries()) {
    const d = Math.sqrt((p[0] - w / 2) ** 2 + (p[1] - h / 2) ** 2)
    if (d < minCenterDist) {
      minCenterDist = d
      centerKey = key
    }
  }

  // Potential start points
  const startCandidates: string[] = []
  const coastlineCandidates: string[] = []

  for (const [key, p] of pointMap.entries()) {
    if (isBoundary(p[0], p[1]) && !isCoast(p[0], p[1])) {
      startCandidates.push(key)
    }
    if (isCoast(p[0], p[1])) {
      coastlineCandidates.push(key)
    }
  }

  const hasOcean = coastlineCandidates.length > 0

  if (hasOcean) {
    // Calculate coastline centroid to determine "ocean side"
    let cX = 0, cY = 0
    coastlineCandidates.forEach(k => {
      const p = pointMap.get(k)
      cX += p[0]
      cY += p[1]
    })
    cX /= coastlineCandidates.length
    cY /= coastlineCandidates.length

    // Filter start candidates to be "opposite" to the coastline
    // We can just take the 50% of candidates furthest from the coastline center
    // Or filter by dot product with the center-to-coast vector

    // Sort candidates by distance to coastline center (descending)
    startCandidates.sort((a, b) => {
      const p1 = pointMap.get(a)
      const p2 = pointMap.get(b)
      const d1 = (p1[0] - cX) ** 2 + (p1[1] - cY) ** 2
      const d2 = (p2[0] - cX) ** 2 + (p2[1] - cY) ** 2
      return d2 - d1 // Descending distance
    })

    // Keep only the furthest 25% as valid starting points to ensure opposite side
    const cutOff = Math.ceil(startCandidates.length * 0.25)
    startCandidates.splice(cutOff)
  }

  // Pathfinding Helper
  const findPath = (start: string, targetPredicate: (k: string) => boolean, preferredDir?: [number, number]) => {
    const openSet = new Set<string>([start])
    const cameFrom = new Map<string, string>()
    const gScore = new Map<string, number>()
    gScore.set(start, 0)
    const fScore = new Map<string, number>()
    fScore.set(start, 0)
    const visited = new Set<string>()

    let foundEndKey: string | null = null
    let iterations = 0

    while (openSet.size > 0 && iterations < 5000) {
      iterations++
      let current = ''
      let lowestF = Infinity
      for (const node of openSet) {
        const score = fScore.get(node) ?? Infinity
        if (score < lowestF) { lowestF = score; current = node }
      }

      if (current === '') break

      if (targetPredicate(current)) {
        foundEndKey = current
        break
      }

      openSet.delete(current)
      visited.add(current)

      const currentPos = pointMap.get(current)
      const neighbors = graph.get(current)
      if (neighbors) {
        const shuffled = dice.shuffle(Array.from(neighbors))
        for (const neighbor of shuffled) {
          if (visited.has(neighbor)) continue

          const nPos = pointMap.get(neighbor)

          // Base distance cost
          let cost = Math.sqrt((nPos[0] - currentPos[0]) ** 2 + (nPos[1] - currentPos[1]) ** 2)

          // Heuristic/Directionality bias
          // If we have a preferred direction, reduce cost for moving in that direction
          if (preferredDir) {
            const dx = nPos[0] - currentPos[0]
            const dy = nPos[1] - currentPos[1]
            // Dot product
            const dot = dx * preferredDir[0] + dy * preferredDir[1]
            // If moving in preferred direction, dot is positive. 
            // We want to reduce cost.
            if (dot > 0) {
              cost *= 0.5 // discount forward movement
            } else {
              cost *= 1.5 // penalize backward movement
            }
          }

          const tentG = (gScore.get(current) ?? 0) + cost
          if (tentG < (gScore.get(neighbor) ?? Infinity)) {
            cameFrom.set(neighbor, current)
            gScore.set(neighbor, tentG)
            fScore.set(neighbor, tentG) // Use Dijkstra-ish with weight for path
            if (!openSet.has(neighbor)) openSet.add(neighbor)
          }
        }
      }
    }

    if (!foundEndKey) return null

    const path: [number, number][] = []
    let curr = foundEndKey
    while (curr) {
      path.unshift(pointMap.get(curr))
      curr = cameFrom.get(curr)
    }
    return path
  }

  for (let r = 0; r < riverCount; r++) {
    if (startCandidates.length === 0) break

    // 1. Pick Start
    const startKey = startCandidates[Math.floor(dice.random * startCandidates.length)]
    const startPos = pointMap.get(startKey)

    // 2. Path to Center
    // Determine general direction from start to center for biasing
    const centerPos = pointMap.get(centerKey)
    const dirToCenter: [number, number] = [centerPos[0] - startPos[0], centerPos[1] - startPos[1]]
    // Normalize
    const len = Math.sqrt(dirToCenter[0] ** 2 + dirToCenter[1] ** 2)
    dirToCenter[0] /= len; dirToCenter[1] /= len

    // Find path to reasonably close to center (e.g. within 200 units?)
    // Or exactly the center key? Exact key might be hard if graph is weird, but graph is connected.
    // Let's try exact center key.
    const path1 = findPath(startKey, (k) => k === centerKey, dirToCenter)

    if (!path1) continue

    // 3. Path from Center to End (Ocean or Opposite Side)
    // Continuation direction
    const dirFromCenter = dirToCenter // Continue same direction "through" city

    let path2: [number, number][] | null = null

    if (hasOcean) {
      // Find path to any coast
      path2 = findPath(centerKey, (k) => {
        const p = pointMap.get(k)
        return isCoast(p[0], p[1])
      }, dirFromCenter)
    } else {
      // Find path to boundary
      // Target should be far away from start?
      path2 = findPath(centerKey, (k) => {
        const p = pointMap.get(k)
        if (!isBoundary(p[0], p[1])) return false
        // Ensure it's not the start side?
        // Simple check: is distance from Start > width/2?
        const d = Math.sqrt((p[0] - startPos[0]) ** 2 + (p[1] - startPos[1]) ** 2)
        return d > Math.min(w, h) * 0.8
      }, dirFromCenter)
    }

    if (path2) {
      // Merge paths
      // Path1 ends at center, Path2 starts at center.
      // Remove duplicate center point
      const fullPath = [...path1, ...path2.slice(1)]
      rivers.push(fullPath)
    }
  }

  return rivers
}

// Helper to create a unique key for an edge, regardless of direction
const createEdgeKey = (p1: [number, number], p2: [number, number]): string => {
  // Sort points to normalize representation regardless of direction
  const sorted = [p1, p2].sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1]
    return a[0] - b[0]
  })
  return `${sorted[0][0]},${sorted[0][1]}-${sorted[1][0]},${sorted[1][1]}`
}

// Helper to find the nearest point in a collection
const findNearestPoint = (
  point: [number, number],
  points: Array<[number, number]>,
  usedIndices: Set<number>
): number => {
  let minDist = Infinity
  let nearestIdx = -1

  for (let i = 0; i < points.length; i++) {
    if (usedIndices.has(i)) continue

    const p = points[i]
    const dist = Math.sqrt((p[0] - point[0]) ** 2 + (p[1] - point[1]) ** 2)

    if (dist < minDist) {
      minDist = dist
      nearestIdx = i
    }
  }

  return nearestIdx
}

// Create an ordered path from a collection of wall edges
const createOrderedWallPath = (
  edges: Array<[[number, number], [number, number]]>
): Array<[number, number]> => {
  if (edges.length === 0) return []

  // Flatten all points and remove duplicates
  const allPoints: Array<[number, number]> = []
  const pointMap = new Map<string, number>() // Map from point key to index in allPoints

  edges.forEach(([p1, p2]) => {
    ;[p1, p2].forEach(p => {
      const key = `${p[0]},${p[1]}`
      if (!pointMap.has(key)) {
        pointMap.set(key, allPoints.length)
        allPoints.push(p)
      }
    })
  })

  // Build adjacency list for points
  const adjacencyList: Array<Array<number>> = Array.from(
    { length: allPoints.length },
    () => [] as Array<number>
  )

  edges.forEach(([p1, p2]) => {
    const idx1 = pointMap.get(`${p1[0]},${p1[1]}`)
    const idx2 = pointMap.get(`${p2[0]},${p2[1]}`)

    adjacencyList[idx1].push(idx2)
    adjacencyList[idx2].push(idx1)
  })

  // Find a starting point - prefer points with odd number of connections (endpoints)
  let startIndex = 0
  for (let i = 0; i < adjacencyList.length; i++) {
    if (adjacencyList[i].length % 2 === 1) {
      startIndex = i
      break
    }
  }

  // Create ordered path
  const orderedPoints: Array<[number, number]> = []
  const visited = new Set<number>()

  let currentIndex = startIndex
  orderedPoints.push(allPoints[currentIndex])
  visited.add(currentIndex)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Find unvisited neighbors
    const unvisitedNeighbors = adjacencyList[currentIndex].filter(idx => !visited.has(idx))

    if (unvisitedNeighbors.length === 0) {
      // If we have no unvisited neighbors, try to find another component
      const nextComponent = findNearestPoint(
        orderedPoints[orderedPoints.length - 1],
        allPoints,
        visited
      )

      if (nextComponent === -1) {
        // No more unvisited points
        break
      }

      // Add the next closest point
      currentIndex = nextComponent
      orderedPoints.push(allPoints[currentIndex])
      visited.add(currentIndex)
    } else {
      // Move to the next unvisited neighbor
      currentIndex = unvisitedNeighbors[0]
      orderedPoints.push(allPoints[currentIndex])
      visited.add(currentIndex)
    }
  }

  // Close the loop if possible
  if (orderedPoints.length > 2) {
    const first = orderedPoints[0]
    const last = orderedPoints[orderedPoints.length - 1]

    // If the first and last points are connected by an edge, add the first point again to close the loop
    const firstKey = `${first[0]},${first[1]}`
    const lastIdx = pointMap.get(`${last[0]},${last[1]}`)
    const neighbors = adjacencyList[lastIdx]

    const isConnected = neighbors.some(idx => {
      const point = allPoints[idx]
      return `${point[0]},${point[1]}` === firstKey
    })

    if (isConnected) {
      orderedPoints.push([first[0], first[1]])
    }
  }

  return orderedPoints
}

let map: Blueprint = null

export const BLUEPRINT = {
  spawn: () => {
    if (!map) {
      const dice = new Dice('test6')
      map = {
        seed: dice.generateId(),
        districts: {},
        density: dice.roll(7, 4, 2, false) * 15,
        population: 50e3,
        isCity: true,
        foreigners: true,
        regionalCapital: false,
        oceanDir: 'E',
        blocks: []
      }
      const totalDistricts = Math.max(1, Math.round(map.population / DISTRICT_SIZE))
      const cells = totalDistricts * 15
      const points = range(cells).map(
        () => [dice.random * dimensions.w, dice.random * dimensions.h] as [number, number]
      )
      const diagram = VORONOI.relaxed.planar({
        points,
        w: dimensions.w,
        h: dimensions.h,
        relaxation: 10
      })
      map.diagram = diagram
      // spawn blocks
      const blocks: Block[] = points.map((point, idx) => BLOCK.spawn({ idx, point, diagram, dice }))
      map.blocks = blocks
      // compute dimensions (miles)
      const sqMi = ((DISTRICT_SIZE / map.density) * blocks.length) / 259
      map.miles = sqMi ** 0.5
      // determine which cells are city districts
      const center = blocks[diagram.delaunay.find(dimensions.w * 0.5, dimensions.h * 0.5)]
      center.district = { idx: 1, path: BLOCK.curve(center.data) }
      const queue = [center]
      let count = center.district.idx
      while (queue.length > 0 && count < totalDistricts) {
        const curr = queue.shift()
        const prospects = curr.n
          .map(n => blocks[n])
          .filter(n => !n.district)
          .slice(0, totalDistricts - count)
        prospects.forEach(n => {
          n.district = { path: BLOCK.curve(n.data), idx: ++count }
        })
        queue.push(...prospects)
      }
      // generate buildings
      const districts = blocks
        .filter(({ district }) => district)
        .sort((a, b) => a.district.idx - b.district.idx)
      // classify districts (all mapping dice rolls need to be done at this point)

      const shrinkPolygon = (vertices: [number, number][], factor: number) => {
        const centroid = polygonCentroid(vertices)
        return vertices.map(([x, y]) => {
          return [
            centroid[0] + (x - centroid[0]) * factor,
            centroid[1] + (y - centroid[1]) * factor
          ] as [number, number]
        })
      }


      districts.forEach(district => {
        const { chaos, data, area } = district
        district.land = true
        const sides = data.map((_, i) => [data[i], data[i + 1]]).slice(0, -1)
        // split the district into smaller polygons to make buildings
        let blocks = BLOCK.subdivide({ sides, chaos, dice })

        // building area must be below some minimum
        let buildings = blocks.filter(b => b.area < area)
        let prospects = blocks.filter(b => !buildings.includes(b))
        // recursively split buildings until they are all below the min area
        while (prospects.length > 0) {
          let structures: Structure[] = []
          prospects.forEach(block => {
            blocks = BLOCK.subdivide({ sides: block.edges, chaos, dice })
            buildings = buildings.concat(blocks.filter(b => b.area < area))
            structures = structures.concat(blocks.filter(b => !buildings.includes(b)))
          })
          prospects = structures
        }

        // --- Plaza Logic ---
        // Allow any "internal" building (not on the district edge) to potentially become a plaza

        // Helper to check if two line segments are collinear and overlap
        const segmentsOverlap = (
          seg1: [[number, number], [number, number]],
          seg2: [[number, number], [number, number]]
        ): boolean => {
          const [p1, p2] = seg1
          const [p3, p4] = seg2

          const EPSILON = 0.01 // Tolerance for floating point comparison

          // Check if points are collinear using cross product
          const crossProduct = (a: [number, number], b: [number, number], c: [number, number]) => {
            return (b[1] - a[1]) * (c[0] - b[0]) - (b[0] - a[0]) * (c[1] - b[1])
          }

          // All four points must be collinear
          if (Math.abs(crossProduct(p1, p2, p3)) > EPSILON) return false
          if (Math.abs(crossProduct(p1, p2, p4)) > EPSILON) return false

          // Check if segments overlap by projecting onto the line
          // Use the dominant axis (larger delta) for projection
          const dx = Math.abs(p2[0] - p1[0])
          const dy = Math.abs(p2[1] - p1[1])
          const useX = dx > dy

          const getProjection = (p: [number, number]) => useX ? p[0] : p[1]

          const a1 = getProjection(p1)
          const a2 = getProjection(p2)
          const b1 = getProjection(p3)
          const b2 = getProjection(p4)

          const minA = Math.min(a1, a2)
          const maxA = Math.max(a1, a2)
          const minB = Math.min(b1, b2)
          const maxB = Math.max(b1, b2)

          // Check for meaningful overlap (not just touching at endpoints)
          // Require at least 1 unit of overlap to avoid false positives from shared vertices
          const overlapLength = Math.min(maxA, maxB) - Math.max(minA, minB)
          return overlapLength > 1.0 // Require at least 1 unit of actual overlap
        }

        // Helper to check if structure has any edge on the district boundary
        const isStructureOnDistrictEdge = (
          structureVertices: [number, number][],
          districtVertices: [number, number][]
        ): boolean => {
          // Build structure edges
          const structureEdges: [[number, number], [number, number]][] = []
          for (let i = 0; i < structureVertices.length; i++) {
            const p1 = structureVertices[i]
            const p2 = structureVertices[(i + 1) % structureVertices.length]
            structureEdges.push([p1, p2])
          }

          // Build district edges
          const districtEdges: [[number, number], [number, number]][] = []
          for (let i = 0; i < districtVertices.length; i++) {
            const p1 = districtVertices[i]
            const p2 = districtVertices[(i + 1) % districtVertices.length]
            districtEdges.push([p1, p2])
          }

          // Check if any structure edge overlaps with any district edge
          for (const structEdge of structureEdges) {
            for (const distEdge of districtEdges) {
              if (segmentsOverlap(structEdge, distEdge)) {
                return true
              }
            }
          }

          return false
        }

        const plazaChance = 0.05 // 5% chance for internal buildings to become plazas

        // Iterate backwards so we can splice safely? 
        // Or just filter. Filtering is easier but we want to Mutate `buildings` array or create new one.
        // Let's filter to keep buildings that are NOT plazas.

        buildings = buildings.filter(b => {
          // Check if structure has any edge on the district boundary
          const isEdge = isStructureOnDistrictEdge(b.vertices, data)
            ; (b as unknown as Structure).isDistrictEdge = isEdge

          if (!isEdge) {
            // It is internal. Roll for plaza.
            if (dice.random < plazaChance) {
              return false // Remove it (it becomes a plaza)
            }
          }
          return true // Keep it
        })

        // --- Shrinking Logic ---
        // Shrink buildings to create gaps/streets
        buildings.forEach(b => {
          // Shrink by a factor, e.g. 0.8 to create visible gaps
          // Use a slightly random factor for variety?
          const shrinkFactor = dice.uniform(0.7, 0.9)
          b.vertices = shrinkPolygon(b.vertices, shrinkFactor)
          b.path = BLOCK.curve(b.vertices)
        })

        district.structures = buildings
      })
      // classify districts (all mapping dice rolls need to be done at this point)
      DISTRICT.spawn({ map, districts, blocks })
      // determine ocean cells
      placeOcean({ map, blocks, dice })
      // calculate wall points
      map.wall = calculateWallPoints({ map, blocks })
      // generate rivers
      map.rivers = generateRivers({ map, blocks, dice })
    }
    return map
  }
}
