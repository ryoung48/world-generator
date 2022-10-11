import { location__randomOrigin } from '../../../../regions/locations/actors/demographics/origins'
import { yearMS } from '../../../../utilities/math/time'
import { lang__derivedSurnames } from '../../../species/languages/words/actors'
import { species__byCulture } from '../../../species/taxonomy'
import { actor__pastLocation } from '../..'
import { actor__events } from '../../history/events'
import { actor__planChild } from '../../history/events/planning'
import { ActorEventSpawn } from '../../history/events/types'
import { getAge } from '../../stats/age'
import { convertAge, lifePhaseBoundaries } from '../../stats/age/life_phases'
import { npc__randomGender } from '../../stats/appearance/gender'
import { actor__socialClass, socialClass__randomDrift } from '../../stats/professions'
import { Actor } from '../../types'
import { ActorParams, Relation } from '../types'
import { actor__addChildRelation, actorEvent__relation } from '.'
import { actor__spawnSpouse, actor__unionDate } from './spouse'

export class Child implements Relation {
  private parent: Actor
  private event: boolean
  private locationLocked: boolean
  constructor(params: { ref: Actor; event?: boolean; locationLocked: boolean }) {
    this.parent = params.ref
    this.event = params.event
    this.locationLocked = params.locationLocked
  }
  public beforeSpawn(params: ActorParams) {
    const {
      occupation = this.parent.occupation,
      birthLoc,
      ages,
      relativeTime: relativeTime = window.world.date
    } = params
    const culture = window.world.cultures[this.parent.culture]
    const species = species__byCulture(culture)
    params.birthTime =
      params.birthTime ??
      actor__planChild({
        unionDate: actor__unionDate({ actor: this.parent, chance: 1 }),
        birth: this.parent.dates.birth,
        death: this.parent.dates.death,
        culture: this.parent.culture,
        events: actor__events({ actor: this.parent }),
        ages: ages?.map(
          age => relativeTime - convertAge(lifePhaseBoundaries, species.ages, age) * yearMS
        )
      })
    if (params.birthTime === undefined) {
      delete params.relation
      console.log(`child relation failure: ${this.parent.name}`)
      return
    }
    const spouse = actor__spawnSpouse(this.parent)
    const parent = [this.parent, spouse].find(p => p.gender === culture.lineage)
    params.parent = { ...params.parent, name: parent.name }
    params.gender = params.gender ?? npc__randomGender()
    params.culture = culture
    const nonStandardLast = lang__derivedSurnames(culture.language)
    if (!nonStandardLast) params.last = parent.surname
    params.lineage = parent.lineage
    if (window.world.historyRecording) params.occupation = occupation
    params.socialClass = actor__socialClass({ actor: parent, time: relativeTime })
    if (!window.world.historyRecording) {
      params.socialClass = socialClass__randomDrift(params.socialClass)
    }
    params.birthLoc = birthLoc ?? actor__pastLocation({ actor: parent, time: params.birthTime })
    const age = getAge({ birth: params.birthTime, ref: window.world.date })
    // determine if the child is still living with parents
    const child = age <= species.ages['adolescence']
    if (child) params.location = window.world.locations[parent.location.residence]
    if (!window.world.historyRecording && !child && !this.locationLocked) {
      params.location =
        window.world.locations[
          location__randomOrigin({
            culture: params.culture,
            loc: params.birthLoc
          }).idx
        ]
    }
  }
  public afterSpawn(child: Actor) {
    actor__addChildRelation({ child, parent: this.parent, event: this.event })
  }
}

export const actorEvent__child = (params: ActorEventSpawn) => {
  const { actor, event, override } = params
  return actorEvent__relation({
    ...params,
    relation: () => new Child({ ref: actor, event: true, locationLocked: false }),
    override: { birthTime: event.time, expires: event.expires, gender: event.gender, ...override }
  })
}
