const goals = [
  'blackmail',
  'conflict',
  'crime',
  'cursed',
  'eldritch',
  'folly',
  'heist',
  'intrigue',
  'mystery',
  'negotiate',
  'outlaw',
  'rescue',
  'resources',
  'shipment'
] as const

export interface Goal {
  tag: typeof goals[number]
  text: () => string
}
