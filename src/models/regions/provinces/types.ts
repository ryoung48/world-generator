import { trade_good } from '../../items/economy'
import { route_types } from '../../world/travel/types'

export interface Province {
  idx: number
  cell: number
  region: number
  regional_capital: boolean
  finalized: boolean
  memory: {
    trade_goods: number
    trade_demand: number
    refugees: number
    last_invasion: { type: 'wars' | 'rebellions'; time: number; idx: number }
    next_invasion: { type: 'wars' | 'rebellions'; time: number; idx: number }
  }
  // travel
  hub: number
  locations: number[]
  // networking
  // sea|land -> { province -> route table (world) }
  trade: Record<route_types, Record<string, number>>
  neighbors: number[]
  artery: number[]
  // economy
  wealth: number
  resources: {
    supply: Partial<Record<trade_good, number>>
    demand: Partial<Record<trade_good, number>>
  }
  // geography
  lands: Record<number, number>
  lakes: Record<number, number>
  land: number
  ocean: number
  mountains: number
  // demographics
  population: number // urban + rural
  // ownership
  curr_nation: number // current owner
  prev_nation: number // previous owner
}
