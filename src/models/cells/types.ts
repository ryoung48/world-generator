import { Point } from '../utilities/math/points/types'

export interface Cell extends Point {
  idx: number
  score: number
  // coastal attributes
  coastalEdges?: { vertices: [Point, Point]; neighbor: number }[]
  isCoast?: boolean
  waterSources?: Set<number>
  // mountains
  isMountains?: boolean
  mountain?: number
  plateau?: boolean
  volcanic?: boolean
  // location
  province: number
  region: number
  location?: number
  // features
  h: number
  elevation?: number
  landmark: number
  isWater?: boolean
  wasLake?: boolean
  beach?: boolean
  ocean?: boolean
  oceanRegion?: number
  shallow?: boolean
  rain: {
    east: number
    west: number
    winter: number
    summer: number
    annual: number
    pattern?: number[]
  }
  heat: { min: number; max: number; mean: number }
  pressure?: number[]
  monsoon?: boolean
  topography?: 'coastal' | 'marsh' | 'flat' | 'hills' | 'plateau' | 'mountains'
  vegetation?: 'desert' | 'sparse' | 'grasslands' | 'woods' | 'forest' | 'jungle'
  climate?:
    | 'arctic'
    | 'subarctic'
    | 'boreal'
    | 'temperate'
    | 'subtropical'
    | 'tropical'
    | 'infernal'
    | 'chaotic'
  river?: number
  nRiver?: number
  // distances
  oceanDist: number
  mountainDist: number
  landDist: number
  // roads & cities
  roads: { land: number[]; sea: number[] }
}

export interface CellSpawnParams {
  idx: number
  point: [number, number]
}

export interface CellNeighborsParams {
  cell: Cell
  depth?: number
}
