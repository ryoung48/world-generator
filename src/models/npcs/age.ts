const lifeCycle = [
  'childhood',
  'adolescence',
  'young adult',
  'adult',
  'middle age',
  'old',
  'venerable'
] as const

export type LifePhase = typeof lifeCycle[number]
