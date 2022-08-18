import { findRanges } from '../../../../utilities/math'
import { monthMS, yearMS } from '../../../../utilities/math/time'
import { species__byCulture } from '../../../species/taxonomy'
import { actor__relation } from '../..'
import { actor__childbirthRange, actor__unionRange } from '../../stats/age'
import { Actor } from '../../types'
import { ActorEvent } from './types'

export const actor__addEvent = (params: { actor: Actor; event: Omit<ActorEvent, 'idx'> }) => {
  const { actor, event } = params
  const idx = window.world.actorEvents.length
  window.world.actorEvents.push({ ...event, idx })
  actor.history.events.push(idx)
  return idx
}

interface GetEventParams {
  actor: Actor
  type?: ActorEvent['type']
}

export const actor__events = ({ actor, type }: GetEventParams) => {
  const events = actor.history.events.map(e => window.world.actorEvents[e])
  return type ? events.filter(e => e.type === type) : events
}

export const actor__validEvents = ({ actor, type }: GetEventParams) => {
  return actor__events({ actor, type }).filter(
    e => e.time <= window.world.date && e.time <= actor.expires
  )
}

export const actor__fixExpiration = (actor: Actor) => {
  const { expires } = actor
  const [union] = actor__events({ actor, type: 'union' })
  const [youngest] = actor__events({ actor, type: 'child' })
    .map(e => e.time)
    .sort((a, b) => b - a)
  const expireTime = expires
  const buffer = 3 * yearMS
  if (expireTime < youngest) actor.expires = youngest + buffer
  if (expireTime < union?.time) actor.expires = union?.time + buffer
}

const addChildEvent = (params: { parent: Actor; child: Actor }) => {
  const { parent, child } = params
  const childEvent = actor__addEvent({
    actor: parent,
    event: {
      time: child.birthDate,
      type: 'child',
      loc: child.location.birth,
      actor: child.idx
    }
  })
  actor__fixExpiration(parent)
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  if (spouse) {
    actor__fixExpiration(spouse)
    spouse.history.events = [...spouse.history.events, childEvent]
  }
}

export const actor__addChildRelation = (params: {
  parent: Actor
  child: Actor
  event?: boolean
}) => {
  const { parent, child, event } = params
  if (!event) addChildEvent(params)
  parent.relations = [...parent.relations, { actor: child.idx, type: 'child' }]
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  child.relations = [...child.relations, { actor: parent.idx, type: 'parent' }]
  if (spouse) {
    spouse.relations = [...spouse.relations, { actor: child.idx, type: 'child' }]
    child.relations = [...child.relations, { actor: spouse.idx, type: 'parent' }]
    actor__fixExpiration(spouse)
  }
}

const findEldestChild = (actor: Actor) => {
  const children = actor__events({ actor, type: 'child' }).map(e => e.time)
  return children.length > 0 ? Math.min(...children) : Infinity
}

export const actor__unionDate = (params: { actor: Actor; chance: number }) => {
  const { actor, chance } = params
  const [union] = actor__events({ actor, type: 'union' })
  let unionDate = union?.time
  if (unionDate) return unionDate
  const { birthDate, expires } = actor
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  const [start, end] = actor__unionRange(ages)
  const startDate = birthDate + start * yearMS
  const eldestChild = findEldestChild(actor) - monthMS * 9
  const endDate = birthDate + end * yearMS
  const maxEnd = Math.min(endDate, eldestChild, expires)
  if (window.dice.random < chance) {
    unionDate = window.dice.uniform(startDate, maxEnd)
    actor__addEvent({ actor, event: { type: 'union', time: unionDate } })
  }
  return unionDate
}

const findBirthDates = (actor: Actor) => {
  const { ages } = species__byCulture(window.world.cultures[actor.culture])
  const [start, end] = actor__childbirthRange(ages)
  const startDate = actor.birthDate + yearMS * start
  const endDate = actor.birthDate + yearMS * end
  const unionDate = actor__unionDate({ actor, chance: 1 })
  const minStart = Math.max(startDate, unionDate)
  const maxEnd = Math.min(endDate, actor.expires)
  const voids: [number, number][] = actor__events({ actor: actor, type: 'child' }).map(e => [
    e.time - yearMS,
    e.time + yearMS
  ])
  return findRanges({ domain: [minStart, maxEnd], voids })
}

export const actor__findBirthDate = (params: { actor: Actor; ages?: number[] }) => {
  const { actor, ages } = params
  const dates = findBirthDates(actor)
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
