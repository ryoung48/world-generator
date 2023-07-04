import { TaggedEntity } from '../utilities/entities/types'
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

export const governments = [
  'autocratic monarchy',
  'colonial overlord',
  'feudal monarchy',
  'fragmented warlords',
  'free cities',
  'free city',
  'holy orders',
  'imperial bureaucracy',
  'merchant republic',
  'nomadic tribes',
  'steppe horde',
  'sky cities',
  'sorcerous cabal',
  'splintered cults',
  'theocratic authority',
  'tribal confederacy',
  'tribal monarchy',
  'undead remnants'
] as const

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
  religion?: number
  // geography
  climate?: Climate['name']
  coastal: boolean
  borders: number[]
  landBorders: number[]
  relations: Record<number, DiplomaticRelation>
  // society
  development?: 'civilized' | 'frontier' | 'tribal' | 'remote'
  civilized?: boolean
  size?: 'free city' | 'barony' | 'duchy' | 'kingdom' | 'empire'
  government?: typeof governments[number]
}
