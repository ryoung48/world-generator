import { Point } from '../../../../models/utilities/math/points/types'

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

export interface Structure {
  path: string
  edges: [number, number][][]
  vertices: [number, number][]
  center: [number, number]
  area: number
}
