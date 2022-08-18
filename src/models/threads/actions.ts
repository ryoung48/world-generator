import { actor__cr, actor__difficultyStats, actor__relation } from '../npcs/actors'
import { Actor } from '../npcs/actors/types'
import { npc__CRToLvl, npc__lvlToCR } from '../npcs/stats'
import {
  task__inProgress,
  thread__inProgress,
  thread__progress,
  thread__status,
  thread__taskOdds,
  thread__tasks
} from '.'
import { thread__addTask } from './spawn'
import { Task, Thread, ThreadedEntity } from './types'

interface ThreadXPParams {
  avatar: Actor
  difficulty: number
  status: Task['status']
  complexity?: number
}

export const thread__exp = ({ avatar, difficulty, status, complexity = 1 }: ThreadXPParams) => {
  const statusMod =
    status === 'perfection' ? 1.5 : status === 'success' ? 1 : status === 'pyrrhic' ? 0.5 : 0
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
  const exp = difficulty * 0.01 * statusMod * difficultyMod * complexity
  return exp
}

const reward = (params: ThreadXPParams) => {
  const { avatar } = params
  const party = actor__relation({ actor: avatar, type: 'party' })
  const exp = thread__exp(params)
  const weights = window.dice.uniformDist(party.length)
  party.forEach((npc, i) => {
    npc.level = npc__CRToLvl(npc__lvlToCR(npc.level) + exp * weights[i])
  })
  return exp
}

const thread__taskResolve = (params: { task: Task; avatar: Actor }) => {
  const { task, avatar } = params
  const { odds } = thread__taskOdds({ difficulty: task.difficulty, actor: avatar })
  const roll = window.dice.random
  const diff = roll - odds
  task.status =
    diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
  task.difficulty.pc = actor__cr({ actor: avatar, max: false })
  task.exp = reward({ avatar, difficulty: task.difficulty.cr, status: task.status })
}

export const thread__advance = (params: {
  avatar: Actor
  ref: ThreadedEntity
  thread: Thread
  task?: Task
}) => {
  const { avatar, thread, task = thread__inProgress({ thread, avatar }), ref } = params
  if (task.thread !== undefined && task__inProgress(task)) return
  if (task.thread === undefined) thread__taskResolve({ task, avatar })
  if (task.status === 'perfection') thread.progress += 2
  else if (task.status === 'success') thread.progress += 1
  else if (task.status === 'pyrrhic') thread.failures += 1
  else if (task.status === 'failure' || task.status === 'abandoned') thread.failures += 2
  // if (task.status !== 'abandoned' && task.thread === undefined) view_module.tick(task.duration)
  const inProgress = thread__inProgress({ thread, avatar })
  if (!inProgress) {
    const { completed, failed } = thread__progress({ thread, avatar })
    if (!completed && !failed && !thread.closed) {
      thread__addTask({ thread })
      ref.threads = [...ref.threads]
    }
  }
}

export const thread__fork = (params: {
  avatar: Actor
  ref: ThreadedEntity
  thread: Thread
  decision: Task
}) => {
  const { avatar, thread, decision, ref } = params
  // close the road not taken
  thread__tasks({ tasks: thread.fork.tasks, avatar })
    .filter(task => task.thread !== undefined && task.thread !== decision.thread)
    .forEach(task => {
      const child = window.world.threads[task.thread]
      thread__close({ thread: child, forked: true, ref, avatar })
    })
  delete thread.fork
  const child = window.world.threads[decision.thread]
  thread.tasks = [...thread.tasks, child?.idx ?? decision]
  if (child) child.closed = false
  thread__advance({ thread, ref, avatar })
  ref.threads = [...ref.threads]
}

export const thread__close = (params: {
  avatar: Actor
  thread: Thread
  ref: ThreadedEntity
  forked?: boolean
}) => {
  const { avatar, thread, forked, ref } = params
  thread.opened = true
  thread.closed = true
  // close all child threads recursively
  thread__tasks({ tasks: thread.tasks, avatar }).forEach(task => {
    const child = window.world.threads[task.thread]
    if (child && !child.closed) thread__close({ thread: child, forked, ref, avatar })
  })
  // update parent thread if applicable
  const parent = window.world.threads[thread.parent]
  if (parent && !forked) {
    const task = thread__tasks({ tasks: parent.tasks, avatar }).find(
      task => task.thread === thread.idx
    )
    if (task) thread__advance({ thread: parent, task, ref, avatar })
  }
  const status = thread__status(thread)
  thread.difficulty.pc = actor__cr({ actor: avatar, max: false })
  thread.exp = reward({
    difficulty: thread.difficulty.cr,
    status,
    complexity: thread.complexity,
    avatar
  })
  // update the thread master list
  ref.threads = [...ref.threads]
}
