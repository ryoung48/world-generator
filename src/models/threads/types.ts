import { Stage } from './stages/types'

// https://gitlab.com/rayoung788/world-generator/-/blob/1468e0eff347c49d8eedd5fc511bbfa2421c1b09/src/models/threads/index.ts

export interface Thread extends Omit<Stage, 'child' | 'task' | 'text' | 'tag'> {
  tag: 'thread'
  // thread index (window.world.threads)
  idx?: number
  // quest giver and location
  patron: string
  location: { text: string; district: string }
  // how deep is the ancestral tree? (max 3)
  depth: number
  // how many tasks must be completed to achieve the goal?
  complexity: number
  // how many tasks have been completed?
  progress: number
  // how many tasks have failed?
  failures: number
  // is this thread closed?
  closed?: boolean
  // list of child tasks
  stages: Stage[]
  // parent thread
  parent?: number
}

export type ThreadParams = { thread: Thread; avatar: number }

export type ThreadRewardParams = { entity: Thread | Stage; avatar: number }
