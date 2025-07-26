import { CELL } from '../../cells'
import { PLACEMENT } from '../../cells/placement'
import { Cell } from '../../cells/types'
import { POINT } from '../../utilities/math/points'
import { Hub } from './type'

const placement = (params: {
  cell: Cell
}): { point: { x: number; y: number }; coastal: boolean; neighbor?: number } => {
  const { cell } = params
  const coastalPlacement = CELL.coastalEdge({
    cell,
    distance: 0.5
  })
  if (coastalPlacement.length > 0) {
    const spacing = PLACEMENT.spacing.provinces
    const { radius } = window.world
    const neighborhood = CELL.bfsNeighborhood({ start: cell, maxDepth: 5 })
      .filter(n => n.idx !== cell.idx && CELL.place(n))
      .map(CELL.place)
    for (const edge of coastalPlacement) {
      const collision = neighborhood.some(
        place => POINT.distance.geo({ points: [place, edge.point], radius }) < spacing * 0.5
      )
      if (!collision) return { point: edge.point, coastal: true, neighbor: edge.neighbor }
    }
  }
  return { point: { x: cell.x, y: cell.y }, coastal: false }
}

export const HUB = {
  coastal: {
    move: (site: Hub, cell: Cell) => {
      const oldCell = window.world.cells[site.cell]
      const oldProvinceIdx = oldCell.province
      site.cell = cell.idx
      oldCell.province = cell.province
      cell.province = oldProvinceIdx
      HUB.coastal.set(site)
    },
    set: (site: Hub) => {
      const { point, coastal, neighbor } = placement({ cell: window.world.cells[site.cell] })
      site.x = point.x
      site.y = point.y
      site.coastal = coastal
      site.water = neighbor
    }
  },
  isCity: (place: Hub) => place.population > 10e3,
  province: (place: Hub) => CELL.province(window.world.cells[place.cell]),
  settlement: ({ population }: Hub) => {
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
  },
  spawn: (cell: Cell): Hub => {
    const { x, y } = cell
    const site: Hub = {
      population: 0,
      site: 'hub',
      x,
      y,
      cell: cell.idx
    }
    HUB.coastal.set(site)
    return site
  }
}
