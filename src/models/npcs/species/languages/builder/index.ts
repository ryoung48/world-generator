import { buildDistribution } from '../../../../utilities/math'
import { cluster__spawn } from '../clusters'
import { Language, PhonemeCatalog } from '../types'

interface CustomClusterParams {
  len?: number
  long_names?: number
  structures?: {
    [PhonemeCatalog.MIDDLE_CONSONANT]: string
    [PhonemeCatalog.MIDDLE_VOWEL]: string
  }
}

/**
 * filters terms that fall in the given set of letters
 * @param prospects
 * @param letters
 * @returns list prospects that pass
 */
export const validTerms = (prospects: string[], letters: string[]) =>
  prospects.filter(c => c.split('').every(l => letters.includes(l)))

export const randomizePhonemes = (src: Language) => {
  Object.entries(src.basePhonemes).forEach(([k, v]) => {
    src.phonemes[k as PhonemeCatalog] = buildDistribution(
      v.map(c => ({ v: c, w: window.dice.random })),
      1
    )
  })
}

export const initClusters = (params: {
  src: Language
  shortFirst?: boolean
  shortSurnames?: boolean
  clusters?: Record<string, CustomClusterParams>
}) => {
  const { src, shortSurnames, shortFirst, clusters } = params
  const { ending, surnames } = src
  src.clusters = {
    settlement: cluster__spawn({
      src: src,
      key: 'settlement',
      ending,
      stopChance: src.articleChance,
      variation: 5,
      longNames: 0.5
    }),
    wilderness: cluster__spawn({
      src: src,
      key: 'wilderness',
      ending,
      stopChance: src.articleChance,
      variation: 5,
      longNames: 0.5
    }),
    region: cluster__spawn({
      src: src,
      key: 'region',
      ending,
      stopChance: 0,
      variation: 15,
      longNames: 1
    }),
    culture: cluster__spawn({
      src: src,
      key: 'culture',
      ending,
      stopChance: 0,
      variation: 15,
      longNames: 0
    }),
    male: cluster__spawn({
      src: src,
      key: 'male',
      ending,
      stopChance: src.stopChance,
      len: shortFirst ? 1 : clusters?.male?.len,
      longNames: clusters?.male?.long_names || 0.3,
      variation: 15
    }),
    female: cluster__spawn({
      src: src,
      key: 'female',
      ending: PhonemeCatalog.MIDDLE_VOWEL,
      stopChance: src.stopChance,
      variation: 15,
      len: shortFirst ? 1 : clusters?.female?.len,
      longNames: clusters?.female?.long_names || 0
    }),
    last: cluster__spawn({
      src: src,
      key: 'last',
      variation: 15,
      ending,
      stopChance: 0,
      longNames: clusters?.last?.long_names || 0,
      len: clusters?.last?.len || (shortSurnames ? 1 : surnames.epithets.length > 0 ? 2 : 3)
    })
  }
  // similar first names
  src.clusters.female.patterns = src.clusters.male.patterns
}
