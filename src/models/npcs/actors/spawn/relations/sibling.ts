import { Actor } from '../../types'
import { ActorParams, Relation } from '../types'
import { Child } from './child'
import { actor__spawnParents } from './parent'

export class Sibling implements Relation {
  private ref: Actor
  private locationLocked: boolean
  constructor(params: { ref: Actor; locationLocked: boolean }) {
    this.ref = params.ref
    this.locationLocked = params.locationLocked
  }
  public beforeSpawn(params: ActorParams) {
    const [parent] = actor__spawnParents(this.ref)
    params.relation = new Child({ ref: parent, locationLocked: this.locationLocked })
    params.relation.beforeSpawn(params)
  }
  public afterSpawn() {}
}

export class Uncle implements Relation {
  private ref: Actor
  private locationLocked: boolean
  constructor(params: { ref: Actor; locationLocked: boolean }) {
    this.ref = params.ref
    this.locationLocked = params.locationLocked
  }
  public beforeSpawn(params: ActorParams) {
    params.relation = new Sibling({
      ref: window.dice.choice(actor__spawnParents(this.ref)),
      locationLocked: this.locationLocked
    })
    params.relation.beforeSpawn(params)
  }
  public afterSpawn() {}
}
