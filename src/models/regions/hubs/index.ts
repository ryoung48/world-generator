import { WORLD } from '../..'
import { CELL } from '../../cells'
import { Cell } from '../../cells/types'
import { POINT } from '../../utilities/math/points'
import { Place } from './types'

const placement = (params: { cell: Cell }) => {
  const { cell } = params
  const spacing = WORLD.placement.spacing.provinces
  const coastalPlacement = CELL.coastalEdge({
    cell,
    distance: 0.5
  })
  for (const point of coastalPlacement) {
    const collision = CELL.bfsNeighborhood({ start: cell, maxDepth: 5 })
      .filter(n => n.idx !== cell.idx && CELL.place(n))
      .map(CELL.place)
      .some(place => POINT.distance.geo({ points: [place, point] }) < spacing)
    if (!collision) return { point, coastal: true }
  }
  return { point: { x: cell.x, y: cell.y }, coastal: false }
}

export const HUB = {
  coastal: {
    move: (place: Place, cell: Cell) => {
      const oldCell = window.world.cells[place.cell]
      const oldProvinceIdx = oldCell.province
      place.cell = cell.idx
      oldCell.province = cell.province
      cell.province = oldProvinceIdx
      HUB.coastal.set(place)
    },
    set: (place: Place) => {
      const { point, coastal } = placement({ cell: window.world.cells[place.cell] })
      place.x = point.x
      place.y = point.y
      place.coastal = coastal
    }
  },
  isCity: (place: Place) => place.population > 10e3,
  province: (place: Place) => CELL.province(window.world.cells[place.cell]),
  region: (place: Place) => window.world.regions[HUB.province(place).region],
  spawn: (cell: Cell): Place => {
    const { x, y } = cell
    const place: Place = {
      x,
      y,
      cell: cell.idx,
      population: 0
    }
    return place
  },
  type: ({ population }: Place) => {
    return population > 200e3
      ? 'metropolis'
      : population > 50e3
      ? 'huge city'
      : population > 20e3
      ? 'large city'
      : population > 10e3
      ? 'small city'
      : population > 5e3
      ? 'large town'
      : population > 1e3
      ? 'small town'
      : population > 500
      ? 'large village'
      : population > 100
      ? 'small village'
      : 'tiny village'
  }
}
