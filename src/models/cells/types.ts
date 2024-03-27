import { Point } from '../utilities/math/points/types'
import { ClimateKey } from './climate/types'

export interface Cell extends Point {
  idx: number
  score: number
  // coastal attributes
  coastalEdges?: [Point, Point][]
  isCoast?: boolean
  waterSources?: Set<number>
  // mountains
  isMountains?: boolean
  mountain?: number
  // location
  region: number
  province: number
  place?: number
  regionBorder?: boolean
  // features
  h: number
  landmark: number
  isWater?: boolean
  beach?: boolean
  ocean?: boolean
  oceanRegion?: number
  oceanBorder?: boolean
  shallow?: boolean
  river?: number
  nRiver?: number
  rain: { east: number; west: number; winter: number; summer: number }
  heat?: { winter?: number; summer?: number }
  climate?: ClimateKey
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
