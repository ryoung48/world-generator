import { Actor } from './actors/types'
import { Cell } from './cells/types'
import { Culture } from './heritage/types'
import { Province } from './regions/provinces/types'
import { Region } from './regions/types'
import { War } from './regions/wars/types'
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
  display: Display
  // geography
  landmarks: Record<
    number,
    {
      name?: string
      type: 'ocean' | 'lake' | 'sea' | 'continent' | 'island' | 'isle'
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
    { path: number[]; length: number; src: number; dst: number; imperial?: boolean }[]
  >
  // entities
  regions: Region[]
  provinces: Province[]
  cultures: Culture[]
  actors: Actor[]
  oceanRegions: {
    idx: number
    cell: number
    borders: number[]
    neighbors: number[]
    ocean: number
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
}

export type WorldSpawn = { seed: string; res: number }

export type WorldPlacementParams = {
  count: number
  spacing: number
  whitelist: Cell[]
  blacklist?: Cell[]
}

export type RemoveLakeParams = { lakes: Cell[]; lake: number; regional?: Record<number, Cell[]> }
