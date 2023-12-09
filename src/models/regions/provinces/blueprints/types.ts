import type { Delaunay, Voronoi } from 'd3'

import type { Culture } from '../../../npcs/cultures/types'
import type { ProfessionDetails } from '../../../npcs/professions/types'
import type { Dice } from '../../../utilities/math/dice'
import type { Point } from '../../../utilities/math/points/types'
import type { WeightedDistribution } from '../../../utilities/math/types'
import type { Vertex } from '../../../utilities/math/voronoi/types'
import type { Hub } from '../hubs/types'
import type { Building } from './buildings/types'

export interface Structure {
  path: string
  edges: Vertex[][]
  vertices: Vertex[]
  center: Vertex
  area: number
}

export interface Block extends Point {
  idx: number
  data: Vertex[]
  n: number[]
  district?: { idx: number; path: string }
  area: number
  chaos: number
  structures: Structure[]
  center: Vertex
  path: string
  land?: boolean
}

export interface District {
  block: number // block idx
  idx: number
  name: string
  type:
    | 'administration'
    | 'noble'
    | 'merchant'
    | 'craftsman'
    | 'market'
    | 'military'
    | 'docks'
    | 'gate'
    | 'slums'
    | 'rural'
  affix?: 'foreign' | 'hazardous'
  buildings: Building[]
  dock?: number
  gate?: number
}

export interface DistrictTemplate {
  type: District['type']
  wealth: ProfessionDetails['strata']
  buildings: WeightedDistribution<Building['type']>
  quality: WeightedDistribution<Building['quality']['grade']>
  spawn?: (_params: { blocks: Block[]; district: District; dice: Dice }) => void
}

export type FindExteriorDistrictsParams = { settlement: Hub; blocks: Block[] }

export type FindClosestBlockParams = { blocks: Block[]; point: Point }

export type DistrictSpawnParams = {
  block: number
  idx: number
  type: District['type']
  culture: Culture
}

export type PlaceRichDistrictParams = { spread: number; cityDistricts: Block[]; culture: Culture }
export type PlaceDocksParams = { spread: number; blocks: Block[]; settlement: Hub }
export type PlaceGatesParams = {
  spread: number
  cityDistricts: Block[]
  blocks: Block[]
  settlement: Hub
}

export type Blueprint = {
  diagram: Voronoi<Delaunay.Point>
  blocks: Block[]
  districts: Record<number, District>
  miles: number
}
