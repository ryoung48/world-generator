export const resistances = ['fire', 'cold', 'shock', 'holy', 'necrotic'] as const
export type resistance = typeof resistances[number]

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
