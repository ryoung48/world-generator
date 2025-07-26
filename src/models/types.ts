import { Actor } from './actors/types'
import { River } from './cells/geography/rivers/types'
import { Loc } from './cells/locations/types'
import { Cell } from './cells/types'
import { Culture } from './heritage/types'
import { War } from './nations/wars/types'
import { Province } from './provinces/types'
import type { Display } from './shapers/display/types'
import { GeoVoronoiDiagram } from './utilities/math/voronoi/types'

export interface CoastalEdge {
  water: number
  land: number
  edge: [number, number][]
}

export type RouteTypes = 'land' | 'sea'

export interface World {
  id: string
  resolution: number
  diagram?: GeoVoronoiDiagram
  cells: Cell[]
  cell: { length: number; area: number; count: number }
  scale: number
  display: Display
  // geography
  landmarks: Record<
    number,
    {
      name?: string
      type: 'ocean' | 'lake' | 'sea' | 'continent' | 'island' | 'isle' | 'salt flat'
      water: boolean
      size: number
      cell: number
      parent?: number
    }
  >
  mountains: { size: number; cell: number; name?: string }[]
  coasts: CoastalEdge[]
  routes: Record<
    RouteTypes,
    {
      path: number[]
      length: number
      src: number
      dst: number
      imperial?: boolean
    }[]
  >
  skyships?: [number, number][]
  // entities
  provinces: Province[]
  locations: Loc[]
  cultures: Culture[]
  actors: Actor[]
  rivers?: Record<number, River>
  oceanRegions: {
    idx: number
    cell: number
    borders: number[]
    neighbors: number[]
    cells: number[]
    ocean: number
    distanceFrom: { continent: number; land: number }
    coasts: number
    type?: 'ocean' | 'sea'
    feature?: 'coral reef' | 'kelp forest' | 'seasonal sea ice' | 'permanent sea ice'
  }[]
  uniqueNames: Record<string, boolean>
  wars: War[]
  // planet info
  radius: number // miles
  date: number
  firstNewMoon: number // first new moon on record
  lunarCycle: number // synodic month (days)
  rotation: number // daily period (hours)
  tilt: number // axial tilt (degrees)
  meridian: number
}

export type WorldSpawn = { seed: string; res: number }
