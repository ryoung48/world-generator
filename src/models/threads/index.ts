import { range } from 'd3'

import { Avatar } from '../../components/context/types'
import { Province } from '../regions/provinces/types'
import { describeDuration } from '../utilities/math/time'
import { background__spawn } from './backgrounds'
import { avatar__cr, difficulty__lvl, difficulty__odds, difficulty__random } from './difficulty'
import { stage__current, stage__placeholder, stage__resolve, stage__spawn } from './stages'
import { Thread } from './types'

export const thread__spawn = (params: { loc: Province; parent?: Thread; pc: number }) => {
  const { loc, parent, pc } = params
  const background = background__spawn(loc)
  const thread: Thread = {
    idx: window.world.threads.length,
    status: 'perfection',
    difficulty: { cr: difficulty__random(pc) },
    complexity: window.dice.randint(3, 12),
    depth: 0,
    progress: 0,
    failures: 0,
    location: loc.idx,
    origin: loc.idx,
    stages: [],
    parent: parent?.idx,
    ...background
  }
  window.world.threads.push(thread)
  stage__spawn({ thread })
  return thread
}

const thread__spawnChild = (params: { thread: Thread; pc: number }) => {
  const { thread, pc } = params
  const stage = stage__current(thread)
  if (stage.child !== stage__placeholder) return false
  const loc = window.world.provinces[thread.location]
  const child = thread__spawn({ loc, parent: thread, pc })
  child.depth = thread.depth + 1
  stage.child = child.idx
  return true
}

const thread__unresolved = (thread: Thread) => {
  const { failures, complexity, progress } = thread
  return failures < complexity && progress < complexity
}

export const thread__abandoned = (thread: Thread) => {
  const { closed } = thread
  return thread__unresolved(thread) && closed
}

export const thread__ongoing = (thread: Thread) => {
  const { closed } = thread
  return thread__unresolved(thread) && !closed
}

export const thread__child = (thread: Thread) => {
  const current = stage__current(thread)
  return window.world.threads[current?.child]
}

export const thread__paused = (thread: Thread) => {
  const child = thread__child(thread)
  return child && thread__ongoing(child)
}

export const thread__blocked = (params: { thread: Thread; avatar: Avatar }): boolean => {
  const { thread } = params
  const pc = avatar__cr(params.avatar)
  if (!thread) return false
  const threadOdds = difficulty__odds({ pc, ...thread.difficulty })
  const child = thread__child(thread)
  const childBlocked = thread__blocked({ ...params, thread: child })
  const current = stage__current(thread)
  const currentOdds = difficulty__odds({ pc, ...current.difficulty })
  return childBlocked || [threadOdds, currentOdds].some(odds => odds.tier === 'insanity')
}

const thread__transition = (thread: Thread) => {
  const location = window.world.provinces[thread.location]
  if (thread.stages.length === 0 || window.dice.random > 0) return undefined
  const transition = window.dice.choice(location.neighbors)
  return { src: location.idx, dst: transition }
}

const reward = (params: { difficulty: Thread['difficulty']; status: Thread['status'] }) => {
  const { difficulty, status } = params
  const cp = 30 * 3 ** Math.max(0, difficulty__lvl(difficulty.cr) - 1)
  return status === 'failure'
    ? 0
    : status === 'pyrrhic'
    ? cp / 4
    : status === 'success'
    ? cp / 2
    : cp
}

export const thread__advance = (params: { thread: Thread; avatar: Avatar }) => {
  const { thread, avatar } = params
  const current = stage__current(thread)
  const child = thread__child(thread)
  const pc = avatar__cr(avatar)
  // determine the result of the task
  current.status = child?.status ?? stage__resolve({ pc, challenge: current.difficulty.cr })
  // determine the resultant effect on the entire thread
  if (current.status === 'pyrrhic') thread.failures += 1
  else if (current.status === 'failure') thread.failures += 2
  else {
    thread.progress += current.status === 'success' ? 1 : 2
  }
  const leftover = thread.progress - thread.complexity
  if (leftover > 0) {
    thread.failures = Math.min(thread.failures - leftover, 0)
    thread.progress -= leftover
  }
  // spawn the next task (if applicable)
  const ongoing = thread__ongoing(thread)
  if (ongoing) {
    const transition = thread__transition(thread)
    if (transition) thread.location = transition.dst
    stage__spawn({ thread, transition })
    thread__spawnChild({ thread, pc })
  }
  // update the status of the entire thread
  const { failures, complexity } = thread
  const grade = failures / complexity
  thread.status =
    grade < 0.1 ? 'perfection' : grade < 0.6 ? 'success' : grade < 1 ? 'pyrrhic' : 'failure'
  current.setting.duration = ` | ${describeDuration(current.duration)}`
  current.difficulty.pc = pc
  const outcome = ongoing ? { cp: 0, duration: 0 } : thread__close({ thread, avatar })
  return { cp: outcome.cp, duration: current.duration + outcome.duration }
}

export const thread__close = (params: { thread: Thread; avatar: Avatar }) => {
  const { thread, avatar } = params
  const pc = avatar__cr(avatar)
  thread.closed = true
  thread.difficulty.pc = pc
  const outcome = { cp: 0, duration: 0 }
  if (thread__abandoned(thread)) {
    thread.status = 'failure'
    // close all child threads recursively
    const child = thread__child(thread)
    if (child && !child.closed) {
      const progress = thread__close({ thread: child, avatar })
      outcome.cp += progress.cp
      outcome.duration += progress.duration
    }
  }
  // reward experience
  thread.pcs = [...avatar.pcs]
  thread.outcome = {
    cp: reward({ difficulty: thread.difficulty, status: thread.status })
  }
  outcome.cp += thread.outcome.cp
  // update parent thread if applicable
  const parent = window.world.threads[thread.parent]
  if (parent && !parent.closed) {
    const progress = thread__advance({ thread: parent, avatar })
    outcome.cp += progress.cp
    outcome.duration += progress.duration
  }
  return outcome
}

export const thread__complexity = (thread: Thread) => {
  const { complexity } = thread
  let desc = 'epic'
  if (complexity <= 5) desc = 'simple'
  else if (complexity <= 10) desc = 'standard'
  else if (complexity <= 15) desc = 'involved'
  else if (complexity <= 20) desc = 'elaborate'
  else if (complexity <= 25) desc = 'intricate'
  else if (complexity <= 30) desc = 'byzantine'
  return desc
}

/**
 * Gets all active threads at a location.
 * Will spawn threads if needed.
 * @param params.loc - location
 * @param params.avatar - PC character used to estimate thread difficulty
 * @returns list of threads for the location
 */
export const location__threads = (params: { loc: Province; avatar: Avatar }) => {
  const { loc } = params
  const pc = avatar__cr(params.avatar)
  const curr = window.world.threads.filter(thread => thread.origin === loc.idx)
  if (curr.length < 3) {
    range(3).forEach(() => thread__spawn({ loc, pc }))
    return true
  }
  return false
}
