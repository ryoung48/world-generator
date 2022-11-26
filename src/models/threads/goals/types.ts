const goals = [
  'blackmail',
  'bounty',
  'conflict',
  'crime',
  'cursed',
  'event',
  'folly',
  'heist',
  'intrigue',
  'mystery',
  'negotiate',
  'rescue',
  'retrieval'
] as const

export interface Goal {
  tag: typeof goals[number]
  text: () => string
}
