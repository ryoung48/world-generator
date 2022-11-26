import type { Thread } from '../types'

const complications = [
  'anonymity',
  'appeal',
  'betrayal',
  'blackmail',
  'bolster',
  'chaos',
  'competition',
  'conflict',
  'cooperation',
  'curse',
  'damaged',
  'diplomatic',
  'duplicates',
  'essential',
  'facade',
  'hostile',
  'intrigue',
  'mastermind',
  'misinformation',
  'morality',
  'motivations',
  'obscure',
  'reinforcements',
  'removal',
  'resources',
  'safety',
  'scattered',
  'solitude',
  'tainted',
  'time',
  'transient',
  'treachery',
  'trust',
  'untouchable',
  'weaken'
] as const

export type Complication = {
  tag: typeof complications[number]
  type: ('task' | 'goal')[]
  valid?: (_thread: Thread) => boolean
  text: () => string
}
