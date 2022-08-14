import { Culture } from '../cultures/types'
import { init_clusters, randomize_phonemes } from './builder'
import { build_consonants } from './builder/consonants'
import { build_basic_vowels, build_complex_vowels } from './builder/vowels'
import { cluster__simple_word, cluster__spawn, end_vowels } from './clusters'
import { Language, phoneme_catalog } from './types'

const spawn = (culture: number) => {
  const lang: Language = {
    culture,
    stop: ' ',
    stop_chance: 0,
    base_phonemes: {
      [phoneme_catalog.START_CONSONANT]: [],
      [phoneme_catalog.MIDDLE_CONSONANT]: [],
      [phoneme_catalog.END_CONSONANT]: [],
      [phoneme_catalog.START_VOWEL]: [],
      [phoneme_catalog.FRONT_VOWEL]: [],
      [phoneme_catalog.MIDDLE_VOWEL]: [],
      [phoneme_catalog.BACK_VOWEL]: [],
      [phoneme_catalog.END_VOWEL]: []
    },
    phonemes: {
      [phoneme_catalog.START_CONSONANT]: [],
      [phoneme_catalog.MIDDLE_CONSONANT]: [],
      [phoneme_catalog.END_CONSONANT]: [],
      [phoneme_catalog.START_VOWEL]: [],
      [phoneme_catalog.FRONT_VOWEL]: [],
      [phoneme_catalog.MIDDLE_VOWEL]: [],
      [phoneme_catalog.BACK_VOWEL]: [],
      [phoneme_catalog.END_VOWEL]: []
    },
    vowels: [],
    diphthongs: [],
    digraphs: [],
    clusters: {},
    ending:
      window.dice.random > 0.15 ? phoneme_catalog.MIDDLE_CONSONANT : phoneme_catalog.MIDDLE_VOWEL,
    consonant_chance: window.dice.uniform(0.1, 0.4),
    surnames: {
      patronymic: false,
      suffix: {
        male: [''],
        female: ['']
      },
      epithets: []
    },
    article_chance: window.dice.uniform(0, 0.05),
    predefined: {}
  }
  return lang
}

const base_vowels = ['a', 'e', 'i', 'o', 'u', 'y']

export const spawn_construct = (src?: Culture) => {
  const lang = spawn(src?.idx)
  // stop chance
  const stop = window.dice.weighted_choice([
    { v: ' ', w: 0.8 },
    { v: "'", w: src.species === 'human' ? 0 : 0.25 },
    { v: '-', w: src.species === 'human' ? 0 : 0.15 }
  ])
  lang.stop = stop
  const stop_chance = stop === "'" ? window.dice.uniform(0.3, 0.6) : stop === '-' ? 1 : 0
  lang.stop_chance = stop_chance
  // phonemes
  const vowels = build_basic_vowels({ ending: lang.ending, culture: src })
  const { consonant_phonemes } = build_consonants({ ending: lang.ending, vowels })
  const { unique_vowels, vowel_phonemes } = build_complex_vowels({
    vowels,
    consonants: consonant_phonemes[phoneme_catalog.END_CONSONANT],
    stops: stop_chance,
    ending: lang.ending
  })
  lang.vowels = unique_vowels
  lang.diphthongs = lang.vowels.filter(v => !base_vowels.includes(v))
  lang.digraphs = Array.from(
    new Set(
      Object.entries(consonant_phonemes)
        .map(([, v]) => v)
        .flat()
        .filter(c => c.length > 1 && !['ng', 'str', 'th', 'sh', 'dr', 'br'].includes(c))
    )
  )
  lang.base_phonemes = { ...consonant_phonemes, ...vowel_phonemes }
  randomize_phonemes(lang)
  // word clusters: each cluster has similar words
  const short_surnames = window.dice.random > 0.9
  init_clusters({
    short_surnames,
    short_first: lang.ending === phoneme_catalog.MIDDLE_VOWEL && window.dice.random > 0.9,
    src: lang
  })
  const cluster = cluster__spawn({ src: lang, key: 'generic', len: 1 })
  // patronymic surnames
  lang.surnames.patronymic = stop === ' ' && !short_surnames && window.dice.random > 0.8
  if (lang.surnames.patronymic) {
    const vowels = window.dice.weighted_sample(lang.phonemes[phoneme_catalog.MIDDLE_VOWEL], 2)
    const start = window.dice.weighted_choice(lang.phonemes[phoneme_catalog.START_CONSONANT])
    const end = window.dice.weighted_choice(lang.phonemes[phoneme_catalog.END_CONSONANT])
    const end_vowel = window.dice.weighted_choice(
      end_vowels(lang.clusters.female, end).filter(v => v.v.length < 2)
    )
    const pattern = vowels.map(v => `${start}${v}${end}`)
    lang.surnames.suffix = {
      male: pattern.map(p => `${p}`),
      female: pattern.map(p => `${p}${end_vowel}`)
    }
  }
  if (!lang.surnames.patronymic && !short_surnames && stop === ' ' && window.dice.random > 0.8) {
    if (window.dice.random > 0.2 || src.species === 'human') {
      const vowels = window.dice.weighted_sample(lang.phonemes[phoneme_catalog.MIDDLE_VOWEL], 2)
      const end = window.dice.weighted_choice(lang.phonemes[phoneme_catalog.END_CONSONANT])
      lang.surnames.epithets = vowels.map(v => `${v}${end}-`)
    } else {
      const prospects = lang.phonemes[phoneme_catalog.START_CONSONANT].filter(l => l.v.length === 1)
      lang.surnames.epithets = window.dice
        .weighted_sample(prospects, 3)
        .map(c => `${c.toLocaleUpperCase()}'`)
    }
  }
  // create title & article words
  lang.predefined = {
    the: [
      cluster__simple_word(
        cluster,
        lang,
        window.dice.weighted_choice([
          { v: `${phoneme_catalog.START_VOWEL}${phoneme_catalog.END_CONSONANT}`, w: 0.2 },
          {
            v: `${phoneme_catalog.START_CONSONANT}${phoneme_catalog.MIDDLE_VOWEL}${phoneme_catalog.END_CONSONANT}`,
            w: 0.8
          }
        ])
      )
    ],
    title: [
      cluster__simple_word(
        cluster,
        lang,
        window.dice.weighted_choice([
          { v: `${phoneme_catalog.START_VOWEL}${phoneme_catalog.END_CONSONANT}`, w: 0.2 },
          {
            v: `${phoneme_catalog.START_CONSONANT}${phoneme_catalog.MIDDLE_VOWEL}${phoneme_catalog.END_CONSONANT}`,
            w: 0.8
          }
        ])
      )
    ]
  }
  return lang
}

export const spawn_dialect = (base: Language) => {
  const lang = spawn(base.culture)
  lang.ending = base.ending
  lang.stop = base.stop
  lang.stop_chance = base.stop_chance
  lang.article_chance = base.article_chance
  lang.surnames = { ...base.surnames }
  lang.base_phonemes = { ...base.base_phonemes }
  lang.vowels = [...base.vowels]
  lang.diphthongs = [...base.diphthongs]
  lang.digraphs = [...base.digraphs]
  randomize_phonemes(lang)
  init_clusters({ src: lang })
  Object.keys(lang.clusters).forEach(k => {
    lang.clusters[k].patterns = base.clusters[k].patterns
    lang.clusters[k].stop_chance = base.clusters[k].stop_chance
    lang.clusters[k].ending = base.clusters[k].ending
    lang.clusters[k].len = base.clusters[k].len
  })
  lang.predefined = { ...base.predefined }
  return lang
}
