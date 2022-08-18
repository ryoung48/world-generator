import { range } from 'd3'

import { actor__relation } from '../..'
import { profession__socialClass } from '../../stats/professions'
import { Actor } from '../../types'
import { actor__addEvent, actor__events, actor__findBirthDate, actor__unionDate } from './'

const actor__planChildren = (actor: Actor) => {
  const preplanned = actor__events({ actor, type: 'child' }).map(e => e.time)
  const childCount = Math.max(
    0,
    window.dice.weightedChoice([
      { v: 0, w: 0.05 },
      { v: 1, w: 0.25 },
      { v: 2, w: 0.45 },
      { v: 3, w: 0.25 }
    ]) - preplanned.length
  )
  const children: number[] = []
  range(childCount).forEach(() => {
    const birthDate = actor__findBirthDate({ actor })
    if (birthDate !== undefined)
      children.push(actor__addEvent({ actor, event: { type: 'child', time: birthDate } }))
  })
}

export const actor__planHistory = (actor: Actor) => {
  if (!actor.history.unbound && !actor.history.planned) {
    actor.history.planned = true
    // plan union
    const children = actor__relation({ actor, type: 'child' })
    const socialClass = profession__socialClass(actor.occupation.key)
    const noble = socialClass === 'upper' ? 1 : 0
    const unionChance = children.length > 0 ? 1 : noble ? 0.95 : 0.9
    const unionDate = actor__unionDate({ actor, chance: unionChance })
    // plan children
    if (unionDate !== undefined) actor__planChildren(actor)
  }
}
