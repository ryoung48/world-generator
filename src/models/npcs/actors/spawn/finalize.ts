import { decoratedProfile } from '../../../utilities/performance'
import { actor__genOutfit } from '../stats/appearance/outfit'
import { actor__physique } from '../stats/appearance/physique'
import { actor__attributeRoll } from '../stats/attributes'
import { actor__personaRoll } from '../stats/persona'
import { actorSkill__roll } from '../stats/skills'
import { actor__voice } from '../stats/speech'
import { Actor } from '../types'
import { actor__events } from './events'
import { actor__checkEvents } from './events/dispatcher'
import { actor__plan } from './events/planning'
import { actor__spawnParents } from './relations/parent'

const planHistory = (actor: Actor) => {
  if (!actor.history.unbound && !actor.history.planned) {
    actor.history.planned = true
    actor.history.events.push(
      ...actor__plan({
        birth: actor.dates.birth,
        death: actor.dates.death,
        culture: actor.culture,
        events: actor__events({ actor }),
        occupation: actor.occupation
      })
    )
  }
}

const _actor__finalize = (actor: Actor): void => {
  if (!actor.finalized) {
    actor__personaRoll(actor)
    actor__attributeRoll(actor)
    actor__voice(actor)
    actor__physique(actor)
    actor__genOutfit(actor)
    // everything below requires a location
    planHistory(actor)
    actor__spawnParents(actor).forEach(parent => actor__checkEvents(parent))
    actorSkill__roll({ actor })
    actor.finalized = true
  }
  actor__checkEvents(actor)
}

/**
 * checks planned history & finalizes an actor:
 * * generate persona
 * * generate attributes
 * * generate voice
 * * generate appearance
 * * generate background
 * * generate relations
 * * finalize occupation
 * @param actor
 */
export const actor__finalize = decoratedProfile(_actor__finalize)
