import { lang__derived_surnames } from '../../../species/humanoids/languages/words/actors'
import { species__by_culture } from '../../../species/humanoids/taxonomy'
import { actor__relation } from '../..'
import { actor__add_child_relation } from '../../history/events'
import { actor__age, actor__childbirth_range } from '../../stats/age'
import { convert_age, life_phase_boundaries } from '../../stats/age/life_phases'
import { actor__social_class, social_class__random_drift } from '../../stats/professions'
import { Actor } from '../../types'
import { actor__spawn } from '../'
import { ActorParams, Relation } from '../types'
import { actor__spawn_spouse } from './spouse'

export class Parent implements Relation {
  private child: Actor
  constructor(child: Actor) {
    this.child = child
  }
  public before_spawn(params: ActorParams) {
    const culture = window.world.cultures[this.child.culture]
    const { language } = culture
    params.gender = culture.lineage
    params.culture = window.world.cultures[this.child.culture]
    params.social_class = actor__social_class({
      actor: this.child,
      time: params.relative_time ?? window.world.date
    })
    if (!window.world.history_recording) {
      params.social_class = social_class__random_drift(params.social_class)
    }
    const non_standard_last = lang__derived_surnames(language)
    params.last = non_standard_last ? undefined : this.child.lineage
    params.lineage = this.child.lineage
    params.first = this.child.parent_name
    if (window.world.history_recording) {
      params.birth_loc = window.world.locations[this.child.location.birth]
      params.occupation = this.child.occupation
    }
    const species = species__by_culture(culture)
    const child_age = Math.floor(
      convert_age(species.ages, life_phase_boundaries, actor__age({ actor: this.child }))
    )
    const [min, max] = actor__childbirth_range(life_phase_boundaries)
    params.ages = [child_age + min, child_age + max]
  }
  public after_spawn(parent: Actor) {
    actor__add_child_relation({ parent, child: this.child })
  }
}

export const actor__spawn_parents = (actor: Actor) => {
  const parent =
    actor__relation({ actor, type: 'parent' })[0] ??
    actor__spawn({
      location: window.world.locations[actor.location.birth],
      relation: new Parent(actor),
      living: false
    })
  const spouse =
    actor__relation({ actor: parent, type: 'spouse' })[0] ?? actor__spawn_spouse(parent)
  return [parent, spouse]
}

export const actor__parents = (actor: Actor) => {
  const [parent] = actor__relation({ actor, type: 'parent' })
  if (!parent) return []
  const parents = [parent]
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  if (spouse) parents.push(spouse)
  return parents
}
