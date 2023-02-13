import { Complication } from '../complications/types'
import { Task } from '../tasks/types'

export type Stage = {
  setting: { place: string; weather: string; duration: string; memory: number }
  // the specific objective of this stage
  task: Task['tag']
  // text describing the goal
  text: string
  result: string
  // complication (flavor)
  complication?: { tag: Complication['tag']; text: string }
  // did this stage change location?
  transition?: { src: number; dst: number }
  // status of the task
  status?: 'perfection' | 'success' | 'pyrrhic' | 'failure'
  // child thread
  child?: number
  // relative difficulty
  // PC cr upon completing the thread
  difficulty: { cr: number; pc?: number }
  xp?: number
  // how long the task will take to attempt
  duration: number
}
