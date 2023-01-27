import { NPC } from '../npcs/types'
import { Background } from './backgrounds/types'
import { difficulty } from './difficulty'
import { Goal } from './goals/types'
import { Stage } from './stages/types'

export interface Thread extends Omit<Stage, 'child' | 'task' | 'text' | 'setting'> {
  // thread index (window.world.threads)
  idx?: number
  // relative difficulty
  difficulty: difficulty
  // goal that defines the thread
  goal?: { tag: Goal['tag']; text: string }
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
  // successful investigations
  clues: number
  // is this thread closed?
  closed?: boolean
  // list of child tasks
  stages: Stage[]
  // parent thread
  parent?: number
  // actors
  actors: { idx: number; tag: 'patron' | 'rival' }[]
  // background
  background: { tag: Background; text: string }
}

export interface ThreadContext {
  ref?: NPC
  role: Thread['actors'][number]['tag']
  background: Background
}
