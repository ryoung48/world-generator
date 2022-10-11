import { location__hub } from '../../../regions/locations'
import { location__randomProfession } from '../../../regions/locations/actors'
import { location__demographics } from '../../../regions/locations/actors/demographics'
import { location__randomOrigin } from '../../../regions/locations/actors/demographics/origins'
import { Loc } from '../../../regions/locations/types'
import { npc__spawn } from '../..'
import { Culture } from '../../species/cultures/types'
import {
  lang__derivedSurnames,
  lang__first,
  lang__last,
  lang__surname
} from '../../species/languages/words/actors'
import { equipment__spawn } from '../equipment'
import { actor__birthDate, actor__expirationDate, actor__expired } from '../stats/age'
import { npc__randomGender } from '../stats/appearance/gender'
import { profession__ages, profession__set, profession__socialClass } from '../stats/professions'
import { SocialClass } from '../stats/professions/types'
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
const actor__culture = (params: { culture?: Culture; location: Loc; socialClass: SocialClass }) => {
  const { culture, location, socialClass } = params
  const region = window.world.regions[location.region]
  if (culture) return culture
  if (window.world.historyRecording) return window.world.cultures[region.culture.ruling]
  const { commonCultures, rulingCultures } = location__demographics(location)
  const cultures = socialClass === 'upper' ? rulingCultures : commonCultures
  return window.world.cultures[
    parseInt(window.dice.weightedChoice(Object.entries(cultures).map(([v, w]) => ({ v, w }))))
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
const actor__birthLoc = (params: { birthLoc?: Loc; location: Loc; culture: Culture }) => {
  if (params.birthLoc) return params.birthLoc.idx
  if (window.world.historyRecording) return params.location.idx
  return location__randomOrigin({
    loc: params.location,
    culture: params.culture
  }).idx
}
/**
 * determines actor occupation
 * will randomly generate based on location and (optionally) social class if not provided
 * @param params - actor parameters
 */
const actorFillOccupation = (params: ActorParams) => {
  if (params.occupation === undefined) {
    params.occupation = {
      key: location__randomProfession({
        loc: params.location,
        social: params.socialClass,
        time: params.relativeTime ?? window.world.date
      })
    }
  }
  params.socialClass = profession__socialClass(params.occupation.key)
}
/**
 * creates an actor at a given location
 * @param params - actor parameters
 * @returns actor index
 */

export const actor__spawn = (params: ActorParams): Actor => {
  if (params.relation) params.relation.beforeSpawn(params)
  actorFillOccupation(params)
  const {
    relation,
    location,
    birthLoc,
    birthTime,
    expires,
    relativeTime,
    ages = profession__ages(params.occupation.key),
    living,
    socialClass,
    venerable,
    unbound,
    planned,
    level,
    tier
  } = params
  const culture = actor__culture({ culture: params.culture, location, socialClass })
  const origin = actor__birthLoc({ birthLoc, location, culture })
  const { language } = culture
  const gender = params.gender ?? npc__randomGender()
  // get the current unique id & increment unique id for next npc
  const idx = window.world.actors.length
  // get a random age from the predefined range and compute true age by culture
  const birthDate = birthTime ?? actor__birthDate({ culture, ages, relativeTime: relativeTime })
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
      residence: location__hub(location).idx,
      curr: location.idx
    },
    occupation: params.occupation,
    progression: {},
    skills: {},
    languages: {},
    gender,
    culture: culture.idx,
    surname: params.last,
    lineage: params.lineage,
    dates: {
      spawn: params.relativeTime ?? window.world.date,
      birth: birthDate,
      death:
        expires ??
        actor__expirationDate({
          culture: culture,
          birthDate: birthDate,
          relativeTime: relativeTime,
          living,
          venerable
        })
    },
    history: {
      planned,
      unbound,
      events: [],
      backgrounds: [],
      nextBackground: Infinity,
      childhoodEnd: Infinity
    },
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intellect: 0,
      wisdom: 0,
      charisma: 0
    },
    parent: {
      name: params?.parent?.name ?? lang__first(language, culture.lineage),
      plan: params?.parent?.plan
    },
    relations: [],
    equipment: equipment__spawn(),
    carryCapacity: 120,
    threads: []
  }
  profession__set({ actor, profession: actor.occupation })
  const derivedLast = lang__derivedSurnames(language)
  if (!actor.surname && actor.lineage) actor.surname = actor.lineage
  if (!actor.surname || derivedLast) actor.surname = lang__surname({ lang: language, npc: actor })
  if (!actor.lineage) actor.lineage = derivedLast ? lang__last(language) : actor.surname
  window.world.actors.push(actor)
  if (relation) relation.afterSpawn(actor)
  if (!unbound && !actor__expired(actor)) location.actors.push(idx)
  return actor
}
