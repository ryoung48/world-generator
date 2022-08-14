import { actor__difficulty_stats, actor__relation } from '../../npcs/actors'
import { Actor } from '../../npcs/actors/types'
import { npc__adjusted_cr, npc__health, npc__lvl_to_cr } from '../../npcs/stats'
import { difficulties } from '../../npcs/stats/difficulty'
import { Encounter } from './types'

export const encounter__npcs = (encounter: Encounter) =>
  encounter.npcs.map(npc => (typeof npc === 'number' ? window.world.actors[npc] : npc))

export const encounter__difficulty = (params: { ref: Actor; encounter: Encounter }) => {
  const { ref, encounter } = params
  const enemies = encounter__npcs(encounter)
  const enemy_cr = npc__adjusted_cr(enemies)
  return actor__difficulty_stats({ actor: ref, cr: enemy_cr })
}

export const encounter__battle_resolve = (params: { actor: Actor; encounter: Encounter }) => {
  const { encounter, actor } = params
  // distribute cost
  const npcs = encounter__npcs(encounter)
  const { tier } = encounter__difficulty({ ref: actor, encounter })
  const enemy_cr = npc__adjusted_cr(npcs)
  const party = actor__relation({ actor: actor, type: 'party' }).filter(
    member => npc__health(member).current > 0
  )
  const cost = enemy_cr * difficulties[tier].cost
  const weights = window.dice.uniform_dist(party.length)
  party.forEach((member, i) => {
    member.mods.cr += weights[i] * cost
    member.mods.cr = Math.min(npc__lvl_to_cr(member.level), member.mods.cr)
  })
  npcs.forEach(npc => {
    npc.mods.cr = npc__lvl_to_cr(npc.level)
  })
}
