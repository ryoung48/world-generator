import { build_distribution, distance, weighted_distribution } from '../../../../../utilities/math'
import { Point, point_on_edge, voronoi__common_edge } from '../../../../../utilities/math/points'
import { Block, District, DistrictTemplate } from '../districts/types'
import { Building } from './types'

export const building__closest = (params: { buildings: Building[]; point: Point }) => {
  const { buildings, point } = params
  if (buildings.length === 0) return false
  const { x: cx, y: cy } = point
  const { building } = buildings.slice(1).reduce(
    (closest, building) => {
      const dist = distance([cx, cy], [building.x, building.y])
      return dist > closest.dist ? closest : { dist, building }
    },
    {
      building: buildings[0],
      dist: distance([cx, cy], [buildings[0].x, buildings[0].y])
    }
  )
  return building
}

export const offices = (weight: number): weighted_distribution<Building['type']> => {
  const dist: weighted_distribution<Building['type']> = build_distribution(
    [
      { v: 'office (livestock merchant)', w: 0.2 },
      { v: 'office (carpenter)', w: 0.16 },
      { v: 'office (mason)', w: 0.11 },
      { v: 'office (pawnbroker)', w: 0.075 },
      { v: 'office (wine merchant)', w: 0.06 },
      { v: 'office (surgeon, unlicensed)', w: 0.04 },
      { v: 'office (wool merchant)', w: 0.04 },
      { v: 'office (beer merchant)', w: 0.04 },
      { v: 'office (spice merchant)', w: 0.04 },
      { v: 'office (surgeon, licensed)', w: 0.02 },
      { v: 'office (moneychanger)', w: 0.02 },
      { v: 'office (scholar)', w: 0.02 },
      { v: 'office (advocate)', w: 0.015 },
      { v: 'office (historian)', w: 0.015 },
      { v: 'office (engineer)', w: 0.01 },
      { v: 'office (architect)', w: 0.01 },
      { v: 'office (astrologer)', w: 0.01 },
      { v: 'office (grain merchant)', w: 0.01 },
      { v: 'office (banker)', w: 0.01 },
      { v: 'office (cartographer)', w: 0.0 }
    ],
    1
  )
  return dist.map(({ v, w }) => ({ v, w: w * weight }))
}

export const shops = (weight: number): weighted_distribution<Building['type']> => {
  const dist: weighted_distribution<Building['type']> = build_distribution(
    [
      { v: 'shop (clothier)', w: 0.1 },
      { v: 'shop (grocer)', w: 0.1 },
      { v: 'shop (dairy seller)', w: 0.08 },
      { v: 'shop (launderer)', w: 0.07 },
      { v: 'shop (furrier)', w: 0.07 },
      { v: 'shop (tailor)', w: 0.06 },
      { v: 'shop (barber)', w: 0.05 },
      { v: 'shop (draper)', w: 0.05 },
      { v: 'shop (flower seller)', w: 0.04 },
      { v: 'shop (jeweler)', w: 0.04 },
      { v: 'shop (mercer)', w: 0.02 },
      { v: 'shop (engraver)', w: 0.02 },
      { v: 'shop (pawnbroker)', w: 0.02 },
      { v: 'shop (haberdasher)', w: 0.02 },
      { v: 'shop (wine merchant)', w: 0.02 },
      { v: 'shop (tinker)', w: 0.015 },
      { v: 'shop (butcher)', w: 0.01 },
      { v: 'shop (fishmonger)', w: 0.01 },
      { v: 'shop (wool merchant)', w: 0.01 },
      { v: 'shop (beer merchant)', w: 0.01 },
      { v: 'shop (herbalist)', w: 0.01 },
      { v: 'shop (spice merchant)', w: 0.01 },
      { v: 'shop (wood seller)', w: 0.01 },
      { v: 'shop (brothel keeper)', w: 0.01 },
      { v: 'shop (hay merchant)', w: 0.01 },
      { v: 'shop (bookseller)', w: 0.05 },
      { v: 'shop (religious souvenir seller)', w: 0.05 },
      { v: 'shop (naval outfitter)', w: 0.02 },
      { v: 'shop (grain merchant)', w: 0.02 }
    ],
    1
  )
  return dist.map(({ v, w }) => ({ v, w: w * weight }))
}

export const workshops = (weight: number): weighted_distribution<Building['type']> => {
  const dist: weighted_distribution<Building['type']> = build_distribution(
    [
      { v: 'workshop (cobbler)', w: 0.1 },
      { v: 'workshop (furniture maker)', w: 0.09 },
      { v: 'workshop (furrier)', w: 0.07 },
      { v: 'workshop (weaver)', w: 0.05 },
      { v: 'workshop (basket weaver)', w: 0.05 },
      { v: 'workshop (carpenter)', w: 0.04 },
      { v: 'workshop (paper maker)', w: 0.04 },
      { v: 'workshop (potter)', w: 0.04 },
      { v: 'workshop (wheelwright)', w: 0.03 },
      { v: 'workshop (jeweler)', w: 0.03 },
      { v: 'workshop (mason)', w: 0.03 },
      { v: 'workshop (baker)', w: 0.03 },
      { v: 'workshop (soap maker)', w: 0.03 },
      { v: 'workshop (chandler)', w: 0.03 },
      { v: 'workshop (cooper)', w: 0.02 },
      { v: 'workshop (pastry maker)', w: 0.02 },
      { v: 'workshop (scabbard maker)', w: 0.015 },
      { v: 'workshop (silversmith)', w: 0.015 },
      { v: 'workshop (saddler)', w: 0.01 },
      { v: 'workshop (purse maker)', w: 0.01 },
      { v: 'workshop (blacksmith)', w: 0.01 },
      { v: 'workshop (goldsmith)', w: 0.01 },
      { v: 'workshop (toy-maker)', w: 0.01 },
      { v: 'workshop (artist)', w: 0.01 },
      { v: 'workshop (leatherworker)', w: 0.01 },
      { v: 'workshop (rope maker)', w: 0.01 },
      { v: 'workshop (tanner)', w: 0.01 },
      { v: 'workshop (buckle maker)', w: 0.01 },
      { v: 'workshop (cutler)', w: 0.01 },
      { v: 'workshop (fuller)', w: 0.01 },
      { v: 'workshop (harness maker)', w: 0.01 },
      { v: 'workshop (painter)', w: 0.01 },
      { v: 'workshop (woodcarver)', w: 0.005 },
      { v: 'workshop (glass maker)', w: 0.005 },
      { v: 'workshop (instrument maker)', w: 0.005 },
      { v: 'workshop (locksmith)', w: 0.005 },
      { v: 'workshop (rug maker)', w: 0.005 },
      { v: 'workshop (sculptor)', w: 0.005 },
      { v: 'workshop (bleacher)', w: 0.005 },
      { v: 'workshop (shipwright)', w: 0.005 },
      { v: 'workshop (bookbinder)', w: 0.005 },
      { v: 'workshop (bowyer/fletcher)', w: 0.005 },
      { v: 'workshop (brewer)', w: 0.005 },
      { v: 'workshop (glove maker)', w: 0.005 },
      { v: 'workshop (vintner)', w: 0.005 },
      { v: 'workshop (girdler)', w: 0.004 },
      { v: 'workshop (skinner)', w: 0.004 },
      { v: 'workshop (armorer)', w: 0.004 },
      { v: 'workshop (weaponsmith)', w: 0.004 },
      { v: 'workshop (distiller)', w: 0.003 },
      { v: 'workshop (illuminator)', w: 0.003 },
      { v: 'workshop (perfumer)', w: 0.003 },
      { v: 'workshop (tiler)', w: 0.003 },
      { v: 'workshop (clock maker)', w: 0.002 },
      { v: 'workshop (vestment maker)', w: 0.002 },
      { v: 'workshop (alchemist)', w: 0.001 },
      { v: 'workshop (bell maker)', w: 0.001 },
      { v: 'workshop (dye maker)', w: 0.001 },
      { v: 'workshop (inventor)', w: 0.001 }
    ],
    1
  )
  return dist.map(({ v, w }) => ({ v, w: w * weight }))
}

const quality_desc: Record<Building['quality']['grade'], string[]> = {
  A: ['imperial', 'luxurious', 'illustrious'],
  B: ['tasteful', 'ornate', 'artistic'],
  C: ['basic', 'utilitarian', 'standard'],
  D: ['derelict', 'rustic', 'functional']
}

export const building__quality_desc = (grade: Building['quality']['grade']) => {
  return window.dice.choice(quality_desc[grade])
}

export const building__edge_spawn = (params: {
  ref_block: Block
  district_block: Block
  district: District
  type: Building['type']
  quality: DistrictTemplate['quality']
}) => {
  const { ref_block, district_block, district, type, quality } = params
  const [[sx, sy], [ex, ey]] = voronoi__common_edge(district_block.data, ref_block.data)
  const { x: cx, y: cy } = point_on_edge({
    points: [
      { x: sx, y: sy },
      { x: ex, y: ey }
    ],
    distance: window.dice.uniform(0.2, 0.8)
  })
  let [x, y] = district_block.structures[0].center
  const { structure } = district_block.structures.slice(1).reduce(
    (closest, structure) => {
      ;[x, y] = structure.center
      const dist = distance([x, y], [cx, cy])
      return dist > closest.dist ? closest : { dist, structure }
    },
    {
      structure: district_block.structures[0],
      dist: distance([x, y], [cx, cy])
    }
  )
  const building = district.buildings.find(
    building => building.x === structure.center[0] && building.y === structure.center[1]
  )
  const building_idx = district.buildings.slice(-1)[0].idx
  if (building) building.type = type
  else {
    const grade = window.dice.weighted_choice(quality)
    district.buildings.push({
      idx: building_idx + 1,
      x: structure.center[0],
      y: structure.center[1],
      type: type,
      quality: { grade, desc: building__quality_desc(grade) }
    })
  }
}
