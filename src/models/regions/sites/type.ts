import { Cell } from '../../cells/types'
import { Point } from '../../utilities/math/points/types'

export interface Site extends Point {
  idx: number
  name?: string
  coastal?: boolean
  cell: number
  tags?: {
    tag: string
    text: string
    enemy: string
    friend: string
    complication: string
    place: string
    thing: string
  }[]
}

export type SiteSpawnParams = {
  cell: Cell
  coastal?: boolean
  idx: number
}
