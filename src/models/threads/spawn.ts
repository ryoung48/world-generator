import { range } from 'd3'

import { actor__enemyCR } from '../npcs/actors'
import { actor__spawn } from '../npcs/actors/spawn'
import { Actor } from '../npcs/actors/types'
import { lang__loremSentences } from '../npcs/species/languages/words'
import { location__culture } from '../regions/locations/actors/demographics'
import { location__spawnTraits } from '../regions/locations/spawn/traits'
import { Loc } from '../regions/locations/types'
import { province__hub } from '../regions/provinces'
import { hourMS, minuteMS } from '../utilities/math/time'
import { decorateText } from '../utilities/text/decoration'
import { goal__spawn } from './goals'
import { ChildTask, Task, Thread, ThreadedEntity } from './types'

export const thread__placeholder = -1

const task__difficulty = (thread: Thread) => window.dice.uniform(0.7, 1.3) * thread.difficulty.cr

const thread__spawnTask = (params: {
  thread: Thread
  transition: string
  strengthen: boolean
}): Task => {
  const { thread, transition, strengthen } = params
  const mod = strengthen ? window.dice.uniform(1.25, 2) : 1
  thread.difficulty.cr *= mod
  const goal = goal__spawn(thread)
  return {
    goal: goal.tag,
    text: `${goal.text()}${
      strengthen
        ? ` ${decorateText({
            label: `Your enemies grow stronger (${mod.toFixed(2)}).`,
            italics: true
          })}`
        : ''
    }${transition ?? ''}`,
    status: 'in progress',
    difficulty: { cr: task__difficulty(thread) },
    duration: window.dice.weightedChoice([
      { w: 2, v: () => window.dice.uniform(minuteMS * 30, hourMS * 4) },
      { w: 1, v: () => window.dice.uniform(hourMS * 4, hourMS * 24) }
    ])()
  }
}

const thread__transitionText = (params: { origin: Loc; transition: Loc }) => {
  const { origin, transition } = params
  return ` ${decorateText({
    link: origin,
    tooltip: origin.type
  })} → ${decorateText({
    link: transition,
    tooltip: transition.type
  })}. `
}

const thread__transition = (thread: Thread) => {
  if (thread.tasks.length === 0 || window.dice.random > 0.1) return undefined
  const location = window.world.locations[thread.location]
  const chosen = window.dice.choice(window.world.provinces[location.province].neighbors)
  const transition = province__hub(window.world.provinces[chosen])
  location__spawnTraits(transition)
  return {
    loc: transition.idx,
    text: thread__transitionText({ origin: location, transition })
  }
}

export const thread__addTask = (params: {
  thread: Thread
  fork?: boolean
  plaza?: boolean
}): ChildTask[] => {
  const { thread, fork, plaza } = params
  const { depth, location } = thread
  const nesting = depth < 3 && !thread.closed
  const branched = fork || plaza || thread.closed
  const transition = !branched && thread__transition(thread)
  const diff = thread.complexity - thread.progress
  if (transition) thread.location = transition.loc
  return window.dice.weightedChoice([
    {
      // normal task
      w: plaza ? 0 : 0.9,
      v: () => {
        const task = thread__spawnTask({
          thread,
          transition: transition?.text,
          strengthen: !branched && thread.tasks.length > 0 && window.dice.random > 0.9
        })
        if (!fork) thread.tasks = [...thread.tasks, task]
        return [task]
      }
    },
    {
      // nested task
      w: transition ? 0 : plaza ? 1 : nesting ? 0.1 : 0,
      v: () => {
        if (!fork) thread.tasks = [...thread.tasks, thread__placeholder]
        return [thread__placeholder]
      }
    },
    {
      // forked task
      w: !branched && !transition ? 0.05 : 0,
      v: () => {
        const originLoc = window.world.locations[location]
        const { local } = location__culture(originLoc)
        const { language } = window.world.cultures[local.culture.native]
        const forks = window.dice.randint(2, 3)
        const tasks = range(forks)
          .map(() => thread__addTask({ thread, fork: true }))
          .flat()
        thread.fork = {
          text: lang__loremSentences(language, 1),
          tasks
        }
        return tasks
      }
    },
    {
      // plaza task
      w: !branched && !transition && nesting && diff >= 6 ? 0.05 : 0,
      v: () => {
        const options = window.dice.randint(2, 3)
        const tasks = range(options)
          .map(() => thread__addTask({ thread, plaza: true }))
          .flat()
        return tasks
      }
    }
  ])()
}

export const thread__spawn = (params: {
  loc: Loc
  avatar: Actor
  depth?: number
  difficulty?: number
  target: ThreadedEntity
}) => {
  const { avatar, loc, depth = 0, difficulty = actor__enemyCR(avatar), target } = params
  const goal = goal__spawn()
  const thread: Thread = {
    idx: window.world.threads.length,
    goal: goal.tag,
    text: goal.text(),
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
    depth,
    progress: 0,
    failures: 0,
    location: loc.idx,
    patron: actor__spawn({ location: loc, living: true }).idx,
    hook: window.dice.choice(['personal', window.dice.choice(loc.traits.map(({ tag }) => tag))]),
    tasks: []
  }
  window.world.threads.push(thread)
  thread__addTask({ thread })
  target.threads = [...target.threads, thread.idx]
  return thread
}

const thread__addChild = (params: {
  thread: Thread
  fork?: boolean
  target: ThreadedEntity
  avatar: Actor
}) => {
  const { thread, fork, target, avatar } = params
  const loc = window.world.locations[thread.location]
  const transition = thread__transition(thread)
  const child = thread__spawn({
    avatar,
    loc: window.world.locations[transition?.loc] ?? loc,
    depth: thread.depth + 1,
    difficulty: task__difficulty(thread),
    target
  })
  child.parent = thread.idx
  if (fork) child.closed = true
  return child.idx
}

export const thread__spawnChildren = (params: { thread: Thread; avatar: Actor }) => {
  const { avatar, thread } = params
  const oldCount = avatar.threads.length
  thread.opened = true
  thread.tasks = thread.tasks.map(task => {
    if (typeof task === 'number') {
      if (window.world.threads[task]) return task
      return thread__addChild({ thread, target: avatar, avatar })
    }
    return task
  })
  if (thread.fork) {
    thread.fork.tasks = thread.fork.tasks.map(task => {
      if (typeof task === 'number') {
        if (window.world.threads[task]) return task
        return thread__addChild({ thread, fork: true, target: avatar, avatar })
      }
      return task
    })
  }
  return oldCount !== avatar.threads.length
}
