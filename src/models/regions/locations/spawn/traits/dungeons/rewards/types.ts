export const dungeon__rewards = [
  'lore',
  'secrets',
  'wealth',
  'key',
  'artifact',
  'resource',
  'plot',
  'legitimacy',
  'maps'
] as const

export type dungeon__reward = typeof dungeon__rewards[number]
