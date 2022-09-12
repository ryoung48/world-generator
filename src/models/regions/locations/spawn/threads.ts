import { range } from 'd3'

import { actor__location } from '../../../npcs/actors'
import { Actor } from '../../../npcs/actors/types'
import { thread__collect, thread__spawn } from '../../../threads'
import { yearMS } from '../../../utilities/math/time'
import { location__isSettlement } from '..'
import { Loc } from '../types'
import { location__isCity, location__isTown } from './taxonomy/settlements'

/**
 * Gets all active threads at a location.
 * Will spawn threads if needed.
 * @param params.loc - location
 * @param params.avatar - PC character used to estimate thread difficulty
 * @returns list of threads for the location
 */
export const location__threads = (params: { loc: Loc; avatar: Actor }) => {
  const { loc, avatar } = params
  const avatarAtLoc = avatar && actor__location(avatar) === loc
  if (avatarAtLoc && loc.memory.threads < window.world.date) {
    loc.memory.threads = window.world.date + 100 * yearMS
    const mod = location__isCity(loc) ? 2 : location__isTown(loc) ? 1 : 0
    const target = window.dice.randint(3, 5) + mod
    const diff = target - loc.threads.length
    range(diff).forEach(() =>
      thread__spawn({
        loc: loc,
        target: loc,
        avatar,
        type: location__isSettlement(loc) ? 'urban' : 'explore'
      })
    )
  }
  const { active } = thread__collect(loc)
  return active
}
