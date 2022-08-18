import { range } from 'd3'
import { scaleLinear, scalePow } from 'd3-scale'

import { NPC } from '../types'

export const xpMod = 100

const crRange = range(50)
const crScale = scaleLinear()
  .domain(crRange)
  .range(crRange.map(i => 2 ** i - 1))
export const npc__lvlToCR = (level: number) => crScale(level)
export const npc__CRToLvl = (cr: number) => crScale.invert(cr)

export const npc__lvl = (npc: NPC) => {
  return Math.max(0, npc.level - npc__CRToLvl(npc.mods.cr))
}

const healthScale = scalePow().domain([0, 30]).range([0, 6000]).exponent(1.5)
export const computeHealth = (level: number) => {
  return Math.floor(healthScale(level))
}
export const computeDamage = (level: number) => {
  return computeHealth(level) / 3.5
}

export const npc__health = (npc: NPC) => {
  const max = computeHealth(npc.level)
  const current = max - computeHealth(npc__CRToLvl(npc.mods.cr))
  const percent = max === 0 ? 0 : current / max
  return { max, current, percent }
}

export const npc__sumLvl = (npcs: NPC[]) => npcs.reduce((sum, { level }) => sum + level, 0)
export const npc__adjustedCR = (npcs: NPC[]) =>
  npcs.reduce((sum, npc) => {
    const { level, mods } = npc
    const { percent } = npc__health(npc)
    return sum + npc__lvlToCR(level) - mods.cr * (1 - percent)
  }, 0)
export const npc__sumCR = (npcs: NPC[]) =>
  npcs.reduce((sum, { level }) => sum + npc__lvlToCR(level), 0)
