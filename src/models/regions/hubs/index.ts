import { point__distance } from '../../utilities/math/points'
import { cell__bfsNeighborhood, cell__moveToCoast } from '../../world/cells'
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
  const { sw, sh } = window.world.dim
  const coastalPlacement = cell__moveToCoast({
    cell,
    distance: 0.5
  })
  for (const point of coastalPlacement) {
    const collision = Array.from(
      new Set(
        cell__bfsNeighborhood({ start: cell, maxDepth: 2 })
          .map(cell => cell.province)
          .filter(p => window.world.provinces[p] && p !== cell.province)
      )
    )
      .map(p => window.world.provinces[p].hub)
      .some(hub => point__distance({ points: [hub, point], scale: [sw, sh] }) <= 10)
    if (!collision) return { point, coastal: true }
  }
  return { point: { x: cell.x, y: cell.y }, coastal: false }
}

export const hub__spawn = (params: { cell: ExteriorCell }): Hub => {
  const { cell } = params
  const { point, coastal } = placement({ cell })
  const { x, y } = point
  return {
    type: 'tiny village',
    province: cell.province,
    population: 0,
    x,
    y,
    cell: cell.idx,
    coastal: coastal
  }
}

/**
 * move location to coast if possible
 * @param loc - location to move
 */
export const hub__moveToCoast = (loc: Hub) => {
  const { point, coastal } = placement({ cell: window.world.cells[loc.cell] })
  loc.x = point.x
  loc.y = point.y
  loc.coastal = coastal
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
