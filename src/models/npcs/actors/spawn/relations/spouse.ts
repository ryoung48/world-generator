import { location__demographics } from '../../../../regions/locations/actors/demographics'
import { Loc } from '../../../../regions/locations/types'
import { lang__derived_surnames } from '../../../species/humanoids/languages/words/actors'
import { species__by_culture } from '../../../species/humanoids/taxonomy'
import { actor__past_location, actor__relation } from '../..'
import { actor__events, actor__fix_expiration, actor__union_date } from '../../history/events'
import { ActorEventSpawn } from '../../history/events/types'
import { actor__age, actor__union_range, get_age } from '../../stats/age'
import { convert_age, life_phase_boundaries } from '../../stats/age/life_phases'
import { npc__opposite_gender } from '../../stats/appearance/gender'
import { actor__social_class, social_class__random_drift } from '../../stats/professions'
import { Actor } from '../../types'
import { actor__spawn } from '..'
import { ActorParams, Relation } from '../types'
import { actor_event__relation } from '.'

const spouse__culture = (params: {
  union_loc: Loc
  species: ReturnType<typeof species__by_culture>
}) => {
  const { union_loc, species } = params
  const { common_cultures } = location__demographics(union_loc)
  return window.dice.weighted_choice(species.cultures.map(i => ({ v: i, w: common_cultures[i] })))
}

export class Spouse implements Relation {
  private partner: Actor
  private union_loc: Loc
  private union_date: number
  constructor(params: { partner: Actor; union_date?: number }) {
    const { partner, union_date } = params
    this.partner = partner
    this.union_date = union_date ?? actor__union_date({ actor: partner, chance: 1 })
    this.union_loc = actor__past_location({ actor: this.partner, time: this.union_date })
  }
  public before_spawn(params: ActorParams) {
    const { partner, union_date, union_loc } = this
    const culture = window.world.cultures[partner.culture]
    params.gender = npc__opposite_gender(partner.gender)
    params.culture = window.world.cultures[partner.culture]
    params.birth_loc = window.world.locations[partner.location.birth]
    params.occupation = partner.occupation
    const species = species__by_culture(culture)
    params.social_class = actor__social_class({ actor: partner, time: union_date })
    if (!window.world.history_recording) {
      delete params.occupation
      delete params.birth_loc
      params.culture = window.world.cultures[spouse__culture({ union_loc, species })]
      params.social_class = social_class__random_drift(params.social_class)
    }
    const partner_age = Math.floor(
      convert_age(species.ages, life_phase_boundaries, actor__age({ actor: partner }))
    )
    const union_age = Math.floor(
      convert_age(
        species.ages,
        life_phase_boundaries,
        get_age({ birth: partner.birth_date, ref: union_date })
      )
    )
    const relative_age = Math.max(0, partner_age - union_age)
    const [min, max] = actor__union_range(life_phase_boundaries)
    params.ages = [Math.max(min, union_age - 5), Math.min(max, union_age + 5)].map(
      age => age + relative_age
    )
    params.planned = true
  }
  public after_spawn(spouse: Actor) {
    const { partner, union_loc } = this
    actor__relation({ actor: partner, type: 'child' }).forEach(child => {
      spouse.relations.push({ actor: child.idx, type: 'child' })
    })
    spouse.relations = [...spouse.relations, { actor: partner.idx, type: 'spouse' }]
    partner.relations = [...partner.relations, { actor: spouse.idx, type: 'spouse' }]
    const partner_culture = window.world.cultures[partner.culture]
    const spouse_culture = window.world.cultures[spouse.culture]
    const non_standard_last =
      lang__derived_surnames(partner_culture.language) ||
      lang__derived_surnames(spouse_culture.language)
    if (!non_standard_last) {
      if (partner.gender === partner_culture.lineage) spouse.surname = partner.surname
      else partner.surname = spouse.surname
    }
    const [union] = actor__events({ actor: partner, type: 'union' })
    union.actor = spouse.idx
    union.loc = union_loc.idx
    const events = actor__events({ actor: partner }).map(e => e.idx)
    if (events.length > 0) spouse.history.events = [...spouse.history.events, ...events]
    actor__fix_expiration(spouse)
  }
}

export const actor_event__spouse = (params: ActorEventSpawn) => {
  const { actor, event } = params
  return actor_event__relation({
    ...params,
    relation: () =>
      new Spouse({
        partner: actor,
        union_date: event.time
      })
  })
}

export const actor__spawn_spouse = (parent: Actor) => {
  // check if spouse was already spawned
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  if (spouse) return spouse
  // check if spouse was planned
  const [union] = actor__events({ actor: parent, type: 'union' })
  if (union) return actor_event__spouse({ actor: parent, event: union })
  // otherwise force create spouse
  return actor__spawn({
    relation: new Spouse({ partner: parent }),
    living: false,
    location: window.world.locations[parent.location.residence]
  })
}
