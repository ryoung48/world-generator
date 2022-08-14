import {
  location__culture,
  location__demographics
} from '../../../../../regions/locations/actors/demographics'
import { location__context } from '../../../../../regions/locations/context'
import { weighted_distribution } from '../../../../../utilities/math'
import { Actor } from '../../../types'
import { profession__map } from '../../professions'
import { Profession } from '../../professions/types'
import { actor_skill__lookup } from '..'
import { actor_skills, all_skills } from '../categories'
import { fluency__deficiency } from '../fluency'
import { ActorSkill, SkillContextParams } from '../types'
import { actor_skill__not_master } from './apply'

const unpack_skills = (params: { skills: Profession['skills']; actor: Actor }) => {
  const { skills, actor } = params
  if (typeof skills === 'function') {
    return skills({ actor })
  }
  return skills
}

const actor_skill__validate = (params: SkillContextParams & { key: ActorSkill['key'] }) => {
  const { actor, context, key } = params
  const { valid = 1 } = actor_skill__lookup[key]
  return typeof valid === 'number' ? valid : valid({ actor, context })
}

interface SkillRollParams extends SkillContextParams {
  count: number
  blacklist: ActorSkill['key'][]
}
const actor_skill__roll = ({ actor, context, blacklist, count }: SkillRollParams) => {
  const { primary, secondary, tertiary } = unpack_skills({
    skills: profession__map[actor.occupation.key].skills,
    actor
  })
  const dist: weighted_distribution<ActorSkill['key']> = all_skills.map(key => {
    let weight = actor_skill__validate({ actor, context, key })
    if (blacklist.includes(key)) weight = 0
    else if (primary.includes(key)) weight *= 8
    else if (secondary?.includes(key)) weight *= 6
    else if (tertiary.includes(key)) weight *= 3
    return { v: key, w: weight }
  })
  return window.dice.weighted_sample(dist, count)
}

const language_skills: actor_skills[] = ['living language', 'linguistics']
const language_filter = (learnable_langs: boolean) => (skill: actor_skills) =>
  !language_skills.includes(skill) || learnable_langs

const skill__hidden = (skill: actor_skills) => {
  return actor_skill__lookup[skill].derived
}
/**
 * Rolls skill slots for a background at a given location
 * @param params.actor - actor for the skills being rolled
 * @param params.loc - location at which the actor is gaining exp
 * @param params.profession - profession used to pick relevant skills
 * @returns skill slots
 */
export const actor__roll_skills = (params: {
  actor: Actor
  loc: number
  occupation: Actor['occupation']
}) => {
  const { actor, loc, occupation } = params
  const context = location__context(window.world.locations[loc])
  // keep track of skills already used
  const used_skills: Partial<Record<actor_skills, boolean>> = {}
  // collect all skills that can appear at the current location
  const learnable_langs = actor_skill__validate({ actor, context, key: 'living language' }) > 0
  const valid_uniq_skills: Set<actor_skills> = new Set(
    Object.entries(actor.skills)
      .filter(
        ([k]) =>
          !skill__hidden(k as actor_skills) &&
          actor_skill__not_master({ key: k as actor_skills, actor }) &&
          actor_skill__validate({ actor, context, key: k as actor_skills }) > 0
      )
      .map(([k]) => k as actor_skills)
  )
  // select primary skill
  const available = unpack_skills({ skills: profession__map[occupation.key].skills, actor })
  const primaries = available.primary
    .filter(skill => actor.skills[skill] >= 0 && actor_skill__not_master({ key: skill, actor }))
    .filter(language_filter(learnable_langs))
  const skills: Actor['history']['backgrounds'][number]['skills'][number]['tiers'] = {
    primary:
      primaries.length > 2
        ? [window.dice.choice(primaries)]
        : window.dice
            .shuffle(
              available.primary
                .filter(skill => actor_skill__not_master({ key: skill, actor }))
                .filter(language_filter(learnable_langs))
            )
            .slice(-1),
    secondary: [],
    tertiary: []
  }
  skills.primary.forEach(skill => (used_skills[skill] = true))
  // build the filler skill pool
  const curr_skills = (Object.keys(actor.skills) as actor_skills[]).filter(
    skill => !skill__hidden(skill)
  )
  const all_filler_skills = new Set(curr_skills)
  if (valid_uniq_skills.size < 5)
    actor_skill__roll({ actor, context, blacklist: skills.primary, count: 2 }).forEach(skill => {
      valid_uniq_skills.add(skill)
      all_filler_skills.add(skill)
    })
  // select secondary skills
  const all_secondaries = [...available.primary, ...(available.secondary ?? [])]
    .filter(skill => !used_skills[skill])
    .filter(language_filter(learnable_langs))
  // start with non-selected profession specific primaries and secondaries
  const secondaries = all_secondaries.filter(
    skill =>
      actor.skills[skill] >= 0 &&
      actor_skill__not_master({ key: skill, actor }) &&
      valid_uniq_skills.has(skill)
  )
  skills.secondary =
    secondaries.length > 1
      ? [window.dice.choice(secondaries)]
      : window.dice
          .shuffle(
            all_secondaries
              .filter(skill => actor_skill__not_master({ key: skill, actor }))
              .filter(language_filter(learnable_langs))
          )
          .slice(-1)
  // foreigners must select the language of the location they are in as a secondary skill
  const foreigner = fluency__deficiency({ actor, loc })
  if (foreigner && !used_skills['living language']) {
    skills.secondary.push('living language')
  }
  skills.secondary.forEach(skill => (used_skills[skill] = true))
  // use fillers for the remaining secondary skill slots
  const secondary = Math.max(2 - skills.secondary.length, 0)
  const valid = Array.from(valid_uniq_skills).filter(skill => !used_skills[skill])
  window.dice.sample(valid, secondary).forEach(key => {
    skills.secondary.push(key)
    used_skills[key] = true
  })
  // select tertiary skills
  // extra roll for language skills
  const location = window.world.locations[context.idx]
  const { local } = location__culture(location)
  const { common_cultures } = location__demographics(location)
  const chance = (1 - common_cultures[local.culture.ruling]) * 0.5
  if (!used_skills['living language'] && window.dice.random < chance && learnable_langs) {
    skills.tertiary.push('living language')
    used_skills['living language'] = true
  }
  // use fillers for the remaining tertiary skill slots
  const tertiary = Math.max(3 - skills.tertiary.length, 0)
  const all_skills = Array.from(all_filler_skills)
    .filter(skill => !used_skills[skill] && actor_skill__not_master({ key: skill, actor }))
    .filter(language_filter(learnable_langs))
  window.dice.sample(all_skills, tertiary).forEach(skill => {
    skills.tertiary.push(skill)
    used_skills[skill] = true
  })
  return skills
}
