import { Dice } from '../../../../models/utilities/math/dice'
import { WeightedDistribution } from '../../../../models/utilities/math/dice/types'
import { Block } from '../blocks/types'
import { Building } from '../buildings/types'

export type social_class = 'upper' | 'middle' | 'lower'

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
  buildings: WeightedDistribution<Building['type']>
  quality: WeightedDistribution<Building['quality']['grade']>
  spawn?: (_params: { blocks: Block[]; district: District; dice: Dice }) => void
}
