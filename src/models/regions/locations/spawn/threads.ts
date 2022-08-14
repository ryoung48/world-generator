import { actor__location } from '../../../npcs/actors'
import { Actor } from '../../../npcs/actors/types'
import { thread__collect } from '../../../threads'
import { thread__spawn } from '../../../threads/spawn'
import { range } from '../../../utilities/math'
import { year_ms } from '../../../utilities/math/time'
import { Loc } from '../types'
import { location__is_city, location__is_town } from './taxonomy/settlements'

/**
 * Gets all active threads at a location.
 * Will spawn threads if needed.
 * @param params.loc - location
 * @param params.avatar - PC character used to estimate thread difficulty
 * @returns list of threads for the location
 */
export const location__threads = (params: { loc: Loc; avatar: Actor }) => {
  const { loc, avatar } = params
  const avatar_at_loc = avatar && actor__location(avatar) === loc
  if (avatar_at_loc && loc.memory.threads < window.world.date) {
    loc.memory.threads = window.world.date + 1 * year_ms
    const mod = location__is_city(loc) ? 2 : location__is_town(loc) ? 1 : 0
    const target = window.dice.randint(3, 5) + mod
    const diff = target - loc.threads.length
    range(diff).forEach(() => thread__spawn({ loc: loc, target: loc, avatar }))
  }
  const { active } = thread__collect(loc)
  return active
}
