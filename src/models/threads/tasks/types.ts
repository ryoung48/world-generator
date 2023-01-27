const tasks = [
  'track',
  'infiltrate',
  'shadow',
  'search',
  'observe',
  'ambushed',
  'trick',
  'assist',
  'bribe',
  'ambush',
  'waylay',
  'intimidate',
  'support',
  'steal',
  'survive',
  'discredit',
  'betrayal',
  'outmaneuver',
  'favor',
  'defend',
  'convince',
  'sanctum',
  'deliver',
  'confrontation',
  'weaken',
  'destroy',
  'rally',
  'escort',
  'authority',
  'sabotage',
  'preparation',
  'traitor'
] as const
export type Task = {
  tag: typeof tasks[number]
  type: 'investigation' | 'conflict' | 'action'
  text: string
  nested?: number
  combat?: boolean
}
