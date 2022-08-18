import { actor__difficultyStats, actor__relation } from '../../npcs/actors'
import { Actor } from '../../npcs/actors/types'
import { npc__adjustedCR, npc__health, npc__lvlToCR } from '../../npcs/stats'
import { difficulties } from '../../npcs/stats/difficulty'
import { Encounter } from './types'

export const encounter__npcs = (encounter: Encounter) =>
  encounter.npcs.map(npc => (typeof npc === 'number' ? window.world.actors[npc] : npc))

export const encounter__difficulty = (params: { ref: Actor; encounter: Encounter }) => {
  const { ref, encounter } = params
  const enemies = encounter__npcs(encounter)
  const enemyCR = npc__adjustedCR(enemies)
  return actor__difficultyStats({ actor: ref, cr: enemyCR })
}

export const encounter__battleResolve = (params: { actor: Actor; encounter: Encounter }) => {
  const { encounter, actor } = params
  // distribute cost
  const npcs = encounter__npcs(encounter)
  const { tier } = encounter__difficulty({ ref: actor, encounter })
  const enemyCR = npc__adjustedCR(npcs)
  const party = actor__relation({ actor: actor, type: 'party' }).filter(
    member => npc__health(member).current > 0
  )
  const cost = enemyCR * difficulties[tier].cost
  const weights = window.dice.uniformDist(party.length)
  party.forEach((member, i) => {
    member.mods.cr += weights[i] * cost
    member.mods.cr = Math.min(npc__lvlToCR(member.level), member.mods.cr)
  })
  npcs.forEach(npc => {
    npc.mods.cr = npc__lvlToCR(npc.level)
  })
}
