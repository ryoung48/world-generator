import { Delaunay, Voronoi } from 'd3'

import { Culture } from '../npcs/cultures/types'
import { Religion } from '../npcs/religions/types'
import { Loc } from '../regions/locations/types'
import { Province } from '../regions/provinces/types'
import { Region } from '../regions/types'
import { Dimensions } from '../utilities/dimensions'
import { ExteriorCell } from './cells/types'
import { ContinentTemplate } from './spawn/shapers/continents/templates'
import { Display } from './spawn/shapers/display/types'
import { RouteTypes } from './travel/types'

export const seaLevelCutoff = 0.06
export const mountainsCutoff = 0.5

export interface CoastalEdge {
  water: number
  land: number
  edge: [number, number][]
}

interface WorldDimensions extends Dimensions {
  // voronoi cell resolution
  cells: number
  // actual width / height (miles)
  rw: number
  rh: number
  // noise resolution
  res: number
  // cell dimensions
  cellArea: number
  cellLength: number
}

export interface World {
  id: string
  diagram?: Voronoi<Delaunay.Point>
  cells: ExteriorCell[]
  // geography
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
  mountains: string[]
  coasts: CoastalEdge[]
  routes: Record<
    RouteTypes,
    { path: number[]; length: number; src: number; dst: number; imperial?: boolean }[]
  >
  display: Display
  dim: WorldDimensions
  template: ContinentTemplate['isles']
  // entities
  regions: Region[]
  conflicts: { type: 'war' | 'rebellion'; provinces: number[]; regions: number[] }[]
  provinces: Province[]
  locations: Loc[]
  cultures: Culture[]
  religions: Religion[]
  uniqueNames: Record<string, boolean>
  // planet info
  date: number
  firstNewMoon: number // first new moon on record
  lunarCycle: number // synodic month (days)
  rotation: number // daily period (hours)
  tilt: number // axial tilt (degrees)
  seasons: {
    winter: number[]
    spring: number[]
    summer: number[]
    fall: number[]
  }
  geoBounds: {
    lat: number[]
    long: number[]
  }
}
