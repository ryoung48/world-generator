import { Gender, NPC } from '../npcs/types'
import type { Province } from '../regions/provinces/types'
import { Stage } from './stages/types'

export interface Quest extends Pick<Stage, 'status' | 'difficulty'> {
  title?: string
  description?: string
  province: number
  objectives?: Stage[]
  npcs?: {
    id: number
    occupation: string
    gender: Gender
    age: NPC['age']
    outfit: string
    ref: number
    foreigner?: boolean
  }[]
  questGiver?: number
  complexity: number
  failures: number
  started?: boolean
}

export type QuestSpawnParams = { province: Province; pc: number }
export type QuestAdvanceParams = { quest: Quest; pc: number; tag: string }
