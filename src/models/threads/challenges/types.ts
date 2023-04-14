const tasks = [
  'mobility',
  'stealth',
  'investigation',
  'logistics',
  'knowledge',
  'perception',
  'insight',
  'survival',
  'persuasion',
  'athletics',
  'combat'
] as const
export type Challenge = typeof tasks[number]
export type ChallengeDefinition = Record<
  Challenge,
  {
    text: string | (() => string)
    npcs?: number
  }
>
