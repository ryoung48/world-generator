import { range } from 'd3'

import { Avatar } from '../../components/context/types'
import { npc__spawn } from '../npcs'
import { Province } from '../regions/provinces/types'
import { describeDuration } from '../utilities/math/time'
import { complication__spawn } from './complications'
import { difficulty__odds, difficulty__random } from './difficulty'
import { goal__spawn } from './goals'
import { stage__current, stage__placeholder, stage__resolve, stage__spawn } from './stages'
import { task__definition } from './tasks'
import { Thread } from './types'

export const thread__spawn = (params: { loc: Province; parent?: Thread; pc: number }) => {
  const { loc, parent, pc } = params
  const prev = parent?.goal
  const patron = npc__spawn({ loc, context: { role: 'patron' } })
  const rival = npc__spawn({
    loc,
    context: { ref: patron, role: 'rival' },
    profession: window.dice.random > 0.85 ? patron.profession.key : undefined
  })
  const thread: Thread = {
    idx: window.world.threads.length,
    status: 'perfection',
    difficulty: { cr: difficulty__random(pc) },
    complexity: window.dice.weightedChoice([
      { w: 64, v: () => window.dice.randint(3, 7) },
      { w: 32, v: () => window.dice.randint(8, 12) },
      { w: 16, v: () => window.dice.randint(13, 17) },
      { w: 8, v: () => window.dice.randint(18, 22) },
      { w: 4, v: () => window.dice.randint(23, 27) },
      { w: 2, v: () => window.dice.randint(28, 32) },
      { w: 1, v: () => window.dice.randint(33, 37) }
    ])(),
    depth: 0,
    progress: 0,
    failures: 0,
    clues: 0,
    location: loc.idx,
    origin: loc.idx,
    stages: [],
    parent: parent?.idx,
    actors: [
      { idx: patron.idx, role: 'patron', loc: loc.idx },
      { idx: rival.idx, role: 'rival', loc: loc.idx }
    ]
  }
  thread.goal = goal__spawn({ thread, blacklist: [prev?.tag] })
  if (window.dice.random < 0.1) thread.complication = complication__spawn({ thread, type: 'goal' })
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

export const thread__blocked = (params: { thread: Thread; pc: number }): boolean => {
  const { thread, pc } = params
  if (!thread) return false
  const threadOdds = difficulty__odds({ pc, ...thread.difficulty })
  const child = thread__child(thread)
  const childBlocked = thread__blocked({ pc, thread: child })
  const current = stage__current(thread)
  const currentOdds = difficulty__odds({ pc, ...current.difficulty })
  return childBlocked || [threadOdds, currentOdds].some(odds => odds.tier === 'insanity')
}

const thread__transition = (thread: Thread) => {
  const location = window.world.provinces[thread.location]
  if (thread.stages.length === 0 || window.dice.random > 0.1) return undefined
  const transition = window.dice.choice(location.neighbors)
  return { src: location.idx, dst: transition }
}

const reward = (params: {
  pc: number
  difficulty: Thread['difficulty']
  status: Thread['status']
  complexity?: number
}) => {
  const { pc, difficulty, status, complexity = 1 } = params
  const statusMod =
    status === 'perfection' ? 1.5 : status === 'success' ? 1 : status === 'pyrrhic' ? 0.5 : 0
  const { tier } = difficulty__odds({ pc, ...difficulty })
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
  return difficulty.cr * 0.01 * statusMod * difficultyMod * complexity
}

export const thread__xp = (exp: number) => `${(exp * 10000).toFixed(0)} xp`

export const thread__advance = (params: { thread: Thread; avatar: Avatar }) => {
  const { thread, avatar } = params
  const current = stage__current(thread)
  const child = thread__child(thread)
  // determine the result of the task
  current.status =
    child?.status ?? stage__resolve({ pc: avatar.cr, challenge: current.difficulty.cr })
  task__definition[current.task].resolve?.({ thread, stage: current })
  // determine the resultant effect on the entire thread
  if (current.status === 'pyrrhic') thread.failures += 1
  else if (current.status === 'failure') thread.failures += 2
  else {
    thread.progress += current.status === 'success' ? 1 : 2
    if (task__definition[current.task].type === 'investigation') thread.clues += 1
  }
  const ended = thread.progress >= thread.complexity
  if (ended && task__definition[current.task].type !== 'action')
    thread.progress = thread.complexity - 1
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
    thread__spawnChild({ thread, pc: avatar.cr })
  }
  // update the status of the entire thread
  const { failures, complexity } = thread
  const grade = failures / complexity
  thread.status =
    grade < 0.1 ? 'perfection' : grade < 0.6 ? 'success' : grade < 1 ? 'pyrrhic' : 'failure'
  const xp = reward({ pc: avatar.cr, difficulty: current.difficulty, status: current.status })
  current.xp = xp
  current.setting.duration = `, ∼ ${describeDuration(current.duration)}`
  current.difficulty.pc = avatar.cr
  const outcome = ongoing ? { xp: 0, duration: 0 } : thread__close({ thread, avatar })
  return { xp: xp + outcome.xp, duration: current.duration + outcome.duration }
}

export const thread__close = (params: { thread: Thread; avatar: Avatar }) => {
  const { thread, avatar } = params
  thread.closed = true
  thread.difficulty.pc = avatar.cr
  const outcome = { xp: 0, duration: 0 }
  if (thread__abandoned(thread)) {
    thread.status = 'failure'
    // close all child threads recursively
    const child = thread__child(thread)
    if (child && !child.closed) {
      const progress = thread__close({ thread: child, avatar })
      outcome.xp += progress.xp
      outcome.duration += progress.duration
    }
  }
  // reward experience
  thread.pcs = [...avatar.npcs]
  thread.xp = reward({
    pc: avatar.cr,
    difficulty: thread.difficulty,
    status: thread.status,
    complexity: thread.complexity
  })
  outcome.xp += thread.xp
  // update parent thread if applicable
  const parent = window.world.threads[thread.parent]
  if (parent && !parent.closed) {
    const progress = thread__advance({ thread: parent, avatar })
    outcome.xp += progress.xp
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
export const location__threads = (params: { loc: Province; pc: number }) => {
  const { loc, pc } = params
  const curr = window.world.threads.filter(thread => thread.origin === loc.idx)
  if (curr.length < 3) {
    range(3).forEach(() => thread__spawn({ loc, pc }))
    return true
  }
  return false
}
