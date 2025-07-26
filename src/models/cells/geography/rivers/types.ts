import { Vertex } from '../../../utilities/math/voronoi/types'

export type River = {
  idx: number
  segments: Vertex[][]
  branch: number
  cells: number[]
  tributaries: number[]
  name?: string
  mountain: number
}
