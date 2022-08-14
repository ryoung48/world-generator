import { range } from '../../../../../utilities/math'
import { decorated_profile } from '../../../../../utilities/performance'
import { proper_sentences } from '../../../../../utilities/text'
import { cluster__spawn, cluster__word } from '../clusters'
import { Language, phoneme_catalog } from '../types'

interface WordParams {
  lang: Language
  key: string
  len?: number
  ending?: string
  variation?: number
  repeat?: boolean
  stop_chance?: number
}

const _word = ({
  lang,
  key,
  repeat = false,
  len,
  ending = lang.ending,
  stop_chance,
  variation = 10
}: WordParams) => {
  // create a new cluster if one doesn't already exist
  if (!lang.clusters[key])
    lang.clusters[key] = cluster__spawn({ src: lang, key, len, ending, stop_chance, variation })
  return cluster__word(lang.clusters[key], lang, repeat)
}
export const lang__word = decorated_profile(_word)

export const lang__unique_name = (params: WordParams): string => {
  const w = lang__word(params)
  if (window.world.unique_names[w]) {
    return lang__unique_name({ ...params, repeat: true })
  }
  window.world.unique_names[w] = true
  return w
}

const lang__opposite_ending = (lang: Language) =>
  lang.ending === phoneme_catalog.MIDDLE_CONSONANT
    ? phoneme_catalog.MIDDLE_VOWEL
    : phoneme_catalog.MIDDLE_CONSONANT

export const lang__lorem_ipsum = (params: {
  lang: Language
  words: number
  commas?: boolean
}): string => {
  const { lang, words, commas } = params
  return range(words)
    .map((_, i) => {
      const end = i === words - 1
      const len = window.dice.weighted_choice([
        { v: 1, w: end ? 0 : 0.3 },
        { v: 2, w: 0.5 },
        { v: 3, w: 0.1 },
        { v: 4, w: 0.05 }
      ])
      const short_end = len === 1 && window.dice.random > 0.6
      const ending = short_end
        ? phoneme_catalog.MIDDLE_VOWEL
        : window.dice.random > 0.1
        ? lang.ending
        : lang__opposite_ending(lang)
      const stop_chance = lang.stop_chance > 0 && len > 1 && window.dice.random > 0.9 ? 0.3 : 0
      const key = `lorem_${ending}_${len}_${stop_chance}`
      const word = lang__word({ lang, key, ending, len, stop_chance, variation: 3 })
      return `${word.length < 4 && i !== 0 ? word.toLowerCase() : word}${
        commas && i !== 0 && !end && window.dice.random > 0.95 ? ',' : ''
      }`
    })
    .join(' ')
}

export const lang__lorem_sentences = (lang: Language, sentences: number): string => {
  return proper_sentences(
    range(sentences)
      .map(
        () =>
          `${lang__lorem_ipsum({
            lang,
            words: window.dice.randint(10, 20),
            commas: true
          }).toLowerCase()}.`
      )
      .join(' ')
  )
}
