import { location__tag } from '../regions/locations/spawn/traits/types'
import type { Task } from './tasks/types'

export interface Thread extends Task {
  type: 'urban' | 'ruin' | 'explore'
  // location where the thread takes place
  location: number
  // quest giver
  patron?: number
  // quest hook
  hook: location__tag | 'personal'
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
  // list of child tasks
  tasks: (Task | number)[]
  // parent thread
  parent?: number
}

export interface ThreadedEntity {
  threads: number[]
}
