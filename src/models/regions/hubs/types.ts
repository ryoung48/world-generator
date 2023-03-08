import { Point } from '../../utilities/math/points'
import { HubTrait } from './traits/types'

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
  description?: {
    Introduction: string
    History: string
    Economy: string
    Government: string
    Defenses: string
  }
  coastal: boolean
  province: number
  cell: number
  _traits?: { key: HubTrait; text: string }[]
}

export interface Settlement {
  alias: 'city' | 'town' | 'village' | 'ruin'
  population: number
}
