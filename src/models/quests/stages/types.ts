export type Stage = {
  text: string
  location: string
  npcs: number[]
  resolution?: string
  sideEffects?: { positive: string; negative: string }
  options?: {
    tag: string
    text: string
    difficulty: number
    selected?: boolean
  }[]
  setting?: { weather: string; duration: string; memory: number }
  // status of the task
  status?: 'perfection' | 'success' | 'pyrrhic' | 'failure'
  // relative difficulty
  // PC cr upon completing the thread
  difficulty?: { cr: number; pc?: number }
  // how long the task will take to attempt
  duration?: number
}

export type StageOptions = {
  options: Stage['options']
  sideEffects: Stage['sideEffects']
}
