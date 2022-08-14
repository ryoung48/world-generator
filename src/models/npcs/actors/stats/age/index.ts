import { year_ms } from '../../../../utilities/math/time'
import { Culture } from '../../../species/humanoids/cultures/types'
import { species__by_culture } from '../../../species/humanoids/taxonomy'
import { Actor } from '../../types'
import {
  age_range,
  age_ranges,
  convert_age,
  get_life_phase,
  get_life_phase_adj,
  life_phase_boundaries,
  life_phases,
  retirement_age
} from './life_phases'

export const actor__expiration_date = (params: {
  culture: Culture
  birth_date: number
  relative_time?: number
  living: boolean
  venerable: boolean
}) => {
  const { culture, birth_date, living, relative_time = window.world.date } = params
  const { ages } = species__by_culture(culture)
  const current_age = get_age({ birth: birth_date, ref: window.world.date })
  const venerable = current_age > ages.old
  const old = current_age > ages['middle age']
  const middle_age = current_age > ages.adult
  const phase: life_phases = params.venerable
    ? 'venerable'
    : window.dice.weighted_choice<life_phases>([
        { v: 'adult', w: middle_age && living ? 0 : 0.5 },
        { v: 'middle age', w: old && living ? 0 : 0.5 },
        { v: 'old', w: venerable && living ? 0 : 0.5 },
        { v: 'venerable', w: 0.05 }
      ])
  const [low, high] = age_range(ages, phase).map(t => birth_date + t * year_ms)
  const buffer = 3 * year_ms // buffer (in years) between spawn date and expiration date
  const buffer_low = relative_time + buffer
  const buffer_high = buffer_low + buffer
  const low_bound = living ? Math.max(low, buffer_low) : low
  const high_bound = living ? Math.max(high, buffer_high) : high
  return window.dice.uniform(low_bound, high_bound)
}

export const get_age = (params: { birth: number; ref: number }) => {
  const birth = new Date(params.birth)
  const ref = new Date(params.ref)
  let age = ref.getFullYear() - birth.getFullYear()
  const months = ref.getMonth() - birth.getMonth()
  if (months < 0 || (months === 0 && ref.getDate() < birth.getDate())) {
    age--
  }
  return age
}

export const actor__birth_date = (params: {
  culture: Culture
  ages?: number[]
  relative_time?: number
}) => {
  const { culture, ages, relative_time = window.world.date } = params
  const [x, y] = ages || age_ranges.full
  const age = window.dice.uniform(x, y)
  const true_age = convert_age(life_phase_boundaries, species__by_culture(culture).ages, age)
  return relative_time - true_age * year_ms
}

export const actor__expired = (npc: Actor) => npc?.expires <= window.world.date

interface ActorAgeProps {
  actor: Actor
  expire_cap?: boolean
  ref_date?: number
}

/**
 * computes the age of an actor
 * @param params.actor - npc for whom to compute age
 * @param params.ref_date - optional reference point, otherwise will use the current date
 * @param params.expire_cap - will use the npc expiration date to cap calculations
 * @returns {number} age
 */
export const actor__age = ({ actor, ref_date = window.world.date, expire_cap }: ActorAgeProps) =>
  get_age({
    birth: actor.birth_date,
    ref: expire_cap ? Math.min(ref_date, actor.expires) : ref_date
  })

export const actor__base_age = ({ actor, ref_date }: Omit<ActorAgeProps, 'expire_cap'>) => {
  const { ages } = species__by_culture(window.world.cultures[actor.culture])
  const age = actor__age({ actor, ref_date })
  return convert_age(ages, life_phase_boundaries, age)
}
export const actor__life_phase = ({ actor, ref_date, expire_cap }: ActorAgeProps) => {
  const { ages } = species__by_culture(window.world.cultures[actor.culture])
  const age = actor__age({ actor, ref_date, expire_cap })
  return get_life_phase(ages, age)
}

export const actor__life_phase_adj = ({ actor, ref_date, expire_cap }: ActorAgeProps) => {
  const { ages } = species__by_culture(window.world.cultures[actor.culture])
  const age = actor__age({ actor, ref_date, expire_cap })
  return get_life_phase_adj(ages, age)
}

export const actor__childbirth_range = (ages: typeof life_phase_boundaries) => {
  const [start] = age_range(ages, 'young adult')
  return [start, convert_age(life_phase_boundaries, ages, 40)]
}

export const actor__union_range = (ages: typeof life_phase_boundaries) =>
  age_range(ages, 'young adult')

export const actor__is_retired = (actor: Actor) => actor__base_age({ actor }) >= retirement_age

export const actor__is_child = (params: ActorAgeProps) => {
  const phase = actor__life_phase(params)
  return phase === 'childhood' || phase === 'adolescence'
}

export const actor__child_title = (params: ActorAgeProps) => {
  const phase = actor__life_phase({ expire_cap: true, ...params })
  return phase === 'childhood' ? 'Child' : 'Adolescent'
}
