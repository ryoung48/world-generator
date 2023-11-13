import { MATH } from '../../../utilities/math'
import { WORLD } from '../../../world'
import { CELL } from '../../../world/cells'
import { Cell } from '../../../world/cells/types'
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
  },
  'tribal camp': {
    population: -Infinity,
    alias: 'tribal camp',
    tribal: true
  },
  'small monastery': {
    population: -Infinity,
    alias: 'monastery'
  },
  'large monastery': {
    population: -Infinity,
    alias: 'monastery'
  },
  'military outpost': {
    population: -Infinity,
    alias: 'outpost'
  },
  'trading outpost': {
    population: -Infinity,
    alias: 'outpost'
  },
  'colonial outpost': {
    population: -Infinity,
    alias: 'outpost'
  }
}

/**
 * adds some noise to the locations coordinates so that they are not always
 * at the center of voronoi polygons; will move coastal locations to the coastline
 * @param location - location to be moved
 */
const placement = (params: { cell: Cell }) => {
  const { cell } = params
  const spacing = WORLD.placement.spacing.provinces
  const limit = WORLD.placement.limit(spacing) + 1
  const coastalPlacement = CELL.moveToCoast({
    cell,
    distance: 0.5
  })
  for (const point of coastalPlacement) {
    const collision = CELL.bfsNeighborhood({ start: cell, maxDepth: limit })
      .filter(n => n.idx !== cell.idx && CELL.isHub(n))
      .map(p => window.world.provinces[p.province].hub)
      .some(hub => MATH.distance.geo([point.x, point.y], [hub.x, hub.y]) < spacing)
    if (!collision) return { point, coastal: true }
  }
  return { point: { x: cell.x, y: cell.y }, coastal: false }
}

export const HUB = {
  alias: (hub: Hub) => hubs[hub.type].alias,
  city: (hub: Hub) => hub.population >= hubs['small city'].population,
  fillSite: (params: { text: string; hub: Hub }) => {
    const { text, hub } = params
    const { alias } = hubs[hub.type]
    return text.replaceAll(HUB.site, alias)
  },
  monastic: (hub: Hub) => hubs[hub.type].alias === 'monastery',
  move: (hub: Hub, cell: Cell) => {
    const oldCell = window.world.cells[hub.cell]
    const oldProvinceIdx = oldCell.province
    hub.cell = cell.idx
    oldCell.province = cell.province
    cell.province = oldProvinceIdx
    hub.coastal = true
    HUB.moveToCoast(hub)
  },
  moveToCoast: (hub: Hub) => {
    const { point, coastal } = placement({ cell: window.world.cells[hub.cell] })
    hub.x = point.x
    hub.y = point.y
    hub.coastal = coastal
  },
  province: (hub: Hub) => window.world.provinces[hub.province],
  seaside: (hub: Hub) => window.world.cells[hub.cell].beach,
  setPopulation: (hub: Hub, pop: number) => {
    hub.population = Math.ceil(pop)
    const tribal = HUB.tribal(hub)
    hub.type = tribal
      ? 'tribal camp'
      : ((Object.entries(hubs).find(([, settlement]) => pop >= settlement.population)?.[0] ??
          'tiny village') as Hub['type'])
    if (hub.type === 'small village' && window.dice.random < 0.2) hub.type = 'small monastery'
    if (hub.type === 'large village' && window.dice.random < 0.2) hub.type = 'large monastery'
  },
  site: '#site#',
  spawn: (params: { cell: Cell }): Hub => {
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
  },
  town: (hub: Hub) =>
    hub.population < hubs['small city'].population &&
    hub.population >= hubs['small town'].population,
  tribal: (hub: Hub) => {
    const village = HUB.village(hub)
    const province = window.world.provinces[hub.province]
    const region = window.world.regions[province.region]
    return village && !region.civilized
  },
  urban: (hub: Hub) => hub.population >= hubs['small town'].population,
  village: (hub: Hub) => hub.population < hubs['small town'].population
}
