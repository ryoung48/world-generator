import { profession__map, profession__socialClass } from '../../../npcs/actors/stats/professions'
import {
  ActorProfessions,
  Profession,
  SocialStratum
} from '../../../npcs/actors/stats/professions/types'
import { buildDistribution, scale, WeightedDistribution } from '../../../utilities/math'
import { location__getClosestSettlement, location__isSettlement } from '..'
import { location__context } from '../context'
import { LocationContext } from '../context/types'
import { Loc } from '../types'

/**
 * weights the chance of finding an occupation at a given location
 * @param params.profession - npc profession to be weighted
 * @param params.context - location context used to determine weight
 * @returns
 */
const professionWeight = (params: {
  profession: Profession
  context: LocationContext
  time: number
}) => {
  const { profession, context, time } = params
  const { key, occurrence } = profession
  const weight = typeof occurrence === 'number' ? occurrence : occurrence?.({ context, time }) ?? 0
  return { v: key, w: weight }
}

const socialFilter =
  (social: SocialStratum) =>
  ({ v }: WeightedDistribution<Profession['key']>[number]) =>
    profession__socialClass(v) === social

export const location__professions = (params: {
  loc: Loc
  time: number
  social: SocialStratum
}) => {
  const { time, social } = params
  const loc = location__getClosestSettlement(params.loc)
  const context = location__context(loc)
  const professionDists = Object.values(profession__map)
    .map(profession => professionWeight({ profession, context, time }))
    .filter(({ w }) => w > 0)
  return buildDistribution(professionDists.filter(socialFilter(social)), 1)
}

// used as a fallback when no social class and no profession is given a npc creation
export const socialClassDistributions = (loc: Loc): WeightedDistribution<SocialStratum> => {
  const pop = location__isSettlement(loc) ? loc.population : 0
  const upper = scale([0, 100000], [0.0001, 0.0005], pop)
  const middle = scale([0, 100000], [0.05, 0.3], pop)
  return [
    { v: 'upper', w: upper },
    { v: 'middle', w: middle },
    { v: 'lower', w: 1 - upper - middle }
  ]
}

const defaultProfessions: Record<SocialStratum, ActorProfessions> = {
  lower: 'farmer',
  middle: 'merchant',
  upper: 'noble'
}

export const location__randomProfession = (params: {
  loc: Loc
  social?: SocialStratum
  time: number
}) => {
  const { loc, social = window.dice.weightedChoice(socialClassDistributions(loc)), time } = params
  const professions = location__professions({ loc, time, social })
  return professions.length === 0
    ? defaultProfessions[social]
    : window.dice.weightedChoice(professions)
}

export const location__validProfession = (params: {
  loc: Loc
  profession: Profession['key']
  time: number
}) => {
  const { loc, profession, time } = params
  const social = profession__socialClass(profession)
  const professions = location__professions({ loc, time, social })
  return (
    profession__map[profession].occurrence === undefined ||
    professions.find(({ v }) => v === profession)?.w > 0
  )
}
