import { province__cell } from '../../../../regions/provinces'
import { world__gps } from '../../..'
import { cell__neighbors } from '../../../cells'
import { classifyClimate } from '../../../climate'
import { Shaper } from '..'

const oceanCurrents = () => {
  const east = [window.world.diagram.delaunay.find(window.world.dim.w, window.world.dim.h / 2)].map(
    i => {
      const cell = window.world.cells[i]
      cell.oceanCurrent = 'E'
      return cell
    }
  )
  const west = [window.world.diagram.delaunay.find(0, window.world.dim.h / 2)].map(i => {
    const cell = window.world.cells[i]
    cell.oceanCurrent = 'W'
    return cell
  })
  const queue = [...east, ...west]
  while (queue.length > 0) {
    // grab the next item in the queue
    const poly = queue.shift()
    cell__neighbors(poly)
      .filter(n => !n.oceanCurrent)
      .forEach(n => {
        n.oceanCurrent = poly.oceanCurrent
        if (n.isWater) queue.push(n)
      })
  }
}

export const regional__climates = () => {
  oceanCurrents()
  window.world.regions.forEach(region => {
    const capital = window.world.provinces[region.capital]
    const cell = province__cell(capital)
    region.coastal = cell.coastal
    const land = Shaper.regionLand[region.idx]
    const coasts = land.filter(cell => cell.isCoast)
    const east = coasts.filter(cell => cell.oceanCurrent === 'E').length
    const west = coasts.filter(cell => cell.oceanCurrent === 'W').length
    const inland = east + west === 0 || !region.coastal
    region.regional.land = land.length
    region.regional.mountains = land.filter(c => c.isMountains).length
    const latitude = Math.abs(world__gps(cell).latitude)
    const { type, monsoon } = window.world.landmarks[cell.landmark]
    const continent = type === 'continent'
    classifyClimate({
      region,
      location: inland ? 'inland' : east > west ? 'east_coast' : 'west_coast',
      continent,
      monsoon,
      latitude
    })
  })
}
