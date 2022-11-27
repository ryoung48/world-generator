// https://gitlab.com/rayoung788/project-muse/-/blob/0d2b6286b758bbd81851ba2fa5c867a2908ee0f0/src/models/regions/locations/spawn.ts

import { lang__uniqueName } from '../../../npcs/species/languages/words'
import { Point, point__distance } from '../../../utilities/math/points'
import { cell__bfsNeighborhood, cell__moveToCoast } from '../../../world/cells'
import { ExteriorCell } from '../../../world/cells/types'
import { province__neighborhood } from '../../provinces'
import { Province } from '../../provinces/types'
import { Loc } from '../types'
import { location__templates } from './taxonomy'

const pointVariance = 0

/**
 * adds some noise to the locations coordinates so that they are not always
 * at the center of voronoi polygons; will move coastal locations to the coastline
 * @param location - location to be moved
 */
const placementVariation = (params: { cell: ExteriorCell; coastal: number }) => {
  const { coastal, cell } = params
  const coastalPlacement = coastal
    ? cell__moveToCoast({
        cell,
        distance: coastal
      })
    : false
  if (!coastalPlacement) {
    return {
      x: cell.x + window.dice.uniform(-pointVariance, pointVariance),
      y: cell.y + window.dice.uniform(-pointVariance, pointVariance)
    }
  }
  return coastalPlacement
}

/**
 * selects a random land cell within the origin's province
 * @param origin - origin cell to sprawl out from
 * @returns cell
 */
const provinceSprawl = (params: {
  origin: ExteriorCell
  restrictions?: (_cell: ExteriorCell) => boolean
}) => {
  const { origin, restrictions } = params
  const province = window.world.provinces[origin.province]
  const used = province.locations.map(l => window.world.locations[l].cell)
  const sphere = cell__bfsNeighborhood({
    start: origin,
    spread: cell => cell.province === origin.province
  })
  const land = sphere
    .filter(({ isWater, idx }) => !isWater && !used.includes(idx))
    .filter(restrictions ?? (() => true))
  return land.length > 0 ? window.dice.choice(land) : origin
}

// max attempts for placing locations
const maxAttempts = 5

/**
 * Find suitable coordinates to place location that are not
 * too close to other locations. If no location is found and
 * not sprawling, will default to current cell coordinates.
 * If sprawling and no location is found, will return false.
 * @param params.origin - origin cell to sprawl out from
 * @param params.coastal - coastal variation
 * @param params.sprawl - sprawl outwards? (select random cell within the same province)
 * @param params.attempts - attempts made thus far in the selection
 * @returns coordinates + the idx of the chosen cell
 */
const place__location = (params: {
  origin: ExteriorCell
  coastal: number
  sprawl: boolean
  attempts?: number
  restrictions?: (_cell: ExteriorCell) => boolean
}): (Point & { cell: ExteriorCell }) | false => {
  const { origin, coastal, sprawl, attempts = 0, restrictions } = params
  const cell = sprawl ? provinceSprawl({ origin, restrictions }) : origin
  const { sw, sh } = window.world.dim
  const point = placementVariation({ cell, coastal })
  const province = window.world.provinces[cell.province]
  if (!province || attempts >= maxAttempts) return sprawl ? false : { x: cell.x, y: cell.y, cell }
  const dist = sprawl ? 5 : 10
  const collision = province__neighborhood(province).some(
    loc => point__distance({ points: [loc, point], scale: [sw, sh] }) <= dist
  )
  if (collision)
    return place__location({
      origin: cell,
      coastal,
      sprawl,
      attempts: !sprawl ? maxAttempts : attempts + 1,
      restrictions
    })
  return { ...point, cell }
}

/**
 * move location to coast if possible
 * @param loc - location to move
 */
export const location__moveToCoast = (loc: Loc) => {
  const { coastal } = location__templates[loc.type]
  const point = place__location({ origin: window.world.cells[loc.cell], coastal, sprawl: false })
  if (point) {
    loc.x = point.x
    loc.y = point.y
  }
}

const templateList = Object.values(location__templates)
const random__locationType = (province: Province) => {
  const dist = templateList.map(template => {
    const { spawn, type } = template
    return { v: type, w: typeof spawn === 'number' ? spawn : spawn?.(province) ?? 0 }
  })
  return window.dice.weightedChoice(dist)
}

export const location__spawn = (params: {
  cell: ExteriorCell
  type?: Loc['type']
  hub?: boolean
  sprawl?: boolean
}) => {
  const idx = window.world.locations.length
  const origin = window.world.provinces[params.cell.province]
  const { cell, type = random__locationType(origin), hub, sprawl } = params
  const region = window.world.regions[cell.region]
  const culture = window.world.cultures[region?.culture.native]
  const {
    group: names = type,
    population,
    coastal,
    finalize,
    restrictions
  } = location__templates[type]
  const point = place__location({ origin: cell, coastal, sprawl, restrictions })
  // do not place location if no valid spot is found
  if (!point) {
    return false
  }
  const { x, y } = point
  const location: Loc = {
    name: culture?.language ? lang__uniqueName({ key: names, lang: culture.language }) : '',
    idx,
    tag: 'location',
    type,
    population: population ? window.dice.randint(...population) : undefined,
    memory: { weather: -Infinity },
    x,
    y,
    cell: point.cell.idx,
    province: point.cell.province,
    region: point.cell.region,
    coastal: coastal !== undefined && point.cell.beach,
    hub,
    actors: [],
    _threads: []
  }
  finalize?.(location)
  window.world.locations[location.idx] = location
  const province = window.world.provinces[location.province]
  province.locations = [...province.locations, location.idx]
  return location
}
