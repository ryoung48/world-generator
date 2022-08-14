import { profession__map, profession__social_class } from '../../../npcs/actors/stats/professions'
import {
  actor_professions,
  Profession,
  social_class
} from '../../../npcs/actors/stats/professions/types'
import { build_distribution, scale, weighted_distribution } from '../../../utilities/math'
import { location__get_closest_settlement, location__is_settlement } from '..'
import { location__context } from '../context'
import { LocationContext } from '../context/types'
import { Loc } from '../types'

const prevalence_mods: Record<Profession['prevalence'], number> = {
  rare: 1,
  uncommon: 3,
  common: 9,
  abundant: 27
}

/**
 * weights the chance of finding an occupation at a given location
 * @param params.profession - npc profession to be weighted
 * @param params.context - location context used to determine weight
 * @returns
 */
const profession_weight = (params: {
  profession: Profession
  context: LocationContext
  time: number
}) => {
  const { profession, context, time } = params
  const { key, occurrence, prevalence } = profession
  const weight = typeof occurrence === 'number' ? occurrence : occurrence?.({ context, time }) ?? 0
  const prevalence_mod = prevalence_mods[prevalence ?? 'common']
  return { v: key, w: weight * prevalence_mod }
}

const social_filter =
  (social: social_class) =>
  ({ v }: weighted_distribution<Profession['key']>[number]) =>
    profession__social_class(v) === social

export const location__professions = (params: { loc: Loc; time: number; social: social_class }) => {
  const { time, social } = params
  const loc = location__get_closest_settlement(params.loc)
  const context = location__context(loc)
  const profession_dists = Object.values(profession__map)
    .map(profession => profession_weight({ profession, context, time }))
    .filter(({ w }) => w > 0)
  return build_distribution(profession_dists.filter(social_filter(social)), 1)
}

// used as a fallback when no social class and no profession is given a npc creation
export const social_class_distributions = (loc: Loc): weighted_distribution<social_class> => {
  const pop = location__is_settlement(loc) ? loc.population : 0
  const upper = scale([0, 100000], [0.0001, 0.0005], pop)
  const middle = scale([0, 100000], [0.05, 0.3], pop)
  return [
    { v: 'upper', w: upper },
    { v: 'middle', w: middle },
    { v: 'lower', w: 1 - upper - middle }
  ]
}

const default_professions: Record<social_class, actor_professions> = {
  lower: 'farmer (tenant)',
  middle: 'merchant',
  upper: 'noble (minor)'
}

export const location__random_profession = (params: {
  loc: Loc
  social?: social_class
  time: number
}) => {
  const {
    loc,
    social = window.dice.weighted_choice(social_class_distributions(loc)),
    time
  } = params
  const professions = location__professions({ loc, time, social })
  return professions.length === 0
    ? default_professions[social]
    : window.dice.weighted_choice(professions)
}

export const location__valid_profession = (params: {
  loc: Loc
  profession: Profession['key']
  time: number
}) => {
  const { loc, profession, time } = params
  const social = profession__social_class(profession)
  const professions = location__professions({ loc, time, social })
  return (
    profession__map[profession].occurrence === undefined ||
    professions.find(({ v }) => v === profession)?.w > 0
  )
}
