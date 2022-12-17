import { Directions, Point } from '../../utilities/math/points'

export interface Cell extends Point {
  idx: number
  data: Array<[number, number]>
  n: number[]
}

export interface ExteriorCell extends Cell {
  score: number
  // coastal attributes
  coastalEdges?: [Point, Point][]
  isCoast?: boolean
  waterSources?: Set<number>
  oceanCurrent?: Directions
  // mountains
  isMountains?: boolean
  mountain?: number
  // location
  region: number
  province: number
  regionBorder?: boolean
  // features
  h: number
  landmark: number
  isWater?: boolean
  beach?: boolean
  ocean?: boolean
  shallow?: boolean
  // distances
  oceanDist: number
  mountainDist: number
  coastal?: boolean
  // roads & cities
  roads: { land: number[]; sea: number[] }
}
