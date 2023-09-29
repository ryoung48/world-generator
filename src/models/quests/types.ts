import { Stage } from './stages/types'

export interface Quest extends Pick<Stage, 'status' | 'difficulty'> {
  // thread index (window.world.threads)
  idx?: number
  type: 'wilderness' | 'community'
  goal?: { tag: string; text: string; complication: string }
  enemies?: string
  patron?: number
  stages: Stage[]
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
  // parent thread
  parent?: number
}
