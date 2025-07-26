import { Cell } from '../cells/types'
import { WeightedDistribution } from '../utilities/math/dice/types'
import { TaggedEntity } from '../utilities/text/types'
import { FindParams } from '../utilities/types'
import { Hub } from './hubs/type'

export interface Demographics {
  common: WeightedDistribution<number>
  native: WeightedDistribution<number>
  foreign: WeightedDistribution<number>
}

export type DiplomaticRelation =
  | 'vassal'
  | 'colony'
  | 'trading company'
  | 'colonial settlers'
  | 'penal colony'
  | 'suzerain'
  | 'ally'
  | 'friendly'
  | 'neutral'
  | 'suspicious'
  | 'at war'

export interface Province extends TaggedEntity {
  tag: 'province'
  name: string
  cell: number
  culture: number
  minority?: number
  battleground?: number // war
  war?: number
  hub: Hub
  size?: 'city-state' | 'principality' | 'kingdom' | 'empire'
  heraldry: {
    hue: number
    color: string
    style: 'monochrome' | 'dark chromatic' | 'light chromatic' | 'dawn' | 'dusk'
  }
  government?: 'autocracy' | 'republic' | 'oligarchy' | 'confederation' | 'fragmented' | 'theocracy'
  decentralization?: 'tribes' | 'lawless'
  quirks?: string[]
  // networking
  relations: Record<number, DiplomaticRelation>
  neighbors: number[]
  subjects: number[]
  nation?: number
  suzerain?: number
  colonists?: number
  colonial?: boolean
  walls?: number
  //population
  capacity?: number
  population: number
  development?: number
  area?: number
  // geography
  topography?: Cell['topography']
  habitability?: number
  desolate?: boolean
  cells: number[]
  locations: number[]
  islands: Record<number, number>
  lakes: Record<number, number>
  land: number
  ocean: number
  mountains: number
  corruption?: number
  farmland?: boolean
  // time
  timezone?: { offset: number; singular: boolean }
  // memory
  demographics?: number
}

export type ProvinceNeighborParams = {
  province: Province
  type?: 'local' | 'foreign'
  unpopulated?: boolean
}
export type ProvinceFindParams = FindParams<Province>
export type ProvinceSortParams = ProvinceFindParams
export type ProvinceFindOrderParams = { candidate: number; selected: number }
export type ProvinceAttachParams = { province: Province; idx: number }
