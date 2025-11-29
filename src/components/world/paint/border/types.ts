import { Province } from '../../../../models/provinces/types'
import { MapStyle } from '../../types'
import { DrawMapParams } from '../shapes/types'

export type DrawBorderParams = DrawMapParams & {
  style: MapStyle
  nations: Province[]
  nationSet: Set<number>
  province: Province
  visible: Set<number>
}
