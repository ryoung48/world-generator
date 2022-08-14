import { find_ranges } from '../../../../utilities/math'
import { month_ms, year_ms } from '../../../../utilities/math/time'
import { species__by_culture } from '../../../species/humanoids/taxonomy'
import { actor__relation } from '../..'
import { actor__childbirth_range, actor__union_range } from '../../stats/age'
import { Actor } from '../../types'
import { ActorEvent } from './types'

export const actor__add_event = (params: { actor: Actor; event: Omit<ActorEvent, 'idx'> }) => {
  const { actor, event } = params
  const idx = window.world.actor_events.length
  window.world.actor_events.push({ ...event, idx })
  actor.history.events.push(idx)
  return idx
}

interface GetEventParams {
  actor: Actor
  type?: ActorEvent['type']
}

export const actor__events = ({ actor, type }: GetEventParams) => {
  const events = actor.history.events.map(e => window.world.actor_events[e])
  return type ? events.filter(e => e.type === type) : events
}

export const actor__valid_events = ({ actor, type }: GetEventParams) => {
  return actor__events({ actor, type }).filter(
    e => e.time <= window.world.date && e.time <= actor.expires
  )
}

export const actor__fix_expiration = (actor: Actor) => {
  const { expires } = actor
  const [union] = actor__events({ actor, type: 'union' })
  const [youngest] = actor__events({ actor, type: 'child' })
    .map(e => e.time)
    .sort((a, b) => b - a)
  const expire_time = expires
  const buffer = 3 * year_ms
  if (expire_time < youngest) actor.expires = youngest + buffer
  if (expire_time < union?.time) actor.expires = union?.time + buffer
}

const add_child_event = (params: { parent: Actor; child: Actor }) => {
  const { parent, child } = params
  const child_event = actor__add_event({
    actor: parent,
    event: {
      time: child.birth_date,
      type: 'child',
      loc: child.location.birth,
      actor: child.idx
    }
  })
  actor__fix_expiration(parent)
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  if (spouse) {
    actor__fix_expiration(spouse)
    spouse.history.events = [...spouse.history.events, child_event]
  }
}

export const actor__add_child_relation = (params: {
  parent: Actor
  child: Actor
  event?: boolean
}) => {
  const { parent, child, event } = params
  if (!event) add_child_event(params)
  parent.relations = [...parent.relations, { actor: child.idx, type: 'child' }]
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  child.relations = [...child.relations, { actor: parent.idx, type: 'parent' }]
  if (spouse) {
    spouse.relations = [...spouse.relations, { actor: child.idx, type: 'child' }]
    child.relations = [...child.relations, { actor: spouse.idx, type: 'parent' }]
    actor__fix_expiration(spouse)
  }
}

const find_eldest_child = (actor: Actor) => {
  const children = actor__events({ actor, type: 'child' }).map(e => e.time)
  return children.length > 0 ? Math.min(...children) : Infinity
}

export const actor__union_date = (params: { actor: Actor; chance: number }) => {
  const { actor, chance } = params
  const [union] = actor__events({ actor, type: 'union' })
  let union_date = union?.time
  if (union_date) return union_date
  const { birth_date, expires } = actor
  const { ages } = species__by_culture(window.world.cultures[actor.culture])
  const [start, end] = actor__union_range(ages)
  const start_date = birth_date + start * year_ms
  const eldest_child = find_eldest_child(actor) - month_ms * 9
  const end_date = birth_date + end * year_ms
  const max_end = Math.min(end_date, eldest_child, expires)
  if (window.dice.random < chance) {
    union_date = window.dice.uniform(start_date, max_end)
    actor__add_event({ actor, event: { type: 'union', time: union_date } })
  }
  return union_date
}

const find_birth_dates = (actor: Actor) => {
  const { ages } = species__by_culture(window.world.cultures[actor.culture])
  const [start, end] = actor__childbirth_range(ages)
  const start_date = actor.birth_date + year_ms * start
  const end_date = actor.birth_date + year_ms * end
  const union_date = actor__union_date({ actor, chance: 1 })
  const min_start = Math.max(start_date, union_date)
  const max_end = Math.min(end_date, actor.expires)
  const voids: [number, number][] = actor__events({ actor: actor, type: 'child' }).map(e => [
    e.time - year_ms,
    e.time + year_ms
  ])
  return find_ranges({ domain: [min_start, max_end], voids })
}

export const find_birth_date = (params: { actor: Actor; ages?: number[] }) => {
  const { actor, ages } = params
  const dates = find_birth_dates(actor)
  const prospects = dates
    .map(([min, max]) => {
      if (!ages) return [min, max]
      const [age_max, age_min] = ages
      if (age_min > max || age_max < min) return []
      if (age_min < min && age_max > max) return [min, max]
      if (age_min > min && age_max > max) return [age_min, max]
      if (age_min < min && age_max < max) return [min, age_max]
      return [age_min, age_max]
    })
    .filter(r => r.length === 2)
  if (prospects.length === 0) return undefined
  return window.dice.uniform(...window.dice.choice(prospects))
}
