import { NPC } from '../../npcs/types'

export type Encounter = {
  title: string
  npcs: (NPC | number)[]
  resolution?: { approach: 'stealth' | 'combat' | 'diplomacy'; success: boolean }
}
