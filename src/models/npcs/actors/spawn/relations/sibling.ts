import { Actor } from '../../types'
import { ActorParams, Relation } from '../types'
import { Child } from './child'
import { actor__spawn_parents } from './parent'

export class Sibling implements Relation {
  private ref: Actor
  private location_locked: boolean
  constructor(params: { ref: Actor; location_locked: boolean }) {
    this.ref = params.ref
    this.location_locked = params.location_locked
  }
  public before_spawn(params: ActorParams) {
    const [parent] = actor__spawn_parents(this.ref)
    params.relation = new Child({ ref: parent, location_locked: this.location_locked })
    params.relation.before_spawn(params)
  }
  public after_spawn() {}
}

export class Uncle implements Relation {
  private ref: Actor
  private location_locked: boolean
  constructor(params: { ref: Actor; location_locked: boolean }) {
    this.ref = params.ref
    this.location_locked = params.location_locked
  }
  public before_spawn(params: ActorParams) {
    params.relation = new Sibling({
      ref: window.dice.choice(actor__spawn_parents(this.ref)),
      location_locked: this.location_locked
    })
    params.relation.before_spawn(params)
  }
  public after_spawn() {}
}
