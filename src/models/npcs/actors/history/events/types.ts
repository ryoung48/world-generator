import { ActorParams } from '../../spawn/types'
import { genders } from '../../stats/appearance/gender'
import { Actor } from '../../types'

export interface ActorEvent {
  idx: number
  time: number
  type: 'union' | 'child'
  loc?: number
  actor?: number
  gender?: genders
}

export interface ActorEventSpawn {
  actor: Actor
  event: ActorEvent
  override?: Partial<ActorParams>
}
