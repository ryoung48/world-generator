import { Gender, LifePhase } from '../../npcs/types'
import { Difficulty } from '../difficulty'
import { Community } from './communities/types'
import { Court, CourtGroup } from './courts/types'
import { Faith } from './faith/types'
import { Ruins } from './ruins/types'
import { Wilderness } from './wilderness/types'

export interface ThreadActor {
  alias: string
  name: string
  culture: number
  age?: LifePhase
  gender?: Gender
  monstrous?: boolean
}

export interface Thread {
  tag: BackgroundTag
  weather: string
  text: string
  complication: string
  category: string
  patron: ThreadActor
  antagonist: ThreadActor
  place: string
  thing: string
  court?: CourtGroup
  difficulty: Difficulty
}

export type BackgroundTag = Community | Court | Faith | Ruins | Wilderness

export type BackgroundActor = {
  alias: string
  culture?: 'foreign' | 'native'
  monstrous?: boolean
  age?: LifePhase[]
  relative?: boolean
  gender?: Gender
}

export interface Background {
  tag: BackgroundTag
  type: 'community' | 'court' | 'faith' | 'ruins' | 'wilderness'
  context: string
  hostiles?: {}
  enemies: BackgroundActor[]
  friends: BackgroundActor[]
  complications: string[]
  things: string[]
  places: string[]
  constraints?: {
    conflicts?: BackgroundTag[]
    rural?: boolean
    urban?: boolean
    regional?: boolean
    coastal?: boolean
    tribal?: true
  }
}
