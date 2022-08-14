import { range } from '../../../../utilities/math'
import { actor__relation } from '../..'
import { profession__social_class } from '../../stats/professions'
import { Actor } from '../../types'
import { actor__add_event, actor__events, actor__union_date, find_birth_date } from './'

const actor__plan_children = (actor: Actor) => {
  const preplanned = actor__events({ actor, type: 'child' }).map(e => e.time)
  const child_count = Math.max(
    0,
    window.dice.weighted_choice([
      { v: 0, w: 0.05 },
      { v: 1, w: 0.25 },
      { v: 2, w: 0.45 },
      { v: 3, w: 0.25 }
    ]) - preplanned.length
  )
  const children: number[] = []
  range(child_count).forEach(() => {
    const birth_date = find_birth_date({ actor })
    if (birth_date !== undefined)
      children.push(actor__add_event({ actor, event: { type: 'child', time: birth_date } }))
  })
}

export const actor__plan_history = (actor: Actor) => {
  if (!actor.history.unbound && !actor.history.planned) {
    actor.history.planned = true
    // plan union
    const children = actor__relation({ actor, type: 'child' })
    const social_class = profession__social_class(actor.occupation.key)
    const noble = social_class === 'upper' ? 1 : 0
    const union_chance = children.length > 0 ? 1 : noble ? 0.95 : 0.9
    const union_date = actor__union_date({ actor, chance: union_chance })
    // plan children
    if (union_date !== undefined) actor__plan_children(actor)
  }
}
