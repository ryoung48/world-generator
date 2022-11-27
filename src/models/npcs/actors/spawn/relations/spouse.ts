import { actorEvent__relation, actor__fixExpiration } from '.'
import { actor__spawn } from '..'
import { actor__relation } from '../..'
import { location__demographics } from '../../../../regions/locations/actors/demographics/demo'
import { Loc } from '../../../../regions/locations/types'
import { lang__derivedSurnames } from '../../../species/languages/words/actors'
import { species__byCulture } from '../../../species/taxonomy'
import { actor__age, actor__unionRange, getAge } from '../../stats/age'
import { convertAge, lifePhaseBoundaries } from '../../stats/age/life_phases'
import { npc__oppositeGender } from '../../stats/appearance/gender'
import { actor__socialClass, socialClass__randomDrift } from '../../stats/professions'
import { Actor } from '../../types'
import { actor__addEvent, actor__events } from '../events'
import { actor__findUnionDate } from '../events/planning'
import { ActorEventSpawn } from '../events/types'
import { ActorParams, Relation } from '../types'

export const actor__unionDate = (params: { actor: Actor; chance: number }) => {
  const { actor, chance } = params
  const events = actor__events({ actor })
  const { dates, culture } = actor
  const union = actor__findUnionDate({
    birth: dates.birth,
    death: dates.death,
    culture,
    events,
    chance
  })
  if (union?.event) {
    const event = actor__addEvent({ event: { type: 'union', time: union.date } })
    actor.history.events.push(event)
  }
  return union?.date
}

const spouseCulture = (params: {
  unionLoc: Loc
  species: ReturnType<typeof species__byCulture>
}) => {
  const { unionLoc, species } = params
  const { commonCultures } = location__demographics(unionLoc)
  return window.dice.weightedChoice(species.cultures.map(i => ({ v: i, w: commonCultures[i] })))
}

export class Spouse implements Relation {
  private partner: Actor
  private unionLoc: Loc
  private unionDate: number
  constructor(params: { partner: Actor; unionDate?: number }) {
    const { partner, unionDate } = params
    this.partner = partner
    this.unionDate = unionDate ?? actor__unionDate({ actor: partner, chance: 1 })
    this.unionLoc = window.world.locations[partner.location.curr]
  }
  public beforeSpawn(params: ActorParams) {
    const { partner, unionDate, unionLoc } = this
    const culture = window.world.cultures[partner.culture]
    params.gender = npc__oppositeGender(partner.gender)
    params.culture = window.world.cultures[partner.culture]
    params.birthLoc = window.world.locations[partner.location.birth]
    params.occupation = partner.occupation
    const species = species__byCulture(culture)
    params.socialClass = actor__socialClass({ actor: partner })
    if (!window.world.historyRecording) {
      delete params.occupation
      delete params.birthLoc
      params.culture = window.world.cultures[spouseCulture({ unionLoc: unionLoc, species })]
      params.socialClass = socialClass__randomDrift(params.socialClass)
    }
    const partnerAge = Math.floor(
      convertAge(species.ages, lifePhaseBoundaries, actor__age({ actor: partner }))
    )
    const unionAge = Math.floor(
      convertAge(
        species.ages,
        lifePhaseBoundaries,
        getAge({ birth: partner.dates.birth, ref: unionDate })
      )
    )
    const relativeAge = Math.max(0, partnerAge - unionAge)
    const [min, max] = actor__unionRange(lifePhaseBoundaries)
    params.ages = [Math.max(min, unionAge - 5), Math.min(max, unionAge + 5)].map(
      age => age + relativeAge
    )
    params.planned = true
  }
  public afterSpawn(spouse: Actor) {
    const { partner, unionLoc } = this
    actor__relation({ actor: partner, type: 'child' }).forEach(child => {
      spouse.relations.push({ actor: child.idx, type: 'child' })
    })
    spouse.relations = [...spouse.relations, { actor: partner.idx, type: 'spouse' }]
    partner.relations = [...partner.relations, { actor: spouse.idx, type: 'spouse' }]
    const partnerCulture = window.world.cultures[partner.culture]
    const spouseCulture = window.world.cultures[spouse.culture]
    const nonStandardLast =
      lang__derivedSurnames(partnerCulture.language) ||
      lang__derivedSurnames(spouseCulture.language)
    if (!nonStandardLast) {
      if (partner.gender === partnerCulture.lineage) spouse.surname = partner.surname
      else partner.surname = spouse.surname
    }
    const [union] = actor__events({ actor: partner, type: 'union' })
    union.actor = spouse.idx
    union.loc = unionLoc.idx
    const events = actor__events({ actor: partner }).map(e => e.idx)
    if (events.length > 0) spouse.history.events = [...spouse.history.events, ...events]
    actor__fixExpiration(spouse)
  }
}

export const actorEvent__spouse = (params: ActorEventSpawn) => {
  const { actor, event } = params
  return actorEvent__relation({
    ...params,
    relation: () =>
      new Spouse({
        partner: actor,
        unionDate: event.time
      })
  })
}

export const actor__spawnSpouse = (parent: Actor) => {
  // check if spouse was already spawned
  const [spouse] = actor__relation({ actor: parent, type: 'spouse' })
  if (spouse) return spouse
  // check if spouse was planned
  const [union] = actor__events({ actor: parent, type: 'union' })
  if (union) return actorEvent__spouse({ actor: parent, event: union })
  // otherwise force create spouse
  return actor__spawn({
    relation: new Spouse({ partner: parent }),
    living: false,
    location: window.world.locations[parent.location.curr]
  })
}
