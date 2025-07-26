import { Hub } from '../provinces/hubs/type'
import { Trait } from '../utilities/traits/types'

export interface HookActor {
  title: string
  monstrous?: boolean
  foreign?: boolean
  elder?: boolean
  veteran?: boolean
  youth?: boolean
  child?: boolean
}

interface Tag<Constraints> extends Trait<string, Constraints> {
  text: string
  enemies: HookActor[]
  friends: HookActor[]
  complications: string[]
  things: string[]
  places: string[]
  quests?: {
    type: string
    alignment: string
    patron: string
    text: string
    setting: string
    introductions?: string[]
    complications?: string[]
    clues?: string[]
  }[]
}

export type Hooks = Record<string, Tag<{}>>

export type HookParams = {
  type: 'wilderness' | 'ruin' | 'community'
  place: Hub
  samples: number
}
