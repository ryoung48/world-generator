import { WORLD } from '../..'
import { CELL } from '../../cells'
import { CLIMATE } from '../../cells/climate'
import { Cell } from '../../cells/types'
import { POINT } from '../../utilities/math/points'
import { Province } from '../provinces/types'
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

export const PLACE = {
  climate: (place: Place) => {
    const cell = window.world.cells[place.cell]
    return CLIMATE.holdridge[cell.climate]
  },
  coastal: {
    move: (place: Place, cell: Cell) => {
      const oldCell = window.world.cells[place.cell]
      const oldProvinceIdx = oldCell.province
      place.cell = cell.idx
      oldCell.province = cell.province
      cell.province = oldProvinceIdx
      oldCell.place = undefined
      cell.place = place.idx
      PLACE.coastal.set(place)
    },
    set: (place: Place) => {
      const { point, coastal } = placement({ cell: window.world.cells[place.cell] })
      place.x = point.x
      place.y = point.y
      place.coastal = coastal
    }
  },
  province: (place: Place) => CELL.province(window.world.cells[place.cell]),
  region: (place: Place) => window.world.regions[PLACE.province(place).region],
  spawn: (cell: Cell): Place => {
    const { x, y } = cell
    const province = CELL.province(cell)
    const idx = province.places.length
    const place: Place = {
      idx,
      x,
      y,
      cell: cell.idx,
      type: 'hub'
    }
    cell.place = idx
    province.places.push(place as unknown as Province['places'][number])
    return place
  }
}
