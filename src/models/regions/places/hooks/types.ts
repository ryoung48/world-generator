import { Trait } from '../../../utilities/traits/types'
import { Province } from '../../provinces/types'

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
  challenges?: { skill: string; text: string; setting: string }[]
  hostiles?: { type: string; text: string; setting: string }[]
}

export type Hooks<Constraints> = Record<string, Tag<Constraints>>

export type HookParams<Constraints> = {
  place: Province['places'][number]
  hooks: Hooks<Constraints>
  constraints: Required<Constraints>
  samples: number
}

export type CommunityHooks = Hooks<{
  warfare?: boolean
  urban?: boolean
  coastal?: boolean
  tribal?: boolean
  capital?: boolean
}>

export type RuinHooks = Hooks<{}>
export type WildernessHooks = Hooks<{}>
export type ReligionHooks = Hooks<{
  religion?: boolean
  monotheistic?: boolean
  dualistic?: boolean
  urban?: boolean
}>
export type CourtHooks = Hooks<{}>
