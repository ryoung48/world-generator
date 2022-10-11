import { WorldEvent } from '../types'

export const diplomaticRelations = ['ally', 'friendly', 'neutral', 'suspicious', 'at war'] as const
export type DiplomaticRelation = typeof diplomaticRelations[number]

export interface DiplomaticEvent extends WorldEvent {
  type: 'diplomacy'
  agent: number
}
