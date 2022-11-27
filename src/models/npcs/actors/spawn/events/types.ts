import { Gender } from '../../stats/appearance/gender'
import { Actor } from '../../types'
import { ActorParams } from '../types'

export interface ActorEvent {
  idx: number
  time: number
  type: 'union' | 'child'
  loc?: number
  actor?: number
  gender?: Gender
  expires?: number
}

export type ActorEventPlan = Omit<ActorEvent, 'idx'>

export interface ActorEventSpawn {
  actor: Actor
  event: ActorEvent
  override?: Partial<ActorParams>
}

export interface PlanChildParams {
  culture: number
  birth: number
  death: number
  events: ActorEvent[]
}

export interface GetActorEventParams {
  actor: Actor
  type?: ActorEvent['type']
}
