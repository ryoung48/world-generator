import type { Point } from '../../../utilities/math/points/types'
import type { District } from '../blueprints/types'

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
    | 'tribal camp'
    | `small monastery`
    | `large monastery`
    | 'military outpost'
    | 'trading outpost'
    | 'colonial outpost'
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
  map?: { seed?: string; density: number; districts: Record<number, District> }
}

export interface Settlement {
  alias: 'city' | 'town' | 'village' | 'tribal camp' | 'monastery' | 'outpost'
  population: number
  tribal?: boolean
}
