import { Actor } from '../../types'
import { actor__spawn } from '..'
import { ActorParams, Relation } from '../types'
import { Child } from './child'
import { Uncle } from './sibling'

export class Cousin implements Relation {
  private ref: Actor
  private location_locked: boolean
  constructor(params: { ref: Actor; location_locked: boolean }) {
    this.ref = params.ref
    this.location_locked = params.location_locked
  }
  public before_spawn(params: ActorParams) {
    const { ages } = params
    const uncle = actor__spawn({
      location: window.world.locations[this.ref.location.birth],
      relation: new Uncle({ ref: this.ref, location_locked: this.location_locked }),
      ages: params.ages ? [ages[0] + 20, ages[1] + 40] : undefined,
      living: false
    })
    params.relation = new Child({ ref: uncle, location_locked: this.location_locked })
    params.relation.before_spawn(params)
  }
  public after_spawn() {}
}
