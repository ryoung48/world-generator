import { Avatar } from '../../components/context/types'
import { Province } from '../regions/provinces/types'
import {
  avatar__cr,
  difficulty__lvl,
  difficulty__odds,
  difficulty__random
} from '../utilities/difficulty'
import { roundToNearestN } from '../utilities/math'
import { hourMS } from '../utilities/math/time'
import { background__spawn } from './backgrounds'
import { Thread } from './types'

export const thread__spawn = (params: { loc: Province; pc: number }) => {
  const { loc, pc } = params
  if (loc.hub.thread) return loc.hub.thread
  const background = background__spawn(loc)
  const thread: Thread = {
    difficulty: { cr: difficulty__random(pc) },
    location: loc.idx,
    ...background
  }
  loc.hub.thread = thread
  return thread
}

const reward = (params: {
  difficulty: Thread['difficulty']
  status: Thread['status']
  pc: number
}) => {
  const { difficulty, status, pc } = params
  const cp = 30 * 3 ** Math.max(0, difficulty__lvl(difficulty.cr) - 1)
  const { tier } = difficulty__odds({ pc, ...difficulty })
  const difficultyMod =
    tier === 'trivial'
      ? 0.25
      : tier === 'easy'
      ? 0.5
      : tier === 'medium'
      ? 1
      : tier === 'hard'
      ? 1.5
      : 2
  return (
    difficultyMod *
    (status === 'failure' ? 0 : status === 'pyrrhic' ? cp / 4 : status === 'success' ? cp / 2 : cp)
  )
}

export const thread__advance = (params: { thread: Thread; avatar: Avatar }) => {
  const { thread, avatar } = params
  const pc = avatar__cr(avatar)
  const { odds } = difficulty__odds({ pc, cr: thread.difficulty.cr })
  const roll = window.dice.random
  const diff = roll - odds
  thread.status =
    diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
  const duration = roundToNearestN(
    window.dice.weightedChoice([
      { w: 2, v: () => window.dice.uniform(hourMS, hourMS * 5) },
      { w: 1, v: () => window.dice.uniform(hourMS * 5, hourMS * 23) }
    ])(),
    hourMS
  )
  const cp = reward({ difficulty: thread.difficulty, status: thread.status, pc })
  thread.outcome = { cp, duration }
}
