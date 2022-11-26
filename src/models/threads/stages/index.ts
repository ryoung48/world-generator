import { actor__cr, actor__difficultyStats, actor__rewardXP } from '../../npcs/actors'
import { Actor } from '../../npcs/actors/types'
import { difficulty__stats } from '../../npcs/stats/difficulty'
import { hourMS, minuteMS } from '../../utilities/math/time'
import { complication__spawn } from '../complications'
import { task__definition, task__spawn } from '../tasks'
import { Thread } from '../types'
import { Stage } from './types'

export const stage__placeholder = -1

export const stage__difficulty = (thread: Thread) =>
  window.dice.norm(1, 0.05) * thread.difficulty.cr

export const stage__current = (thread: Thread) => thread.stages.slice(-1)[0]

export const stage__spawn = (params: { thread: Thread; transition?: Stage['transition'] }) => {
  const { thread, transition } = params
  const { depth } = thread
  const current = stage__current(thread)
  const { tag: task, text } = task__spawn({ blacklist: [current?.task], thread })
  const nested = depth < 2 && !transition && window.dice.random < task__definition[task].nested
  const complication =
    !current?.complication && window.dice.random < 0.1
      ? complication__spawn({ thread, type: 'task' })
      : undefined
  thread.stages.push({
    task,
    text,
    transition,
    difficulty: { cr: stage__difficulty(thread) },
    duration: window.dice.weightedChoice([
      { w: 2, v: () => window.dice.uniform(minuteMS * 30, hourMS * 1) },
      { w: 1, v: () => window.dice.uniform(hourMS * 1, hourMS * 5) }
    ])(),
    exp: 0,
    child: nested ? stage__placeholder : undefined,
    combat: !nested && !transition && window.dice.random < task__definition[task].combat,
    complication
  })
}

export const stage__odds = (params: { difficulty: Thread['difficulty']; actor: Actor }) => {
  const { difficulty, actor } = params
  const { success, tier } = difficulty.pc
    ? difficulty__stats({
        ref: difficulty.pc,
        adversary: difficulty.cr
      })
    : actor__difficultyStats({
        actor,
        cr: difficulty.cr
      })
  return { odds: 1 - success, tier }
}

type StageRewardParams = { stage: Stage | Thread; avatar: Actor; mod?: number }

export const stage__xp = (params: StageRewardParams) => {
  const { avatar, stage, mod = 1 } = params
  const status =
    stage.status === 'perfection'
      ? 1.25
      : stage.status === 'success'
      ? 1
      : stage.status === 'pyrrhic'
      ? 0.75
      : 0.5
  const difficulty = stage.difficulty.cr
  const { tier } = actor__difficultyStats({
    actor: avatar,
    cr: difficulty
  })
  const difficultyMod =
    tier === 'trivial'
      ? 0.1
      : tier === 'easy'
      ? 0.5
      : tier === 'medium'
      ? 1
      : tier === 'hard'
      ? 1.2
      : 1.5
  return difficulty * 0.01 * mod * status * difficultyMod
}

export const stage__reward = (params: StageRewardParams) => {
  const { avatar, stage } = params
  const exp = stage__xp(params)
  actor__rewardXP({ actor: avatar, exp })
  stage.exp = exp
}

export const stage__resolve = (params: { stage: Stage; avatar: Actor }) => {
  const { stage, avatar } = params
  const { odds } = stage__odds({ difficulty: stage.difficulty, actor: avatar })
  const roll = window.dice.random
  const diff = roll - odds
  stage.status =
    diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
  stage.difficulty.pc = actor__cr({ actor: avatar, max: false })
  stage__reward({ avatar, stage })
}

export const stage__blocked = (params: { stage: Stage; avatar: Actor }) => {
  const { stage, avatar } = params
  if (!stage) return false
  const { tier } = stage__odds({
    difficulty: stage.difficulty,
    actor: avatar
  })
  return tier === 'insanity'
}
