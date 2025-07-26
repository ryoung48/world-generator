export type Stage = {
  tag: 'stage'
  // status of the task
  status?: 'perfection' | 'success' | 'pyrrhic' | 'failure'
  // task difficulty (cr); not the same as the parent
  // PC cr upon completing the thread
  difficulty: number
  // child thread
  child?: number
}

export type StageParams = { stage: Stage; avatar: number }
