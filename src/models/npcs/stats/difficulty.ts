import { css_colors } from '../../../components/theme/colors'
import { scale } from '../../utilities/math'
import { Difficulty, difficulty } from './types'

// mapping of difficulty tiers
export const difficulties: Record<difficulty, Difficulty> = {
  trivial: {
    tier: 'trivial',
    bounds: [-Infinity, 0.55],
    color: css_colors.difficulty.easy,
    cost: 0
  },
  easy: {
    tier: 'easy',
    bounds: [0.55, 0.85],
    color: css_colors.difficulty.easy,
    cost: 0.1
  },
  medium: {
    tier: 'medium',
    bounds: [0.85, 1.15],
    color: css_colors.difficulty.medium,
    cost: 0.2
  },
  hard: {
    tier: 'hard',
    bounds: [1.15, 1.45],
    color: css_colors.difficulty.hard,
    cost: 0.3
  },
  deadly: {
    tier: 'deadly',
    bounds: [1.45, 1.75],
    color: css_colors.difficulty.deadly,
    cost: 0.4
  },
  insanity: {
    tier: 'insanity',
    bounds: [1.75, 5],
    color: css_colors.difficulty.deadly,
    cost: 1
  }
}

/**
 * Outputs a (weighted) random difficulty.
 * This function favors medium difficulty over the rest.
 * Trivial and deadly difficulties will never be returned by this function.
 * @returns a random difficulty
 */
const random_difficulty = () =>
  window.dice.weighted_choice<difficulty>([
    { w: 0.2, v: 'easy' },
    { w: 0.5, v: 'medium' },
    { w: 0.2, v: 'hard' },
    { w: 0.1, v: 'deadly' },
    { w: 0.05, v: 'insanity' }
  ])

/**
 * Computes a reference CR with the applied difficulty.
 * Difficulty tier is randomly selected if not provided.
 * New values are randomly generated within the range of the given tier.
 * @param params.ref - the reference CR
 * @param params.tier - the difficulty tier
 * @returns the new value with the applied difficulty
 */
export const difficulty__cr = (params: { ref: number; tier?: difficulty }) => {
  const { tier = random_difficulty(), ref } = params
  return ref * window.dice.uniform(...difficulties[tier].bounds)
}

/**
 * Computes difficulty tier given two reference CRs
 * @param params.ref - the reference CR
 * @param params.adversary - the adversary CR
 * @returns the CR ratio, success rate, and the corresponding difficulty tier
 */
export const difficulty__stats = (params: { ref: number; adversary: number }) => {
  const { ref, adversary } = params
  const ratio = adversary / ref
  const tier =
    Object.values(difficulties).find(({ bounds: [x, y] }) => ratio >= x && ratio < y) ??
    difficulties.insanity
  const success = Math.min(1, scale([0.55, 1.75], [1, 0], ratio))
  return { ratio, tier: tier.tier, success }
}
