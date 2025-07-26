import { scaleLinear } from 'd3'

import { cssColors } from '../../../components/theme/colors'
import { Difficulty, difficulty, DifficultyContestParams, RandomDifficultyParams } from './types'

const tiers: Record<difficulty, Difficulty> = {
  trivial: {
    tier: 'trivial',
    bounds: [-Infinity, 0.55],
    color: cssColors.difficulty.easy,
    cost: 0
  },
  easy: {
    tier: 'easy',
    bounds: [0.55, 0.85],
    color: cssColors.difficulty.easy,
    cost: 0.1
  },
  medium: {
    tier: 'medium',
    bounds: [0.85, 1.15],
    color: cssColors.difficulty.medium,
    cost: 0.2
  },
  hard: {
    tier: 'hard',
    bounds: [1.15, 1.45],
    color: cssColors.difficulty.hard,
    cost: 0.3
  },
  deadly: {
    tier: 'deadly',
    bounds: [1.45, 1.75],
    color: cssColors.difficulty.deadly,
    cost: 0.4
  },
  insanity: {
    tier: 'insanity',
    bounds: [1.75, 5],
    color: cssColors.difficulty.deadly,
    cost: 1
  }
}

export const DIFFICULTY = {
  random: {
    cr: ({ tier, ref }: RandomDifficultyParams) => {
      return ref * window.dice.uniform(...tiers[tier ?? DIFFICULTY.random.tier()].bounds)
    },
    tier: () =>
      window.dice.weightedChoice<difficulty>([
        { w: 0.2, v: 'easy' },
        { w: 0.5, v: 'medium' },
        { w: 0.2, v: 'hard' },
        { w: 0.1, v: 'deadly' },
        { w: 0.05, v: 'insanity' }
      ])
  },
  contest: ({ avatar, task }: DifficultyContestParams) => {
    const ratio = task.difficulty / avatar
    const tier =
      Object.values(tiers).find(({ bounds: [x, y] }) => ratio >= x && ratio < y) ?? tiers.insanity
    const odds = Math.max(0, scaleLinear([0.55, 1.75], [1, 0])(ratio))
    return { ratio, tier: tier.tier, odds }
  },
  tiers
}
