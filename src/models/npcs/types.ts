import type { Province } from '../regions/provinces/types'
import type { Item } from './equipment/types'
import type { Profession } from './professions/types'
import type { Personality, Quirk } from './traits/types'

export const lifeCycle = [
  'child',
  'adolescent',
  'young adult',
  'adult',
  'middle age',
  'old',
  'venerable'
] as const

export type LifePhase = typeof lifeCycle[number]

export type Gender = 'male' | 'female'

export interface Actor {
  idx: number
  name: string
  profession: { key: Profession; title: string }
  culture: number
  gender: Gender
  age: LifePhase
  personality: Personality[]
  quirks: { tag: Quirk; text: string }[]
  appearance: string
  health: number
  equipment?: Item[]
  abilities?: { tag: string; text: string; tier: number }[]
  outfit?: string
}

export interface ActorSpawnParams {
  place: Province['places'][number]
  role?: 'friend' | 'enemy'
  profession?: Profession
  age?: Actor['age']
  gender?: Gender
  pc?: boolean
  foreign?: boolean
}
