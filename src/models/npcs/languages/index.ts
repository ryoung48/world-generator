import { PERFORMANCE } from '../../utilities/performance'
import { Culture } from '../cultures/types'
import { Gender } from '../types'
import { initClusters, randomizePhonemes } from './builder'
import { buildConsonants } from './builder/consonants'
import { buildBasicVowels, buildComplexVowels } from './builder/vowels'
import { CLUSTER } from './clusters'
import { Language, PhonemeCatalog, WordParams } from './types'

const spawn = (culture: number) => {
  const lang: Language = {
    culture,
    stop: ' ',
    stopChance: 0,
    basePhonemes: {
      [PhonemeCatalog.START_CONSONANT]: [],
      [PhonemeCatalog.MIDDLE_CONSONANT]: [],
      [PhonemeCatalog.END_CONSONANT]: [],
      [PhonemeCatalog.START_VOWEL]: [],
      [PhonemeCatalog.FRONT_VOWEL]: [],
      [PhonemeCatalog.MIDDLE_VOWEL]: [],
      [PhonemeCatalog.BACK_VOWEL]: [],
      [PhonemeCatalog.END_VOWEL]: []
    },
    phonemes: {
      [PhonemeCatalog.START_CONSONANT]: [],
      [PhonemeCatalog.MIDDLE_CONSONANT]: [],
      [PhonemeCatalog.END_CONSONANT]: [],
      [PhonemeCatalog.START_VOWEL]: [],
      [PhonemeCatalog.FRONT_VOWEL]: [],
      [PhonemeCatalog.MIDDLE_VOWEL]: [],
      [PhonemeCatalog.BACK_VOWEL]: [],
      [PhonemeCatalog.END_VOWEL]: []
    },
    vowels: [],
    diphthongs: [],
    digraphs: [],
    clusters: {},
    ending:
      window.dice.random > 0.15 ? PhonemeCatalog.MIDDLE_CONSONANT : PhonemeCatalog.MIDDLE_VOWEL,
    consonantChance: window.dice.uniform(0.1, 0.4),
    surnames: {
      patronymic: false,
      suffix: {
        male: [''],
        female: ['']
      },
      epithets: []
    },
    articleChance: window.dice.uniform(0, 0.05),
    predefined: {}
  }
  return lang
}

const baseVowels = ['a', 'e', 'i', 'o', 'u', 'y']

export const LANGUAGE = {
  word: {
    firstName: (lang: Language, gender: Gender) => LANGUAGE.word.simple({ lang, key: gender }),
    simple: PERFORMANCE.profile.decorate({
      name: 'lang__word',
      f: ({
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
          lang.clusters[key] = CLUSTER.spawn({
            src: lang,
            key,
            len,
            ending,
            stopChance,
            variation
          })
        return CLUSTER.word(lang.clusters[key], lang, repeat)
      }
    }),
    unique: (params: WordParams): string => {
      const w = LANGUAGE.word.simple(params)
      if (window.world.uniqueNames[w]) {
        return LANGUAGE.word.unique({ ...params, repeat: true })
      }
      window.world.uniqueNames[w] = true
      return w
    }
  },
  spawn: (src?: Culture) => {
    const lang = spawn(src?.idx)
    // stop chance
    const stop = window.dice.weightedChoice([
      { v: ' ', w: 0.8 },
      { v: "'", w: src.species === 'human' ? 0 : 0.25 },
      { v: '-', w: src.species === 'human' ? 0 : 0.15 }
    ])
    lang.stop = stop
    const stopChance = stop === "'" ? window.dice.uniform(0.3, 0.6) : stop === '-' ? 1 : 0
    lang.stopChance = stopChance
    // phonemes
    const vowels = buildBasicVowels({ ending: lang.ending })
    const { consonantPhonemes } = buildConsonants({ ending: lang.ending, vowels })
    const { uniqueVowels, vowelPhonemes } = buildComplexVowels({
      vowels,
      consonants: consonantPhonemes[PhonemeCatalog.END_CONSONANT],
      stops: stopChance,
      ending: lang.ending
    })
    lang.vowels = uniqueVowels
    lang.diphthongs = lang.vowels.filter(v => !baseVowels.includes(v))
    lang.digraphs = Array.from(
      new Set(
        Object.entries(consonantPhonemes)
          .map(([, v]) => v)
          .flat()
          .filter(c => c.length > 1 && !['ng', 'str', 'th', 'sh', 'dr', 'br'].includes(c))
      )
    )
    lang.basePhonemes = { ...consonantPhonemes, ...vowelPhonemes }
    randomizePhonemes(lang)
    // word clusters: each cluster has similar words
    const shortSurnames = window.dice.random > 0.9
    initClusters({
      shortSurnames,
      shortFirst: lang.ending === PhonemeCatalog.MIDDLE_VOWEL && window.dice.random > 0.9,
      src: lang
    })
    const cluster = CLUSTER.spawn({ src: lang, key: 'generic', len: 1 })
    // patronymic surnames
    lang.surnames.patronymic = stop === ' ' && !shortSurnames && window.dice.random > 0.8
    if (lang.surnames.patronymic) {
      const vowels = window.dice.weightedSample(lang.phonemes[PhonemeCatalog.MIDDLE_VOWEL], 2)
      const start = window.dice.weightedChoice(lang.phonemes[PhonemeCatalog.START_CONSONANT])
      const end = window.dice.weightedChoice(lang.phonemes[PhonemeCatalog.END_CONSONANT])
      const endVowel = window.dice.weightedChoice(
        CLUSTER.endVowels(lang.clusters.female, end).filter(v => v.v.length < 2)
      )
      const pattern = vowels.map(v => `${start}${v}${end}`)
      lang.surnames.suffix = {
        male: pattern.map(p => `${p}`),
        female: pattern.map(p => `${p}${endVowel}`)
      }
    }
    if (!lang.surnames.patronymic && !shortSurnames && stop === ' ' && window.dice.random > 0.8) {
      if (window.dice.random > 0.2 || src.species === 'human') {
        const vowels = window.dice.weightedSample(lang.phonemes[PhonemeCatalog.MIDDLE_VOWEL], 2)
        const end = window.dice.weightedChoice(lang.phonemes[PhonemeCatalog.END_CONSONANT])
        lang.surnames.epithets = vowels.map(v => `${v}${end}-`)
      } else {
        const prospects = lang.phonemes[PhonemeCatalog.START_CONSONANT].filter(
          l => l.v.length === 1
        )
        lang.surnames.epithets = window.dice
          .weightedSample(prospects, 3)
          .map(c => `${c.toLocaleUpperCase()}'`)
      }
    }
    // create title & article words
    lang.predefined = {
      the: [
        CLUSTER.simple(
          cluster,
          lang,
          window.dice.weightedChoice([
            { v: `${PhonemeCatalog.START_VOWEL}${PhonemeCatalog.END_CONSONANT}`, w: 0.2 },
            {
              v: `${PhonemeCatalog.START_CONSONANT}${PhonemeCatalog.MIDDLE_VOWEL}${PhonemeCatalog.END_CONSONANT}`,
              w: 0.8
            }
          ])
        )
      ],
      title: [
        CLUSTER.simple(
          cluster,
          lang,
          window.dice.weightedChoice([
            { v: `${PhonemeCatalog.START_VOWEL}${PhonemeCatalog.END_CONSONANT}`, w: 0.2 },
            {
              v: `${PhonemeCatalog.START_CONSONANT}${PhonemeCatalog.MIDDLE_VOWEL}${PhonemeCatalog.END_CONSONANT}`,
              w: 0.8
            }
          ])
        )
      ]
    }
    return lang
  }
}
