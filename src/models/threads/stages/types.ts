import { Complication } from '../complications/types'
import { Task } from '../tasks/types'

export type Stage = {
  setting: string
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
  // child thread
  child?: number
}
