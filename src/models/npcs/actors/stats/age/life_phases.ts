import { scale } from '../../../../utilities/math'

export const lifeCycle = [
  'childhood',
  'adolescence',
  'young adult',
  'adult',
  'middle age',
  'old',
  'venerable'
] as const

export type LifePhase = typeof lifeCycle[number]

export const lifePhaseBoundaries: Record<LifePhase, number> = {
  childhood: 5,
  adolescence: 17,
  'young adult': 32,
  adult: 48,
  'middle age': 64,
  old: 80,
  venerable: 98
}

export const retirementAge = 70

export const computeLifePhaseBoundaries = (
  ages: typeof lifePhaseBoundaries,
  mod: number
): Record<LifePhase, number> => {
  const adolescence = scale([0.7, 1, 1.2, 1.8, 3], [0.75, 1, 1.17, 1.41, 1.64], mod)
  return {
    childhood: Math.round(mod * ages.childhood),
    adolescence: Math.round(adolescence * ages.adolescence),
    'young adult': Math.round(mod * ages['young adult']),
    adult: Math.round(mod * ages.adult),
    'middle age': Math.round(mod * ages['middle age']),
    old: Math.round(mod * ages.old),
    venerable: Math.round(mod * ages.venerable)
  }
}

export const ageRange = (ages: typeof lifePhaseBoundaries, phase: LifePhase) => {
  const curr = lifeCycle.findIndex(p => p === phase)
  const prevPhase = lifeCycle[curr - 1]
  const lower = ages[prevPhase] || 0
  const upper = ages[phase]
  return [lower, upper]
}

export const getLifePhase = (ages: typeof lifePhaseBoundaries, age: number): LifePhase => {
  if (age <= ages.childhood) return 'childhood'
  else if (age <= ages.adolescence) return 'adolescence'
  else if (age <= ages['young adult']) return 'young adult'
  else if (age <= ages.adult) return 'adult'
  else if (age <= ages['middle age']) return 'middle age'
  else if (age <= ages.old) return 'old'
  else return 'venerable'
}

export const getLifePhaseAdj = (ages: typeof lifePhaseBoundaries, age: number) => {
  if (age <= ages.childhood) return 'a child'
  else if (age <= ages.adolescence) return 'an adolescent'
  else if (age <= ages['young adult']) return 'a young adult'
  else if (age <= ages.adult) return 'an adult'
  else if (age <= ages['middle age']) return 'a middle-aged'
  else if (age <= ages.old) return 'an old'
  else return 'a venerable'
}

export const convertAge = (
  oldBound: typeof lifePhaseBoundaries,
  newBound: typeof lifePhaseBoundaries,
  age: number
) => {
  const phase = getLifePhase(oldBound, age)
  const [oldLower, oldUpper] = ageRange(oldBound, phase)
  const [newLower, newUpper] = ageRange(newBound, phase)
  return scale([oldLower, oldUpper], [newLower, newUpper], age)
}

export const convertAgeStandard = (ages: typeof lifePhaseBoundaries, age: number) => {
  return convertAge(lifePhaseBoundaries, ages, age)
}

export const ageRanges = {
  // prestige
  apprentice: [18, 30],
  seasoned: [25, 40],
  expert: [35, 80],
  master: [45, 80],
  // military
  recruit: [18, 21],
  junior: [18, 35],
  veteran: [35, 60],
  // all
  full: [18, 70]
}
