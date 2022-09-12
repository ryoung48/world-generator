import { Goal } from '../goals/types'

export type Task = {
  // thread index (window.world.threads)
  idx?: number
  // the specific objective of this task
  goal: Goal['tag']
  // text describing the goal
  text: string
  // status of the task
  status?: 'perfection' | 'success' | 'pyrrhic' | 'failure'
  // task difficulty (cr); not the same as the parent
  // PC cr upon completing the thread
  difficulty: { cr: number; pc?: number }
  // how long the task will take to attempt
  duration: number
  // experience rewarded by this task
  exp: number
}
