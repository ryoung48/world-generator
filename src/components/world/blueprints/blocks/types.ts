import { Point } from '../../../../models/utilities/math/points/types'

export interface Structure {
  vertices: [number, number][]
  center: [number, number]
  area: number
  path: string
  edges: [number, number][][]
  isDistrictEdge?: boolean
}

export interface Block extends Point {
  idx: number
  data: Array<[number, number]>
  n: number[]
  district?: { idx: number; path: string }
  area: number
  chaos: number
  structures: Structure[]
  center: [number, number]
  path: string
  type: 'outskirts' | 'district' | 'ocean' | 'river'
  land?: boolean
}
