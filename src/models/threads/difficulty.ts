import { cssColors } from '../../components/theme/colors'
import { scale } from '../utilities/math'

export type Difficulty = 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly' | 'insanity'
interface DifficultyInfo {
  tier: Difficulty
  // range of weights to be applied to the reference value (multiplicative)
  bounds: [number, number]
  // color used for display
  color: string
  // cost in health for combat encounters
  cost: number
}

export const difficulties: Record<Difficulty, DifficultyInfo> = {
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

export const difficulty__random = (ref: number) => {
  const tier = window.dice.weightedChoice<Difficulty>([
    { w: 0.2, v: 'easy' },
    { w: 0.5, v: 'medium' },
    { w: 0.2, v: 'hard' },
    { w: 0.1, v: 'deadly' },
    { w: 0.05, v: 'insanity' }
  ])
  return ref * window.dice.uniform(...difficulties[tier].bounds)
}

export const difficulty__odds = (params: { pc: number; cr: number }) => {
  const { pc, cr } = params
  const ratio = cr / pc
  const { tier } =
    Object.values(difficulties).find(({ bounds: [x, y] }) => ratio >= x && ratio < y) ??
    difficulties.insanity
  const success = Math.min(1, scale([0.55, 1.75], [1, 0], ratio))
  return { ratio, tier, odds: 1 - success }
}
