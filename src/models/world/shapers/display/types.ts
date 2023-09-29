import { TerrainIcon } from '../../../../components/maps/icons/terrain/types'
import { RouteTypes } from '../../types'

interface PathSegment {
  path: string
}

interface RoadSegment {
  d: string
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
  icebergs: { idx: number; path: string }[]
}
