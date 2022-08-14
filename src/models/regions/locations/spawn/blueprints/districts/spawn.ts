import { polygonCentroid } from 'd3'

import { Culture } from '../../../../../npcs/species/humanoids/cultures/types'
import { lang__unique_name } from '../../../../../npcs/species/humanoids/languages/words'
import {
  direction__opposite,
  direction__random,
  Point,
  point__distance,
  point_direction
} from '../../../../../utilities/math/points'
import { decorate_text } from '../../../../../utilities/text/decoration'
import { cell__neighbors } from '../../../../../world/cells'
import { location__culture, location__demographics } from '../../../actors/demographics'
import { Loc } from '../../../types'
import { location__is_city } from '../../taxonomy/settlements'
import { building__closest, building__edge_spawn, building__quality_desc } from '../buildings'
import { districts, districts__exterior } from '.'
import { Block, District, settlement__dimensions } from './types'

const dimensions = settlement__dimensions

const mapping_dir = {
  E: (w: number, h: number) => [w, h / 2],
  W: (_: number, h: number) => [0, h / 2],
  N: (w: number) => [w / 2, 0],
  S: (w: number, h: number) => [w / 2, h]
}

const district__spawn = (params: {
  block: number
  idx: number
  type: District['type']
  culture: Culture
}): District => {
  const { block, idx, type, culture } = params
  return {
    block,
    idx,
    name: lang__unique_name({ lang: culture.language, key: 'district' }),
    type,
    buildings: []
  }
}

const find_closest_block = (params: { blocks: Block[]; point: Point }) => {
  const { blocks, point } = params
  return blocks.slice(1).reduce(
    (closest, block) => {
      const dist = point__distance({ points: [block, point] })
      return dist < closest.dist ? { block, dist } : closest
    },
    { block: blocks[0], dist: point__distance({ points: [blocks[0], point] }) }
  ).block
}

const spawn_rich_districts = (params: {
  spread: number
  city_districts: Block[]
  culture: Culture
}) => {
  const { spread, city_districts, culture } = params
  const admin: District[] =
    spread * 0.1 > 1
      ? city_districts.splice(0, 1).map(({ district, idx }) =>
          district__spawn({
            block: idx,
            idx: district.idx,
            type: 'administration',
            culture
          })
        )
      : []
  const noble: District[] = city_districts
    .splice(0, Math.floor(spread * 0.05))
    .map(({ district, idx }) =>
      district__spawn({
        block: idx,
        idx: district.idx,
        type: 'noble',
        culture
      })
    )
  // place middle class
  const merchant: District[] = city_districts
    .splice(0, Math.floor(spread * 0.1))
    .map(({ district, idx }) =>
      district__spawn({
        block: idx,
        idx: district.idx,
        type: 'merchant',
        culture
      })
    )
  return [...admin, ...noble, ...merchant]
}

const place_docks = (params: {
  spread: number
  city_districts: Block[]
  blocks: Block[]
  settlement: Loc
}) => {
  const { spread, blocks, settlement } = params
  const exterior = districts__exterior({ settlement, blocks })
  const world_cell = window.world.cells[settlement.cell]
  // place docks
  const ocean = cell__neighbors(world_cell).filter(n => n.is_water)
  if (ocean.length > 0) {
    const dir = point_direction(world_cell, settlement)
    const [x, y] = mapping_dir[dir](dimensions.w, dimensions.h)
    const water = { x, y }
    exterior
      .sort((a, b) => {
        return (
          point__distance({ points: [blocks[a.block], water] }) -
          point__distance({ points: [blocks[b.block], water] })
        )
      })
      .slice(0, Math.max(1, Math.floor(exterior.length * 0.3)))
      .forEach(district => {
        const prospects = blocks[district.block].n.map(i => blocks[i]).filter(i => !i.district)
        if (spread > 4) {
          district.type = 'docks'
          district.dock = window.dice.choice(prospects).idx
        } else {
          const closest = find_closest_block({ blocks: prospects, point: water })
          district.dock = closest.idx
        }
      })
  }
}

const place_gates = (params: {
  spread: number
  city_districts: Block[]
  blocks: Block[]
  settlement: Loc
}) => {
  const { spread, blocks, settlement } = params
  const world_cell = window.world.cells[settlement.cell]
  const ocean = cell__neighbors(world_cell).filter(n => n.is_water)
  const dir =
    ocean.length > 0
      ? direction__opposite[point_direction(world_cell, settlement)]
      : direction__random()
  const [x, y] = mapping_dir[dir](dimensions.w, dimensions.h)
  const exterior = districts__exterior({ settlement, blocks }).filter(
    ({ dock }) => dock === undefined || spread === 1
  )
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
        const closest = find_closest_block({ blocks: prospects, point: { x, y } })
        settlement.map.districts[idx].gate = closest.idx
      }
    }
  })
}

export const districts__spawn = (params: {
  settlement: Loc
  districts: Block[]
  blocks: Block[]
}) => {
  const { settlement, blocks } = params
  const city_districts = params.districts
  const { local } = location__culture(settlement)
  const culture = window.world.cultures[local.culture.native]
  const spread = city_districts.length
  // upper class
  const upper = spawn_rich_districts({ spread, city_districts, culture })
  // middle class
  const craftsman: District[] = city_districts
    .splice(0, Math.floor(spread * 0.4))
    .map(({ district, idx }) =>
      district__spawn({
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
  const city = location__is_city(settlement)
  const poor: District[] = city_districts.map(({ district, idx }) =>
    district__spawn({
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
  place_docks({ spread, city_districts, blocks, settlement })
  place_gates({ spread, city_districts, blocks, settlement })
  // place flavor districts
  const craftsman_flavor = 1 - craftsman.length / 40
  if (city && window.dice.random > craftsman_flavor) {
    const military = window.dice.shuffle(craftsman).find(c => c.type === 'craftsman')
    if (military) military.type = 'military'
  }
  // place foreign districts
  const { common_cultures } = location__demographics(settlement)
  const foreigners = 1 - common_cultures[local.culture.native]
  if (foreigners > 0.1) {
    const foreign_craftsman = window.dice.shuffle(
      Object.values(settlement.map.districts).filter(({ type }) => type === 'craftsman')
    )
    foreign_craftsman.slice(0, Math.floor(foreign_craftsman.length / 4)).forEach(district => {
      district.affix = 'foreign'
    })
    const foreign_slums = window.dice.shuffle(
      Object.values(settlement.map.districts).filter(({ type }) => type === 'slums')
    )
    foreign_slums.slice(0, Math.floor(foreign_slums.length / 3)).forEach(district => {
      district.affix = 'foreign'
    })
  }
  // place hazard districts
  if (spread > 4) {
    const non_hazards: District['type'][] = ['administration', 'noble']
    const hazard = window.dice
      .shuffle(Object.values(settlement.map.districts))
      .find(
        ({ type, affix, idx }) =>
          idx !== 1 && !affix && !non_hazards.includes(type) && window.dice.random > 0.99
      )
    if (hazard) hazard.affix = 'hazardous'
  }
  // place buildings
  let building_idx = 1
  Object.values(settlement.map.districts).forEach(district => {
    const template = districts[district.type]
    const district_block = blocks[district.block]
    district.buildings = window.dice
      .sample(blocks[district.block].structures, 10)
      .map(({ vertices }) => {
        const [x, y] = polygonCentroid(vertices)
        const grade = window.dice.weighted_choice(template.quality)
        return {
          idx: building_idx++,
          x,
          y,
          type: window.dice.weighted_choice(template.buildings),
          quality: { grade, desc: building__quality_desc(grade) }
        }
      })
    if (district.dock !== undefined) {
      building__edge_spawn({
        district_block,
        ref_block: blocks[district.dock],
        district,
        type: 'docks',
        quality: template.quality
      })
    }
    if (district.gate !== undefined) {
      building__edge_spawn({
        district_block,
        ref_block: blocks[district.gate],
        district,
        type: 'gates',
        quality: template.quality
      })
    }
    if (district.idx === 1) {
      const {
        center: [cx, cy]
      } = district_block
      const closest = building__closest({
        buildings: district.buildings.filter(({ type }) => type !== 'docks' && type !== 'gates'),
        point: { x: cx, y: cy }
      })
      if (closest) {
        const { regional_capital } = window.world.provinces[settlement.province]
        closest.type = city ? (regional_capital ? 'royal palace' : "lord's keep") : "lord's manor"
        const grade = city ? 'A' : 'B'
        closest.quality = { grade, desc: building__quality_desc(grade) }
      }
    }
  })
}

export const district__decorated = ({ type, affix }: District) =>
  affix ? decorate_text({ label: type, tooltip: affix }) : type
