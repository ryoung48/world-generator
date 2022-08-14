import { build_distribution } from '../../../../../utilities/math'
import { cluster__spawn } from '../clusters'
import { Language, phoneme_catalog } from '../types'

interface CustomClusterParams {
  len?: number
  long_names?: number
  structures?: {
    [phoneme_catalog.MIDDLE_CONSONANT]: string
    [phoneme_catalog.MIDDLE_VOWEL]: string
  }
}

/**
 * filters terms that fall in the given set of letters
 * @param prospects
 * @param letters
 * @returns list prospects that pass
 */
export const valid_terms = (prospects: string[], letters: string[]) =>
  prospects.filter(c => c.split('').every(l => letters.includes(l)))

export const randomize_phonemes = (src: Language) => {
  Object.entries(src.base_phonemes).forEach(([k, v]) => {
    src.phonemes[k as phoneme_catalog] = build_distribution(
      v.map(c => ({ v: c, w: window.dice.random })),
      1
    )
  })
}

export const init_clusters = (params: {
  src: Language
  short_first?: boolean
  short_surnames?: boolean
  clusters?: Record<string, CustomClusterParams>
}) => {
  const { src, short_surnames, short_first, clusters } = params
  const { ending, surnames } = src
  src.clusters = {
    settlement: cluster__spawn({
      src: src,
      key: 'settlement',
      ending,
      stop_chance: src.article_chance,
      variation: 5,
      long_names: 0.5
    }),
    wilderness: cluster__spawn({
      src: src,
      key: 'wilderness',
      ending,
      stop_chance: src.article_chance,
      variation: 5,
      long_names: 0.5
    }),
    region: cluster__spawn({
      src: src,
      key: 'region',
      ending,
      stop_chance: 0,
      variation: 15,
      long_names: 1
    }),
    culture: cluster__spawn({
      src: src,
      key: 'culture',
      ending,
      stop_chance: 0,
      variation: 15,
      long_names: 0
    }),
    male: cluster__spawn({
      src: src,
      key: 'male',
      ending,
      stop_chance: src.stop_chance,
      len: short_first ? 1 : clusters?.male?.len,
      long_names: clusters?.male?.long_names || 0.3,
      variation: 15
    }),
    female: cluster__spawn({
      src: src,
      key: 'female',
      ending: phoneme_catalog.MIDDLE_VOWEL,
      stop_chance: src.stop_chance,
      variation: 15,
      len: short_first ? 1 : clusters?.female?.len,
      long_names: clusters?.female?.long_names || 0
    }),
    last: cluster__spawn({
      src: src,
      key: 'last',
      variation: 15,
      ending,
      stop_chance: 0,
      long_names: clusters?.last?.long_names || 0,
      len: clusters?.last?.len || (short_surnames ? 1 : surnames.epithets.length > 0 ? 2 : 3)
    })
  }
  // similar first names
  src.clusters.female.patterns = src.clusters.male.patterns
}
