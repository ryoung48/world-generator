import { directions, Point } from '../../utilities/math/points'

export interface Cell extends Point {
  idx: number
  data: Array<[number, number]>
  n: number[]
}

export interface ExteriorCell extends Cell {
  score: number
  // coastal attributes
  coastal_edges?: [Point, Point][]
  is_coast?: boolean
  water_sources?: Set<number>
  ocean_current?: directions
  // mountains
  is_mountains?: boolean
  mountain?: number
  // location
  region: number
  province: number
  region_border?: boolean
  // features
  h: number
  landmark: number
  is_water?: boolean
  beach?: boolean
  ocean?: boolean
  shallow?: boolean
  // distances
  ocean_dist: number
  mountain_dist: number
  coastal?: boolean
  // roads & cities
  roads: { land: number[]; sea: number[] }
}
