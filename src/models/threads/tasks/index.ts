import { actor__cr, actor__difficultyStats, actor__rewardXP } from '../../npcs/actors'
import { Actor } from '../../npcs/actors/types'
import { difficulty__stats } from '../../npcs/stats/difficulty'
import { hourMS, minuteMS } from '../../utilities/math/time'
import { goal__spawn } from '../goals'
import { Thread } from '../types'
import { Task } from './types'

export const task__difficulty = (thread: Thread) => window.dice.norm(1, 0.05) * thread.difficulty.cr

export const task__placeholder = -1

export const task__current = ({ tasks }: Thread) => {
  const previous = tasks.slice(-1)[0]
  if (typeof previous === 'number') return window.world.threads[previous]
  return previous
}

export const task__spawn = (params: { thread: Thread; transition?: string }) => {
  const { thread, transition } = params
  const { tasks, depth } = thread
  if (tasks.length > 0 && depth < 2 && !transition && window.dice.random > 0.9) {
    thread.tasks.push(task__placeholder)
  } else {
    const previous = task__current(thread)
    const { goal, text } = goal__spawn({
      type: thread.type === 'explore' ? 'ruin' : 'urban',
      blacklist: [previous?.goal ?? thread.goal]
    })
    thread.tasks.push({
      goal,
      text: `${text}${transition ?? ''}`,
      difficulty: { cr: task__difficulty(thread) },
      duration: window.dice.weightedChoice([
        { w: 2, v: () => window.dice.uniform(minuteMS * 30, hourMS * 1) },
        { w: 1, v: () => window.dice.uniform(hourMS * 1, hourMS * 5) }
      ])(),
      exp: 0
    })
  }
}

export const task__odds = (params: { difficulty: Thread['difficulty']; actor: Actor }) => {
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

export const task__xp = (params: { task: Task; avatar: Actor; mod?: number }) => {
  const { avatar, task, mod = 1 } = params
  const status =
    task.status === 'perfection'
      ? 1.25
      : task.status === 'success'
      ? 1
      : task.status === 'pyrrhic'
      ? 0.75
      : 0.5
  const difficulty = task.difficulty.cr
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

export const task__reward = (params: { task: Task; avatar: Actor; mod?: number }) => {
  const { avatar, task } = params
  const exp = task__xp(params)
  actor__rewardXP({ actor: avatar, exp })
  task.exp = exp
}

export const task__resolve = (params: { task: Task; avatar: Actor }) => {
  const { task, avatar } = params
  const { odds } = task__odds({ difficulty: task.difficulty, actor: avatar })
  const roll = window.dice.random
  const diff = roll - odds
  task.status =
    diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
  task.difficulty.pc = actor__cr({ actor: avatar, max: false })
  task__reward({ avatar, task })
}

export const task__blocked = (params: { task: Task; avatar: Actor }) => {
  const { task, avatar } = params
  if (!task) return false
  const { tier } = task__odds({
    difficulty: task.difficulty,
    actor: avatar
  })
  return tier === 'insanity'
}
