import { WORLD } from '../..'
import { CELL } from '../../cells'
import { Cell } from '../../cells/types'
import { POINT } from '../../utilities/math/points'
import { Site, SiteSpawnParams } from './type'

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

export const SITE = {
  coastal: {
    move: (site: Site, cell: Cell) => {
      const oldCell = window.world.cells[site.cell]
      const oldProvinceIdx = oldCell.province
      site.cell = cell.idx
      oldCell.province = cell.province
      cell.province = oldProvinceIdx
      SITE.coastal.set(site)
    },
    set: (site: Site) => {
      const { point, coastal } = placement({ cell: window.world.cells[site.cell] })
      site.x = point.x
      site.y = point.y
      site.coastal = coastal
    }
  },
  spawn: ({ cell, coastal, idx }: SiteSpawnParams): Site => {
    const { x, y } = cell
    const site: Site = {
      idx,
      x,
      y,
      cell: cell.idx
    }
    coastal && SITE.coastal.set(site)
    return site
  }
}
