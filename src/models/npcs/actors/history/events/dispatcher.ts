import { actor__relation } from '../..'
import { actor_event__child } from '../../spawn/relations/child'
import { actor_event__spouse } from '../../spawn/relations/spouse'
import { Actor } from '../../types'
import { actor__valid_events } from './'
import { ActorEvent, ActorEventSpawn } from './types'

const event__dispatcher: Record<ActorEvent['type'], (_params: ActorEventSpawn) => Actor> = {
  union: actor_event__spouse,
  child: actor_event__child
}

const check_events = (actor: Actor) => {
  // unions need to go first because they can spawn other events
  actor__valid_events({ actor, type: 'union' }).forEach(event =>
    event__dispatcher[event.type]({ actor, event })
  )
  actor__valid_events({ actor, type: 'child' }).forEach(event =>
    event__dispatcher[event.type]({ actor, event })
  )
}

export const actor__check_events = (actor: Actor) => {
  check_events(actor)
  const [spouse] = actor__relation({ actor, type: 'spouse' })
  if (spouse) check_events(actor)
}
