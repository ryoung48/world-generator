import { actor__enemyCR } from '../npcs/actors'
import { actor__spawn } from '../npcs/actors/spawn'
import { profession__randomBalanced } from '../npcs/actors/stats/professions'
import { Actor } from '../npcs/actors/types'
import { location__spawnTraits } from '../regions/locations/spawn/traits'
import { Loc } from '../regions/locations/types'
import { province__hub } from '../regions/provinces'
import { decorateText } from '../utilities/text/decoration'
import { goal__spawn } from './goals'
import {
  task__blocked,
  task__current,
  task__difficulty,
  task__placeholder,
  task__resolve,
  task__reward,
  task__spawn
} from './tasks'
import { Thread, ThreadedEntity } from './types'

export const thread__spawn = (params: {
  loc: Loc
  avatar: Actor
  parent?: Thread
  target: ThreadedEntity
  type: Thread['type']
}) => {
  const { avatar, loc, target, parent, type } = params
  const difficulty = parent ? task__difficulty(parent) : actor__enemyCR(avatar)
  const prev = parent ? thread__tasks(parent).slice(-1)[0]?.goal ?? parent?.goal : undefined
  const urban = type === 'urban'
  const hooks: Thread['hook'][] = loc.traits.map(({ tag }) => tag)
  if (urban) hooks.push('personal')
  const thread: Thread = {
    idx: window.world.threads.length,
    type,
    ...goal__spawn({ type, blacklist: [prev] }),
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
    patron: urban
      ? actor__spawn({
          location: loc,
          living: true,
          occupation: {
            key: window.dice.weightedChoice(
              profession__randomBalanced({ loc, time: window.world.date })
            )
          }
        }).idx
      : undefined,
    hook: window.dice.choice(hooks),
    tasks: [],
    duration: 0,
    exp: 0
  }
  window.world.threads.push(thread)
  task__spawn({ thread })
  target.threads = [...target.threads, thread.idx]
  return thread
}

const thread__spawnChild = (params: { thread: Thread; avatar: Actor }) => {
  const { avatar, thread } = params
  const [task] = thread.tasks.slice(-1)
  if (task !== task__placeholder) return false
  const loc = thread__transition(thread)?.loc ?? window.world.locations[thread.location]
  const child = thread__spawn({
    avatar,
    loc,
    target: avatar,
    parent: thread,
    type: thread.type
  })
  child.parent = thread.idx
  child.depth = thread.depth + 1
  thread.tasks.splice(-1, 1, child.idx)
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
  const current = task__current(thread)
  return current ? task__blocked({ task: current, avatar }) : false
}

export const thread__child = ({ tasks }: Thread) => {
  const previous = tasks.slice(-1)[0]
  if (typeof previous === 'number') return window.world.threads[previous]
}

export const thread__paused = (thread: Thread) => {
  const child = thread__child(thread)
  return child && thread__ongoing(child)
}

const thread__transition = (thread: Thread) => {
  const location = window.world.locations[thread.location]
  if (thread.type !== 'urban' || thread.tasks.length === 0 || window.dice.random > 0.1)
    return undefined
  const chosen = window.dice.choice(window.world.provinces[location.province].neighbors)
  const transition = province__hub(window.world.provinces[chosen])
  location__spawnTraits(transition)
  return {
    loc: transition,
    text: ` ${decorateText({
      link: location,
      tooltip: location.type
    })} → ${decorateText({
      link: transition,
      tooltip: transition.type
    })}.`
  }
}

export const thread__advance = (params: { avatar: Actor; thread: Thread }) => {
  const { avatar, thread } = params
  const current = task__current(thread)
  const child = thread__child(thread)
  // determine the result of the task
  if (!child) task__resolve({ task: current, avatar })
  // determine the resultant effect on the entire thread
  if (current.status === 'perfection') thread.progress += 2
  else if (current.status === 'success') thread.progress += 1
  else if (current.status === 'pyrrhic') thread.failures += 1
  else if (current.status === 'failure') thread.failures += 2
  // spawn the next task (if applicable)
  if (thread__ongoing(thread)) {
    const transition = thread__transition(thread)
    if (transition) thread.location = transition.loc.idx
    task__spawn({ thread, transition: transition?.text })
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

export const thread__tasks = (thread: Thread) =>
  thread.tasks
    .filter(task => task !== task__placeholder)
    .map(task => (typeof task === 'number' ? window.world.threads[task] : task))

export const thread__close = (params: { avatar: Actor; thread: Thread }) => {
  const { avatar, thread } = params
  thread.closed = true
  if (thread__abandoned(thread)) {
    thread.status = 'failure'
    // close all child threads recursively
    const child = thread__child(thread)
    if (child && !child.closed) thread__close({ thread: child, avatar })
  } else {
    task__reward({ task: thread, avatar, mod: thread.complexity })
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
