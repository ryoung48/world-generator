import { inventory__spawn } from './inventory'
import { NPC, npc__mods } from './types'

export const npc__spawn = (params: {
  name: string
  level: number
  species: NPC['species']
  tier?: string
}): NPC => {
  return { ...params, mods: { ...npc__mods }, inventory: inventory__spawn() }
}
