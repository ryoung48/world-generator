const tasks = [
  'ambush',
  'confrontation',
  'defend',
  'deliver',
  'distract',
  'escort',
  'infiltration',
  'observe',
  'persuade',
  'preparation',
  'recruit',
  'research',
  'sabotage',
  'smuggle',
  'support',
  'surveillance',
  'traitor',
  'waylay',
  'weaken'
] as const

export type Task = {
  tag: typeof tasks[number]
  text: () => string
  nested?: number
  combat?: number
}
