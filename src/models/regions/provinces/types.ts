import { TradeGood } from '../../items/economy'
import { RouteTypes } from '../../world/travel/types'

export interface Province {
  idx: number
  cell: number
  region: number
  regionalCapital: boolean
  finalized: boolean
  memory: {
    tradeGoods: number
    tradeDemand: number
    refugees: number
    lastInvasion: { type: 'wars' | 'rebellions'; time: number; idx: number }
    nextInvasion: { type: 'wars' | 'rebellions'; time: number; idx: number }
  }
  // travel
  hub: number
  locations: number[]
  // networking
  // sea|land -> { province -> route table (world) }
  trade: Record<RouteTypes, Record<string, number>>
  neighbors: number[]
  artery: number[]
  // economy
  wealth: number
  resources: {
    supply: Partial<Record<TradeGood, number>>
    demand: Partial<Record<TradeGood, number>>
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
  currNation: number // current owner
  prevNation: number // previous owner
}
