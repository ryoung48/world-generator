import { Culture } from '../npcs/cultures/types'
import { Religion } from '../npcs/religions/types'
import { Actor } from '../npcs/types'
import { Quest } from '../quests/types'
import { Court } from '../regions/provinces/hooks/courts/types'
import { Ruin } from '../regions/provinces/hooks/ruins/types'
import { Province } from '../regions/provinces/types'
import { Region } from '../regions/types'
import { Dimensions } from '../utilities/dimensions'
import { GeoVoronoiDiagram } from '../utilities/math/voronoi/types'
import { Cell } from './cells/types'
import { Display } from './shapers/display/types'

export interface CoastalEdge {
  water: number
  land: number
  edge: [number, number][]
}

interface WorldDimensions extends Dimensions {
  res: number
  // voronoi cell resolution
  cells: number
  // actual width / height (miles)
  rw: number
  rh: number
  // noise resolution
  noise: number
  // cell dimensions
  cellArea: number
  cellLength: number
}

export type RouteTypes = 'land' | 'sea'

export interface World {
  id: string
  diagram?: GeoVoronoiDiagram
  cells: Cell[]
  // geography
  latitude: [number, number]
  longitude: [number, number]
  landmarks: Record<
    number,
    {
      name: string
      type: 'ocean' | 'lake' | 'continent' | 'island'
      monsoon?: boolean
      water: boolean
      size: number
    }
  >
  seaLevelCutoff: number
  mountains: number[]
  coasts: CoastalEdge[]
  routes: Record<
    RouteTypes,
    { path: number[]; length: number; src: number; dst: number; imperial?: boolean }[]
  >
  display: Display
  dim: WorldDimensions
  // entities
  regions: Region[]
  conflicts: {
    type: 'war' | 'rebellion'
    provinces: number[]
    regions: number[]
  }[]
  provinces: Province[]
  cultures: Culture[]
  religions: Religion[]
  courts: Court[]
  ruins: Ruin[]
  npcs: Actor[]
  uniqueNames: Record<string, boolean>
  quests: Quest[]
  // planet info
  radius: number
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
