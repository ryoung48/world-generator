import { Actor } from '../../types'

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
    equipment: () => Actor['equipment']
    abilities: {
      minor: Actor['abilities'][number][]
      major: Actor['abilities'][number][]
    }
  }
>

export type AdventurerParams = { count: number; province: number }
