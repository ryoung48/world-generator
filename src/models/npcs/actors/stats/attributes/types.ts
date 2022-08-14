export const attributes = [
  'strength',
  'dexterity',
  'constitution',
  'intellect',
  'wisdom',
  'charisma'
] as const
export type attribute = typeof attributes[number]
