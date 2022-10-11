import { location__getClosestSettlement } from '../../../../regions/locations'
import { location__context } from '../../../../regions/locations/context'
import { Loc } from '../../../../regions/locations/types'
import { colors__randomPreset } from '../../../../utilities/colors'
import { buildDistribution } from '../../../../utilities/math'
import { yearMS } from '../../../../utilities/math/time'
import { titleCase } from '../../../../utilities/text'
import { Actor } from '../../types'
import { actor__baseAge, actor__childTitle, actor__isChild } from '../age'
import { ageRanges } from '../age/life_phases'
import { artists } from './artistic/artists'
import { performers } from './artistic/performers'
import { craftsman } from './craftsman'
import { government } from './government'
import { laborers } from './laborers'
import { servants } from './laborers/servants'
import { transport } from './laborers/transport'
import { aristocracy } from './landowners'
import { merchants } from './merchants'
import { scholars } from './scholars/academics'
import { religious } from './scholars/religious'
import { wizards } from './scholars/wizards'
import { soldiers } from './soldiers'
import {
  ActorProfessions,
  Profession,
  professionCategories,
  professionSubcategories,
  SocialClass
} from './types'
import { underworld } from './underworld'

export const profession__map: Record<ActorProfessions, Profession> = {
  ...transport,
  ...servants,
  ...religious,
  ...merchants,
  ...government,
  ...underworld,
  ...soldiers,
  ...artists,
  ...craftsman,
  ...laborers,
  ...performers,
  ...wizards,
  ...scholars,
  ...aristocracy
}
/**
 * finalizes the npc for their given profession
 *  ran as part of actor__finalize
 * @param npc - actor
 */

export const profession__afterSpawn = (npc: Actor) => {
  const profession = profession__map[npc.occupation.key]
  profession?.afterSpawn?.(npc) // shops, inventory, etc
}

/**
 * compute years spent in a profession
 * @param actor
 * @param profession
 */
const profession__duration = (params: {
  actor: Actor
  profession: ActorProfessions
  time: number
}) => {
  const { actor, profession, time } = params
  return (
    actor.history.backgrounds
      .filter(background => background.occupation?.key === profession)
      .reduce((sum, background) => {
        const end = background?.end ?? time
        return sum + (end - background.start)
      }, 0) / yearMS
  )
}

export const profession__progression = (params: {
  actor: Actor
  profession: Actor['occupation']
  time: number
}) => {
  const { actor, profession, time } = params
  const curr = { profession, next: Infinity, total: 0, transition: true }
  const currAge = actor__baseAge({ actor, refDate: time })
  const ceiling = actor__baseAge({ actor, refDate: actor.dates.spawn }) - 1
  while (profession__map[curr.profession.key].progression) {
    const current = profession__map[curr.profession.key]
    if (!actor.progression[curr.profession.key]) {
      const chosen = window.dice.weightedChoice(
        Object.entries(current.progression).map(([key, option]) => ({
          w: option.weight,
          v: key as ActorProfessions
        }))
      )
      const duration = current.progression[chosen].years
      const end = current.ages?.[0]
      const variation = 5
      actor.progression[curr.profession.key] = {
        profession: chosen,
        duration: Math.max(1, window.dice.randint(duration - variation, duration + variation)),
        age: Math.min(end ? window.dice.randint(end - variation, end + variation) : 0, ceiling)
      }
      const { specialization } = profession__map[chosen]
      if (specialization) {
        actor.progression[curr.profession.key].spec = specialization({ actor })
      }
    }
    const { profession: previous, spec } = actor.progression[curr.profession.key]
    const ageDiff = actor.progression[curr.profession.key].age - currAge
    const expDiff =
      actor.progression[curr.profession.key].duration -
      profession__duration({ actor, profession: previous, time })
    const debt = expDiff <= 0 ? ageDiff : expDiff
    if (debt <= 0) break
    curr.profession = { key: previous, spec }
    curr.next = debt
    curr.total += debt
    curr.transition = current.progression[previous].transition
  }
  return curr
}
const lifestyle__class: Record<Profession['lifestyle'], SocialClass> = {
  impoverished: 'lower',
  poor: 'lower',
  modest: 'lower',
  comfortable: 'middle',
  prosperous: 'middle',
  rich: 'upper'
}
/**
 * returns the social class for a given profession
 * @param profession
 * @returns {SocialClass}
 */
export const profession__socialClass = (profession: ActorProfessions) => {
  const { lifestyle } = profession__map[profession]
  return lifestyle__class[lifestyle]
}

/**
 * returns the suggested age range for a given profession
 * @param profession
 * @returns {SocialClass}
 */
export const profession__ages = (profession: ActorProfessions) => {
  return profession__map[profession].ages ?? ageRanges.full
}

export const actor__profession = (params: { actor: Actor; time: number }) => {
  const { actor, time } = params
  const profession =
    params.actor.history.backgrounds.find(
      ({ start, end = Infinity }) => time >= start && time < end
    )?.occupation ?? actor.occupation
  return profession__progression({ actor, profession, time }).profession
}

/**
 * returns the social class for a given profession
 * @param profession
 * @returns {SocialClass}
 */
export const actor__socialClass = (params: { actor: Actor; time: number }) => {
  return lifestyle__class[actor__lifestyle(params)]
}

/**
 * returns the lifestyle for a given profession
 * @param profession
 * @returns {SocialClass}
 */
export const actor__lifestyle = (params: { actor: Actor; time: number }) => {
  const { actor, time } = params
  const { key } = actor__profession({ actor, time })
  return profession__map[key].lifestyle
}

export const profession__colors = {
  category: colors__randomPreset({
    tags: [...professionCategories],
    seed: 'profession categories'
  }),
  subcategory: colors__randomPreset({
    tags: [...professionSubcategories],
    seed: 'profession subcategories'
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
 * @param params.ignore_child - ignore child titles
 * @returns {string} title
 */
export const profession__title = (params: {
  actor: Actor
  time?: number
  ignoreChild?: boolean
}) => {
  const { actor, time = window.world.date, ignoreChild } = params
  const { key, spec } =
    time === window.world.date ? actor.occupation : actor__profession({ actor, time })
  const { title } = profession__map[key]
  //the default occupational title
  const name = typeof title === 'string' ? title : title?.({ actor, spec }) ?? key
  // return the default occupation for adults
  if (!ignoreChild && actor__isChild({ actor, refDate: time }))
    return actor__childTitle({ actor, refDate: time })
  // otherwise the child age-specific title
  const split = name.split(' (')
  return `${titleCase(split[0])}${split[1] ? ` (${split[1]}` : ''}`
}

export const profession__set = (params: { actor: Actor; profession: Actor['occupation'] }) => {
  const { actor, profession } = params
  delete actor.occupation.spec
  actor.occupation = profession
  const { specialization } = profession__map[profession.key]
  if (specialization && !profession.spec) {
    actor.occupation.spec = specialization({ actor })
  }
}

const socialRanks: SocialClass[] = ['lower', 'middle', 'upper']

export const socialClass__randomDrift = (social: SocialClass) => {
  const rank = socialRanks.findIndex(cls => social === cls)
  return socialRanks[
    window.dice.weightedChoice([
      { w: 0.1, v: Math.max(0, rank - 1) },
      { w: 0.85, v: rank },
      { w: 0.05, v: Math.min(2, rank + 1) }
    ])
  ]
}

const lifestyle__mod: Record<Profession['lifestyle'], number> = {
  impoverished: 8,
  poor: 16,
  modest: 8,
  comfortable: 4,
  prosperous: 2,
  rich: 1
}

const weights: Partial<Record<Profession['category'] | Profession['subcategory'], number>> = {
  academic: 0.25,
  aristocrats: 1,
  artisans: 0.18,
  artistic: 0.25,
  bureaucrats: 0.25,
  guards: 0.5,
  laborers: 0.1,
  mercenary: 0.25,
  merchants: 0.3,
  military: 0.5,
  monks: 0.25,
  priests: 0.25,
  templars: 0.5,
  underclass: 0.125,
  wizards: 0.5
}

export const profession__randomBalanced = (params: { loc: Loc; time: number }) => {
  const { time } = params
  const loc = location__getClosestSettlement(params.loc)
  const context = location__context(loc)
  const professionDists = Object.values(profession__map)
    .map(profession => {
      const { key, occurrence, lifestyle, subcategory, category } = profession
      const weight =
        typeof occurrence === 'number' ? occurrence : occurrence?.({ context, time }) ?? 0
      const match = weights[subcategory] ?? weights[category] ?? 0
      return { v: key, w: weight * lifestyle__mod[lifestyle] * match }
    })
    .filter(({ w }) => w > 0)
  const dist = buildDistribution(professionDists, 1)
  return dist
}
