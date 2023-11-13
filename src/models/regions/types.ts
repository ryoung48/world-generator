import { TaggedEntity } from '../utilities/entities/types'

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
  heraldry: { hue: number; color: string; style: 'monochrome' | 'contrast' | 'standard' }
  capital?: number
  regional: {
    provinces?: number[]
    land?: number
    mountains?: number
    coastal?: boolean
  }
  culture: number
  religion?: number
  // geography
  coastal: boolean
  borders: number[]
  landBorders: number[]
  relations: Record<number, DiplomaticRelation>
  // society
  provinces: number[]
  development?: number
  civilized?: boolean
  size?: 'free city' | 'barony' | 'duchy' | 'kingdom' | 'empire'
  government?: typeof governments[number]
  leadership?: { male: string; female: string }
  shattered?: boolean
}

export type RegionNeighborsParams = { region: Region; depth?: number }
export type RegionFindParams = {
  regions: Region[]
  ref: Region
  type: 'closest' | 'furthest'
}
export type RegionSortParams = RegionFindParams
export type RegionRelationsParams = { target: DiplomaticRelation; region: Region }
