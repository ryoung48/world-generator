import { Item } from '../../npcs/equipment/types'
import { TaggedEntity } from '../../utilities/codex/entities'
import { WeightedDistribution } from '../../utilities/math'
import { RouteTypes } from '../../world/travel/types'
import { Hub } from '../hubs/types'

export interface Demographics {
  common: WeightedDistribution<number>
  native: WeightedDistribution<number>
  foreign: WeightedDistribution<number>
}

export interface Province extends TaggedEntity {
  tag: 'province'
  cell: number
  region: number
  capital: boolean
  population: number // total
  nation: number // current owner
  hub: Hub
  // networking
  // sea|land -> { province -> route table (world) }
  trade: Record<RouteTypes, Record<string, number>>
  neighbors: number[]
  artery: number[]
  // geography
  islands: Record<number, number>
  lakes: Record<number, number>
  land: number
  ocean: number
  mountains: number
  // memory
  actors: number[]
  weather?: { text: string; memory: number }
  demographics?: number
  market?: { goods: Item[]; memory: number }
}
