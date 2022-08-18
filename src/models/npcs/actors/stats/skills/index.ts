import { triangularRoot } from '../../../../utilities/math'
import { Actor } from '../../types'
import { actorSkills__academic } from './categories/academic'
import { actorSkills__artistic } from './categories/artistic'
import { actorSkills__social } from './categories/social'
import { actorSkills__worldly } from './categories/worldly'
import { ActorSkill, skillRanks } from './types'

export const actorSkill__lookup: Record<ActorSkill['key'], ActorSkill> = {
  ...actorSkills__academic,
  ...actorSkills__artistic,
  ...actorSkills__social,
  ...actorSkills__worldly
}

export const actorSkill__rank = (params: { actor: Actor; skill: ActorSkill['key'] }) => {
  const { actor, skill } = params
  const exp = actor.skills[skill] ?? 0
  const rank = triangularRoot(exp)
  const idx = Math.floor(rank / 5)
  return `${skillRanks[idx] ?? 'master'} (${rank})`
}
