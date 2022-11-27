export const attributes = [
  'strength',
  'dexterity',
  'constitution',
  'intellect',
  'wisdom',
  'charisma'
] as const
export type ActorAttribute = typeof attributes[number]
