import { LocationContext } from '../../../../regions/locations/context/types'
import { Actor } from '../../types'
import { ActorSkills } from './categories'

export type SkillApplyParams = { actor: Actor; exp: number; key: ActorSkills; loc: number }
export type SkillContextParams = { actor: Actor; context: LocationContext }
export type ValidActorSkill = (_params: SkillContextParams) => number

export interface ActorSkill {
  key: ActorSkills
  valid?: number | ValidActorSkill
  apply?: (_params: SkillApplyParams) => void
}

export const skillRanks = ['novice', 'apprentice', 'seasoned', 'expert', 'master'] as const

export type SkillRank = typeof skillRanks[number]
