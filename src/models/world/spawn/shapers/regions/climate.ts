import { province__cell } from '../../../../regions/provinces'
import { world__gps } from '../../..'
import { cell__neighbors } from '../../../cells'
import { classify_climate } from '../../../climate'
import { Shaper } from '..'

const ocean_currents = () => {
  const east = [window.world.diagram.delaunay.find(window.world.dim.w, window.world.dim.h / 2)].map(
    i => {
      const cell = window.world.cells[i]
      cell.ocean_current = 'E'
      return cell
    }
  )
  const west = [window.world.diagram.delaunay.find(0, window.world.dim.h / 2)].map(i => {
    const cell = window.world.cells[i]
    cell.ocean_current = 'W'
    return cell
  })
  const queue = [...east, ...west]
  while (queue.length > 0) {
    // grab the next item in the queue
    const poly = queue.shift()
    cell__neighbors(poly)
      .filter(n => !n.ocean_current)
      .forEach(n => {
        n.ocean_current = poly.ocean_current
        if (n.is_water) queue.push(n)
      })
  }
}

export const regional__climates = () => {
  ocean_currents()
  window.world.regions.forEach(region => {
    const capital = window.world.provinces[region.capital]
    const cell = province__cell(capital)
    region.coastal = cell.coastal
    const land = Shaper.region_land[region.idx]
    const coasts = land.filter(cell => cell.is_coast)
    const east = coasts.filter(cell => cell.ocean_current === 'E').length
    const west = coasts.filter(cell => cell.ocean_current === 'W').length
    const inland = east + west === 0 || !region.coastal
    region.regional.land = land.length
    region.regional.mountains = land.filter(c => c.is_mountains).length
    const latitude = Math.abs(world__gps(cell).latitude)
    const { type, monsoon } = window.world.landmarks[cell.landmark]
    const continent = type === 'continent'
    classify_climate({
      region,
      location: inland ? 'inland' : east > west ? 'east_coast' : 'west_coast',
      continent,
      monsoon,
      latitude
    })
  })
}
