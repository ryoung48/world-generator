import { species__size } from '../../../size'
import { Culture } from '../../cultures/types'
import { species__by_culture } from '../../taxonomy'
import { phoneme_catalog, vowel_rules } from '../types'
import { valid_terms } from '.'

const basic_vowels = {
  A: 'a',
  E: 'e',
  I: 'i',
  O: 'o',
  U: 'u',
  Y: 'i'
}

const exotic_vowels = (ending: phoneme_catalog) => {
  const umlauts = {
    A: window.dice.choice(['ä', 'å', 'aä']),
    E: window.dice.choice(['ë', 'ë', 'aë']),
    I: 'ï',
    O: window.dice.choice(['ø', 'ö', 'oö']),
    U: window.dice.choice(['ü', 'ü', 'uü']),
    Y: 'ÿ'
  }
  const acutes = {
    A: 'á',
    E: window.dice.choice(['é', 'é', 'éo', 'ée']),
    I: window.dice.choice(['í', 'í', 'ía', 'ío']),
    O: 'ó',
    U: 'ú',
    Y: 'ý'
  }
  const welsh = {
    A: 'â',
    E: 'ê',
    I: 'î',
    O: 'ô',
    U: 'û',
    Y: 'î'
  }
  const macrons = {
    A: window.dice.choice(['ā', 'ā', 'āo']),
    E: 'ē',
    I: 'ī',
    O: 'ō',
    U: window.dice.choice(['ū', 'ū', 'ūi']),
    Y: 'y'
  }
  return window.dice.choice([
    umlauts,
    acutes,
    ending === phoneme_catalog.MIDDLE_CONSONANT ? welsh : macrons
  ])
}

const diphthong_rules = {
  front: ['aa', 'aä', 'ae', 'aë', 'ai', 'āo', 'au', 'eo', 'éo', 'oo', 'oö', 'ou', 'uu', 'uü', 'yu'],
  back: [
    'aa',
    'aä',
    'ae',
    'aë',
    'ea',
    'ee',
    'eo',
    'éo',
    'eu',
    'ia',
    'ía',
    'ya',
    'ye',
    'ii',
    'io',
    'yo',
    'iu',
    'yu',
    'oo',
    'oö',
    'ua',
    'ue',
    'ui',
    'uu',
    'uü'
  ],
  end: [
    'aa',
    'ae',
    'ai',
    'ao',
    'āo',
    'ea',
    'ée',
    'eo',
    'éo',
    'ia',
    'ía',
    'io',
    'ío',
    'oa',
    'oe',
    'oi',
    'ou',
    'ua',
    'ui',
    'ūi',
    'uo',
    'ya',
    'ye',
    'yo',
    'yu'
  ]
}

const diphthongs = (vowels: string[], consonants: string[]) => {
  const { back, front } = vowel_rules
  const valid_diphthong = (diphthongs: string[]) =>
    window.dice.choice(
      valid_terms(diphthongs, vowels).filter(v => {
        const valid_back = !back[v] || back[v].some(c => consonants.includes(c))
        const valid_front = !front[v] || front[v].some(c => consonants.includes(c))
        return valid_back || valid_front || diphthong_rules.end.includes(v)
      })
    )
  return {
    A: valid_diphthong(['ae', 'ai', 'ao', 'au']),
    E: valid_diphthong(['ea', 'ei', 'eo', 'eu']),
    I: valid_diphthong(['ia', 'ie', 'io', 'iu']),
    O: valid_diphthong(['oa', 'oe', 'oi', 'ou']),
    U: valid_diphthong(['ua', 'ue', 'ui', 'uo']),
    Y: valid_diphthong(['ya', 'ye', 'yo', 'yu'])
  }
}
export const build_basic_vowels = (params: { ending: phoneme_catalog; culture?: Culture }) => {
  const species = params.culture ? species__by_culture(params.culture) : undefined
  const vowel_count = 3
  const i = window.dice.weighted_choice([
    { v: 'i', w: 0.9 },
    { v: 'y', w: 0.1 }
  ])
  const required = ['a']
  if (params.ending === phoneme_catalog.MIDDLE_VOWEL) required.push(window.dice.choice(['o', 'u']))
  const optional = ['e', i, 'o', 'u', 'a'].filter(v => !required.includes(v))
  let vowels = window.dice.sample(optional, vowel_count - required.length).concat(required)
  if (species.size < species__size.medium && params.ending !== phoneme_catalog.MIDDLE_VOWEL) {
    vowels = ['a', 'e', i]
  }
  if (species.size > species__size.medium) {
    vowels = ['a', 'o', 'u']
  }
  return vowels
}
export const build_complex_vowels = (params: {
  consonants: string[]
  vowels: string[]
  stops: number
  ending: phoneme_catalog
}) => {
  const { vowels, consonants, stops, ending } = params
  const doubles = {
    A: 'aa',
    E: 'ee',
    I: 'ii',
    O: 'oo',
    U: 'uu',
    Y: 'i'
  }
  const vowel_orthography: Record<string, string> = window.dice.weighted_choice([
    { v: doubles, w: 0.1 },
    { v: diphthongs(vowels, consonants), w: 0.5 },
    { v: stops > 0 ? basic_vowels : exotic_vowels(ending), w: 0.4 }
  ])
  const special_vowels = window.dice
    .sample(
      ['A', 'E', 'I', 'O', 'U', 'Y'].filter(v => vowels.includes(v.toLowerCase())),
      3
    )
    .map(v => vowel_orthography[v])
    .filter(v => v)
  const all_vowels = window.dice.random > 0.9 ? vowels : special_vowels.concat(vowels)
  const valid_vowels = (rules: string[]) =>
    all_vowels.filter(v => v.length < 2 || rules.includes(v))
  return {
    unique_vowels: all_vowels,
    vowel_phonemes: {
      [phoneme_catalog.START_VOWEL]: vowels.filter(v => v !== 'y'),
      [phoneme_catalog.FRONT_VOWEL]: valid_vowels(diphthong_rules.front),
      [phoneme_catalog.MIDDLE_VOWEL]: vowels,
      [phoneme_catalog.BACK_VOWEL]: valid_vowels(diphthong_rules.back),
      [phoneme_catalog.END_VOWEL]: valid_vowels(diphthong_rules.end)
    }
  }
}
