import { MapStyle } from '../../types'
import { DrawMapParams } from '../shapes/types'

export type DrawOceanParams = DrawMapParams & {
  style: MapStyle
}
