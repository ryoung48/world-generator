import { Region } from '../../types'
import { Province } from '../types'

export interface Actor {
  title: string
  monstrous?: boolean
  foreign?: boolean
  elder?: boolean
  veteran?: boolean
  youth?: boolean
  child?: boolean
}

export interface HookTemplate {
  hooks: Record<
    string,
    {
      text: string
      enemies: Actor[]
      friends: Actor[]
      complications: string[]
      things: string[]
      places: string[]
      constraints?: {
        urban?: boolean
        capital?: boolean
        coastal?: boolean
        tribal?: boolean
        warfare?: boolean
      }
    }
  >
  subtype: (_params: { loc: Province }) => string
}

export type Hooks = {
  tags: {
    type: 'community' | 'wilderness' | 'ruin' | 'court' | 'religion' | 'war'
    decorated?: string
    subtype: string
    tag: string
    text: string
    friend?: string
    enemy?: string
    complication?: string
    thing?: string
    place?: string
  }[]
  mission?: { tag: string; text: string; complication: string; intro: string }
  // relative difficulty
  // PC cr upon completing the thread
  difficulty: { cr: number; pc?: number }
}

export type HookSpawnParams = { entity: Province | Region; pc: number }
