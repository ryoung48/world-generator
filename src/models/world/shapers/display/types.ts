import { TerrainIcon } from '../../../../components/world/icons/terrain/types'
import { RouteTypes } from '../../types'

interface PathSegment {
  path: [number, number][]
}

interface RoadSegment extends PathSegment {
  provinces: number[]
  imperial?: boolean
}

interface CoastSegment extends PathSegment {
  idx: number
}

interface LakeSegment extends CoastSegment {
  border: boolean
}

export interface RegionSegment extends PathSegment {
  r: number
}

interface Icon {
  x: number
  y: number
  type: TerrainIcon
  cell: number
}

export interface Display {
  routes: Record<RouteTypes, RoadSegment[]>
  islands: Record<number, CoastSegment>
  lakes: Record<number, LakeSegment>
  regions: Record<string, RegionSegment[]>
  icons: Icon[]
  icebergs: number[]
}
