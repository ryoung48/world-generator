import { actor__relation } from '../..'
import { actorEvent__child } from '../../spawn/relations/child'
import { actorEvent__spouse } from '../../spawn/relations/spouse'
import { Actor } from '../../types'
import { actor__validEvents } from './'
import { ActorEvent, ActorEventSpawn } from './types'

const event__dispatcher: Record<ActorEvent['type'], (_params: ActorEventSpawn) => Actor> = {
  union: actorEvent__spouse,
  child: actorEvent__child
}

const checkEvents = (actor: Actor) => {
  // unions need to go first because they can spawn other events
  actor__validEvents({ actor, type: 'union' }).forEach(event =>
    event__dispatcher[event.type]({ actor, event })
  )
  actor__validEvents({ actor, type: 'child' }).forEach(event =>
    event__dispatcher[event.type]({ actor, event })
  )
}

export const actor__checkEvents = (actor: Actor) => {
  checkEvents(actor)
  const [spouse] = actor__relation({ actor, type: 'spouse' })
  if (spouse) checkEvents(actor)
}
