import { location__tag } from '../regions/locations/spawn/traits/types'
import { Goal } from './goals/types'

export type Task = {
  // the specific objective of this task
  goal: Goal['tag']
  // text describing the goal
  text: string
  // status of the task
  status:
    | 'fresh'
    | 'in progress'
    | 'paused'
    | 'perfection'
    | 'success'
    | 'pyrrhic'
    | 'failure'
    | 'abandoned'
    | 'blocked'
  // task difficulty (cr); not the same as the parent
  // PC cr upon completing the thread
  difficulty: { cr: number; pc?: number }
  // how long the task will take to attempt
  duration: number
  // is this task a sub-thread?
  thread?: number
  // experience rewarded by this task
  exp?: number
}

export type ChildTask = Task | number

export interface Thread {
  // thread index (window.world.threads)
  idx: number
  // parent thread
  parent?: number
  // over-arching objective of the thread that all tasks collectively work towards
  goal: Goal['tag']
  // text describing the goal
  text: string
  // location where the thread takes place
  location: number
  // quest giver
  patron: number
  // quest hook
  hook: location__tag | 'personal'
  // experience rewarded by the thread
  exp?: number
  // thread difficulty (cr) upon which all children are based off of
  // PC cr upon completing the thread
  difficulty: { cr: number; pc?: number }
  // how many tasks must be completed to achieve the goal?
  complexity: number
  // how deep is the ancestral tree? (max 3)
  depth: number
  // how many tasks have been completed?
  progress: number
  // how many tasks have failed?
  failures: number
  // is this thread closed?
  closed?: boolean
  // has this thread been opened?
  opened?: boolean
  // list of child tasks
  tasks: ChildTask[]
  // task forks and their options
  fork?: {
    text: string
    tasks: ChildTask[]
  }
}

export interface ThreadedEntity {
  threads: number[]
}
