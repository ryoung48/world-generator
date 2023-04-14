import { range, scaleLinear } from 'd3'

import { Avatar } from '../../components/context/types'
import { cssColors } from '../../components/theme/colors'
import { slots } from '../npcs/equipment'
import { Item } from '../npcs/equipment/types'
import { NPC } from '../npcs/types'
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
    bounds: [-Infinity, 0.25],
    color: cssColors.difficulty.easy,
    cost: 0
  },
  easy: {
    tier: 'easy',
    bounds: [0.25, 0.75],
    color: cssColors.difficulty.easy,
    cost: 0.1
  },
  medium: {
    tier: 'medium',
    bounds: [0.75, 1.25],
    color: cssColors.difficulty.medium,
    cost: 0.2
  },
  hard: {
    tier: 'hard',
    bounds: [1.25, 1.75],
    color: cssColors.difficulty.hard,
    cost: 0.3
  },
  deadly: {
    tier: 'deadly',
    bounds: [1.75, 2.25],
    color: cssColors.difficulty.deadly,
    cost: 0.4
  },
  insanity: {
    tier: 'insanity',
    bounds: [2.25, 5],
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
  const success = Math.min(1, scale([0.25, 2.25], [1, 0], ratio))
  return { ratio, tier, odds: 1 - success }
}

const cr__range = range(50)
const cr__scale = scaleLinear()
  .domain(cr__range)
  .range(cr__range.map(i => 2 ** i - 1))
export const difficulty__cr = (level: number) => cr__scale(level)
export const difficulty__lvl = (cr: number) => cr__scale.invert(cr)
export const item__cr = (item: Item) => (slots[item.slot] * difficulty__cr(item.tier + 1)) / 2.5
export const npc__cr = (npc: NPC) =>
  (npc.equipment ?? []).reduce((sum, item) => sum + item__cr(item), 0)
export const npc__lvl = (npc: NPC) => difficulty__lvl(npc__cr(npc))
export const avatar__cr = ({ pcs }: Avatar) =>
  pcs.map(p => npc__cr(window.world.npcs[p])).reduce((sum, cr) => sum + cr, 0)
export const avatar__lvl = (avatar: Avatar) => difficulty__lvl(avatar__cr(avatar))
