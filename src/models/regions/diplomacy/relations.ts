import { DiplomaticRelation, diplomaticRelations } from '../../history/diplomacy/types'
import { region__isActive } from '..'
import { Region } from '../types'
import { region__atPeace, region__formattedWealth } from './status'

const relations = [...diplomaticRelations].filter(rel => rel !== 'at war')

/**
 * get a random relation (used in the diplomacy event tick)
 * @returns - ally|friendly|neutral|suspicious
 */
export const randomRelation = () => window.dice.choice(relations)

/**
 * finalizes an alliance between two nations
 * starting with 0 debt for each
 * @param n1 - 1st nation
 * @param n2 - 2nd nation
 */
const forgeAlliance = (n1: Region, n2: Region) => {
  n1.allies[n2.idx] = 0
  n2.allies[n1.idx] = 0
}

/**
 * ends an alliance between two nations
 * clearing each parties debts
 * @param n1 - 1st nation
 * @param n2 - 2nd nation
 */
const endAlliance = (n1: Region, n2: Region) => {
  delete n1.allies[n2.idx]
  delete n2.allies[n1.idx]
}

/**
 * set a relation between two nations
 * @param params.relation - relation type
 * @param params.n1 - 1st nation
 * @param params.n2 - 2nd nation
 */
export const region__setRelation = (params: {
  relation: DiplomaticRelation
  n1: Region
  n2: Region
}) => {
  const { relation, n1, n2 } = params
  n1.relations[n2.idx] = relation
  n2.relations[n1.idx] = relation
  // finalize the alliance if applicable
  if (relation === 'ally') forgeAlliance(n1, n2)
  else endAlliance(n1, n2)
}

/**
 * determines if two nations are at war
 * @param n1 - 1st nation
 * @param n2 - 2nd nation
 * @returns {boolean}
 */
export const region__isAtWarWith = (n1: Region, n2: Region) => {
  return n1.wars.current.some(n => {
    const { invader, defender } = window.world.wars[n]
    return invader.idx === n2.idx || defender.idx === n2.idx
  })
}

/**
 * returns all nations which the reference is at war with
 * @param region - reference nation to examine
 * @returns {Region[]} a list of nations
 */
export const region__warRivals = (region: Region) => {
  return region.wars.current.map(w => {
    const { invader, defender } = window.world.wars[w]
    const adversary = invader.idx === region.idx ? defender : invader
    return window.world.regions[adversary.idx]
  })
}

/**
 * returns all allies of a nation
 * @param nation - reference nation
 * @returns a list of nations
 */
export const region__allies = (nation: Region) =>
  Object.keys(nation.allies).map(i => window.world.regions[parseInt(i)])

/**
 * determines if the prospect is a subject or the overlord of ref
 * @param ref - nation to examine
 * @param prospect - possible subject partner
 * @returns {boolean}
 */
export const region__hasSubjectRelation = (ref: Region, prospect: Region) => {
  const subject = prospect.overlord.idx === ref.idx && window.world.regions[prospect.overlord.idx]
  const overlord = ref.overlord.idx === prospect.idx && window.world.regions[ref.overlord.idx]
  return Boolean(subject || overlord)
}

/**
 * determines if two regions have the same religion
 * @param n1 - 1st nation
 * @param n2 - 2nd nation
 * @returns {boolean} true or false
 */
export const region__hasSameReligion = (n1: Region, n2: Region) =>
  n1.religion.state === n2.religion.state

/**
 * returns the relation type of an ally (with debts if desired)
 * @param params.ref - the reference nation
 * @param params.ally - ally of ref
 * @param params.no_funds - include debts in the returned string?
 * @returns {string} a textual description of the relation
 */
export const region__allyRelation = (params: { ref: Region; ally: Region; noFunds?: boolean }) => {
  const { ref, ally, noFunds } = params
  let relation = 'Ally'
  if (ally.overlord.idx === ref.idx) {
    relation = 'Vassal'
  } else if (ref.overlord.idx === ally.idx) {
    relation = 'Overlord'
  }
  const funds = ref.allies[ally.idx]
  return `${relation}${
    !noFunds && funds > 0 ? ` (${region__formattedWealth(ref, ref.allies[ally.idx])})` : ''
  }`
}

/**
 * why did this region declare itself neutral during this engagement?
 * @param region - region to be examined
 * @returns {string} why the region is neutral
 */
export const region__neutralReason = (region: Region) => {
  if (!region__isActive(region)) {
    return 'Fallen'
  } else if (!region__atPeace(region)) {
    return 'At War'
  }
  return 'Neutral'
}

export const relation__isHostile = (relation: DiplomaticRelation) =>
  relation === 'suspicious' || relation === 'at war'
