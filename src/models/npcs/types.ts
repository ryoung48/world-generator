import { Profession } from './professions/types'
import { Personality, Quirk } from './traits/types'

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

export interface NPC {
  idx: number
  name: string
  profession: { key: Profession; title: string }
  culture: number
  gender: Gender
  age: LifePhase
  personality: Personality[]
  quirks: { tag: Quirk; text: string }[]
  appearance: string
}
