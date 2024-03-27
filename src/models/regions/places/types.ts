import { Point } from '../../utilities/math/points/types'

export interface Place extends Point {
  idx: number
  name?: string
  type: 'hub' | 'village' | 'camp' | 'ruin' | 'wilderness'
  subtype?: string
  coastal?: boolean
  cell?: number
  finalized?: boolean
  hooks?: {
    tag: string
    text: string
    friend: string
    enemy: string
    complication: string
    thing: string
    place: string
  }[]
}
