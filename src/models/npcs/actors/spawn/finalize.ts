import { decorated_profile } from '../../../utilities/performance'
import { actor__check_background, actor__init_background } from '../history/backgrounds'
import { actor__check_events } from '../history/events/dispatcher'
import { actor__plan_history } from '../history/events/planning'
import { actor__gen_outfit } from '../stats/appearance/outfit'
import { actor__physique } from '../stats/appearance/physique'
import { actor__attribute_roll } from '../stats/attributes'
import { actor__persona_roll } from '../stats/persona'
import { profession__after_spawn } from '../stats/professions'
import { actor__award_skill_exp } from '../stats/skills/common/award'
import { npc__voice } from '../stats/speech'
import { Actor } from '../types'
import { actor__spawn_parents } from './relations/parent'

const _actor__finalize = (actor: Actor): void => {
  const unknown = !window.world.locations[actor.location.residence]
  if (!actor.finalized) {
    actor__persona_roll(actor)
    actor__attribute_roll(actor)
    npc__voice(actor)
    actor__physique(actor)
    // everything below requires a location
    if (!unknown) actor__plan_history(actor)
    if (!unknown) actor__spawn_parents(actor).forEach(parent => actor__check_events(parent))
    if (!unknown) actor__init_background(actor)
    if (!unknown) profession__after_spawn(actor)
    actor.finalized = true
  }
  if (!unknown) actor__check_background(actor)
  if (!unknown) actor__award_skill_exp(actor)
  if (!unknown) actor__check_events(actor)
  if (!actor.appearance.outfit) actor__gen_outfit(actor)
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
export const actor__finalize = decorated_profile(_actor__finalize)
