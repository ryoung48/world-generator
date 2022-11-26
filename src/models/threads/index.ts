import { actor__enemyCR } from '../npcs/actors'
import { Actor } from '../npcs/actors/types'
import { Loc } from '../regions/locations/types'
import { province__hub } from '../regions/provinces'
import { decorateText } from '../utilities/text/decoration'
import { location__weather } from '../world/climate/weather'
import { thread__background } from './backgrounds'
import { complication__spawn } from './complications'
import { goal__spawn } from './goals'
import {
  stage__blocked,
  stage__current,
  stage__difficulty,
  stage__placeholder,
  stage__resolve,
  stage__reward,
  stage__spawn
} from './stages'
import { Thread, ThreadedEntity } from './types'

export const thread__spawn = (params: {
  loc: Loc
  avatar: Actor
  parent?: Thread
  target: ThreadedEntity
}) => {
  const { avatar, loc, target, parent } = params
  const difficulty = parent ? stage__difficulty(parent) : actor__enemyCR(avatar)
  const prev = parent?.goal
  const { season, time, heat, conditions, variance } = location__weather(loc)
  const thread: Thread = {
    idx: window.world.threads.length,
    status: 'perfection',
    difficulty: { cr: difficulty },
    complexity: window.dice.weightedChoice([
      { w: 128, v: () => window.dice.randint(1, 3) },
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
    location: loc.idx,
    background: thread__background(loc),
    stages: [],
    duration: 0,
    exp: 0,
    setting: `${decorateText({
      label: heat.desc,
      tooltip: `${heat.degrees.toFixed(0)}°F`
    })}${
      variance === 'normal'
        ? ''
        : decorateText({ label: '*', color: variance === 'warmer' ? 'red' : 'blue' })
    }, ${season}, ${time}, ${conditions}`
  }
  thread.goal = goal__spawn({ thread, blacklist: [prev?.tag] })
  if (window.dice.random < 0.1) thread.complication = complication__spawn({ thread, type: 'goal' })
  window.world.threads.push(thread)
  stage__spawn({ thread })
  target.threads = [...target.threads, thread.idx]
  return thread
}

const thread__spawnChild = (params: { thread: Thread; avatar: Actor }) => {
  const { avatar, thread } = params
  const [stage] = thread.stages.slice(-1)
  if (stage.child !== stage__placeholder) return false
  const loc = window.world.locations[thread.location]
  const child = thread__spawn({
    avatar,
    loc,
    target: avatar,
    parent: thread
  })
  child.parent = thread.idx
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

export const thread__blocked = (params: { thread: Thread; avatar: Actor }) => {
  const { thread, avatar } = params
  const current = stage__current(thread)
  return current ? stage__blocked({ stage: current, avatar }) : false
}

export const thread__child = (thread: Thread) => {
  const current = stage__current(thread)
  return window.world.threads[current?.child]
}

export const thread__paused = (thread: Thread) => {
  const child = thread__child(thread)
  return child && thread__ongoing(child)
}

const thread__transition = (thread: Thread) => {
  const location = window.world.locations[thread.location]
  if (thread.stages.length === 0 || window.dice.random > 0.1) return undefined
  const chosen = window.dice.choice(window.world.provinces[location.province].neighbors)
  const transition = province__hub(window.world.provinces[chosen])
  return { src: location.idx, dst: transition.idx }
}

export const thread__advance = (params: { avatar: Actor; thread: Thread }) => {
  const { avatar, thread } = params
  const current = stage__current(thread)
  const child = thread__child(thread)
  // determine the result of the task
  if (!child) stage__resolve({ stage: current, avatar })
  else {
    current.status = child.status
    current.difficulty.pc = child.difficulty.pc
    stage__reward({ avatar, stage: current })
  }
  // determine the resultant effect on the entire thread
  if (current.status === 'perfection') thread.progress += 2
  else if (current.status === 'success') thread.progress += 1
  else if (current.status === 'pyrrhic') thread.failures += 1
  else if (current.status === 'failure') thread.failures += 2
  // spawn the next task (if applicable)
  if (thread__ongoing(thread)) {
    const transition = thread__transition(thread)
    if (transition) thread.location = transition.dst
    stage__spawn({ thread, transition })
    thread__spawnChild({ thread, avatar })
  }
  // update the status of the entire thread
  const { failures, complexity } = thread
  const grade = failures / complexity
  thread.status =
    grade < 0.1 ? 'perfection' : grade < 0.6 ? 'success' : grade < 1 ? 'pyrrhic' : 'failure'
  const duration = child ? 0 : current.duration
  thread.duration += duration
  return duration
}

export const thread__close = (params: { avatar: Actor; thread: Thread }) => {
  const { avatar, thread } = params
  thread.closed = true
  if (thread__abandoned(thread)) {
    thread.status = 'failure'
    // close all child threads recursively
    const child = thread__child(thread)
    if (child && !child.closed) thread__close({ thread: child, avatar })
  } else {
    stage__reward({ stage: thread, avatar, mod: thread.complexity })
  }
  // update parent thread if applicable
  const parent = window.world.threads[thread.parent]
  if (parent && !parent.closed) thread__advance({ thread: parent, avatar })
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

export const thread__collect = (ref: ThreadedEntity) => {
  const threads = ref.threads.map(i => window.world.threads[i])
  return {
    active: threads.filter(thread => !thread.closed),
    closed: threads.filter(thread => thread.closed)
  }
}

export const thread__formattedXP = (xp: number) => `${(xp * 1000).toFixed(0)} xp`
