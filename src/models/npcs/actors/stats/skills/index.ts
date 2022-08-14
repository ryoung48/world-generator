import { triangular_root } from '../../../../utilities/math'
import { Actor } from '../../types'
import { actor_skills__academic } from './categories/academic'
import { actor_skills__artistic } from './categories/artistic'
import { actor_skills__social } from './categories/social'
import { actor_skills__worldly } from './categories/worldly'
import { ActorSkill, skill_ranks } from './types'

export const actor_skill__lookup: Record<ActorSkill['key'], ActorSkill> = {
  ...actor_skills__academic,
  ...actor_skills__artistic,
  ...actor_skills__social,
  ...actor_skills__worldly
}

export const actor__skill_rank = (params: { actor: Actor; skill: ActorSkill['key'] }) => {
  const { actor, skill } = params
  const exp = actor.skills[skill] ?? 0
  const rank = triangular_root(exp)
  const idx = Math.floor(rank / 5)
  return `${skill_ranks[idx] ?? 'master'} (${rank})`
}
