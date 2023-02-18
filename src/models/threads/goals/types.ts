import type { Thread } from '../types'

const goals = [
  'blackmail',
  'crime',
  'cursed',
  'folly',
  'heist',
  'intrigue',
  'mystery',
  'negotiate',
  'rescue'
] as const

export interface Goal {
  tag: typeof goals[number]
  text: (_params: { thread: Thread }) => string
}
