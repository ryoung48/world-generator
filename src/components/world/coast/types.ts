import { DrawMapParams } from '../shapes/types'
import { MapStyle } from '../types'

export type DrawOceanParams = DrawMapParams & {
  style: MapStyle
}
