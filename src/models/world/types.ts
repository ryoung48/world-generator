import PriorityQueue from 'js-priority-queue'

import { WorldEvent } from '../history/events/types'
import { Culture } from '../npcs/cultures/types'
import { Religion } from '../npcs/religions/types'
import { Actor } from '../npcs/types'
import { Quest } from '../quests/types'
import { Court } from '../regions/provinces/hooks/courts/types'
import { Ruin } from '../regions/provinces/hooks/ruins/types'
import { Wilderness } from '../regions/provinces/hooks/wilderness/types'
import { Province } from '../regions/provinces/types'
import { Region } from '../regions/types'
import { GeoVoronoiDiagram } from '../utilities/math/voronoi/types'
import { Cell } from './cells/types'
import type { Display } from './shapers/display/types'

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
  nations: { idx: number; ruler: number[]; subjects: number[][]; conflict: number[][] }[]
  regions: Region[]
  provinces: Province[]
  cultures: Culture[]
  religions: Religion[]
  courts: Court[]
  ruins: Ruin[]
  wilderness: Wilderness[]
  npcs: Actor[]
  uniqueNames: Record<string, boolean>
  quests: Quest[]
  future: PriorityQueue<WorldEvent>
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
