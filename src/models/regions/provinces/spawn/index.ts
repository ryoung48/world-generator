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
    regional_capital: capital,
    region: cell.region,
    cell: cell.idx,
    memory: {
      trade_goods: -Infinity,
      refugees: -Infinity,
      next_invasion: { type: 'wars', time: -Infinity, idx: -1 },
      last_invasion: { type: 'wars', time: -Infinity, idx: -1 },
      trade_demand: -Infinity
    },
    locations: [],
    trade: { land: {}, sea: {} },
    resources: { supply: {}, demand: {} },
    wealth: 0,
    hub: -1,
    lands: {},
    lakes: {},
    land: 0,
    ocean: 0,
    mountains: 0,
    population: 0,
    neighbors: [],
    artery: [],
    curr_nation: cell.region,
    prev_nation: cell.region,
    finalized: false
  }
  if (capital) {
    region.capital = province.idx
    region.regions.push(province.idx)
  }
  region.provinces.push(province.idx)
  window.world.provinces.push(province)
  const hub = location__spawn({ cell, type: 'tiny village', hub: true })
  if (!hub) throw new Error('hub placement failed')
  province.hub = hub.idx
  return province
}
