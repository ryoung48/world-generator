import { actor__pastLocation } from '../..'
import { ActorEventSpawn } from '../../history/events/types'
import { actor__spawn } from '..'
import { Relation } from '../types'

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
