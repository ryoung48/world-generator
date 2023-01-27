import { Point } from '../../utilities/math/points'

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
  cell: number
}

export interface Settlement {
  alias: 'city' | 'town' | 'village' | 'ruin'
  population: number
}
