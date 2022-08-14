import {
  location__culture,
  location__demographics
} from '../../../../regions/locations/actors/demographics'
import { Loc } from '../../../../regions/locations/types'
import { triangular_number, triangular_root } from '../../../../utilities/math'
import { Actor } from '../../types'
import { SkillContextParams } from './types'

const fluency_ranks = ['rudimentary', 'basic', 'conversational', 'fluent', 'native'] as const

const fluency_mod = 2
export const native_speaker = triangular_number(
  fluency_ranks.findIndex(r => r === 'native') * fluency_mod
)
const fluent_speaker = triangular_number(fluency_ranks.findIndex(r => r === 'fluent') * fluency_mod)
const conversational_speaker = triangular_number(
  fluency_ranks.findIndex(r => r === 'conversational') * fluency_mod
)

const speaker_target = (actor: Actor) =>
  actor.attributes.intellect >= 10 ? fluent_speaker : conversational_speaker

export const fluency__rank = (params: { actor: Actor; culture: number }) => {
  const { actor, culture } = params
  const exp = actor.languages[culture] ?? 0
  const rank = triangular_root(exp)
  const idx = Math.floor(rank / fluency_mod)
  return `${fluency_ranks[idx] ?? 'native'} (${rank})`
}

const valid_languages =
  (lang: Actor['languages'], target: number) =>
  ([idx, percent]: [string, number]) =>
    percent > 0.01 && (lang[parseInt(idx)] ?? 0) < target

const languages_exist = (params: { actor: Actor; loc: Loc }) => {
  const { actor, loc } = params
  const { common_cultures } = location__demographics(loc)
  return Object.entries(common_cultures).some(
    valid_languages(actor.languages, speaker_target(actor))
  )
}

const fluency__random_lang = (params: { actor: Actor; loc: number }) => {
  const { actor, loc } = params
  const target = speaker_target(actor)
  // generate culture distributions if needed
  const { common_cultures } = location__demographics(window.world.locations[loc])
  const { local, ruling } = location__culture(window.world.locations[loc])
  if ((actor.languages[local.culture.ruling] ?? 0) < target) return local.culture.native
  if ((actor.languages[ruling.culture.ruling] ?? 0) < target) return ruling.culture.ruling
  const prospects = Object.entries(common_cultures)
    .filter(valid_languages(actor.languages, target))
    .map(([culture, percent]) => ({ v: culture, w: percent ** 2 }))
  return parseInt(window.dice.weighted_choice(prospects))
}

export const fluency__apply_skill = (params: {
  actor: Actor
  exp: number
  loc: number
  culture?: number
  force?: boolean
}): void => {
  const { actor, exp, loc, culture = fluency__random_lang({ actor, loc }), force } = params
  if (!actor.languages[culture]) actor.languages[culture] = 0
  const target = speaker_target(actor)
  const awarded = Math.min(target, actor.languages[culture] + exp)
  actor.languages[culture] = awarded
  const remainder = exp - awarded
  if (remainder > 0) {
    if (!force && languages_exist({ actor, loc: window.world.locations[loc] }))
      fluency__apply_skill({ actor, exp: remainder, loc })
    else actor.languages[culture] += remainder
  }
}

export const fluency__languages_exist = ({ actor, context }: SkillContextParams) =>
  languages_exist({ actor, loc: window.world.locations[context.idx] })

export const fluency__deficiency = (params: { actor: Actor; loc: number }) => {
  const { actor, loc } = params
  const { local, ruling } = location__culture(window.world.locations[loc])
  const target = speaker_target(actor)
  return (
    (actor.languages[local.culture.native] ?? 0) < target ||
    (actor.languages[ruling.culture.ruling] ?? 0) < target
  )
}
