import { Province } from '../regions/provinces/types'
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

export type Hooks<Constraints> = Record<string, Tag<Constraints>>

export type HookParams<Constraints> = {
  place: Province['places'][number]
  hooks: Hooks<Constraints>
  constraints: Required<Constraints>
  samples: number
}

export type CommunityHooks = Hooks<{}>
export type RuinHooks = Hooks<{}>
export type WildernessHooks = Hooks<{}>
export type ReligionHooks = Hooks<{}>
export type CourtHooks = Hooks<{}>
export type WarHooks = Hooks<{}>

export type Hook = {
  type: string
  subtype: string
  styled?: string
  introduction: string
  mission: { tag: string; text: string; complication: string }
  challenges: string
  tags?: {
    tag: string
    text: string
    friend: string
    enemy: string
    complication: string
    thing: string
    place: string
  }[]
}
