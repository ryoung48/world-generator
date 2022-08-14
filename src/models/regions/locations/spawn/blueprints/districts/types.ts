import { social_class } from '../../../../../npcs/actors/stats/professions/types'
import { weighted_distribution } from '../../../../../utilities/math'
import { Dice } from '../../../../../utilities/math/dice'
import { Cell } from '../../../../../world/cells/types'
import { Building } from '../buildings/types'

export const settlement__dimensions = {
  h: 800,
  w: 800
}

export interface Block extends Cell {
  district?: { idx: number; path: string }
  area: number
  chaos: number
  structures: Structure[]
  center: [number, number]
  path: string
  land?: boolean
}

export interface Structure {
  path: string
  edges: [number, number][][]
  vertices: [number, number][]
  center: [number, number]
  area: number
}

export interface District {
  block: number // block idx
  idx: number
  name: string
  type:
    | 'administration'
    | 'noble'
    | 'merchant'
    | 'craftsman'
    | 'market'
    | 'military'
    | 'docks'
    | 'gate'
    | 'slums'
    | 'rural'
  affix?: 'foreign' | 'hazardous'
  buildings: Building[]
  dock?: number
  gate?: number
}

export interface DistrictTemplate {
  type: District['type']
  wealth: social_class
  buildings: weighted_distribution<Building['type']>
  quality: weighted_distribution<Building['quality']['grade']>
  spawn?: (_params: { blocks: Block[]; district: District; dice: Dice }) => void
}
