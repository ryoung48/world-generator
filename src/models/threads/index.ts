// https://gitlab.com/rayoung788/world-generator/-/tree/1468e0eff347c49d8eedd5fc511bbfa2421c1b09/src/models/threads
import { range } from 'd3'
import { Optional } from 'utility-types'

import { DIFFICULTY } from './difficulty'
import { THREAD_ELEMENTS } from './elements'
import { STAGE } from './stages'
import { Stage } from './stages/types'
import { Thread, ThreadParams, ThreadRewardParams } from './types'

const unresolved = (thread: Thread) => {
  const { failures, complexity, progress } = thread
  return failures < complexity && progress < complexity
}

const _threads: Thread[] = []

export const THREAD = {
  actions: {
    advance: (params: { avatar: number; thread: Thread }) => {
      const { avatar, thread } = params
      const current = STAGE.current(thread)
      const child = THREAD.get.child(thread)
      // determine the result of the task
      if (!child) STAGE.resolve({ stage: current, avatar })
      else {
        current.status = child.status
        current.difficulty = child.difficulty
      }
      const reward = THREAD.actions.reward({ avatar, entity: current })
      // determine the resultant effect on the entire thread
      if (current.status === 'perfection') thread.progress += 2
      else if (current.status === 'success') thread.progress += 1
      else if (current.status === 'pyrrhic') thread.failures += 1
      else if (current.status === 'failure') thread.failures += 2
      // spawn the next task (if applicable)
      if (THREAD.status.ongoing(thread)) {
        STAGE.spawn(thread)
        THREAD.spawn.child({ thread, avatar })
      }
      // update the status of the entire thread
      const { failures, complexity } = thread
      const grade = failures / complexity
      thread.status =
        grade < 0.1 ? 'perfection' : grade < 0.6 ? 'success' : grade < 1 ? 'pyrrhic' : 'failure'
      return reward
    },
    close: (params: { avatar: number; thread: Thread }) => {
      const { avatar, thread } = params
      thread.closed = true
      let reward = 0
      if (THREAD.status.abandoned(thread)) {
        thread.status = 'failure'
        // close all child threads recursively
        const child = THREAD.get.child(thread)
        if (child && !child.closed) THREAD.actions.close({ thread: child, avatar })
      } else {
        reward = THREAD.actions.reward({ avatar, entity: thread })
      }
      // update parent thread if applicable
      const parent = _threads[thread.parent]
      if (parent && !parent.closed) reward += THREAD.actions.advance({ thread: parent, avatar })
      return reward
    },

    reward: ({ avatar, entity }: ThreadRewardParams) => {
      const status =
        entity.status === 'perfection'
          ? 1
          : entity.status === 'success'
          ? 0.5
          : entity.status === 'pyrrhic'
          ? 0.25
          : 0
      const difficulty = entity.difficulty
      const { tier } = DIFFICULTY.contest({ task: entity, avatar })
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
      return difficulty * 0.01 * status * difficultyMod
    }
  },
  get: {
    child: (entity: Thread | Stage) => {
      if (entity.tag === 'thread') {
        const current = STAGE.current(entity)
        return _threads[current?.child]
      }
      return _threads[entity.child]
    },
    complexity: (thread: Thread) => {
      const { complexity } = thread
      let desc = 'epic'
      if (complexity <= 5) desc = 'simple'
      else if (complexity <= 10) desc = 'standard'
      else if (complexity <= 15) desc = 'involved'
      else if (complexity <= 20) desc = 'elaborate'
      else if (complexity <= 25) desc = 'intricate'
      else if (complexity <= 30) desc = 'byzantine'
      return desc
    },
    parent: (thread: Thread) => _threads[thread.parent],
    threads: () => {
      if (_threads.length === 0) {
        range(10).forEach(() => THREAD.spawn.instance({ avatar: 50 }))
      }
      return _threads
    }
  },
  spawn: {
    child: ({ avatar, thread: parent }: ThreadParams) => {
      const [stage] = parent.stages.slice(-1)
      if (stage.child !== STAGE.placeholder) return false
      const child = THREAD.spawn.instance({ avatar, thread: parent })
      child.parent = parent.idx
      child.depth = parent.depth + 1
      stage.child = child.idx
      return true
    },
    instance: ({ thread: parent, avatar }: Optional<ThreadParams, 'thread'>) => {
      const difficulty = parent ? STAGE.difficulty(parent) : DIFFICULTY.random.cr({ ref: avatar })

      const { location, district } = THREAD_ELEMENTS.roll.location()
      const thread: Thread = {
        tag: 'thread',
        idx: _threads.length,
        location: { text: location, district },
        patron: THREAD_ELEMENTS.roll.actor(district),
        status: 'perfection',
        difficulty,
        complexity: window.dice.weightedChoice([
          { w: 4, v: () => window.dice.randint(1, 3) },
          { w: 8, v: () => window.dice.randint(3, 7) },
          { w: 2, v: () => window.dice.randint(8, 12) },
          { w: 1, v: () => window.dice.randint(13, 17) }
        ])(),
        depth: 0,
        progress: 0,
        failures: 0,
        stages: []
      }
      _threads.push(thread)
      STAGE.spawn(thread)
      return thread
    }
  },
  status: {
    abandoned: (thread: Thread) => {
      const { closed } = thread
      return unresolved(thread) && closed
    },
    blocked: ({ thread, avatar }: ThreadParams) => {
      const current = STAGE.current(thread)
      return current ? STAGE.blocked({ stage: current, avatar }) : false
    },
    ongoing: (thread: Thread) => {
      const { closed } = thread
      return unresolved(thread) && !closed
    },
    paused: (thread: Thread) => {
      const child = THREAD.get.child(thread)
      return child && THREAD.status.ongoing(child)
    }
  }
}
