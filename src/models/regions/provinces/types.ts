import { Item } from '../../npcs/equipment/types'
import { ProvinceHook } from '../../quests/hooks/types'
import type { Quest } from '../../quests/types'
import { TaggedEntity } from '../../utilities/entities/types'
import { WeightedDistribution } from '../../utilities/math'
import { RouteTypes } from '../../world/travel/types'
import { Hub } from './hubs/types'

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
  conflict?: 'war'
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
  environment?: {
    terrain:
      | 'marsh'
      | 'forest'
      | 'plains'
      | 'desert'
      | 'hills'
      | 'mountainous'
      | 'jungle'
      | 'tundra'
      | 'glacier'
      | 'taiga'
    climate: 'tropical' | 'subtropical' | 'temperate' | 'subarctic' | 'arctic'
  }
  // memory
  weather?: { text: string; memory: number }
  demographics?: number
  market?: { goods: Item[]; memory: number }
  // quests
  hooks: { tag: ProvinceHook; text: string }[]
  quest?: Quest
  actors: number[]
}
