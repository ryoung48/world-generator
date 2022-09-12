export const dungeon__rewards = [
  'ancient lore',
  'arcane artifact',
  'important key',
  'lethal treasure',
  'lost secrets',
  'resource rich',
  'righteous legitimacy',
  'sinister plot',
  'useless treasure',
  'valuable maps',
  'vast wealth'
] as const

export type dungeon__reward = typeof dungeon__rewards[number]
