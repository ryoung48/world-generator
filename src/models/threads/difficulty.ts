import { cssColors } from '../../components/theme/colors'

export type difficulty = 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly' | 'insanity'
export interface Difficulty {
  tier: difficulty
  // range of weights to be applied to the reference value (multiplicative)
  bounds: [number, number]
  // color used for display
  color: string
  // cost in health for combat encounters
  cost: number
}

export const difficulties: Record<difficulty, Difficulty> = {
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
