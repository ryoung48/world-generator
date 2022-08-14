import { scaleLinear, scalePow } from 'd3-scale'

import { range } from '../../utilities/math'
import { NPC } from '../types'

export const xp_mod = 100

const cr_range = range(50)
const cr_scale = scaleLinear()
  .domain(cr_range)
  .range(cr_range.map(i => 2 ** i - 1))
export const npc__lvl_to_cr = (level: number) => cr_scale(level)
export const npc__cr_to_lvl = (cr: number) => cr_scale.invert(cr)

export const npc__lvl = (npc: NPC) => {
  return Math.max(0, npc.level - npc__cr_to_lvl(npc.mods.cr))
}

const health_scale = scalePow().domain([0, 30]).range([0, 6000]).exponent(1.5)
export const compute_health = (level: number) => {
  return Math.floor(health_scale(level))
}
export const compute_damage = (level: number) => {
  return compute_health(level) / 3.5
}

export const npc__health = (npc: NPC) => {
  const max = compute_health(npc.level)
  const current = max - compute_health(npc__cr_to_lvl(npc.mods.cr))
  const percent = max === 0 ? 0 : current / max
  return { max, current, percent }
}

export const npc__sum_lvl = (npcs: NPC[]) => npcs.reduce((sum, { level }) => sum + level, 0)
export const npc__adjusted_cr = (npcs: NPC[]) =>
  npcs.reduce((sum, npc) => {
    const { level, mods } = npc
    const { percent } = npc__health(npc)
    return sum + npc__lvl_to_cr(level) - mods.cr * (1 - percent)
  }, 0)
export const npc__sum_cr = (npcs: NPC[]) =>
  npcs.reduce((sum, { level }) => sum + npc__lvl_to_cr(level), 0)
