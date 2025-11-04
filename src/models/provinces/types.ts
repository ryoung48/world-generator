import { Cell } from '../cells/types'
import { WeightedDistribution } from '../utilities/math/dice/types'
import { TaggedEntity } from '../utilities/text/types'
import { FindParams } from '../utilities/types'
import { Hub } from './hubs/type'
import { TradeGood } from './trade/types'

export interface Demographics {
  common: WeightedDistribution<number>
  native: WeightedDistribution<number>
  foreign: WeightedDistribution<number>
}

export type DiplomaticRelation =
  | 'suzerain'
  | 'ally'
  | 'friendly'
  | 'neutral'
  | 'suspicious'
  | 'at war'
  | 'vassal'
  | 'tributary'
  | 'personal union'
  | 'chartered company'
  | 'dominion'
  | 'colony'

export interface Province extends TaggedEntity {
  tag: 'province'
  name: string
  demonym?: string
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
  government?:
    | 'autocracy'
    | 'republic'
    | 'oligarchy'
    | 'confederation'
    | 'fragmented'
    | 'theocracy'
  decentralization?: 'tribes' | 'warring states' | 'city-states'
  regency?: boolean
  quirks?: string[]
  law?:
    | 'customary law'
    | 'localized codes'
    | 'hierarchical law'
    | 'bureaucratic law'
    | 'esoteric codified'
    | 'arbitrary rule'
  policies?: {
    religion?: 'atheism' | 'pluralism' | 'secularized' | 'moralism'
    trade?: 'isolationist' | 'protectionism' | 'mercantilism' | 'free trade'
    economy?: 'traditionalism' | 'laissez-faire' | 'interventionism' | 'state capitalism' | 'command economy'
    bureaucracy?: 'meritocratic exams' | 'venal offices' | 'hereditary officials' | 'court eunuchs' | 'appointed officials'
  }
  // networking
  relations: Record<number, DiplomaticRelation>
  neighbors: number[]
  territories: number[]
  nation?: number
  overlord?: number
  walls?: number
  //population
  capacity?: number
  population: number
  development?: number
  area?: number
  desirability: number
  immigration: Record<number, number>
  emigration: Record<number, number>

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
  exports?: TradeGood[]
  imports?: TradeGood[]
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
