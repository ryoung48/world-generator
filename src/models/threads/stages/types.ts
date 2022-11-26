import { Complication } from '../complications/types'
import { Task } from '../tasks/types'

export type Stage = {
  // the specific objective of this stage
  task: Task['tag']
  // text describing the goal
  text: string
  // complication (flavor)
  complication?: { tag: Complication['tag']; text: string }
  // did this stage change location?
  transition?: { src: number; dst: number }
  // status of the task
  status?: 'perfection' | 'success' | 'pyrrhic' | 'failure'
  // task difficulty (cr); not the same as the parent
  // PC cr upon completing the thread
  difficulty: { cr: number; pc?: number }
  // how long the task will take to attempt
  duration: number
  // experience rewarded by this task
  exp: number
  // child thread
  child?: number
  // combat encounter
  combat?: boolean
}
