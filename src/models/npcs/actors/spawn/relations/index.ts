import { yearMS } from '../../../../utilities/math/time'
import { actor__pastLocation, actor__relation } from '../..'
import { actor__addEvent, actor__events } from '../../history/events'
import { ActorEventSpawn } from '../../history/events/types'
import { Actor } from '../../types'
import { actor__spawn } from '..'
import { Relation } from '../types'

export const actor__fixExpiration = (actor: Actor) => {
  const [union] = actor__events({ actor, type: 'union' })
  const [youngest] = actor__events({ actor, type: 'child' })
    .map(e => e.time)
    .sort((a, b) => b - a)
  const expireTime = actor.dates.death
  const buffer = 3 * yearMS
  if (expireTime < youngest) actor.dates.death = youngest + buffer
  if (expireTime < union?.time) actor.dates.death = union?.time + buffer
}

export const actorEvent__relation = (params: ActorEventSpawn & { relation: () => Relation }) => {
  const { event, actor, relation, override = {} } = params
  let target = window.world.actors[event.actor]
  if (target) return target
  // pre-select the location
  const location = actor__pastLocation({ actor, time: event.time })
  if (event.loc === undefined) event.loc = location.idx
  target = actor__spawn({
    location,
    gender: event.type === 'child' ? event.gender : undefined,
    relation: relation(),
    living: false,
    ...override
  })
  event.actor = target.idx
  if (event.type === 'child') event.gender = target.gender
  return target
}

const addChildEvent = (params: { parent: Actor; child: Actor }) => {
  const { parent, child } = params
  const childEvent = actor__addEvent({
    event: {
      time: child.dates.birth,
      type: 'child',
      loc: child.location.birth,
      actor: child.idx
    }
  })
  parent.history.events.push(childEvent)
  actor__fixExpiration(parent)
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  if (spouse) {
    actor__fixExpiration(spouse)
    spouse.history.events.push(childEvent)
  }
}

export const actor__addChildRelation = (params: {
  parent: Actor
  child: Actor
  event?: boolean
}) => {
  const { parent, child, event } = params
  // add preplanned events to the parent
  const planning = window.world.actorPlans[child?.parent.plan]
  if (planning) parent.history.events = planning?.events
  // add the corresponding event if this was not spawned by an event
  else if (!event) addChildEvent(params)
  // add the relations on both sides
  parent.relations = [...parent.relations, { actor: child.idx, type: 'child' }]
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  child.relations = [...child.relations, { actor: parent.idx, type: 'parent' }]
  // sync the parent's spouse if applicable
  if (spouse) {
    spouse.relations = [...spouse.relations, { actor: child.idx, type: 'child' }]
    child.relations = [...child.relations, { actor: spouse.idx, type: 'parent' }]
    if (planning) parent.history.events = planning?.events
    actor__fixExpiration(spouse)
  }
}
