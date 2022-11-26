import { LifePhase } from '../npcs/actors/stats/age/life_phases'
import { Gender } from '../npcs/actors/stats/appearance/gender'
import { CourtGroup } from './backgrounds/courts/types'
import { BackgroundTag } from './backgrounds/types'
import { Goal } from './goals/types'
import { Stage } from './stages/types'

export interface ThreadActor {
  alias: string
  name: string
  culture: number
  age?: LifePhase
  gender?: Gender
  monstrous?: boolean
}

export interface Thread extends Omit<Stage, 'child' | 'task' | 'text'> {
  // thread index (window.world.threads)
  idx?: number
  // goal that defines the thread
  goal?: { tag: Goal['tag']; text: string }
  // location where the thread takes place
  location: number
  // quest hook
  background: {
    tag: BackgroundTag
    context: string
    complication: string
    category: string
    patron: ThreadActor
    antagonist: ThreadActor
    place: string
    thing: string
    court?: CourtGroup
  }
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
  // setting (weather, time of day, etc)
  setting: string
}

export interface ThreadedEntity {
  threads: number[]
}
