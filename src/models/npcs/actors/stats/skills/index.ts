import { location__context } from '../../../../regions/locations/context'
import { scale, sorting, triangularRoot, WeightedDistribution } from '../../../../utilities/math'
import { species__byCulture } from '../../../species/taxonomy'
import { actor__location } from '../..'
import { Actor } from '../../types'
import { actor__age } from '../age'
import { convertAge, lifePhaseBoundaries } from '../age/life_phases'
import { profession__map } from '../professions'
import { ActorSkills, allSkills } from './categories'
import { actorSkills__academic } from './categories/academic'
import { actorSkills__artistic } from './categories/artistic'
import { actorSkills__social } from './categories/social'
import { actorSkills__worldly } from './categories/worldly'
import { ActorSkill, SkillContextParams, skillRanks } from './types'

export const actorSkill__lookup: Record<ActorSkill['key'], ActorSkill> = {
  ...actorSkills__academic,
  ...actorSkills__artistic,
  ...actorSkills__social,
  ...actorSkills__worldly
}

export const actorSkill__rank = (value: number) => {
  const rank = triangularRoot(value)
  const idx = Math.floor(rank / 5)
  return `${skillRanks[idx] ?? 'master'} (${rank})`
}

const unpackSkills = (params: { occupation: Actor['occupation']; actor: Actor }) => {
  const { occupation, actor } = params
  const { skills } = profession__map[occupation.key]
  if (typeof skills === 'function') {
    return skills({ actor, occupation })
  }
  return skills
}

const actorSkill__validate = (params: SkillContextParams & { key: ActorSkill['key'] }) => {
  const { actor, context, key } = params
  const { valid = 1 } = actorSkill__lookup[key]
  return typeof valid === 'number' ? valid : valid({ actor, context })
}

interface SkillRollParams extends SkillContextParams {
  count: number
  blacklist: ActorSkill['key'][]
}
const rollSkill = ({ actor, context, blacklist, count }: SkillRollParams) => {
  const { primary, secondary } = unpackSkills({
    occupation: actor.occupation,
    actor
  })
  const dist: WeightedDistribution<ActorSkill['key']> = allSkills.map(key => {
    let weight = actorSkill__validate({ actor, context, key })
    if (blacklist.includes(key)) weight = 0
    else if (primary.includes(key)) weight *= 4
    else if (secondary?.includes(key)) weight *= 2
    return { v: key, w: weight }
  })
  return window.dice.weightedSample(dist, count)
}

/**
 * Rolls skills for a given actor
 * @param params.actor - actor for the skills being rolled
 */
export const actorSkill__roll = (params: { actor: Actor }) => {
  const { actor } = params
  const location = actor__location(actor)
  const context = location__context(location)
  const { occupation } = actor
  // select primary skill
  const available = unpackSkills({ occupation, actor })
  const primaries: ActorSkills[] = window.dice.shuffle(available.primary)
  const skills: ActorSkills[] = []
  skills.push(primaries.pop())
  const secondaries = window.dice.shuffle(primaries.concat(available.secondary ?? []))
  skills.push(...secondaries.splice(0, 3))
  const remainder = 6 - skills.length
  skills.push(...rollSkill({ actor, context, blacklist: skills, count: remainder }))
  const weights = window.dice
    .weightedDist({ weights: [0.4, 0.2, 0.2, 0.1, 0.1, 0.1], std: 0.2 })
    .sort(sorting.descending)
  actor.skills = skills.map((skill, i) => ({ skill, weight: weights[i] }))
}

export const actorSkill__exp = (actor: Actor) => {
  const age = actor__age({ actor, expireCap: true })
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  const intellect = scale([8, 18], [0.8, 1.5], Math.max(actor.attributes.intellect, 8))
  return (
    ((Math.min(convertAge(ages, lifePhaseBoundaries, age), lifePhaseBoundaries.old) - 10) / 5) *
    50 *
    intellect
  )
}
