import type { Province } from '../regions/provinces/types'
import type { ThreadContext } from '../threads/types'
import type { TaggedEntity } from '../utilities/codex/entities'
import type { Profession } from './professions/types'
import type { Personality, Quirk } from './traits/types'

const lifeCycle = [
  'childhood',
  'adolescence',
  'young adult',
  'adult',
  'middle age',
  'old',
  'venerable'
] as const

export type LifePhase = typeof lifeCycle[number]

export type Gender = 'male' | 'female'

export interface NPC extends TaggedEntity {
  tag: 'actor'
  profession: { key: Profession; title: string }
  culture: number
  gender: Gender
  age: LifePhase
  personality: Personality[]
  quirks: { tag: Quirk; text: string }[]
  appearance: string
}

export interface NPCParams {
  loc: Province
  context?: ThreadContext
  profession?: Profession
  age?: NPC['age']
  pc?: boolean
}
