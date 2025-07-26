import { Province } from '../../provinces/types'
import { RouteTypes } from '../../types'

interface PathParams {
  start: number
  end: number
}
export interface ShortestPathParams extends PathParams {
  limit?: number
  type: RouteTypes
  roads?: number
}
export interface PathElement {
  idx: number
  p: number
  d: number
}
export interface RestorePathParams extends PathParams {
  visited: Record<string, number>
}

export type AddTradeRouteParams = {
  src: Province
  dst: Province
  limit?: number
  type: RouteTypes
}

export type AddRouteParams = AddTradeRouteParams & {
  imperial?: boolean
}
