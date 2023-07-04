import { range } from 'd3'

import { Avatar } from '../../../components/context/types'
import { npc__spawn } from '../../npcs'
import { Province } from '../../regions/provinces/types'
import {
  avatar__cr,
  difficulty__lvl,
  difficulty__odds,
  difficulty__random
} from '../../utilities/difficulty'
import { describeDuration } from '../../utilities/math/time'
import { enemies } from '../backgrounds/enemies'
import { mission__spawn } from '../mission'
import { stage__current, stage__placeholder, stage__resolve, stage__spawn } from './stages'
import { Quest } from './types'

export const quest__spawn = (params: { loc: Province; parent?: Quest; pc: number }) => {
  const { loc, parent, pc } = params
  const quest: Quest = {
    idx: window.world.quests.length,
    type: window.dice.choice(['wilderness', 'community']),
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
    location: loc.idx,
    origin: loc.idx,
    stages: [],
    parent: parent?.idx
  }
  quest.goal = mission__spawn(quest.type)
  quest.enemies = quest.type === 'wilderness' ? enemies.wilderness() : enemies.civilization()
  const patron = npc__spawn({ loc, context: { role: 'friend' } })
  quest.patron = patron.idx
  stage__spawn({ quest })
  window.world.quests.push(quest)
  return quest
}

const quest__spawnChild = (params: { quest: Quest; pc: number }) => {
  const { quest, pc } = params
  const stage = stage__current(quest)
  if (stage.child !== stage__placeholder) return false
  const loc = window.world.provinces[quest.location]
  const child = quest__spawn({ loc, parent: quest, pc })
  child.depth = quest.depth + 1
  stage.child = child.idx
  return true
}

const quest__unresolved = (quest: Quest) => {
  const { failures, complexity, progress } = quest
  return failures < complexity && progress < complexity
}

export const quest__abandoned = (quest: Quest) => {
  const { closed } = quest
  return quest__unresolved(quest) && closed
}

export const quest__ongoing = (quest: Quest) => {
  const { closed } = quest
  return quest__unresolved(quest) && !closed
}

export const quest__child = (quest: Quest) => {
  const current = stage__current(quest)
  return window.world.quests[current?.child]
}

export const quest__paused = (quest: Quest) => {
  const child = quest__child(quest)
  return child && quest__ongoing(child)
}

export const quest__blocked = (params: { quest: Quest; pc: number }): boolean => {
  const { quest, pc } = params
  if (!quest) return false
  const questOdds = difficulty__odds({ pc, ...quest.difficulty })
  const child = quest__child(quest)
  const childBlocked = quest__blocked({ pc, quest: child })
  const current = stage__current(quest)
  const currentOdds = difficulty__odds({ pc, ...current.difficulty })
  return childBlocked || [questOdds, currentOdds].some(odds => odds.tier === 'insanity')
}

const quest__transition = (quest: Quest) => {
  const location = window.world.provinces[quest.location]
  if (quest.stages.length === 0 || window.dice.random > 0.1) return undefined
  const transition = window.dice.choice(location.neighbors)
  return { src: location.idx, dst: transition }
}

const reward = (params: {
  difficulty: Quest['difficulty']
  status: Quest['status']
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

export const quest__xp = (exp: number) => `${(exp * 10000).toFixed(0)} xp`

export const quest__advance = (params: { quest: Quest; avatar: Avatar }) => {
  const { quest, avatar } = params
  const current = stage__current(quest)
  const child = quest__child(quest)
  const pc = avatar__cr(avatar)
  // determine the result of the task
  current.status = child?.status ?? stage__resolve({ pc, challenge: current.difficulty.cr })
  // determine the resultant effect on the entire quest
  if (current.status === 'pyrrhic') quest.failures += 1
  else if (current.status === 'failure') quest.failures += 2
  else quest.progress += current.status === 'success' ? 1 : 2
  const ended = quest.progress >= quest.complexity
  if (ended) quest.progress = quest.complexity - 1
  const leftover = quest.progress - quest.complexity
  if (leftover > 0) {
    quest.failures = Math.min(quest.failures - leftover, 0)
    quest.progress -= leftover
  }
  // spawn the next task (if applicable)
  const ongoing = quest__ongoing(quest)
  if (ongoing) {
    const transition = quest__transition(quest)
    if (transition) quest.location = transition.dst
    stage__spawn({ quest, transition })
    quest__spawnChild({ quest, pc })
  }
  // update the status of the entire quest
  const { failures, complexity } = quest
  const grade = failures / complexity
  quest.status =
    grade < 0.1 ? 'perfection' : grade < 0.6 ? 'success' : grade < 1 ? 'pyrrhic' : 'failure'
  const cp = reward({ pc, difficulty: current.difficulty, status: current.status })
  current.setting.duration = `, ∼ ${describeDuration(current.duration)}`
  current.difficulty.pc = pc
  const outcome = ongoing ? { cp: 0, duration: 0 } : quest__close({ quest, avatar })
  return { cp: cp + outcome.cp, duration: current.duration + outcome.duration }
}

export const quest__close = (params: { quest: Quest; avatar: Avatar }) => {
  const { quest, avatar } = params
  const pc = avatar__cr(avatar)
  quest.closed = true
  quest.difficulty.pc = pc
  const outcome = { cp: 0, duration: 0 }
  if (quest__abandoned(quest)) {
    quest.status = 'failure'
    // close all child quests recursively
    const child = quest__child(quest)
    if (child && !child.closed) {
      const progress = quest__close({ quest: child, avatar })
      outcome.cp += progress.cp
      outcome.duration += progress.duration
    }
  }
  // update parent quest if applicable
  const parent = window.world.quests[quest.parent]
  if (parent && !parent.closed) {
    const progress = quest__advance({ quest: parent, avatar })
    outcome.cp += progress.cp
    outcome.duration += progress.duration
  }
  return outcome
}

export const quest__complexity = (quest: Quest) => {
  const { complexity } = quest
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
export const location__quests = (params: { loc: Province; pc: number }) => {
  const { loc, pc } = params
  const curr = window.world.quests.filter(thread => thread.origin === loc.idx)
  if (curr.length < 3) {
    range(3).forEach(() => quest__spawn({ loc, pc }))
    return true
  }
  return false
}
