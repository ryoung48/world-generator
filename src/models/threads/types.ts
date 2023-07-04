import { Mission } from './mission/types'

export interface Thread {
  type: 'community' | 'wilderness' | 'ruin' | 'court' | 'religion'
  subtype: string
  location: number
  details?: { title: string; background: string; hook: string; objectives: string[] }
  fetched?: boolean
  npcs?: { male: string[]; female: string[] }
  // components
  hooks: { tag: string; text: string }[]
  friend?: string
  enemy?: string
  complication?: string
  thing?: string
  place?: string
  hostiles?: string
  mission?: { tag: Mission; text: string; complication: string }
  // rewards
  status?: 'perfection' | 'success' | 'pyrrhic' | 'failure'
  difficulty: { cr: number; pc?: number }
  outcome?: { cp: number; duration: number }
  closed?: boolean
  // generation
  gen?: { title: string; description: string; objectives: { text: string; location: string }[] }
}
