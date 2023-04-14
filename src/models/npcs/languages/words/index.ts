import { decoratedProfile } from '../../../utilities/performance'
import { cluster__spawn, cluster__word } from '../clusters'
import { Language } from '../types'

interface WordParams {
  lang: Language
  key: string
  len?: number
  ending?: string
  variation?: number
  repeat?: boolean
  stopChance?: number
}

const _word = ({
  lang,
  key,
  repeat = false,
  len,
  ending = lang.ending,
  stopChance,
  variation = 10
}: WordParams) => {
  // create a new cluster if one doesn't already exist
  if (!lang.clusters[key])
    lang.clusters[key] = cluster__spawn({ src: lang, key, len, ending, stopChance, variation })
  return cluster__word(lang.clusters[key], lang, repeat)
}
export const lang__word = decoratedProfile(_word)

export const lang__uniqueName = (params: WordParams): string => {
  const w = lang__word(params)
  if (window.world.uniqueNames[w]) {
    return lang__uniqueName({ ...params, repeat: true })
  }
  window.world.uniqueNames[w] = true
  return w
}
