import { Region } from '../regions/types'
import { EventType, WorldEvent } from './types'

/**
 * logs past events
 * @param params.event_idx - index of the event (wars & rebellions)
 * @param params.event_type - health|diplomacy|war|rebellion|etc
 * @param params.title - log entry title
 * @param params.text - log entry text
 * @param params.actors - actors (regions) involved in the event
 */
export const logEvent = (params: {
  eventIdx?: number
  eventType: EventType
  title: string
  text: string
  actors: Region[]
}) => {
  const idx = window.world.past.length
  window.world.past.push({
    idx,
    eventIdx: params.eventIdx,
    type: params.eventType,
    text: params.text,
    title: params.title,
    time: window.world.date,
    actors: params.actors.map(({ idx, wealth, maxWealth }) => ({ idx, wealth, maxWealth }))
  })
  params.actors.forEach(actor => actor.past.push(idx))
}

/**
 * Adds a future event to the queue
 * @param event - a future world event
 */
export const addEvent = (event: WorldEvent) => {
  window.world.future.queue(event)
}
