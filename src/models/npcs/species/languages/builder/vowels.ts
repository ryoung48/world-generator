import { Culture } from '../../cultures/types'
import { species__size } from '../../size'
import { species__byCulture } from '../../taxonomy'
import { PhonemeCatalog, vowelRules } from '../types'
import { validTerms } from '.'

const basicVowels = {
  A: 'a',
  E: 'e',
  I: 'i',
  O: 'o',
  U: 'u',
  Y: 'i'
}

const exoticVowels = (ending: PhonemeCatalog) => {
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
    ending === PhonemeCatalog.MIDDLE_CONSONANT ? welsh : macrons
  ])
}

const diphthongRules = {
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
  const { back, front } = vowelRules
  const validDiphthong = (diphthongs: string[]) =>
    window.dice.choice(
      validTerms(diphthongs, vowels).filter(v => {
        const validBack = !back[v] || back[v].some(c => consonants.includes(c))
        const validFront = !front[v] || front[v].some(c => consonants.includes(c))
        return validBack || validFront || diphthongRules.end.includes(v)
      })
    )
  return {
    A: validDiphthong(['ae', 'ai', 'ao', 'au']),
    E: validDiphthong(['ea', 'ei', 'eo', 'eu']),
    I: validDiphthong(['ia', 'ie', 'io', 'iu']),
    O: validDiphthong(['oa', 'oe', 'oi', 'ou']),
    U: validDiphthong(['ua', 'ue', 'ui', 'uo']),
    Y: validDiphthong(['ya', 'ye', 'yo', 'yu'])
  }
}
export const buildBasicVowels = (params: { ending: PhonemeCatalog; culture?: Culture }) => {
  const species = params.culture ? species__byCulture(params.culture) : undefined
  const vowelCount = 3
  const i = window.dice.weightedChoice([
    { v: 'i', w: 0.9 },
    { v: 'y', w: 0.1 }
  ])
  const required = ['a']
  if (params.ending === PhonemeCatalog.MIDDLE_VOWEL) required.push(window.dice.choice(['o', 'u']))
  const optional = ['e', i, 'o', 'u', 'a'].filter(v => !required.includes(v))
  let vowels = window.dice.sample(optional, vowelCount - required.length).concat(required)
  if (species.size < species__size.medium && params.ending !== PhonemeCatalog.MIDDLE_VOWEL) {
    vowels = ['a', 'e', i]
  }
  if (species.size > species__size.medium) {
    vowels = ['a', 'o', 'u']
  }
  return vowels
}
export const buildComplexVowels = (params: {
  consonants: string[]
  vowels: string[]
  stops: number
  ending: PhonemeCatalog
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
  const vowelOrthography: Record<string, string> = window.dice.weightedChoice([
    { v: doubles, w: 0.1 },
    { v: diphthongs(vowels, consonants), w: 0.5 },
    { v: stops > 0 ? basicVowels : exoticVowels(ending), w: 0.4 }
  ])
  const specialVowels = window.dice
    .sample(
      ['A', 'E', 'I', 'O', 'U', 'Y'].filter(v => vowels.includes(v.toLowerCase())),
      3
    )
    .map(v => vowelOrthography[v])
    .filter(v => v)
  const allVowels = window.dice.random > 0.9 ? vowels : specialVowels.concat(vowels)
  const validVowels = (rules: string[]) => allVowels.filter(v => v.length < 2 || rules.includes(v))
  return {
    uniqueVowels: allVowels,
    vowelPhonemes: {
      [PhonemeCatalog.START_VOWEL]: vowels.filter(v => v !== 'y'),
      [PhonemeCatalog.FRONT_VOWEL]: validVowels(diphthongRules.front),
      [PhonemeCatalog.MIDDLE_VOWEL]: vowels,
      [PhonemeCatalog.BACK_VOWEL]: validVowels(diphthongRules.back),
      [PhonemeCatalog.END_VOWEL]: validVowels(diphthongRules.end)
    }
  }
}
