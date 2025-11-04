import { DiplomaticRelation, Province } from '../provinces/types'

export type GetRelationParams = { n1: Province; n2: Province }
export type SetRelationParams = GetRelationParams & { relation: DiplomaticRelation }
export type SetVassalage = { overlord: Province; vassal: Province; type: DiplomaticRelation }
export type NationNeighborParams = { nation: Province; depth?: number }

export interface MigrationEstimate {
  neighbor: Province
  immigration: number
  emigration: number
  netMigration: number
}
