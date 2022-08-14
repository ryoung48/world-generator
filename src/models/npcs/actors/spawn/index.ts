import { location__hub } from '../../../regions/locations'
import { location__demographics } from '../../../regions/locations/actors/demographics'
import { location__random_origin } from '../../../regions/locations/actors/demographics/origins'
import { location__random_profession } from '../../../regions/locations/actors/professions'
import { Loc } from '../../../regions/locations/types'
import { npc__spawn } from '../..'
import { Culture } from '../../species/humanoids/cultures/types'
import {
  lang__derived_surnames,
  lang__first,
  lang__last,
  lang__surname
} from '../../species/humanoids/languages/words/actors'
import { equipment__spawn } from '../equipment'
import { actor__plan_history } from '../history/events/planning'
import { actor__birth_date, actor__expiration_date, actor__expired } from '../stats/age'
import { npc__random_gender } from '../stats/appearance/gender'
import { profession__ages, profession__set, profession__social_class } from '../stats/professions'
import { social_class } from '../stats/professions/types'
import { Actor } from '../types'
import { ActorParams } from './types'

/**
 * decides the actor's culture on creation
 * will randomly generate based on location if not provided
 * @param params.culture - default culture
 * @param params.location - location to generate a random culture
 * @param params.social_class - nobles will only take from ruling cultures
 * @returns {Culture} selected culture
 */
const actor__culture = (params: {
  culture?: Culture
  location: Loc
  social_class: social_class
}) => {
  const { culture, location, social_class } = params
  const region = window.world.regions[location.region]
  if (culture) return culture
  if (window.world.history_recording) return window.world.cultures[region.culture.ruling]
  const { common_cultures, ruling_cultures } = location__demographics(location)
  const cultures = social_class === 'upper' ? ruling_cultures : common_cultures
  return window.world.cultures[
    parseInt(window.dice.weighted_choice(Object.entries(cultures).map(([v, w]) => ({ v, w }))))
  ]
}
/**
 * determines where the actor was born
 * will randomly generate based on location if not provided
 * must be born in a location whose primary culture matches the given culture
 * @param params.birth_loc - default birth location
 * @param params.location - location to generate a random birth place
 * @param params.culture - culture to target specific locations
 * @returns {Culture} selected culture
 */
const actor__birth_loc = (params: { birth_loc?: Loc; location: Loc; culture: Culture }) => {
  if (params.birth_loc) return params.birth_loc.idx
  if (window.world.history_recording) return params.location.idx
  return location__random_origin({
    loc: params.location,
    culture: params.culture
  }).idx
}
/**
 * determines actor occupation
 * will randomly generate based on location and (optionally) social class if not provided
 * @param params - actor parameters
 */
const actor_fill_occupation = (params: ActorParams) => {
  if (params.occupation === undefined) {
    params.occupation = {
      key: location__random_profession({
        loc: params.location,
        social: params.social_class,
        time: params.relative_time ?? window.world.date
      })
    }
  }
  params.social_class = profession__social_class(params.occupation.key)
}
/**
 * creates an actor at a given location
 * @param params - actor parameters
 * @returns actor index
 */

export const actor__spawn = (params: ActorParams): Actor => {
  if (params.relation) params.relation.before_spawn(params)
  actor_fill_occupation(params)
  const {
    relation,
    location,
    birth_loc,
    birth_time,
    relative_time,
    ages = profession__ages(params.occupation.key),
    living,
    social_class,
    venerable,
    unbound,
    planned,
    unknown_loc,
    level,
    tier,
    alias
  } = params
  const culture = actor__culture({ culture: params.culture, location, social_class })
  const origin = actor__birth_loc({ birth_loc, location, culture })
  const { language } = culture
  const gender = params.gender ?? npc__random_gender()
  // get the current unique id & increment unique id for next npc
  const idx = window.world.actors.length
  // get a random age from the predefined range and compute true age by culture
  const birth_date = birth_time ?? actor__birth_date({ culture, ages, relative_time })
  // create the new npc
  const npc = npc__spawn({
    name: params.first ?? lang__first(language, gender),
    level: level ?? 1,
    tier,
    species: { type: 'humanoid' }
  })
  const actor: Actor = {
    ...npc,
    idx,
    tag: 'actor',
    location: {
      birth: origin,
      residence: unknown_loc ? -1 : location__hub(location).idx,
      curr: unknown_loc ? -1 : location.idx
    },
    occupation: params.occupation,
    progression: {},
    skills: {},
    languages: {},
    gender,
    culture: culture.idx,
    surname: params.last,
    lineage: params.lineage,
    alias,
    spawn_date: params.relative_time ?? window.world.date,
    birth_date,
    expires: actor__expiration_date({
      culture: culture,
      birth_date,
      relative_time,
      living,
      venerable
    }),
    history: {
      planned,
      unbound,
      events: [],
      backgrounds: [],
      next_background: Infinity,
      childhood_end: Infinity
    },
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intellect: 0,
      wisdom: 0,
      charisma: 0
    },
    parent_name: params.parent_name ?? lang__first(language, culture.lineage),
    relations: [],
    equipment: equipment__spawn(),
    carry_capacity: 120,
    threads: []
  }
  profession__set({ actor, profession: actor.occupation })
  const derived_last = lang__derived_surnames(language)
  if (!actor.surname && actor.lineage) actor.surname = actor.lineage
  if (!actor.surname || derived_last) actor.surname = lang__surname({ lang: language, npc: actor })
  if (!actor.lineage) actor.lineage = derived_last ? lang__last(language) : actor.surname
  window.world.actors.push(actor)
  if (relation) relation.after_spawn(actor)
  if (!unknown_loc) actor__plan_history(actor)
  if (!unbound && !unknown_loc && !actor__expired(actor)) location.actors.push(idx)
  return actor
}
