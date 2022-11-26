import { LifePhase } from '../../npcs/actors/stats/age/life_phases'
import { Gender } from '../../npcs/actors/stats/appearance/gender'
import { Community } from './communities/types'
import { Court } from './courts/types'
import { Faith } from './faith/types'
import { Ruins } from './ruins/types'
import { Wilderness } from './wilderness/types'

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
