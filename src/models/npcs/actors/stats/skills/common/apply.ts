import { triangularNumber } from '../../../../../utilities/math'
import { Actor } from '../../../types'
import { ActorSkills } from '../categories'
import { SkillApplyParams } from '../types'

export const actorSkills__apply = ({ actor, exp, key }: SkillApplyParams) => {
  if (!actor.skills[key]) actor.skills[key] = 0
  actor.skills[key] += exp
}

const skill__mastery = triangularNumber(20)

export const actorSkill__notMaster = (params: { key: ActorSkills; actor: Actor }) => {
  const { key, actor } = params
  return (actor.skills[key] ?? 0) < skill__mastery
}
