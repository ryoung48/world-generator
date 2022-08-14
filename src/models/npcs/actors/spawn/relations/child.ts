import { location__random_origin } from '../../../../regions/locations/actors/demographics/origins'
import { year_ms } from '../../../../utilities/math/time'
import { lang__derived_surnames } from '../../../species/humanoids/languages/words/actors'
import { species__by_culture } from '../../../species/humanoids/taxonomy'
import { actor__past_location } from '../..'
import { actor__add_child_relation, find_birth_date } from '../../history/events'
import { ActorEventSpawn } from '../../history/events/types'
import { get_age } from '../../stats/age'
import { convert_age, life_phase_boundaries } from '../../stats/age/life_phases'
import { npc__random_gender } from '../../stats/appearance/gender'
import { actor__social_class, social_class__random_drift } from '../../stats/professions'
import { Actor } from '../../types'
import { ActorParams, Relation } from '../types'
import { actor_event__relation } from '.'
import { actor__spawn_spouse } from './spouse'

export class Child implements Relation {
  private parent: Actor
  private event: boolean
  private location_locked: boolean
  constructor(params: { ref: Actor; event?: boolean; location_locked: boolean }) {
    this.parent = params.ref
    this.event = params.event
    this.location_locked = params.location_locked
  }
  public before_spawn(params: ActorParams) {
    const {
      occupation = this.parent.occupation,
      birth_loc,
      ages,
      relative_time = window.world.date
    } = params
    const culture = window.world.cultures[this.parent.culture]
    const species = species__by_culture(culture)
    params.birth_time =
      params.birth_time ??
      find_birth_date({
        actor: this.parent,
        ages: ages?.map(
          age => relative_time - convert_age(life_phase_boundaries, species.ages, age) * year_ms
        )
      })
    if (params.birth_time === undefined) {
      delete params.relation
      console.log(`child relation failure: ${this.parent.name}`)
      return
    }
    const spouse = actor__spawn_spouse(this.parent)
    const parent = [this.parent, spouse].find(p => p.gender === culture.lineage)
    params.parent_name = parent.name
    params.gender = params.gender ?? npc__random_gender()
    params.culture = culture
    const non_standard_last = lang__derived_surnames(culture.language)
    if (!non_standard_last) params.last = parent.surname
    params.lineage = parent.lineage
    if (window.world.history_recording) params.occupation = occupation
    params.social_class = actor__social_class({ actor: parent, time: relative_time })
    if (!window.world.history_recording) {
      params.social_class = social_class__random_drift(params.social_class)
    }
    params.birth_loc = birth_loc ?? actor__past_location({ actor: parent, time: params.birth_time })
    const age = get_age({ birth: params.birth_time, ref: window.world.date })
    // determine if the child is still living with parents
    const child = age <= species.ages['adolescence']
    if (child) params.location = window.world.locations[parent.location.residence]
    if (!window.world.history_recording && !child && !this.location_locked) {
      params.location =
        window.world.locations[
          location__random_origin({
            culture: params.culture,
            loc: params.birth_loc
          }).idx
        ]
    }
  }
  public after_spawn(child: Actor) {
    actor__add_child_relation({ child, parent: this.parent, event: this.event })
  }
}

export const actor_event__child = (params: ActorEventSpawn) => {
  const { actor, event, override } = params
  return actor_event__relation({
    ...params,
    relation: () => new Child({ ref: actor, event: true, location_locked: false }),
    override: { birth_time: event.time, ...override }
  })
}
