import { Item } from '../../actors/equipment/types'
import { Cell } from '../../cells/types'
import type { RouteTypes } from '../../types'
import { WeightedDistribution } from '../../utilities/math/dice/types'
import { TaggedEntity } from '../../utilities/text/types'
import { FindParams } from '../../utilities/types'
import { Camp } from '../places/camp/types'
import { Hub } from '../places/hub/types'
import { Ruin } from '../places/ruin/types'
import { Village } from '../places/village/types'
import { Wilderness } from '../places/wilderness/types'
import { Region } from '../types'

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
  conflict?: number
  places: (Hub | Village | Camp | Ruin | Wilderness)[]
  // networking
  // sea|land -> { province -> route table (world) }
  trade: Record<RouteTypes, Record<string, number>>
  neighbors: number[]
  artery: number[]
  difficulty?: number
  // geography
  cells: { land: number[] }
  islands: Record<number, number>
  lakes: Record<number, number>
  land: number
  ocean: number
  mountains: number
  // memory
  demographics?: number
  market?: { goods: Item[]; memory: number }
}

export type ProvinceNeighborParams = { province: Province; type?: 'local' | 'foreign' }
export type ProvinceFindParams = FindParams<Province>
export type ProvinceSortParams = ProvinceFindParams
export type ProvinceFindOrderParams = { candidate: number; selected: number }
export type ProvinceSpawnParams = { cell: Cell; capital?: boolean }
export type ProvinceAttachParams = { province: Province; idx: number }
export type ProvinceMoveParams = { province: Province; nation: Region }
export type ProvinceClaim = { nation: Region; province: Province }
