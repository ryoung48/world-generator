import { range } from 'd3'

import { decoratedProfile } from '../../../../utilities/performance'
import { properSentences } from '../../../../utilities/text'
import { cluster__spawn, cluster__word } from '../clusters'
import { Language, PhonemeCatalog } from '../types'

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

const lang__oppositeEnding = (lang: Language) =>
  lang.ending === PhonemeCatalog.MIDDLE_CONSONANT
    ? PhonemeCatalog.MIDDLE_VOWEL
    : PhonemeCatalog.MIDDLE_CONSONANT

export const lang__loremIpsum = (params: {
  lang: Language
  words: number
  commas?: boolean
}): string => {
  const { lang, words, commas } = params
  return range(words)
    .map((_, i) => {
      const end = i === words - 1
      const len = window.dice.weightedChoice([
        { v: 1, w: end ? 0 : 0.3 },
        { v: 2, w: 0.5 },
        { v: 3, w: 0.1 },
        { v: 4, w: 0.05 }
      ])
      const shortEnd = len === 1 && window.dice.random > 0.6
      const ending = shortEnd
        ? PhonemeCatalog.MIDDLE_VOWEL
        : window.dice.random > 0.1
        ? lang.ending
        : lang__oppositeEnding(lang)
      const stopChance = lang.stopChance > 0 && len > 1 && window.dice.random > 0.9 ? 0.3 : 0
      const key = `lorem_${ending}_${len}_${stopChance}`
      const word = lang__word({ lang, key, ending, len, stopChance: stopChance, variation: 3 })
      return `${word.length < 4 && i !== 0 ? word.toLowerCase() : word}${
        commas && i !== 0 && !end && window.dice.random > 0.95 ? ',' : ''
      }`
    })
    .join(' ')
}

export const lang__loremSentences = (lang: Language, sentences: number): string => {
  return properSentences(
    range(sentences)
      .map(
        () =>
          `${lang__loremIpsum({
            lang,
            words: window.dice.randint(10, 20),
            commas: true
          }).toLowerCase()}.`
      )
      .join(' ')
  )
}
