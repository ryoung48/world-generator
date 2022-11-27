import { location__getClosestSettlement } from '../../../../regions/locations'
import { location__context } from '../../../../regions/locations/context'
import { Loc } from '../../../../regions/locations/types'
import { colors__randomPreset } from '../../../../utilities/colors'
import { buildDistribution } from '../../../../utilities/math'
import { titleCase } from '../../../../utilities/text'
import { Actor } from '../../types'
import { actor__childTitle, actor__isChild } from '../age'
import { ageRanges } from '../age/life_phases'
import { professions__lower } from './lower'
import { professions__middle } from './middle'
import { ActorProfessions, Profession, socialStrata, SocialStratum } from './types'
import { professions__upper } from './upper'

export const profession__map: Record<ActorProfessions, Profession> = {
  ...professions__lower,
  ...professions__middle,
  ...professions__upper
}

/**
 * returns the social class for a given profession
 * @param profession
 * @returns {SocialStratum}
 */
export const profession__socialClass = (profession: ActorProfessions) => {
  const { stratum } = profession__map[profession]
  return stratum
}

/**
 * returns the suggested age range for a given profession
 * @param profession
 * @returns {SocialStratum}
 */
export const profession__ages = (profession: ActorProfessions) => {
  return profession__map[profession].ages ?? ageRanges.full
}

/**
 * returns the social class for a given profession
 * @param profession
 * @returns {SocialStratum}
 */
export const actor__socialClass = (params: { actor: Actor }) => {
  const { actor } = params
  const { key } = actor.occupation
  return profession__socialClass(key)
}

export const profession__colors = {
  strata: colors__randomPreset({
    tags: [...socialStrata],
    seed: 'social strata'
  }),
  job: colors__randomPreset({
    tags: Object.keys(profession__map),
    seed: 'npc professions'
  })
}

/**
 * Gets the appropriate occupational title for a given actor
 * @param params.actor
 * @param params.time
 * @returns {string} title
 */
export const profession__title = (params: { actor: Actor }) => {
  const { actor } = params
  const time = window.world.date
  const { key, spec } = actor.occupation
  const { title } = profession__map[key]
  //the default occupational title
  const name = typeof title === 'string' ? title : title?.({ actor, spec }) ?? key
  // return the default occupation for adults
  if (actor__isChild({ actor, refDate: time })) return actor__childTitle({ actor, refDate: time })
  // otherwise the child age-specific title
  const split = name.split(' (')
  return `${titleCase(split[0])}${split[1] ? ` (${split[1]}` : ''}`
}

export const profession__set = (params: { actor: Actor; profession: Actor['occupation'] }) => {
  const { actor, profession } = params
  actor.occupation = profession
  const { specialization } = profession__map[profession.key]
  if (specialization && !profession.spec) {
    actor.occupation.spec = specialization({ actor })
  }
}

export const socialClass__randomDrift = (social: SocialStratum) => {
  const rank = socialStrata.findIndex(cls => social === cls)
  return socialStrata[
    window.dice.weightedChoice([
      { w: 0.1, v: Math.max(0, rank - 1) },
      { w: 0.85, v: rank },
      { w: 0.05, v: Math.min(2, rank + 1) }
    ])
  ]
}

const stratum__mod: Record<Profession['stratum'], number> = {
  lower: 16,
  middle: 4,
  upper: 1
}

export const profession__randomBalanced = (params: { loc: Loc; time: number }) => {
  const { time } = params
  const loc = location__getClosestSettlement(params.loc)
  const context = location__context(loc)
  const professionDists = Object.values(profession__map)
    .map(profession => {
      const { key, occurrence } = profession
      const stratum = profession__socialClass(key)
      const weight =
        typeof occurrence === 'number' ? occurrence : occurrence?.({ context, time }) ?? 0
      return { v: key, w: weight * stratum__mod[stratum] }
    })
    .filter(({ w }) => w > 0)
  const dist = buildDistribution(professionDists, 1)
  return dist
}
