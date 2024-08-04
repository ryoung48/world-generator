import { TaggedEntity } from '../utilities/text/types'
import { FindParams } from '../utilities/types'

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
  name: string
  heraldry: { hue: number; color: string; style: 'monochrome' | 'contrast' | 'standard' }
  capital?: number
  regional: {
    provinces?: number[]
    land?: number
    mountains?: number
    coastal?: boolean
  }
  culture: number
  // geography
  borders: number[]
  landBorders: number[]
  relations: Record<number, DiplomaticRelation>
  war?: number
  // society
  provinces: number[]
  civilized?: boolean
  development?: number
  wealth?: number
  size?: 'city-state' | 'principality' | 'kingdom' | 'empire'
  government?:
    | 'autocracy'
    | 'republic'
    | 'oligarchy'
    | 'confederation'
    | 'fragmented'
    | 'theocracy'
    | 'vassal'
  religion?:
    | 'monotheistic'
    | 'polytheistic'
    | 'animistic'
    | 'dualistic'
    | 'nontheistic'
    | 'atheistic'
    | 'ancestor worship'
  overlord?: number
  vassals: number[]
  trade?: string[]
  desolate?: boolean
}

export type RegionNeighborsParams = { region: Region; depth?: number }
export type RegionFindParams = FindParams<Region>
export type RegionSortParams = RegionFindParams
export type GetRelationsParams = { target: DiplomaticRelation; region: Region }
export type SetRelationsParams = { target: DiplomaticRelation; r1: Region; r2: Region }
export type RegionClaim = { nation: Region; region: Region }

export type AddVassalParams = { vassal: Region; overlord: Region }
