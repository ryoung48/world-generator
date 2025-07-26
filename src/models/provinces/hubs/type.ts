import { Point } from '../../utilities/math/points/types'

export interface Hub extends Point {
  site: 'hub' | 'military outpost' | 'wilderness' | 'ruins' | 'camp'
  population: number
  name?: string
  coastal?: boolean
  water?: number
  cell: number
  locals?: number[]
}
