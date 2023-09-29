export type Stage = {
  setting: { loc: number; place: string; weather: string; duration: string; memory: number }
  // the specific objective of this stage
  challenge:
    | 'mobility'
    | 'stealth'
    | 'investigation'
    | 'knowledge'
    | 'perception'
    | 'insight'
    | 'survival'
    | 'persuasion'
    | 'athletics'
    | 'combat'
  text: string
  // did this stage change location?
  transition?: { src: number; dst: number }
  // status of the task
  status?: 'perfection' | 'success' | 'pyrrhic' | 'failure'
  // child thread
  child?: number
  // relative difficulty
  // PC cr upon completing the thread
  difficulty: { cr: number; pc?: number }
  // how long the task will take to attempt
  duration: number
}

export type Challenge = {
  text: string
  type?: 'wilderness' | 'community'
}

export type Challenges = Record<
  Stage['challenge'],
  {
    text: string
    variations: Challenge[]
  }
>
