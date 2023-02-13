import type { Thread } from '../types'

export interface Actor {
  idx: number
  role: 'patron' | 'rival' | 'friend' | 'enemy' | 'neutral'
  loc: number
}

export interface FindActorParams {
  thread: Thread
  role: Actor['role']
  spawn?: boolean
  subject?: boolean
  betrayal?: Actor['role']
}

export interface DecorateActorParams extends FindActorParams {
  label: string
}
