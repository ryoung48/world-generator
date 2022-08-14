const goals = [
  'retrieval',
  'heist',
  'rescue',
  'chase',
  'bounty',
  'defend',
  'guard',
  'destroy',
  'escort',
  'deliver',
  'hijack',
  'capture',
  'scout',
  'persuade',
  'meeting',
  'discord',
  'distract',
  'infiltrate',
  'investigate',
  'escape',
  'survive',
  'prevent',
  'promote',
  'repair',
  'create'
] as const

export interface Goal {
  tag: typeof goals[number]
  text: () => string
  weight: number
  non_empty?: boolean
}
