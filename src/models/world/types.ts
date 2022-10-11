import { Delaunay, Voronoi } from 'd3'
import PriorityQueue from 'js-priority-queue'

import { Rebellion } from '../history/rebellion/types'
import { LogRecord, WorldEvent } from '../history/types'
import { War } from '../history/war/types'
import { ActorEvent } from '../npcs/actors/history/events/types'
import { Actor } from '../npcs/actors/types'
import { Culture } from '../npcs/species/cultures/types'
import { Religion } from '../npcs/species/religions/types'
import { Humanoid, humanoid__species } from '../npcs/species/taxonomy/types'
import { Loc } from '../regions/locations/types'
import { Province } from '../regions/provinces/types'
import { Region } from '../regions/types'
import { Thread } from '../threads/types'
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

interface EventCounts {
  wars: number
  rebellions: number
  regions: number
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
  provinces: Province[]
  locations: Loc[]
  cultures: Culture[]
  humanoids: Record<humanoid__species, Humanoid>
  actors: Actor[]
  actorEvents: ActorEvent[]
  religions: Religion[]
  threads: Thread[]
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
  // history
  past: LogRecord[]
  future: PriorityQueue<WorldEvent>
  wars: War[]
  rebellions: Rebellion[]
  historyRecording: boolean // used to halt detailed npc generation
  statistics: { current: EventCounts; past: (EventCounts & { time: number })[] }
  dynasties: string[]
  actorPlans: {
    birth: number
    death: number
    region: number
    culture: number
    gender: Actor['gender']
    dynasty?: number
    actor?: number
    parent?: number
    heir?: number
    events: number[]
  }[]
}
