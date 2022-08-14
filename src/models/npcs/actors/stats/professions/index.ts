import { color__random_preset } from '../../../../utilities/colors'
import { year_ms } from '../../../../utilities/math/time'
import { title_case } from '../../../../utilities/text'
import { Actor } from '../../types'
import { actor__base_age, actor__child_title, actor__is_child } from '../age'
import { age_ranges } from '../age/life_phases'
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
  actor_professions,
  Profession,
  profession_categories,
  profession_subcategories,
  social_class
} from './types'
import { underworld } from './underworld'

export const profession__map: Record<actor_professions, Profession> = {
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

export const profession__after_spawn = (npc: Actor) => {
  const profession = profession__map[npc.occupation.key]
  profession?.after_spawn?.(npc) // shops, inventory, etc
}

/**
 * compute years spent in a profession
 * @param actor
 * @param profession
 */
const profession__duration = (params: {
  actor: Actor
  profession: actor_professions
  time: number
}) => {
  const { actor, profession, time } = params
  return (
    actor.history.backgrounds
      .filter(background => background.occupation?.key === profession)
      .reduce((sum, background) => {
        const end = background?.end ?? time
        return sum + (end - background.start)
      }, 0) / year_ms
  )
}

export const profession__progression = (params: {
  actor: Actor
  profession: Actor['occupation']
  time: number
}) => {
  const { actor, profession, time } = params
  const curr = { profession, next: Infinity, total: 0, transition: true }
  const curr_age = actor__base_age({ actor, ref_date: time })
  const ceiling = actor__base_age({ actor, ref_date: actor.spawn_date }) - 1
  while (profession__map[curr.profession.key].progression) {
    const current = profession__map[curr.profession.key]
    if (!actor.progression[curr.profession.key]) {
      const chosen = window.dice.weighted_choice(
        Object.entries(current.progression).map(([key, option]) => ({
          w: option.weight,
          v: key as actor_professions
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
    const age_diff = actor.progression[curr.profession.key].age - curr_age
    const exp_diff =
      actor.progression[curr.profession.key].duration -
      profession__duration({ actor, profession: previous, time })
    const debt = exp_diff <= 0 ? age_diff : exp_diff
    if (debt <= 0) break
    curr.profession = { key: previous, spec }
    curr.next = debt
    curr.total += debt
    curr.transition = current.progression[previous].transition
  }
  return curr
}
const lifestyle__class: Record<Profession['lifestyle'], social_class> = {
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
 * @returns {social_class}
 */
export const profession__social_class = (profession: actor_professions) => {
  const { lifestyle } = profession__map[profession]
  return lifestyle__class[lifestyle]
}

/**
 * returns the suggested age range for a given profession
 * @param profession
 * @returns {social_class}
 */
export const profession__ages = (profession: actor_professions) => {
  return profession__map[profession].ages ?? age_ranges.full
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
 * @returns {social_class}
 */
export const actor__social_class = (params: { actor: Actor; time: number }) => {
  return lifestyle__class[actor__lifestyle(params)]
}

/**
 * returns the lifestyle for a given profession
 * @param profession
 * @returns {social_class}
 */
export const actor__lifestyle = (params: { actor: Actor; time: number }) => {
  const { actor, time } = params
  const { key } = actor__profession({ actor, time })
  return profession__map[key].lifestyle
}

export const profession__colors = {
  category: color__random_preset({
    tags: [...profession_categories],
    seed: 'profession categories'
  }),
  subcategory: color__random_preset({
    tags: [...profession_subcategories],
    seed: 'profession subcategories'
  }),
  job: color__random_preset({
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
  ignore_child?: boolean
}) => {
  const { actor, time = window.world.date, ignore_child } = params
  const { key, spec } =
    time === window.world.date ? actor.occupation : actor__profession({ actor, time })
  const { title } = profession__map[key]
  //the default occupational title
  const name = typeof title === 'string' ? title : title?.({ actor, spec }) ?? key
  // return the default occupation for adults
  if (!ignore_child && actor__is_child({ actor, ref_date: time }))
    return actor__child_title({ actor, ref_date: time })
  // otherwise the child age-specific title
  const split = name.split(' (')
  return `${title_case(split[0])}${split[1] ? ` (${split[1]}` : ''}`
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

const social_ranks: social_class[] = ['lower', 'middle', 'upper']

export const social_class__random_drift = (social: social_class) => {
  const rank = social_ranks.findIndex(cls => social === cls)
  return social_ranks[
    window.dice.weighted_choice([
      { w: 0.1, v: Math.max(0, rank - 1) },
      { w: 0.85, v: rank },
      { w: 0.05, v: Math.min(2, rank + 1) }
    ])
  ]
}
