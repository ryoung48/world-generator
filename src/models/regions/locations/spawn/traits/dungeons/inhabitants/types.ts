export const dungeon__inhabitants = [
  'exiled noble',
  'aberrations',
  'automatons',
  'bandits',
  'beasts',
  'cultists',
  'deserters',
  'haunted',
  'hivemind',
  'occultists',
  'primordials',
  'raiders',
  'sentient',
  'spirits',
  'titan',
  'undeath',
  'vampiric'
] as const

export type dungeon__inhabitant = typeof dungeon__inhabitants[number]
