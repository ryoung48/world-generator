import { item__lookup } from '../../items'
import { npc__adjustedCR, npc__CRToLvl, npc__lvlToCR, npc__sumCR } from '../stats'
import { difficulty__cr, difficulty__stats } from '../stats/difficulty'
import { NPC } from '../types'
import { Actor } from './types'

/**
 * Used to differentiate NPCs (simple) from Actors (complex)
 * @param npc - npc that could be an actor
 * @returns {boolean}
 */
export const npc__isActor = (npc: NPC): npc is Actor => npc.tag === 'actor'

/**
 * how much is an actor carrying in their inventory + equipment?
 * @param actor
 * @returns {number} weight (lbs)
 */
export const actor__carryWeight = (actor: Actor): number => {
  const { inventory, equipment } = actor
  return (
    Object.values(inventory.items).reduce((total, item) => {
      const { weight } = item__lookup[item.tag]
      return total + weight * item.quantity
    }, 0) +
    Object.values(equipment)
      .filter(item => item)
      .reduce((total, item) => {
        const { weight } = item__lookup[item.tag]
        return total + weight
      }, 0)
  )
}
/**
 * finds actor relations for a given type
 * @param params.actor
 * @param params.type - relation type to filter
 * @returns {Actor[]} - list of actors that match the given relation type
 */
export const actor__relation = (params: {
  actor: Actor
  type: Actor['relations'][number]['type']
}) => {
  const { actor, type: relation } = params
  return actor.relations
    .filter(({ type }) => type === relation)
    .map(({ actor }) => window.world.actors[actor])
}

export const actor__location = ({ location }: Actor) => {
  const curr = window.world.locations[location.curr]
  return curr
}

/**
 * determines the challenge rating for a given actor
 * @param params.actor - the reference actor
 * @param params.total - max cr or adjusted (for health) cr
 * @returns the numeric challenge rating
 */
export const actor__cr = (params: { actor: Actor; max: boolean }) => {
  const { actor, max } = params
  const party = actor__relation({ actor, type: 'party' })
  const sum = max ? npc__sumCR : npc__adjustedCR
  return sum(party)
}

/**
 * determines an appropriate challenge rating for a given actor
 * @param ref - the reference actor
 * @returns the numeric challenge rating
 */
export const actor__enemyCR = (actor: Actor) => {
  const cr = actor__cr({ actor, max: true })
  return difficulty__cr({ ref: cr })
}
/**
 * determines the difficulty of a challenge rating for an actor
 * @param params.actor - the reference actor
 * @param params.cr - the reference challenge rating
 * @returns  the CR ratio, success rate, and the corresponding difficulty tier
 */
export const actor__difficultyStats = (params: { actor: Actor; cr: number }) => {
  const { actor, cr } = params
  const actorCR = actor__cr({ actor, max: false })
  return difficulty__stats({ ref: actorCR, adversary: cr })
}

export const actor__rewardXP = (params: { actor: Actor; exp: number }) => {
  const { actor, exp } = params
  const party = actor__relation({ actor, type: 'party' })
  const weights = window.dice.uniformDist(party.length)
  party.forEach((npc, i) => {
    npc.level = npc__CRToLvl(npc__lvlToCR(npc.level) + exp * weights[i])
  })
}
