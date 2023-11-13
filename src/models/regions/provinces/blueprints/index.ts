import { polygonArea, polygonCentroid, range, scaleLinear } from 'd3'
import { Delaunay, Voronoi } from 'd3-delaunay'

import { LANGUAGE } from '../../../npcs/languages'
import { MATH } from '../../../utilities/math'
import { DICE } from '../../../utilities/math/dice'
import { POINT } from '../../../utilities/math/points'
import { VORONOI } from '../../../utilities/math/voronoi'
import { decorateText } from '../../../utilities/text/decoration'
import { CELL } from '../../../world/cells'
import { PROVINCE } from '..'
import { HUB } from '../hubs'
import { Hub } from '../hubs/types'
import { BUILDING } from './buildings'
import { district__admin } from './districts/admin'
import { district__craftsman } from './districts/craftsman'
import { district__docks } from './districts/docks'
import { district__gate } from './districts/gate'
import { district__market } from './districts/market'
import { district__merchant } from './districts/merchant'
import { district__military } from './districts/military'
import { district__noble } from './districts/noble'
import { district__rural } from './districts/rural'
import { district__slums } from './districts/slums'
import {
  Block,
  Blueprint,
  District,
  DistrictSpawnParams,
  DistrictTemplate,
  FindClosestBlockParams,
  FindExteriorDistrictsParams,
  PlaceDocksParams,
  PlaceGatesParams,
  PlaceRichDistrictParams,
  Structure
} from './types'

const curve = (points: [number, number][]) => 'M' + points.join('L') + 'Z'

const spawnBlock = (params: {
  idx: number
  point: [number, number]
  diagram: Voronoi<Delaunay.Point>
}): Block => {
  const { idx, point, diagram } = params
  const data = diagram.cellPolygon(idx)
  return {
    idx: params.idx,
    data: diagram.cellPolygon(idx),
    path: curve(data),
    x: point[0],
    y: point[1],
    n: Array.from(diagram.neighbors(idx)),
    area: Math.abs(polygonArea(data) / 30),
    chaos: window.dice.uniform(0, 0.3),
    structures: [],
    center: polygonCentroid(data)
  }
}

const sideLength = (side: [number, number][]) => {
  // get the first vertex
  const [s1X, s1Y] = side[0]
  // get the second vertex
  const [s2X, s2Y] = side[1]
  return Math.hypot(s1X - s2X, s1Y - s2Y)
}

const subdivide = (params: { sides: [number, number][][]; chaos: number }) => {
  const { sides, chaos } = params
  // list of new polygons
  const blocks: Structure[] = []
  const { side: longestSide } = sides.slice(1).reduce(
    (long, side) => {
      const len = sideLength(side)
      return len > long.length ? { side, length: len } : long
    },
    {
      side: sides[0],
      length: sideLength(sides[0])
    }
  )
  // first vertex of longest edge
  const [x1, y1] = longestSide[0]
  // second vertex of longest edge
  const [x2, y2] = longestSide[1]
  // random offset from midpoint (creates less organized streets)
  const r = window.dice.uniform(0.5 - chaos, 0.5 + chaos)
  // compute (semi-) midpoint delta with offset
  const [dx, dy] = [(x2 - x1) * r, (y2 - y1) * r]
  // find the 'midpoints'
  const [mx, my] = [x1 + dx, y1 + dy]
  // get the slope of the two vertices
  const slope = (y2 - y1) / (x2 - x1)
  // offset the slope randomly (creates less organized streets)
  // find the negative reciprocal to get the perpendicular slope
  const a = (-1 / slope) * window.dice.uniform(1 - chaos, 1 + chaos)
  // get the y-intercept using the new slope
  const c = my - a * mx
  // find the point that meets the perpendicular slope to split the polygon
  let [ox, oy] = [0, 0]
  let otherSide: Array<[number, number]> = [
    [0, 0],
    [0, 0]
  ]
  sides.forEach(side => {
    // get the points on the other side
    // get the first vertex
    const [s1X, s1Y] = side[0]
    // get the second vertex
    const [s2X, s2Y] = side[1]
    // determine the slope of the other side
    const b = (s2Y - s1Y) / (s2X - s1X)
    // get the y-intercept of the other side
    const d = s1Y - b * s1X
    // if the lines aren't parallel
    if (a !== b && side !== longestSide) {
      // if the intersect point is on the other side we are done
      const ix = (d - c) / (a - b)
      const iy = a * ix + c
      const case1 = (s1X <= ix && ix <= s2X) || (s1X >= ix && ix >= s2X)
      const case2 = (s1Y <= iy && iy <= s2Y) || (s1Y >= iy && iy >= s2Y)
      if (case1 || case2) {
        ox = ix
        oy = iy
        otherSide = side
      }
    }
  })

  // add the split points to the side list
  sides.push([[mx, my], longestSide[0]])
  sides.push([[mx, my], longestSide[1]])
  sides.push([[ox, oy], otherSide[0]])
  sides.push([[ox, oy], otherSide[1]])
  // loop through each point on the other side
  otherSide.forEach(point => {
    const end = [mx, my] as [number, number]
    let current = point
    const edges: Array<Array<[number, number]>> = [
      [end, [ox, oy]],
      [[ox, oy], current]
    ]
    const vertices: Array<[number, number]> = [end, [ox, oy], current]
    const group = sides.filter(s => s !== longestSide && s !== otherSide)
    // start from one end and find the new polygon edges
    while (!POINT.sameEdge(end, current)) {
      let idx = 0
      const past = current
      for (let i = 0; i < group.length; i++) {
        const edge = group[i]
        if (POINT.sameEdge(edge[0], current) || POINT.sameEdge(edge[1], current)) {
          // the next edge connects to the current edge
          current = POINT.sameEdge(edge[0], current) ? edge[1] : edge[0]
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

const placeOcean = (params: { settlement: Hub; blocks: Block[] }) => {
  const { settlement, blocks } = params
  const exterior = BLUEPRINT.districts.exteriors({ settlement, blocks })
  const docks = exterior
    .filter(district => district.dock !== undefined)
    .map(district => blocks[district.dock])
  docks.forEach(dock => {
    dock.land = false
  })
  const gates = exterior
    .filter(district => district.gate !== undefined)
    .map(district => blocks[district.gate])
  gates.forEach(gate => {
    gate.land = true
  })
  const queue = window.dice.shuffle(docks.concat(gates))
  while (queue.length > 0) {
    const curr = queue.shift()
    const next = curr.n.map(n => blocks[n]).filter(block => block.land === undefined)
    next.forEach(block => {
      block.land = curr.land
    })
    queue.push(...next)
  }
}

export const districts: Record<District['type'], DistrictTemplate> = {
  administration: district__admin,
  noble: district__noble,
  merchant: district__merchant,
  craftsman: district__craftsman,
  market: district__market,
  military: district__military,
  gate: district__gate,
  docks: district__docks,
  slums: district__slums,
  rural: district__rural
}

const waterDir = {
  E: (w: number, h: number) => [w, h / 2],
  W: (_: number, h: number) => [0, h / 2],
  N: (w: number) => [w / 2, 0],
  S: (w: number, h: number) => [w / 2, h]
}

const spawn = ({ block, idx, type, culture }: DistrictSpawnParams): District => {
  return {
    block,
    idx,
    name: LANGUAGE.word.unique({ lang: culture.language, key: 'district' }),
    type,
    buildings: []
  }
}

const richDistricts = ({ spread, cityDistricts, culture }: PlaceRichDistrictParams) => {
  const admin: District[] =
    spread * 0.1 > 1
      ? cityDistricts.splice(0, 1).map(({ district, idx }) =>
          spawn({
            block: idx,
            idx: district.idx,
            type: 'administration',
            culture
          })
        )
      : []
  const noble: District[] = cityDistricts
    .splice(0, Math.floor(spread * 0.05))
    .map(({ district, idx }) =>
      spawn({
        block: idx,
        idx: district.idx,
        type: 'noble',
        culture
      })
    )
  // place middle class
  const merchant: District[] = cityDistricts
    .splice(0, Math.floor(spread * 0.1))
    .map(({ district, idx }) =>
      spawn({
        block: idx,
        idx: district.idx,
        type: 'merchant',
        culture
      })
    )
  return [...admin, ...noble, ...merchant]
}

const placeDocks = ({ spread, blocks, settlement }: PlaceDocksParams) => {
  const exterior = BLUEPRINT.districts.exteriors({ settlement, blocks })
  const cell = window.world.cells[settlement.cell]
  // place docks
  const ocean = CELL.neighbors(cell).filter(n => n.isWater)
  if (ocean.length > 0 && settlement.coastal) {
    const dir = POINT.direction.geo(cell, settlement)
    const [x, y] = waterDir[dir](BLUEPRINT.dimensions.w, BLUEPRINT.dimensions.h)
    const water = { x, y }
    exterior
      .sort((a, b) => {
        return (
          POINT.distance.euclidean({ points: [blocks[a.block], water] }) -
          POINT.distance.euclidean({ points: [blocks[b.block], water] })
        )
      })
      .slice(0, Math.max(1, Math.floor(exterior.length * 0.3)))
      .forEach(district => {
        const prospects = blocks[district.block].n.map(i => blocks[i]).filter(i => !i.district)
        if (spread > 4) {
          district.type = 'docks'
          district.dock = window.dice.choice(prospects).idx
        } else {
          const closest = BLUEPRINT.districts.findClosestBlock({ blocks: prospects, point: water })
          district.dock = closest.idx
        }
      })
  }
}

const placeGates = ({ spread, blocks, settlement }: PlaceGatesParams) => {
  const cell = window.world.cells[settlement.cell]
  const ocean = CELL.neighbors(cell).filter(n => n.isWater)
  const dir =
    ocean.length > 0
      ? MATH.direction.opposite(POINT.direction.geo(cell, settlement))
      : window.dice.direction()
  const [x, y] = waterDir[dir](BLUEPRINT.dimensions.w, BLUEPRINT.dimensions.h)
  const exterior = BLUEPRINT.districts
    .exteriors({ settlement, blocks })
    .filter(({ dock }) => dock === undefined || spread === 1)
  const large = spread > 4
  exterior.forEach(({ block: _i, idx }) => {
    const block = blocks[_i]
    const valid = block.n
      .map(i => blocks[i])
      .filter(({ district }) => settlement.map.districts[district?.idx])
      .every(({ district }) => {
        const spawned = settlement.map.districts[district.idx]
        return (spawned.dock === undefined || !large) && spawned.gate === undefined
      })
    if (valid) {
      const prospects = block.n.map(i => blocks[i]).filter(i => !i.district)
      if (large) {
        settlement.map.districts[idx].type = 'gate'
        settlement.map.districts[idx].gate = window.dice.choice(prospects).idx
      } else {
        const closest = BLUEPRINT.districts.findClosestBlock({ blocks: prospects, point: { x, y } })
        settlement.map.districts[idx].gate = closest.idx
      }
    }
  })
}

const blueprints: Record<number, Blueprint> = {}

export const BLUEPRINT = {
  dimensions: { h: 440, w: 440 },
  districts: {
    cutoff: (districts: number) =>
      scaleLinear([1, 3, 4, 11, 12, 25, 26, 200], [3, 3, 5, 5, 6, 6, 8, 8])(districts),
    decorate: ({ type, affix }: District) =>
      affix ? decorateText({ label: type, tooltip: affix }) : type,
    exteriors: ({ settlement, blocks }: FindExteriorDistrictsParams) => {
      return Object.values(settlement.map.districts).filter(district =>
        blocks[district.block].n.some(n => !blocks[n].district)
      )
    },
    findClosestBlock: ({ blocks, point }: FindClosestBlockParams) => {
      return blocks.slice(1).reduce(
        (closest, block) => {
          const dist = POINT.distance.euclidean({ points: [block, point] })
          return dist < closest.dist ? { block, dist } : closest
        },
        { block: blocks[0], dist: POINT.distance.euclidean({ points: [blocks[0], point] }) }
      ).block
    },
    size: 1000,
    spawn: (params: { settlement: Hub; districts: Block[]; blocks: Block[] }) => {
      const { settlement, blocks } = params
      const cityDistricts = params.districts
      const { local } = PROVINCE.cultures(HUB.province(settlement))
      const culture = window.world.cultures[local.culture]
      const province = HUB.province(settlement)
      const spread = cityDistricts.length
      // upper class
      const upper = richDistricts({ spread, cityDistricts: cityDistricts, culture })
      // middle class
      const craftsman: District[] = cityDistricts
        .splice(0, Math.floor(spread * 0.4))
        .map(({ district, idx }) =>
          spawn({
            block: idx,
            idx: district.idx,
            type: 'craftsman',
            culture
          })
        )
      window.dice
        .shuffle(craftsman)
        .slice(0, Math.floor(craftsman.length * 0.25))
        .forEach(district => {
          district.type = 'market'
        })
      // lower class
      const city = HUB.city(settlement)
      const poor: District[] = cityDistricts.map(({ district, idx }) =>
        spawn({
          block: idx,
          idx: district.idx,
          type: city ? 'slums' : 'rural',
          culture
        })
      )
      // assign districts
      settlement.map.districts = [...upper, ...craftsman, ...poor]
        .sort((a, b) => a.idx - b.idx)
        .reduce((dict: Record<number, District>, district) => {
          dict[district.idx] = district
          return dict
        }, {})
      // place entrances
      placeDocks({ spread, blocks, settlement })
      placeGates({ spread, cityDistricts, blocks, settlement })
      // place flavor districts
      const craftsmanFlavor = 1 - craftsman.length / 40
      if (city && window.dice.random > craftsmanFlavor) {
        const military = window.dice.shuffle(craftsman).find(c => c.type === 'craftsman')
        if (military) military.type = 'military'
      }
      // place foreign districts
      const { common } = PROVINCE.demographics(province)
      const foreigners = 1 - common.find(d => d.v === local.culture)?.v
      if (foreigners > 0.1) {
        const foreignCraftsman = window.dice.shuffle(
          Object.values(settlement.map.districts).filter(({ type }) => type === 'craftsman')
        )
        foreignCraftsman.slice(0, Math.floor(foreignCraftsman.length / 4)).forEach(district => {
          district.affix = 'foreign'
        })
        const foreignSlums = window.dice.shuffle(
          Object.values(settlement.map.districts).filter(({ type }) => type === 'slums')
        )
        foreignSlums.slice(0, Math.floor(foreignSlums.length / 3)).forEach(district => {
          district.affix = 'foreign'
        })
      }
      // place hazard districts
      if (spread > 4) {
        const nonHazards: District['type'][] = ['administration', 'noble']
        const hazard = window.dice
          .shuffle(Object.values(settlement.map.districts))
          .find(
            ({ type, affix, idx }) =>
              idx !== 1 && !affix && !nonHazards.includes(type) && window.dice.random > 0.99
          )
        if (hazard) hazard.affix = 'hazardous'
      }
      // place buildings
      let buildingIdx = 1
      Object.values(settlement.map.districts).forEach(district => {
        const template = districts[district.type]
        const districtBlock = blocks[district.block]
        district.buildings = window.dice
          .sample(blocks[district.block].structures, 10)
          .map(({ vertices }) => {
            const [x, y] = polygonCentroid(vertices)
            const grade = window.dice.weightedChoice(template.quality)
            return {
              idx: buildingIdx++,
              x,
              y,
              type: window.dice.weightedChoice(template.buildings),
              quality: { grade, desc: BUILDING.quality(grade) }
            }
          })
        if (district.dock !== undefined) {
          BUILDING.edge({
            block: districtBlock,
            ref: blocks[district.dock],
            district,
            type: 'docks',
            quality: template.quality
          })
        }
        if (district.gate !== undefined) {
          BUILDING.edge({
            block: districtBlock,
            ref: blocks[district.gate],
            district,
            type: 'gates',
            quality: template.quality
          })
        }
        if (district.idx === 1) {
          const {
            center: [cx, cy]
          } = districtBlock
          const closest = BUILDING.findClosest({
            buildings: district.buildings.filter(
              ({ type }) => type !== 'docks' && type !== 'gates'
            ),
            point: { x: cx, y: cy }
          })
          if (closest) {
            const capital = province.capital
            closest.type = city ? (capital ? 'royal palace' : "lord's keep") : "lord's manor"
            const grade = city ? 'A' : 'B'
            closest.quality = { grade, desc: BUILDING.quality(grade) }
          }
        }
      })
    }
  },
  get: (idx: number) => {
    const settlement = window.world.provinces[idx].hub
    settlement.map ??= {
      seed: window.dice.generateId(),
      districts: {},
      density: window.dice.roll(7, 4, 2, false) * 15
    }
    if (!blueprints[idx])
      blueprints[idx] = DICE.swap(settlement.map.seed, () => {
        const dimensions = BLUEPRINT.dimensions
        const totalDistricts = Math.max(
          1,
          Math.round(settlement.population / BLUEPRINT.districts.size)
        )
        const cells = totalDistricts * 15
        const points = range(cells).map(
          () =>
            [window.dice.random * dimensions.w, window.dice.random * dimensions.h] as [
              number,
              number
            ]
        )
        const diagram = VORONOI.relaxed.planar({
          points,
          w: dimensions.w,
          h: dimensions.h,
          relaxation: 10
        })
        const blocks: Block[] = points.map((point, idx) => spawnBlock({ idx, point, diagram }))
        // determine which cells are city districts
        const center = blocks[diagram.delaunay.find(dimensions.w * 0.5, dimensions.h * 0.5)]
        center.district = { idx: 1, path: curve(center.data) }
        const queue = [center]
        let count = center.district.idx
        while (queue.length > 0 && count < totalDistricts) {
          const curr = queue.shift()
          const prospects = curr.n
            .map(n => blocks[n])
            .filter(n => !n.district)
            .slice(0, totalDistricts - count)
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
          let blocks = subdivide({ sides, chaos })
          // building area must be below some minimum
          let buildings = blocks.filter(b => b.area < area)
          let prospects = blocks.filter(b => !buildings.includes(b))
          // recursively split buildings until they are all below the min area
          while (prospects.length > 0) {
            let structures: Structure[] = []
            prospects.forEach(block => {
              blocks = subdivide({ sides: block.edges, chaos })
              buildings = buildings.concat(blocks.filter(b => b.area < area))
              structures = structures.concat(blocks.filter(b => !buildings.includes(b)))
            })
            prospects = structures
          }
          district.structures = buildings
        })
        // classify districts (all mapping dice rolls need to be done at this point)
        if (Object.keys(settlement.map.districts).length === 0) {
          BLUEPRINT.districts.spawn({ settlement, districts, blocks })
        }
        // determine ocean cells
        placeOcean({ settlement, blocks })
        // compute dimensions (miles)
        const sqMi = ((BLUEPRINT.districts.size / settlement.map.density) * blocks.length) / 259
        const miles = sqMi ** 0.5
        return { diagram, blocks, miles, districts: settlement.map.districts }
      })
    return blueprints[idx]
  }
}
