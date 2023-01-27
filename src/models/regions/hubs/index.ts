import { Point } from '../../utilities/math/points'
import { cell__moveToCoast } from '../../world/cells'
import { ExteriorCell } from '../../world/cells/types'
import { Hub, Settlement } from './types'

const hubs: Record<Hub['type'], Settlement> = {
  metropolis: {
    population: 100000,
    alias: 'city'
  },
  'huge city': {
    population: 50000,
    alias: 'city'
  },
  'large city': {
    population: 25000,
    alias: 'city'
  },
  'small city': {
    population: 10000,
    alias: 'city'
  },
  'large town': {
    population: 5000,
    alias: 'town'
  },
  'small town': {
    population: 1000,
    alias: 'town'
  },
  'large village': {
    population: 500,
    alias: 'village'
  },
  'small village': {
    population: 100,
    alias: 'village'
  },
  'tiny village': {
    population: -Infinity,
    alias: 'village'
  }
}

/**
 * adds some noise to the locations coordinates so that they are not always
 * at the center of voronoi polygons; will move coastal locations to the coastline
 * @param location - location to be moved
 */
const placement = (params: { cell: ExteriorCell }) => {
  const { cell } = params
  const coastalPlacement = cell__moveToCoast({
    cell,
    distance: 0.5
  })
  if (!coastalPlacement) return { x: cell.x, y: cell.y }
  return coastalPlacement
}

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
const place__location = (params: { origin: ExteriorCell }): Point & { cell: ExteriorCell } => {
  const { origin } = params
  const cell = origin
  const point = placement({ cell })
  const province = window.world.provinces[cell.province]
  if (!province) return { x: cell.x, y: cell.y, cell }
  return { ...point, cell }
}

export const hub__spawn = (params: { cell: ExteriorCell }): Hub => {
  const { cell } = params
  const point = place__location({ origin: cell })
  const { x, y } = point
  return {
    type: 'tiny village',
    population: 0,
    x,
    y,
    cell: point.cell.idx,
    coastal: point.cell.beach
  }
}

/**
 * move location to coast if possible
 * @param loc - location to move
 */
export const hub__moveToCoast = (loc: Hub) => {
  const point = place__location({ origin: window.world.cells[loc.cell] })
  if (point) {
    loc.x = point.x
    loc.y = point.y
  }
}

export const hub__setPopulation = (city: Hub, pop: number) => {
  city.population = Math.ceil(pop)
  city.type = (Object.entries(hubs).find(([, settlement]) => pop >= settlement.population)?.[0] ??
    'tiny village') as Hub['type']
}

export const hub__isCity = (city: Hub) => city.population >= hubs['small city'].population
export const hub__isTown = (city: Hub) =>
  city.population < hubs['small city'].population &&
  city.population >= hubs['small town'].population
export const hub__isVillage = (city: Hub) => city.population < hubs['small town'].population

export const hub__site = '#site#'
export const hub__alias = (hub: Hub) => hubs[hub.type].alias
export const hub__fillSite = (params: { text: string; hub: Hub }) => {
  const { text, hub } = params
  const { alias } = hubs[hub.type]
  return text.replaceAll(hub__site, alias)
}
