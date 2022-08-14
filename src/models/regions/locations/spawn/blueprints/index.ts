import { Delaunay, polygonArea, polygonCentroid, range, Voronoi } from 'd3'

import { Dice } from '../../../../utilities/math/dice'
import { same_edge, voronoi__relaxed } from '../../../../utilities/math/points'
import { memoize } from '../../../../utilities/performance/memoization'
import { cell__spawn } from '../../../../world/cells'
import { location__get_closest_settlement } from '../..'
import { Loc } from '../../types'
import { districts__exterior } from './districts'
import { districts__spawn } from './districts/spawn'
import { Block, settlement__dimensions, Structure } from './districts/types'

const dimensions = settlement__dimensions
const settlement__district_size = 1000

const curve = (points: [number, number][]) => 'M' + points.join('L') + 'Z'

const spawn_block = (params: {
  idx: number
  point: [number, number]
  diagram: Voronoi<Delaunay.Point>
  dice: Dice
}): Block => {
  const { idx, point, diagram, dice } = params
  const cell = cell__spawn({ idx, point, diagram })
  return {
    idx: params.idx,
    data: cell.data,
    path: curve(cell.data),
    x: cell.x,
    y: cell.y,
    n: cell.n,
    area: Math.abs(polygonArea(cell.data) / 30),
    chaos: dice.uniform(0, 0.3),
    structures: [],
    center: polygonCentroid(cell.data)
  }
}

const side_length = (side: [number, number][]) => {
  // get the first vertex
  const [s1_x, s1_y] = side[0]
  // get the second vertex
  const [s2_x, s2_y] = side[1]
  return Math.hypot(s1_x - s2_x, s1_y - s2_y)
}

const subdivide = (params: { sides: [number, number][][]; chaos: number; dice: Dice }) => {
  const { sides, chaos, dice } = params
  // list of new polygons
  const blocks: Structure[] = []
  const { side: longest_side } = sides.slice(1).reduce(
    (long, side) => {
      const len = side_length(side)
      return len > long.length ? { side, length: len } : long
    },
    {
      side: sides[0],
      length: side_length(sides[0])
    }
  )
  // first vertex of longest edge
  const [x1, y1] = longest_side[0]
  // second vertex of longest edge
  const [x2, y2] = longest_side[1]
  // random offset from midpoint (creates less organized streets)
  const r = dice.uniform(0.5 - chaos, 0.5 + chaos)
  // compute (semi-) midpoint delta with offset
  const [dx, dy] = [(x2 - x1) * r, (y2 - y1) * r]
  // find the 'midpoints'
  const [mx, my] = [x1 + dx, y1 + dy]
  // get the slope of the two vertices
  const slope = (y2 - y1) / (x2 - x1)
  // offset the slope randomly (creates less organized streets)
  // find the negative reciprocal to get the perpendicular slope
  const a = (-1 / slope) * dice.uniform(1 - chaos, 1 + chaos)
  // get the y-intercept using the new slope
  const c = my - a * mx
  // find the point that meets the perpendicular slope to split the polygon
  let [ox, oy] = [0, 0]
  let other_side: Array<[number, number]> = [
    [0, 0],
    [0, 0]
  ]
  sides.forEach(side => {
    // get the points on the other side
    // get the first vertex
    const [s1_x, s1_y] = side[0]
    // get the second vertex
    const [s2_x, s2_y] = side[1]
    // determine the slope of the other side
    const b = (s2_y - s1_y) / (s2_x - s1_x)
    // get the y-intercept of the other side
    const d = s1_y - b * s1_x
    // if the lines aren't parallel
    if (a !== b && side !== longest_side) {
      // if the intersect point is on the other side we are done
      const ix = (d - c) / (a - b)
      const iy = a * ix + c
      const case1 = (s1_x <= ix && ix <= s2_x) || (s1_x >= ix && ix >= s2_x)
      const case2 = (s1_y <= iy && iy <= s2_y) || (s1_y >= iy && iy >= s2_y)
      if (case1 || case2) {
        ox = ix
        oy = iy
        other_side = side
      }
    }
  })

  // add the split points to the side list
  sides.push([[mx, my], longest_side[0]])
  sides.push([[mx, my], longest_side[1]])
  sides.push([[ox, oy], other_side[0]])
  sides.push([[ox, oy], other_side[1]])
  // loop through each point on the other side
  other_side.forEach(point => {
    const end = [mx, my] as [number, number]
    let current = point
    const edges: Array<Array<[number, number]>> = [
      [end, [ox, oy]],
      [[ox, oy], current]
    ]
    const vertices: Array<[number, number]> = [end, [ox, oy], current]
    const group = sides.filter(s => s !== longest_side && s !== other_side)
    // start from one end and find the new polygon edges
    while (!same_edge(end, current)) {
      let idx = 0
      const past = current
      for (let i = 0; i < group.length; i++) {
        const edge = group[i]
        if (same_edge(edge[0], current) || same_edge(edge[1], current)) {
          // the next edge connects to the current edge
          current = same_edge(edge[0], current) ? edge[1] : edge[0]
          idx = i
          break
        }
      }
      edges.push([past, current])
      vertices.push(current)
      group.splice(idx, 1)
    }
    const area = Math.abs(polygonArea(vertices))
    blocks.push({ path: curve(vertices), edges, area, vertices, center: polygonCentroid(vertices) })
  })
  return blocks
}

const place_ocean = (params: { settlement: Loc; blocks: Block[]; dice: Dice }) => {
  const { settlement, blocks, dice } = params
  const used = new Set<number>()
  const exterior = districts__exterior({ settlement, blocks })
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

const blueprint = (settlement: Loc) => {
  settlement.map ??= {
    seed: window.dice.generate_id(),
    districts: {},
    density: window.dice.roll(7, 4, 2, false) * 15
  }
  const dice = new Dice(settlement.map.seed)
  const total_districts = Math.max(1, Math.round(settlement.population / settlement__district_size))
  const cells = total_districts * 15
  const points = range(cells).map(
    () => [dice.random * dimensions.w, dice.random * dimensions.h] as [number, number]
  )
  const diagram = voronoi__relaxed({ points, w: dimensions.w, h: dimensions.h, relaxation: 10 })
  const blocks: Block[] = points.map((point, idx) => spawn_block({ idx, point, diagram, dice }))
  // determine which cells are city districts
  const center = blocks[diagram.delaunay.find(dimensions.w * 0.5, dimensions.h * 0.5)]
  center.district = { idx: 1, path: curve(center.data) }
  const queue = [center]
  let count = center.district.idx
  while (queue.length > 0 && count < total_districts) {
    const curr = queue.shift()
    const prospects = curr.n
      .map(n => blocks[n])
      .filter(n => !n.district)
      .slice(0, total_districts - count)
    prospects.forEach(n => {
      n.district = { path: curve(n.data), idx: ++count }
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
    let blocks = subdivide({ sides, chaos, dice })
    // building area must be below some minimum
    let buildings = blocks.filter(b => b.area < area)
    let prospects = blocks.filter(b => !buildings.includes(b))
    // recursively split buildings until they are all below the min area
    while (prospects.length > 0) {
      let structures: Structure[] = []
      prospects.forEach(block => {
        blocks = subdivide({ sides: block.edges, chaos, dice })
        buildings = buildings.concat(blocks.filter(b => b.area < area))
        structures = structures.concat(blocks.filter(b => !buildings.includes(b)))
      })
      prospects = structures
    }
    district.structures = buildings
  })
  // classify districts (all mapping dice rolls need to be done at this point)
  if (Object.keys(settlement.map.districts).length === 0) {
    districts__spawn({ settlement, districts, blocks })
  }
  // determine ocean cells
  place_ocean({ settlement, blocks, dice })
  // compute dimensions (miles)
  const sq_mi = ((settlement__district_size / settlement.map.density) * blocks.length) / 259
  const miles = sq_mi ** 0.5
  return { diagram, blocks, miles }
}

export const settlement__blueprint = memoize(blueprint, {
  store: (): Record<number, ReturnType<typeof blueprint>> => ({}),
  get: (cache, loc) => {
    const city = location__get_closest_settlement(loc)
    return cache[city.idx]
  },
  set: (cache, res, city) => {
    cache[city.idx] = res
  }
})
