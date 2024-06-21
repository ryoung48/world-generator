import { TaggedEntity } from '../utilities/text/types'
import { Trait } from '../utilities/traits/types'
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
  religion?: number
  // geography
  borders: number[]
  landBorders: number[]
  relations: Record<number, DiplomaticRelation>
  war?: number
  // society
  provinces: number[]
  civilized?: boolean
  size?: 'city-state' | 'principality' | 'kingdom' | 'empire'
  government?:
    | 'autocracy'
    | 'republic'
    | 'oligarchy'
    | 'confederation'
    | 'fragmented'
    | 'theocracy'
    | 'vassal'
  overlord?: number
  vassals: number[]
  trade?: string[]
  traits?: {
    tag:
      | 'splendid discovery'
      | 'faith strengthened'
      | 'heroic heir'
      | "rival's downfall"
      | 'farmland expansion'
      | 'trade route'
      | 'monster vanquished'
      | 'bountiful harvest'
      | 'minister deposed'
      | 'academy founded'
      | 'uprising crushed'
      | 'peace forged'
      | 'peace pact'
      | 'victorious military'
      | 'working activated'
      | 'artifact aid'
      | 'unrest calmed'
      | 'cult purged'
      | 'diplomacy ties'
      | 'beloved lord'
      | 'farmland depletion'
      | 'vermin swarm'
      | 'rebel stirring'
      | 'internal backing'
      | 'leadership failure'
      | 'faith crisis'
      | 'outraged riots'
      | 'cult attraction'
      | 'horde threat'
      | 'ancient peril'
      | 'artifact malcontents'
      | 'coffers bare'
      | 'aristocratic push'
      | 'mine depleted'
      | 'sinister influence'
      | 'hunger plague'
      | 'monster migration'
      | 'war preparations'
      | 'national exhaustion'
      | 'savage grudge'
    text: string
  }[]
  desolate?: boolean
  exhaustion: number
}

export type RegionNeighborsParams = { region: Region; depth?: number }
export type RegionFindParams = FindParams<Region>
export type RegionSortParams = RegionFindParams
export type GetRelationsParams = { target: DiplomaticRelation; region: Region }
export type SetRelationsParams = { target: DiplomaticRelation; r1: Region; r2: Region }
export type RegionClaim = { nation: Region; region: Region }

export interface RegionTrait extends Trait<Region['traits'][number]['tag'], {}> {
  text: string
}

export type AddVassalParams = { vassal: Region; overlord: Region }
