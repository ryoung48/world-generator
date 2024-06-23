import { Point } from '../../utilities/math/points/types'

export interface Place extends Point {
  name?: string
  coastal?: boolean
  cell: number
  finalized?: boolean
  population: number
  locals?: number[]
}
