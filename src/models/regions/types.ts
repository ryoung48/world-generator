import { TaggedEntity } from '../utilities/codex/entities'
import { Directions } from '../utilities/math/points'
import { Climate } from '../world/climate/types'

export type DiplomaticRelation =
  | 'vassal'
  | 'suzerain'
  | 'ally'
  | 'friendly'
  | 'neutral'
  | 'suspicious'
  | 'at war'

export interface Region extends TaggedEntity {
  tag: 'nation'
  colors: string
  capital?: number
  ruler?: number
  side: Directions
  provinces: number[] // owned provinces
  regional: {
    provinces?: number[]
    land?: number
    mountains?: number
    coastal?: boolean
  }
  // cultural traits
  culture: { ruling: number; native: number }
  // weather
  climate?: Climate['type']
  coastal: boolean
  // geographic borders (regions)
  borders: number[]
  landBorders: number[]
  relations: Record<number, DiplomaticRelation>
  // society
  development?: 'civilized' | 'frontier' | 'tribal' | 'remote'
  civilized?: boolean
  government?:
    | `${'autocratic' | 'feudal' | 'theocratic' | 'stratocratic'} ${
        | 'empire'
        | 'kingdom'
        | 'chiefdom'}`
    | `steppe ${'nomads' | 'horde'}`
    | 'free city'
    | `${'city-state' | 'tribal'} confederacy`
    | `warring ${'states' | 'tribes'}`
    | `autonomous tribes`
    | 'grand duchy'
    | 'monastic order'
  religion?: number
}
