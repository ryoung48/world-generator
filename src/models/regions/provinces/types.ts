import { Item } from '../../npcs/equipment/types'
import type { Quest } from '../../quests/types'
import { TaggedEntity } from '../../utilities/entities/types'
import { WeightedDistribution } from '../../utilities/math/types'
import { Cell } from '../../world/cells/types'
import type { RouteTypes } from '../../world/types'
import { Region } from '../types'
import type { Hooks } from './hooks/types'
import type { Hub } from './hubs/types'

export interface Demographics {
  common: WeightedDistribution<number>
  native: WeightedDistribution<number>
  foreign: WeightedDistribution<number>
}

export interface Province extends TaggedEntity {
  tag: 'province'
  cell: number
  nation: number
  region: number
  capital: boolean
  population: number // total
  hub: Hub
  conflict?: number
  // networking
  // sea|land -> { province -> route table (world) }
  trade: Record<RouteTypes, Record<string, number>>
  neighbors: number[]
  artery: number[]
  wealth?: number
  // geography
  cells: { land: number[] }
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
      | 'subterranean'
      | 'coastal'
      | 'oceanic'
    climate: 'tropical' | 'subtropical' | 'temperate' | 'subarctic' | 'arctic'
  }
  // memory
  weather?: { text: string; memory: number }
  demographics?: number
  market?: { goods: Item[]; memory: number }
  // quests
  hooks?: Hooks
  quest?: Quest
  actors: number[]
}

export type ProvinceNeighborParams = { province: Province; type?: 'local' | 'foreign' }
export type ProvinceFindParams = {
  provinces: Province[]
  ref: Province
  type: 'closest' | 'furthest'
}
export type ProvinceSortParams = ProvinceFindParams
export type ProvinceFindOrderParams = { candidate: number; selected: number }
export type ProvinceSpawnParams = { cell: Cell; capital?: boolean }
export type ProvinceAttachParams = { province: Province; idx: number }
export type ProvinceMoveParams = { province: Province; nation: Region }
export type ProvinceClaim = { nation: Region; province: Province }
