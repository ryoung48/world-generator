import { range } from 'd3'

import { findRanges } from '../../../../utilities/math'
import { monthMS, yearMS } from '../../../../utilities/math/time'
import { decoratedProfile } from '../../../../utilities/performance'
import { species__byCulture } from '../../../species/taxonomy'
import { actor__childbirthRange, actor__expirationDate, actor__unionRange } from '../../stats/age'
import { npc__randomGender } from '../../stats/appearance/gender'
import { profession__socialClass } from '../../stats/professions'
import { Occupation } from '../../stats/professions/types'
import { actor__addEvent } from '.'
import { ActorEventPlan, PlanChildParams } from './types'

const findEldestChild = (events: ActorEventPlan[]) => {
  const children = events.filter(e => e.type === 'child').map(e => e.time)
  return children.length > 0 ? Math.min(...children) : Infinity
}

export const actor__findUnionDate = (
  params: PlanChildParams & {
    chance: number
  }
) => {
  const { birth: birthDate, death: expires, events } = params
  const [union] = events.filter(e => e.type === 'union')
  let unionDate = union?.time
  if (unionDate) return { date: unionDate, event: false }
  const { ages } = species__byCulture(window.world.cultures[params.culture])
  const [start, end] = actor__unionRange(ages)
  const startDate = birthDate + start * yearMS
  const eldestChild = findEldestChild(params.events) - monthMS * 9
  const endDate = birthDate + end * yearMS
  const maxEnd = Math.min(endDate, eldestChild, expires)
  if (window.dice.random < params.chance) {
    return { date: window.dice.uniform(startDate, maxEnd), event: true }
  }
}

export const actor__planChild = (
  params: PlanChildParams & { ages?: number[]; unionDate: number }
) => {
  const { ages, unionDate } = params
  const species = species__byCulture(window.world.cultures[params.culture])
  const [start, end] = actor__childbirthRange(species.ages)
  const startDate = params.birth + yearMS * start
  const endDate = params.birth + yearMS * end
  const minStart = Math.max(startDate, unionDate)
  const maxEnd = Math.min(endDate, params.death)
  const voids: [number, number][] = params.events
    .filter(e => e.type === 'child')
    .map(e => [e.time - yearMS, e.time + yearMS])
  const dates = findRanges({ domain: [minStart, maxEnd], voids })
  const prospects = dates
    .map(([min, max]) => {
      if (!ages) return [min, max]
      const [ageMax, ageMin] = ages
      if (ageMin > max || ageMax < min) return []
      if (ageMin < min && ageMax > max) return [min, max]
      if (ageMin > min && ageMax > max) return [ageMin, max]
      if (ageMin < min && ageMax < max) return [min, ageMax]
      return [ageMin, ageMax]
    })
    .filter(r => r.length === 2)
  if (prospects.length === 0) return undefined
  return window.dice.uniform(...window.dice.choice(prospects))
}

const actor__planChildren = (params: PlanChildParams & { unionDate: number }) => {
  const preplanned = params.events.filter(e => e.type === 'child').map(e => e.time)
  const childCount = Math.max(
    0,
    window.dice.weightedChoice([
      { v: 0, w: 0.05 },
      { v: 1, w: 0.25 },
      { v: 2, w: 0.45 },
      { v: 3, w: 0.25 }
    ]) - preplanned.length
  )
  const children: ActorEventPlan[] = []
  range(childCount).forEach(() => {
    const birthDate = actor__planChild(params)
    const expires = actor__expirationDate({
      birthDate,
      culture: window.world.cultures[params.culture],
      living: false,
      venerable: false
    })
    if (birthDate !== undefined)
      children.push({ type: 'child', time: birthDate, expires, gender: npc__randomGender() })
  })
  return children
}

export const _actor__plan = (params: PlanChildParams & { occupation: Occupation }) => {
  const children = params.events.filter(e => e.type === 'child')
  const socialClass = profession__socialClass(params.occupation.key)
  const noble = socialClass === 'upper' ? 1 : 0
  const unionChance = children.length > 0 ? 1 : noble ? 0.95 : 0.9
  const union = actor__findUnionDate({ ...params, chance: unionChance })
  const events: ActorEventPlan[] = []
  if (union?.event) events.push({ type: 'union', time: union.date })
  if (union?.date) events.push(...actor__planChildren({ ...params, unionDate: union.date }))
  return events.map(event => actor__addEvent({ event }))
}

export const actor__plan = decoratedProfile(_actor__plan)
