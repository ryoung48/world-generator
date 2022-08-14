import { WorldEvent } from '../../types'

export const diplomatic_relations = ['ally', 'friendly', 'neutral', 'suspicious', 'at war'] as const
export type diplomatic_relation = typeof diplomatic_relations[number]

export interface DiplomaticEvent extends WorldEvent {
  type: 'diplomacy'
  agent: number
}
