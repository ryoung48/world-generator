import { Province } from '../../../models/regions/provinces/types'
import { Region } from '../../../models/regions/types'
import { DrawMapParams } from '../shapes/types'
import { MapStyle } from '../types'

export type DrawBorderParams = DrawMapParams & {
  style: MapStyle
  month: number
  nations: Region[]
  province: Province
}
