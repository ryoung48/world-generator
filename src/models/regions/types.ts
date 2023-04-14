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
  side: Directions
  provinces: number[] // owned provinces
  regional: {
    provinces?: number[]
    land?: number
    mountains?: number
    coastal?: boolean
  }
  culture: { ruling: number; native: number }
  // geography
  climate?: Climate['type']
  coastal: boolean
  borders: number[]
  landBorders: number[]
  relations: Record<number, DiplomaticRelation>
  // society
  development?: 'civilized' | 'frontier' | 'tribal' | 'remote'
  civilized?: boolean
  government?: 'free city' | 'barony' | 'duchy' | 'kingdom' | 'empire'
  religion?: number
  description?: {
    introduction: string
    history: string
    government: string
    religions: string
    issues: string
  }
}
