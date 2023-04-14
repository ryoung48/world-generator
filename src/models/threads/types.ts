import { Mission } from './mission/types'
import { Stage } from './stages/types'

export interface Thread
  extends Omit<Stage, 'child' | 'challenge' | 'text' | 'result' | 'setting' | 'duration'> {
  type: 'community' | 'wilderness' | 'court' | 'ruin' | 'religion'
  subtype: string
  hooks: { tag: string; text: string }[]
  // thread index (window.world.threads)
  idx?: number
  // components
  friend: string
  enemy: string
  complication: string
  thing: string
  place: string
  hostiles: string
  mission?: { tag: Mission; text: string }
  // location where the thread takes place
  location: number
  origin: number
  // how deep is the ancestral tree? (max 3)
  depth: number
  // how many tasks must be completed to achieve the goal?
  complexity: number
  // how many tasks have been completed?
  progress: number
  // how many tasks have failed?
  failures: number
  // is this thread closed?
  closed?: boolean
  accepted?: boolean
  // list of child tasks
  stages: Stage[]
  // parent thread
  parent?: number
  // actors
  pcs?: number[]
  // rewards
  outcome?: { cp: number }
}
