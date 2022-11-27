import { ActorEvent, GetActorEventParams } from './types'

export const actor__addEvent = (params: { event: Omit<ActorEvent, 'idx'> }) => {
  const { event } = params
  const idx = window.world.actorEvents.length
  window.world.actorEvents.push({ ...event, idx })
  return idx
}

export const actor__events = ({ actor, type }: GetActorEventParams) => {
  const events = actor.history.events.map(e => window.world.actorEvents[e])
  return type ? events.filter(e => e.type === type) : events
}

export const actor__validEvents = ({ actor, type }: GetActorEventParams) => {
  return actor__events({ actor, type }).filter(
    e => e.time <= window.world.date && e.time <= actor.dates.death
  )
}
