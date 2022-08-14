import { Region } from '../regions/types'
import { event_type, WorldEvent } from './types'

/**
 * logs past events
 * @param params.event_idx - index of the event (wars & rebellions)
 * @param params.event_type - health|diplomacy|war|rebellion|etc
 * @param params.title - log entry title
 * @param params.text - log entry text
 * @param params.actors - actors (regions) involved in the event
 */
export const log_event = (params: {
  event_idx?: number
  event_type: event_type
  title: string
  text: string
  actors: Region[]
}) => {
  const idx = window.world.past.length
  window.world.past.push({
    idx,
    event_idx: params.event_idx,
    type: params.event_type,
    text: params.text,
    title: params.title,
    time: window.world.date,
    actors: params.actors.map(({ idx, wealth, max_wealth }) => ({ idx, wealth, max_wealth }))
  })
  params.actors.forEach(actor => actor.past.push(idx))
}

/**
 * Adds a future event to the queue
 * @param event - a future world event
 */
export const add_event = (event: WorldEvent) => {
  window.world.future.queue(event)
}
