import {
  location__culture,
  location__demographics
} from '../../../../../regions/locations/actors/demographics'
import { location__context } from '../../../../../regions/locations/context'
import { WeightedDistribution } from '../../../../../utilities/math'
import { Actor } from '../../../types'
import { profession__map } from '../../professions'
import { Profession } from '../../professions/types'
import { actorSkill__lookup } from '..'
import { ActorSkills, allSkills } from '../categories'
import { fluency__deficiency } from '../fluency'
import { ActorSkill, SkillContextParams } from '../types'
import { actorSkill__notMaster } from './apply'

const unpackSkills = (params: { skills: Profession['skills']; actor: Actor }) => {
  const { skills, actor } = params
  if (typeof skills === 'function') {
    return skills({ actor })
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
const actorSkill__roll = ({ actor, context, blacklist, count }: SkillRollParams) => {
  const { primary, secondary, tertiary } = unpackSkills({
    skills: profession__map[actor.occupation.key].skills,
    actor
  })
  const dist: WeightedDistribution<ActorSkill['key']> = allSkills.map(key => {
    let weight = actorSkill__validate({ actor, context, key })
    if (blacklist.includes(key)) weight = 0
    else if (primary.includes(key)) weight *= 8
    else if (secondary?.includes(key)) weight *= 6
    else if (tertiary.includes(key)) weight *= 3
    return { v: key, w: weight }
  })
  return window.dice.weightedSample(dist, count)
}

const languageSkills: ActorSkills[] = ['living language', 'linguistics']
const languageFilter = (learnableLangs: boolean) => (skill: ActorSkills) =>
  !languageSkills.includes(skill) || learnableLangs

const skill__hidden = (skill: ActorSkills) => {
  return actorSkill__lookup[skill].derived
}
/**
 * Rolls skill slots for a background at a given location
 * @param params.actor - actor for the skills being rolled
 * @param params.loc - location at which the actor is gaining exp
 * @param params.profession - profession used to pick relevant skills
 * @returns skill slots
 */
export const actor__rollSkills = (params: {
  actor: Actor
  loc: number
  occupation: Actor['occupation']
}) => {
  const { actor, loc, occupation } = params
  const context = location__context(window.world.locations[loc])
  // keep track of skills already used
  const usedSkills: Partial<Record<ActorSkills, boolean>> = {}
  // collect all skills that can appear at the current location
  const learnableLangs = actorSkill__validate({ actor, context, key: 'living language' }) > 0
  const validUniqSkills: Set<ActorSkills> = new Set(
    Object.entries(actor.skills)
      .filter(
        ([k]) =>
          !skill__hidden(k as ActorSkills) &&
          actorSkill__notMaster({ key: k as ActorSkills, actor }) &&
          actorSkill__validate({ actor, context, key: k as ActorSkills }) > 0
      )
      .map(([k]) => k as ActorSkills)
  )
  // select primary skill
  const available = unpackSkills({ skills: profession__map[occupation.key].skills, actor })
  const primaries = available.primary
    .filter(skill => actor.skills[skill] >= 0 && actorSkill__notMaster({ key: skill, actor }))
    .filter(languageFilter(learnableLangs))
  const skills: Actor['history']['backgrounds'][number]['skills'][number]['tiers'] = {
    primary:
      primaries.length > 2
        ? [window.dice.choice(primaries)]
        : window.dice
            .shuffle(
              available.primary
                .filter(skill => actorSkill__notMaster({ key: skill, actor }))
                .filter(languageFilter(learnableLangs))
            )
            .slice(-1),
    secondary: [],
    tertiary: []
  }
  skills.primary.forEach(skill => (usedSkills[skill] = true))
  // build the filler skill pool
  const currSkills = (Object.keys(actor.skills) as ActorSkills[]).filter(
    skill => !skill__hidden(skill)
  )
  const allFillerSkills = new Set(currSkills)
  if (validUniqSkills.size < 5)
    actorSkill__roll({ actor, context, blacklist: skills.primary, count: 2 }).forEach(skill => {
      validUniqSkills.add(skill)
      allFillerSkills.add(skill)
    })
  // select secondary skills
  const allSecondaries = [...available.primary, ...(available.secondary ?? [])]
    .filter(skill => !usedSkills[skill])
    .filter(languageFilter(learnableLangs))
  // start with non-selected profession specific primaries and secondaries
  const secondaries = allSecondaries.filter(
    skill =>
      actor.skills[skill] >= 0 &&
      actorSkill__notMaster({ key: skill, actor }) &&
      validUniqSkills.has(skill)
  )
  skills.secondary =
    secondaries.length > 1
      ? [window.dice.choice(secondaries)]
      : window.dice
          .shuffle(
            allSecondaries
              .filter(skill => actorSkill__notMaster({ key: skill, actor }))
              .filter(languageFilter(learnableLangs))
          )
          .slice(-1)
  // foreigners must select the language of the location they are in as a secondary skill
  const foreigner = fluency__deficiency({ actor, loc })
  if (foreigner && !usedSkills['living language']) {
    skills.secondary.push('living language')
  }
  skills.secondary.forEach(skill => (usedSkills[skill] = true))
  // use fillers for the remaining secondary skill slots
  const secondary = Math.max(2 - skills.secondary.length, 0)
  const valid = Array.from(validUniqSkills).filter(skill => !usedSkills[skill])
  window.dice.sample(valid, secondary).forEach(key => {
    skills.secondary.push(key)
    usedSkills[key] = true
  })
  // select tertiary skills
  // extra roll for language skills
  const location = window.world.locations[context.idx]
  const { local } = location__culture(location)
  const { commonCultures } = location__demographics(location)
  const chance = (1 - commonCultures[local.culture.ruling]) * 0.5
  if (!usedSkills['living language'] && window.dice.random < chance && learnableLangs) {
    skills.tertiary.push('living language')
    usedSkills['living language'] = true
  }
  // use fillers for the remaining tertiary skill slots
  const tertiary = Math.max(3 - skills.tertiary.length, 0)
  const allSkills = Array.from(allFillerSkills)
    .filter(skill => !usedSkills[skill] && actorSkill__notMaster({ key: skill, actor }))
    .filter(languageFilter(learnableLangs))
  window.dice.sample(allSkills, tertiary).forEach(skill => {
    skills.tertiary.push(skill)
    usedSkills[skill] = true
  })
  return skills
}
