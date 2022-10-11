import { lang__derivedSurnames } from '../../../species/languages/words/actors'
import { species__byCulture } from '../../../species/taxonomy'
import { actor__relation } from '../..'
import { actor__age, actor__childbirthRange } from '../../stats/age'
import { convertAge, lifePhaseBoundaries } from '../../stats/age/life_phases'
import { actor__socialClass, socialClass__randomDrift } from '../../stats/professions'
import { Actor } from '../../types'
import { actor__spawn } from '../'
import { ActorParams, Relation } from '../types'
import { actor__addChildRelation } from '.'
import { actor__spawnSpouse } from './spouse'

export class Parent implements Relation {
  private child: Actor
  constructor(child: Actor) {
    this.child = child
  }
  public beforeSpawn(params: ActorParams) {
    const culture = window.world.cultures[this.child.culture]
    const { language } = culture
    params.gender = culture.lineage
    params.culture = window.world.cultures[this.child.culture]
    params.socialClass = actor__socialClass({
      actor: this.child,
      time: params.relativeTime ?? window.world.date
    })
    if (!window.world.historyRecording) {
      params.socialClass = socialClass__randomDrift(params.socialClass)
    }
    const nonStandardLast = lang__derivedSurnames(language)
    params.last = nonStandardLast ? undefined : this.child.lineage
    params.lineage = this.child.lineage
    params.first = this.child.parent.name
    if (window.world.historyRecording) {
      params.birthLoc = window.world.locations[this.child.location.birth]
      params.occupation = this.child.occupation
    }
    const species = species__byCulture(culture)
    const childAge = Math.floor(
      convertAge(species.ages, lifePhaseBoundaries, actor__age({ actor: this.child }))
    )
    const [min, max] = actor__childbirthRange(lifePhaseBoundaries)
    params.ages = [childAge + min, childAge + max]
  }
  public afterSpawn(parent: Actor) {
    actor__addChildRelation({ parent, child: this.child })
  }
}

export const actor__spawnParents = (actor: Actor) => {
  const parent =
    actor__relation({ actor, type: 'parent' })[0] ??
    actor__spawn({
      location: window.world.locations[actor.location.birth],
      relation: new Parent(actor),
      living: false
    })
  const spouse = actor__relation({ actor: parent, type: 'spouse' })[0] ?? actor__spawnSpouse(parent)
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
