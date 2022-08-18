import { Actor } from '../../types'
import { actor__spawn } from '..'
import { ActorParams, Relation } from '../types'
import { Child } from './child'
import { Uncle } from './sibling'

export class Cousin implements Relation {
  private ref: Actor
  private locationLocked: boolean
  constructor(params: { ref: Actor; locationLocked: boolean }) {
    this.ref = params.ref
    this.locationLocked = params.locationLocked
  }
  public beforeSpawn(params: ActorParams) {
    const { ages } = params
    const uncle = actor__spawn({
      location: window.world.locations[this.ref.location.birth],
      relation: new Uncle({ ref: this.ref, locationLocked: this.locationLocked }),
      ages: params.ages ? [ages[0] + 20, ages[1] + 40] : undefined,
      living: false
    })
    params.relation = new Child({ ref: uncle, locationLocked: this.locationLocked })
    params.relation.beforeSpawn(params)
  }
  public afterSpawn() {}
}
