import { ExteriorCell } from '../../../world/cells/types'
import { location__spawn } from '../../locations/spawn'
import { Province } from '../types'

export const province__spawn = (params: { cell: ExteriorCell; capital?: boolean }) => {
  const { cell, capital } = params
  const idx = window.world.provinces.length
  const region = window.world.regions[cell.region]
  cell.province = idx
  const province: Province = {
    idx,
    capital: capital,
    region: cell.region,
    cell: cell.idx,
    locations: [],
    trade: { land: {}, sea: {} },
    hub: -1,
    islands: {},
    land: 0,
    ocean: 0,
    mountains: 0,
    population: 0,
    neighbors: [],
    artery: [],
    nation: cell.region,
    finalized: false
  }
  if (capital) {
    region.capital = province.idx
  }
  region.provinces.push(province.idx)
  window.world.provinces.push(province)
  const hub = location__spawn({ cell, type: 'tiny village', hub: true })
  if (!hub) throw new Error('hub placement failed')
  province.hub = hub.idx
  return province
}
