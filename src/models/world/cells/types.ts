import { Directions, Point } from '../../utilities/math/points/types'
import { Climate } from '../climate/types'

export interface Cell extends Point {
  idx: number
  // data: Array<[number, number]>
  // n: number[]
  score: number
  // mapEdge: boolean
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
  summerRain?: number
  winterRain?: number
  e?: number
  w?: number
  heat?: { w?: number; s?: number }
  climate?: keyof Climate | 'none'
  // distances
  oceanDist: number
  mountainDist: number
  coastal?: boolean
  // roads & cities
  roads: { land: number[]; sea: number[] }
}

export interface CellSpawnParams {
  idx: number
  point: [number, number]
}
