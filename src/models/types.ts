import { Cell } from './cells/types'
import { Culture } from './npcs/cultures/types'
import { Religion } from './npcs/religions/types'
import { Actor } from './npcs/types'
import { Province } from './regions/provinces/types'
import { Region } from './regions/types'
import type { Display } from './shapers/display/types'
import { GeoVoronoiDiagram, Vertex } from './utilities/math/voronoi/types'

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
      name: string
      type: 'ocean' | 'lake' | 'continent' | 'island'
      water: boolean
      size: number
    }
  >
  mountains: number[]
  coasts: CoastalEdge[]
  routes: Record<
    RouteTypes,
    { path: number[]; length: number; src: number; dst: number; imperial?: boolean }[]
  >
  // entities
  regions: Region[]
  provinces: Province[]
  cultures: Culture[]
  religions: Religion[]
  npcs: Actor[]
  oceanRegions: { idx: number; cell: number; borders: number[] }[]
  rivers: { idx: number; segments: Vertex[][] }[]
  uniqueNames: Record<string, boolean>
  wars: {
    idx: number
    tag: 'war'
    name: string
    losses: string
    belligerents: string
    reasons: { tag: string; text: string }[]
    provinces: number[]
    status: 'decisive' | 'stalemated' | 'struggling'
  }[]
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
