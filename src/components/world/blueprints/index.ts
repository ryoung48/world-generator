import { range } from 'd3'

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
      const dice = new Dice('test3')
      map = {
        seed: dice.generateId(),
        districts: {},
        density: dice.roll(7, 4, 2, false) * 15,
        population: 50e3,
        isCity: true,
        foreigners: true,
        regionalCapital: false,
        oceanDir: 'N',
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
        district.structures = buildings
      })
      // classify districts (all mapping dice rolls need to be done at this point)
      DISTRICT.spawn({ map, districts, blocks })
      // determine ocean cells
      placeOcean({ map, blocks, dice })
      // calculate wall points
      map.wall = calculateWallPoints({ map, blocks })
    }
    return map
  }
}
