import { Province } from '../../../models/provinces/types'
import { DrawMapParams } from '../shapes/types'
import { MapStyle } from '../types'

export type DrawBorderParams = DrawMapParams & {
  style: MapStyle
  nations: Province[]
  nationSet: Set<number>
  province: Province
}
