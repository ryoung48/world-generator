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
  location?: number
  regionBorder?: boolean
  // features
  h: number
  landmark: number
  isWater?: boolean
  wasLake?: boolean
  beach?: boolean
  ocean?: boolean
  oceanRegion?: number
  shallow?: boolean
  rain: { east: number; west: number; winter: number; summer: number }
  heat?: { winter?: number; summer?: number }
  climate?: ClimateKey
  topography?:
    | 'rocky beach'
    | 'sandy beach'
    | 'salt flats'
    | 'marsh'
    | 'flatlands'
    | 'rolling hills'
    | 'rugged hills'
    | 'mountains'
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
