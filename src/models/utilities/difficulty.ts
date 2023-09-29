import { range, scaleLinear } from 'd3'

import { Avatar } from '../../components/context/types'
import { cssColors } from '../../components/theme/colors'
import { slots } from '../npcs/equipment'
import { Item } from '../npcs/equipment/types'
import { Actor } from '../npcs/types'
import { MATH } from './math'

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

const difficulties: Record<Difficulty, DifficultyInfo> = {
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

const crRange = range(50)
const crScale = scaleLinear()
  .domain(crRange)
  .range(crRange.map(i => 2 ** i - 1))

export const DIFFICULTY = {
  actor: {
    cr: (npc: Actor) =>
      (npc.equipment ?? []).reduce((sum, item) => sum + DIFFICULTY.item.cr(item), 0),
    lvl: (npc: Actor) => DIFFICULTY.lvl(DIFFICULTY.actor.cr(npc))
  },
  avatar: {
    cr: ({ pcs }: Avatar) =>
      pcs.map(p => DIFFICULTY.actor.cr(window.world.npcs[p])).reduce((sum, cr) => sum + cr, 0),
    lvl: (avatar: Avatar) => DIFFICULTY.lvl(DIFFICULTY.avatar.cr(avatar))
  },
  cr: (level: number) => crScale(level),
  item: { cr: (item: Item) => (slots[item.slot] * DIFFICULTY.cr(item.tier + 1)) / 2.5 },
  lookup: difficulties,
  lvl: (cr: number) => crScale.invert(cr),
  odds: (params: { pc: number; cr: number }) => {
    const { pc, cr } = params
    const ratio = cr / pc
    const { tier } =
      Object.values(difficulties).find(({ bounds: [x, y] }) => ratio >= x && ratio < y) ??
      difficulties.insanity
    const success = Math.min(1, MATH.scale([0.25, 2.25], [1, 0], ratio))
    return { ratio, tier, odds: 1 - success }
  },
  random: (ref: number) => {
    const tier = window.dice.weightedChoice<Difficulty>([
      { w: 0.2, v: 'easy' },
      { w: 0.5, v: 'medium' },
      { w: 0.2, v: 'hard' },
      { w: 0.1, v: 'deadly' },
      { w: 0.05, v: 'insanity' }
    ])
    return ref * window.dice.uniform(...difficulties[tier].bounds)
  }
}
