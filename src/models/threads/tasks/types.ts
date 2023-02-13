import type { Stage } from '../stages/types'
import type { Thread } from '../types'

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
  text: string | (() => string)
  nested?: number
  combat?: boolean
  resolve?: (_params: { thread: Thread; stage: Stage }) => void
}
