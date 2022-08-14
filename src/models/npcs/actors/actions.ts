import { actor__relation } from '.'
import { Actor } from './types'

export const npc__rest = (actor: Actor) => {
  actor__relation({ actor, type: 'party' }).forEach(member => {
    member.mods.cr = 0
  })
}
