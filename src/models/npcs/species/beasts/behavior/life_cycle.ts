import { round_to_nearest_n, weighted_distribution } from '../../../../utilities/math'
import { month_ms, year_ms } from '../../../../utilities/math/time'
import { species__size, species__size_rank } from '../../size'

// species age loosely based on size rank
const age_ranges: Record<ReturnType<typeof species__size_rank>, number[]> = {
  Fine: [6 * month_ms, 2 * year_ms],
  Diminutive: [2 * year_ms, 6 * year_ms],
  Tiny: [6 * year_ms, 12 * year_ms],
  Small: [12 * year_ms, 18 * year_ms],
  Medium: [18 * year_ms, 30 * year_ms],
  Large: [30 * year_ms, 42 * year_ms],
  Huge: [42 * year_ms, 54 * year_ms],
  Gargantuan: [54 * year_ms, 72 * year_ms],
  Colossal: [72 * year_ms, 90 * year_ms]
}
// brood size categories
const brood_sizes = {
  single: [1, 1],
  small: [1, 3],
  large: [3, 10],
  huge: [10, 100]
}

type brood_size = keyof typeof brood_sizes

const brood_size_dist = (size: number): weighted_distribution<brood_size> => {
  const fine = size < species__size.diminutive
  return [
    { v: 'single', w: fine ? 0 : 0.5 },
    { v: 'small', w: fine ? 0.05 : 0.3 },
    { v: 'large', w: fine ? 0.5 : 0.2 },
    { v: 'huge', w: fine ? 0.45 : 0 }
  ]
}

const brood_age_modifier: Record<brood_size, number> = {
  single: 2,
  small: 1,
  large: 0.5,
  huge: 0.25
}
/**
 * determine species life cycle stats
 * @param params.size - species size rank
 * @param params.ancient - flag to indicate a long-lived species
 * @returns maximum life span, gestation|incubation period, maturation period, and brood count
 */
export const beast__life_cycle = (params: { size: number; ancient?: boolean }) => {
  const { size, ancient } = params
  const rank = species__size_rank(size)
  // base maximum age is determined by size
  const base = window.dice.uniform(...age_ranges[rank])
  // base max age is modified by brood size
  // higher brood count reduces age
  const brood = ancient ? 'single' : window.dice.weighted_choice(brood_size_dist(size))
  const age_mod = ancient ? 10 : brood_age_modifier[brood]
  // determine final maximum age
  const life_span = Math.round(base * age_mod)
  const gestation = life_span * window.dice.uniform(0.005, 0.01)
  const maturation = life_span * window.dice.uniform(0.08, 0.12)
  // determine final brood count|range
  const [low, high] = brood_sizes[brood]
  const high_span = high - low
  const low_span = Math.round(high_span * 0.3)
  const span = window.dice.randint(low_span, high_span)
  let brood_count = window.dice.randint(low, high)
  if (brood_count > 10) brood_count = round_to_nearest_n(brood_count, 10)
  return {
    life_span,
    gestation,
    maturation,
    brood_size: span === 0 ? brood_count : [brood_count, brood_count + span]
  }
}
