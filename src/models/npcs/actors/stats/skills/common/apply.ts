import { triangular_number } from '../../../../../utilities/math'
import { Actor } from '../../../types'
import { actor_skills } from '../categories'
import { SkillApplyParams } from '../types'

export const actor_skills__apply = ({ actor, exp, key }: SkillApplyParams) => {
  if (!actor.skills[key]) actor.skills[key] = 0
  actor.skills[key] += exp
}

const skill__mastery = triangular_number(20)

export const actor_skill__not_master = (params: { key: actor_skills; actor: Actor }) => {
  const { key, actor } = params
  return (actor.skills[key] ?? 0) < skill__mastery
}
