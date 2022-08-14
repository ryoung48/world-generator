import { scale } from '../../../../utilities/math'

export const life_cycle = [
  'childhood',
  'adolescence',
  'young adult',
  'adult',
  'middle age',
  'old',
  'venerable'
] as const

export type life_phases = typeof life_cycle[number]

export const life_phase_boundaries: Record<life_phases, number> = {
  childhood: 5,
  adolescence: 17,
  'young adult': 32,
  adult: 48,
  'middle age': 64,
  old: 80,
  venerable: 98
}

export const retirement_age = 70

export const compute_life_phase_boundaries = (
  ages: typeof life_phase_boundaries,
  mod: number
): Record<life_phases, number> => {
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

export const age_range = (ages: typeof life_phase_boundaries, phase: life_phases) => {
  const curr = life_cycle.findIndex(p => p === phase)
  const prev_phase = life_cycle[curr - 1]
  const lower = ages[prev_phase] || 0
  const upper = ages[phase]
  return [lower, upper]
}

export const get_life_phase = (ages: typeof life_phase_boundaries, age: number): life_phases => {
  if (age <= ages.childhood) return 'childhood'
  else if (age <= ages.adolescence) return 'adolescence'
  else if (age <= ages['young adult']) return 'young adult'
  else if (age <= ages.adult) return 'adult'
  else if (age <= ages['middle age']) return 'middle age'
  else if (age <= ages.old) return 'old'
  else return 'venerable'
}

export const get_life_phase_adj = (ages: typeof life_phase_boundaries, age: number) => {
  if (age <= ages.childhood) return 'a child'
  else if (age <= ages.adolescence) return 'an adolescent'
  else if (age <= ages['young adult']) return 'a young adult'
  else if (age <= ages.adult) return 'an adult'
  else if (age <= ages['middle age']) return 'a middle-aged'
  else if (age <= ages.old) return 'an old'
  else return 'a venerable'
}

export const convert_age = (
  old_bound: typeof life_phase_boundaries,
  new_bound: typeof life_phase_boundaries,
  age: number
) => {
  const phase = get_life_phase(old_bound, age)
  const [old_lower, old_upper] = age_range(old_bound, phase)
  const [new_lower, new_upper] = age_range(new_bound, phase)
  return scale([old_lower, old_upper], [new_lower, new_upper], age)
}

export const convert_age_standard = (ages: typeof life_phase_boundaries, age: number) => {
  return convert_age(life_phase_boundaries, ages, age)
}

export const age_ranges = {
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
