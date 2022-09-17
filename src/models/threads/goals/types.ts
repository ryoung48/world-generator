import type { Thread } from '../types'

const goals = [
  'blackmail',
  'bounty',
  'defend',
  'destroy',
  'encounter',
  'escape',
  'escort',
  'explore',
  'folly',
  'hazard',
  'heist',
  'intrigue',
  'investigate',
  'locate',
  'persuade',
  'prevent',
  'promote',
  'puzzle',
  'rescue',
  'research',
  'resources',
  'retrieval',
  'smuggle',
  'waylay'
] as const

export interface Goal {
  tag: typeof goals[number]
  type?: Thread['type']
  spawn: () => { text: string; complication?: () => string }
}
