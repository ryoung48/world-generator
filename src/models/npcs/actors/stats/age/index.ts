import { yearMS } from '../../../../utilities/math/time'
import { Culture } from '../../../species/cultures/types'
import { species__byCulture } from '../../../species/taxonomy'
import { Actor } from '../../types'
import {
  ageRange,
  ageRanges,
  convertAge,
  getLifePhase,
  getLifePhaseAdj,
  LifePhase,
  lifePhaseBoundaries,
  retirementAge
} from './life_phases'

export const actor__expirationDate = (params: {
  culture: Culture
  birthDate: number
  relativeTime?: number
  living: boolean
  venerable: boolean
}) => {
  const { culture, birthDate, living, relativeTime = window.world.date } = params
  const { ages } = species__byCulture(culture)
  const currentAge = getAge({ birth: birthDate, ref: window.world.date })
  const venerable = currentAge > ages.old
  const old = currentAge > ages['middle age']
  const middleAge = currentAge > ages.adult
  const phase: LifePhase = params.venerable
    ? 'venerable'
    : window.dice.weightedChoice<LifePhase>([
        { v: 'adult', w: middleAge && living ? 0 : 0.5 },
        { v: 'middle age', w: old && living ? 0 : 0.5 },
        { v: 'old', w: venerable && living ? 0 : 0.5 },
        { v: 'venerable', w: 0.05 }
      ])
  const [low, high] = ageRange(ages, phase).map(t => birthDate + t * yearMS)
  const buffer = 3 * yearMS // buffer (in years) between spawn date and expiration date
  const bufferLow = relativeTime + buffer
  const bufferHigh = bufferLow + buffer
  const lowBound = living ? Math.max(low, bufferLow) : low
  const highBound = living ? Math.max(high, bufferHigh) : high
  return window.dice.uniform(lowBound, highBound)
}

export const getAge = (params: { birth: number; ref: number }) => {
  const birth = new Date(params.birth)
  const ref = new Date(params.ref)
  let age = ref.getFullYear() - birth.getFullYear()
  const months = ref.getMonth() - birth.getMonth()
  if (months < 0 || (months === 0 && ref.getDate() < birth.getDate())) {
    age--
  }
  return age
}

export const actor__birthDate = (params: {
  culture: Culture
  ages?: number[]
  relativeTime?: number
}) => {
  const { culture, ages, relativeTime = window.world.date } = params
  const [x, y] = ages || ageRanges.full
  const age = window.dice.uniform(x, y)
  const trueAge = convertAge(lifePhaseBoundaries, species__byCulture(culture).ages, age)
  return relativeTime - trueAge * yearMS
}

export const actor__expired = (npc: Actor) => npc?.dates.death <= window.world.date

interface ActorAgeProps {
  actor: Actor
  expireCap?: boolean
  refDate?: number
}

/**
 * computes the age of an actor
 * @param params.actor - npc for whom to compute age
 * @param params.refDate - optional reference point, otherwise will use the current date
 * @param params.expireCap - will use the npc expiration date to cap calculations
 * @returns {number} age
 */
export const actor__age = ({ actor, refDate = window.world.date, expireCap }: ActorAgeProps) =>
  getAge({
    birth: actor.dates.birth,
    ref: expireCap ? Math.min(refDate, actor.dates.death) : refDate
  })

export const actor__baseAge = ({ actor, refDate }: Omit<ActorAgeProps, 'expireCap'>) => {
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  const age = actor__age({ actor, refDate: refDate })
  return convertAge(ages, lifePhaseBoundaries, age)
}
export const actor__lifePhase = ({ actor, refDate, expireCap }: ActorAgeProps) => {
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  const age = actor__age({ actor, refDate: refDate, expireCap: expireCap })
  return getLifePhase(ages, age)
}

export const actor__lifePhaseAdj = ({ actor, refDate, expireCap }: ActorAgeProps) => {
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  const age = actor__age({ actor, refDate: refDate, expireCap: expireCap })
  return getLifePhaseAdj(ages, age)
}

export const actor__childbirthRange = (ages: typeof lifePhaseBoundaries) => {
  const [start] = ageRange(ages, 'young adult')
  return [start, convertAge(lifePhaseBoundaries, ages, 40)]
}

export const actor__unionRange = (ages: typeof lifePhaseBoundaries) => ageRange(ages, 'young adult')

export const actor__isRetired = (actor: Actor) => actor__baseAge({ actor }) >= retirementAge

export const actor__isChild = (params: ActorAgeProps) => {
  const phase = actor__lifePhase(params)
  return phase === 'childhood' || phase === 'adolescence'
}

export const actor__childTitle = (params: ActorAgeProps) => {
  const phase = actor__lifePhase({ expireCap: true, ...params })
  return phase === 'childhood' ? 'Child' : 'Adolescent'
}
