import { DIFFICULTY } from '../difficulty'
import { Thread } from '../types'
import { StageParams } from './types'

export const STAGE = {
  blocked: ({ stage, avatar }: StageParams) => {
    if (!stage) return false
    const { tier } = DIFFICULTY.contest({ task: stage, avatar })
    return tier === 'insanity'
  },
  current: (thread: Thread) => thread.stages.slice(-1)[0],
  difficulty: (thread: Thread) => window.dice.norm(1, 0.05) * thread.difficulty,
  placeholder: -1,
  resolve: ({ stage, avatar }: StageParams) => {
    const { odds } = DIFFICULTY.contest({ task: stage, avatar })
    const roll = window.dice.random
    const diff = odds - roll
    stage.status =
      diff > 0.4 ? 'perfection' : diff >= 0 ? 'success' : diff > -0.4 ? 'pyrrhic' : 'failure'
  },
  spawn: (thread: Thread) => {
    const { depth } = thread
    const nested = depth < 2 && thread.complexity > 5 && window.dice.random < 0.1
    thread.stages.push({
      tag: 'stage',
      difficulty: STAGE.difficulty(thread),
      child: nested ? STAGE.placeholder : undefined
    })
  }
}
