import { Thread } from '../../../threads/types'
import { Point } from '../../../utilities/math/points'

export interface Hub extends Point {
  type:
    | 'metropolis'
    | 'huge city'
    | 'large city'
    | 'small city'
    | 'large town'
    | 'small town'
    | 'large village'
    | 'small village'
    | 'tiny village'
  population: number
  coastal: boolean
  province: number
  cell: number
  traits?: {
    leadership: string
    history: string
    design: string
    defenses: string
    locals: number[]
    terrain: string
    commerce: string
  }
  thread?: Thread
}

export interface Settlement {
  alias: 'city' | 'town' | 'village' | 'ruin'
  population: number
}
