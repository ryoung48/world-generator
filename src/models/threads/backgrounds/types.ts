import { Gender, LifePhase } from '../../npcs/types'
import { Community } from './communities/types'
import { Court } from './courts/types'
import { Faith } from './faith/types'
import { Ruins } from './ruins/types'
import { Wilderness } from './wilderness/types'

export type BackgroundActor = {
  alias: string
  culture?: 'foreign' | 'native'
  monstrous?: boolean
  age?: LifePhase[]
  relative?: boolean
  gender?: Gender
}

type Tag = Community | Court | Faith | Ruins | Wilderness

export interface BackgroundDetails {
  tag: Tag
  type: 'community' | 'court' | 'faith' | 'ruins' | 'wilderness'
  context: string
  hostiles?: {}
  enemies: BackgroundActor[]
  friends: BackgroundActor[]
  complications: string[]
  things: string[]
  places: string[]
  constraints?: {
    conflicts?: Tag[]
    rural?: boolean
    urban?: boolean
    regional?: boolean
    coastal?: boolean
    tribal?: true
  }
}

export type Background = {
  category: BackgroundDetails['type']
  context: {
    tag: BackgroundDetails['tag']
    text: string
    friend: BackgroundActor
    enemy: BackgroundActor
    complication: string
    place: string
    thing: string
  }[]
}
