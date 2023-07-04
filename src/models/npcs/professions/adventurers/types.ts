import { NPC } from '../../types'

export type Adventurer =
  | 'barbarian'
  | 'chanter'
  | 'cipher'
  | 'druid'
  | 'fighter'
  | 'monk'
  | 'paladin'
  | 'priest'
  | 'ranger'
  | 'rogue'
  | 'wizard'

export type AdventurerKit = Record<
  Adventurer,
  {
    equipment: () => NPC['equipment']
    abilities: {
      minor: NPC['abilities'][number][]
      major: NPC['abilities'][number][]
    }
  }
>

export type AdventurerParams = { count: number; province: number }
