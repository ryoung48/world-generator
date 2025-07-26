import { polygonCentroid } from 'd3'

import { MATH } from '../../../../models/utilities/math'
import { Dice } from '../../../../models/utilities/math/dice'
import { POINT } from '../../../../models/utilities/math/points'
import { Point } from '../../../../models/utilities/math/points/types'
import { Block } from '../blocks/types'
import { BUILDING } from '../buildings'
import { BLUEPRINT_CONSTANTS } from '../constants'
import { Blueprint } from '../types'
import { ADMIN } from './templates/admin'
import { CRAFTSMAN } from './templates/craftsman'
import { DOCKS } from './templates/docks'
import { GATE } from './templates/gate'
import { MARKET } from './templates/market'
import { MERCHANT } from './templates/merchant'
import { MILITARY } from './templates/military'
import { NOBLE } from './templates/noble'
import { RURAL } from './templates/rural'
import { SLUMS } from './templates/slums'
import { District, DistrictTemplate } from './types'

const dimensions = BLUEPRINT_CONSTANTS.dimensions

const templates: Record<District['type'], DistrictTemplate> = {
  administration: ADMIN,
  craftsman: CRAFTSMAN,
  docks: DOCKS,
  gate: GATE,
  market: MARKET,
  merchant: MERCHANT,
  military: MILITARY,
  noble: NOBLE,
  rural: RURAL,
  slums: SLUMS
}

const mappingDir = {
  E: (w: number, h: number) => [w, h / 2],
  W: (_: number, h: number) => [0, h / 2],
  N: (w: number) => [w / 2, 0],
  S: (w: number, h: number) => [w / 2, h]
}

const createDistrict = (params: {
  block: number
  idx: number
  type: District['type']
}): District => {
  const { block, idx, type } = params
  return {
    block,
    idx,
    name: '',
    type,
    buildings: []
  }
}

const findClosestBlock = (params: { blocks: Block[]; point: Point }) => {
  const { blocks, point } = params
  return blocks.slice(1).reduce(
    (closest, block) => {
      const dist = POINT.distance.euclidean({ points: [block, point] })
      return dist < closest.dist ? { block, dist } : closest
    },
    { block: blocks[0], dist: POINT.distance.euclidean({ points: [blocks[0], point] }) }
  ).block
}

const spawnRichDistricts = (params: { spread: number; cityDistricts: Block[] }) => {
  const { spread, cityDistricts } = params
  const admin: District[] =
    spread * 0.1 > 1
      ? cityDistricts.splice(0, 1).map(({ district, idx }) =>
          createDistrict({
            block: idx,
            idx: district.idx,
            type: 'administration'
          })
        )
      : []
  const noble: District[] = cityDistricts
    .splice(0, Math.floor(spread * 0.05))
    .map(({ district, idx }) =>
      createDistrict({
        block: idx,
        idx: district.idx,
        type: 'noble'
      })
    )
  // place middle class
  const merchant: District[] = cityDistricts
    .splice(0, Math.floor(spread * 0.1))
    .map(({ district, idx }) =>
      createDistrict({
        block: idx,
        idx: district.idx,
        type: 'merchant'
      })
    )
  return [...admin, ...noble, ...merchant]
}

const placeDocks = (params: {
  spread: number
  cityDistricts: Block[]
  blocks: Block[]
  map: Blueprint
}) => {
  const { spread, blocks, map } = params
  const exterior = DISTRICT.exterior({ map, blocks })
  // place docks
  if (map.oceanDir) {
    const [x, y] = mappingDir[map.oceanDir](dimensions.w, dimensions.h)
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
          const closest = findClosestBlock({ blocks: prospects, point: water })
          district.dock = closest.idx
        }
      })
  }
}

const placeGates = (params: {
  spread: number
  cityDistricts: Block[]
  blocks: Block[]
  map: Blueprint
}) => {
  const { spread, blocks, map } = params
  const dir = map.oceanDir ? POINT.direction.opposite[map.oceanDir] : POINT.direction.random()
  const [x, y] = mappingDir[dir](dimensions.w, dimensions.h)
  const exterior = DISTRICT.exterior({ map, blocks }).filter(
    ({ dock }) => dock === undefined || spread === 1
  )
  const large = spread > 4
  exterior.forEach(({ block: blockIdx, idx }) => {
    const block = blocks[blockIdx]
    const valid = block.n
      .map(i => blocks[i])
      .filter(({ district }) => map.districts[district?.idx])
      .every(({ district }) => {
        const spawned = map.districts[district.idx]
        return (spawned.dock === undefined || !large) && spawned.gate === undefined
      })
    if (valid) {
      const prospects = block.n.map(i => blocks[i]).filter(i => !i.district)
      if (large) {
        map.districts[idx].type = 'gate'
        map.districts[idx].gate = window.dice.choice(prospects).idx
      } else {
        const closest = findClosestBlock({ blocks: prospects, point: { x, y } })
        map.districts[idx].gate = closest.idx
      }
    }
  })
}

export const DISTRICT = {
  cutoff: ({ count }: { count: number }): number => {
    return MATH.scale([1, 3, 4, 11, 12, 25, 26, 200], [3, 3, 5, 5, 6, 6, 8, 8], count)
  },
  exterior: ({ map, blocks }: { map: Blueprint; blocks: Block[] }): District[] => {
    return Object.values(map.districts).filter(district =>
      blocks[district.block].n.some(n => !blocks[n].district)
    )
  },
  spawn: (params: { map: Blueprint; districts: Block[]; blocks: Block[] }) => {
    const { map, blocks } = params
    const dice = new Dice(map.seed)
    const cityDistricts = params.districts
    const spread = cityDistricts.length
    // upper class
    const upper = spawnRichDistricts({ spread, cityDistricts })
    // middle class
    const craftsman: District[] = cityDistricts
      .splice(0, Math.floor(spread * 0.4))
      .map(({ district, idx }) =>
        createDistrict({
          block: idx,
          idx: district.idx,
          type: 'craftsman'
        })
      )
    window.dice
      .shuffle(craftsman)
      .slice(0, Math.floor(craftsman.length * 0.25))
      .forEach(district => {
        district.type = 'market'
      })
    // lower class
    const isCity = map.isCity
    const poor: District[] = cityDistricts.map(({ district, idx }) =>
      createDistrict({
        block: idx,
        idx: district.idx,
        type: isCity ? 'slums' : 'rural'
      })
    )
    // assign districts
    map.districts = [...upper, ...craftsman, ...poor]
      .sort((a, b) => a.idx - b.idx)
      .reduce((dict: Record<number, District>, district) => {
        dict[district.idx] = district
        return dict
      }, {})
    // place entrances
    placeDocks({ spread, cityDistricts, blocks, map })
    placeGates({ spread, cityDistricts, blocks, map })
    // place flavor districts
    const craftsmanFlavor = 1 - craftsman.length / 40
    if (isCity && window.dice.random > craftsmanFlavor) {
      const military = window.dice.shuffle(craftsman).find(c => c.type === 'craftsman')
      if (military) military.type = 'military'
    }
    // place foreign districts
    if (map.foreigners) {
      const foreignCraftsman = window.dice.shuffle(
        Object.values(map.districts).filter(({ type }) => type === 'craftsman')
      )
      foreignCraftsman.slice(0, Math.floor(foreignCraftsman.length / 4)).forEach(district => {
        district.affix = 'foreign'
      })
      const foreignSlums = window.dice.shuffle(
        Object.values(map.districts).filter(({ type }) => type === 'slums')
      )
      foreignSlums.slice(0, Math.floor(foreignSlums.length / 3)).forEach(district => {
        district.affix = 'foreign'
      })
    }
    // place hazard districts
    if (spread > 4) {
      const nonHazards: District['type'][] = ['administration', 'noble']
      const hazard = window.dice
        .shuffle(Object.values(map.districts))
        .find(
          ({ type, affix, idx }) =>
            idx !== 1 && !affix && !nonHazards.includes(type) && window.dice.random > 0.99
        )
      if (hazard) hazard.affix = 'hazardous'
    }
    // place buildings
    let buildingIdx = 1
    Object.values(map.districts).forEach(district => {
      const template = DISTRICT.templates[district.type]
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
            quality: { grade, desc: BUILDING.qualityDescription({ grade, dice }) }
          }
        })
      if (district.dock !== undefined) {
        BUILDING.edgeSpawn({
          districtBlock,
          refBlock: blocks[district.dock],
          district,
          type: 'docks',
          quality: template.quality,
          dice
        })
      }
      if (district.gate !== undefined) {
        BUILDING.edgeSpawn({
          districtBlock,
          refBlock: blocks[district.gate],
          district,
          type: 'gates',
          quality: template.quality,
          dice
        })
      }
      if (district.idx === 1) {
        const {
          center: [cx, cy]
        } = districtBlock
        const closest = BUILDING.closest({
          buildings: district.buildings.filter(({ type }) => type !== 'docks' && type !== 'gates'),
          point: { x: cx, y: cy }
        })
        if (closest) {
          closest.type = isCity
            ? map.regionalCapital
              ? 'royal palace'
              : "lord's keep"
            : "lord's manor"
          const grade = isCity ? 'A' : 'B'
          closest.quality = { grade, desc: BUILDING.qualityDescription({ grade, dice }) }
        }
      }
    })
  },
  templates
}
