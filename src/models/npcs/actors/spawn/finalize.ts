import { decoratedProfile } from '../../../utilities/performance'
import { actor__checkBackground, actor__initBackground } from '../history/backgrounds'
import { actor__events } from '../history/events'
import { actor__checkEvents } from '../history/events/dispatcher'
import { actor__plan } from '../history/events/planning'
import { actor__genOutfit } from '../stats/appearance/outfit'
import { actor__physique } from '../stats/appearance/physique'
import { actor__attributeRoll } from '../stats/attributes'
import { actor__personaRoll } from '../stats/persona'
import { profession__afterSpawn } from '../stats/professions'
import { actor__awardSkillExp } from '../stats/skills/common/award'
import { actor__voice } from '../stats/speech'
import { Actor } from '../types'
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
  const unknown = !window.world.locations[actor.location.residence]
  if (!actor.finalized) {
    actor__personaRoll(actor)
    actor__attributeRoll(actor)
    actor__voice(actor)
    actor__physique(actor)
    // everything below requires a location
    if (!unknown) planHistory(actor)
    if (!unknown) actor__spawnParents(actor).forEach(parent => actor__checkEvents(parent))
    if (!unknown) actor__initBackground(actor)
    if (!unknown) profession__afterSpawn(actor)
    actor.finalized = true
  }
  if (!unknown) actor__checkBackground(actor)
  if (!unknown) actor__awardSkillExp(actor)
  if (!unknown) actor__checkEvents(actor)
  if (!actor.appearance.outfit) actor__genOutfit(actor)
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
