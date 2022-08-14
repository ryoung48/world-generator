import { Inventory } from './inventory/types'
import { species__sizes } from './species/size'
import { Species } from './species/types'

export const npc__mods = { cr: 0, exp: 0 }
export interface NPC {
  name: string
  tier?: string // descriptive level (enemies only)
  level: number // combat rating
  mods: typeof npc__mods
  inventory: Inventory
  tag?: 'actor'
  species: {
    type: Species['tag']
    idx?: number
    size?: species__sizes
    family?: string
    genus?: string
  }
  culture?: number
}
