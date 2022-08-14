import { LocationContext } from '../../../../regions/locations/context/types'
import { Actor } from '../../types'
import { actor_skills } from './categories'

export type SkillApplyParams = { actor: Actor; exp: number; key: actor_skills; loc: number }
export type SkillContextParams = { actor: Actor; context: LocationContext }
export type ValidActorSkill = (_params: SkillContextParams) => number

export interface ActorSkill {
  key: actor_skills
  parent?: actor_skills
  valid?: number | ValidActorSkill
  derived?: boolean
  apply?: (_params: SkillApplyParams) => void
}

export const skill_ranks = ['novice', 'apprentice', 'seasoned', 'expert', 'master'] as const

export type skill_rank = typeof skill_ranks[number]
