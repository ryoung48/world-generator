export type difficulty = 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly' | 'insanity'
export interface Difficulty {
  tier: difficulty
  // range of weights to be applied to the reference value (multiplicative)
  bounds: [number, number]
  // color used for display
  color: string
  // cost in health for combat encounters
  cost: number
}

export type RandomDifficultyParams = {
  ref: number
  tier?: difficulty
}

export type DifficultyContestParams = {
  avatar: number
  task: { difficulty: number }
}
