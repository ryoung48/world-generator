import {
  location__culture,
  location__demographics
} from '../../../../regions/locations/actors/demographics'
import { Loc } from '../../../../regions/locations/types'
import { triangularNumber, triangularRoot } from '../../../../utilities/math'
import { Actor } from '../../types'
import { SkillContextParams } from './types'

const fluencyRanks = ['rudimentary', 'basic', 'conversational', 'fluent', 'native'] as const

const fluencyMod = 2
export const nativeSpeaker = triangularNumber(
  fluencyRanks.findIndex(r => r === 'native') * fluencyMod
)
const fluentSpeaker = triangularNumber(fluencyRanks.findIndex(r => r === 'fluent') * fluencyMod)
const conversationalSpeaker = triangularNumber(
  fluencyRanks.findIndex(r => r === 'conversational') * fluencyMod
)

const speakerTarget = (actor: Actor) =>
  actor.attributes.intellect >= 10 ? fluentSpeaker : conversationalSpeaker

export const fluency__rank = (params: { actor: Actor; culture: number }) => {
  const { actor, culture } = params
  const exp = actor.languages[culture] ?? 0
  const rank = triangularRoot(exp)
  const idx = Math.floor(rank / fluencyMod)
  return `${fluencyRanks[idx] ?? 'native'} (${rank})`
}

const validLanguages =
  (lang: Actor['languages'], target: number) =>
  ([idx, percent]: [string, number]) =>
    percent > 0.01 && (lang[parseInt(idx)] ?? 0) < target

const languagesExist = (params: { actor: Actor; loc: Loc }) => {
  const { actor, loc } = params
  const { commonCultures } = location__demographics(loc)
  return Object.entries(commonCultures).some(validLanguages(actor.languages, speakerTarget(actor)))
}

const fluency__randomLang = (params: { actor: Actor; loc: number }) => {
  const { actor, loc } = params
  const target = speakerTarget(actor)
  // generate culture distributions if needed
  const { commonCultures } = location__demographics(window.world.locations[loc])
  const { local, ruling } = location__culture(window.world.locations[loc])
  if ((actor.languages[local.culture.ruling] ?? 0) < target) return local.culture.native
  if ((actor.languages[ruling.culture.ruling] ?? 0) < target) return ruling.culture.ruling
  const prospects = Object.entries(commonCultures)
    .filter(validLanguages(actor.languages, target))
    .map(([culture, percent]) => ({ v: culture, w: percent ** 2 }))
  return parseInt(window.dice.weightedChoice(prospects))
}

export const fluency__applySkill = (params: {
  actor: Actor
  exp: number
  loc: number
  culture?: number
  force?: boolean
}): void => {
  const { actor, exp, loc, culture = fluency__randomLang({ actor, loc }), force } = params
  if (!actor.languages[culture]) actor.languages[culture] = 0
  const target = speakerTarget(actor)
  const awarded = Math.min(target, actor.languages[culture] + exp)
  actor.languages[culture] = awarded
  const remainder = exp - awarded
  if (remainder > 0) {
    if (!force && languagesExist({ actor, loc: window.world.locations[loc] }))
      fluency__applySkill({ actor, exp: remainder, loc })
    else actor.languages[culture] += remainder
  }
}

export const fluency__languagesExist = ({ actor, context }: SkillContextParams) =>
  languagesExist({ actor, loc: window.world.locations[context.idx] })

export const fluency__deficiency = (params: { actor: Actor; loc: number }) => {
  const { actor, loc } = params
  const { local, ruling } = location__culture(window.world.locations[loc])
  const target = speakerTarget(actor)
  return (
    (actor.languages[local.culture.native] ?? 0) < target ||
    (actor.languages[ruling.culture.ruling] ?? 0) < target
  )
}
