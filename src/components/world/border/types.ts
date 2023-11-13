import { Province } from '../../../models/regions/provinces/types'
import { Region } from '../../../models/regions/types'
import { DrawMapParams } from '../common/types'
import { MapClimate, MapSeason, MapStyle } from '../types'

export type DrawBorderParams = DrawMapParams & {
  style: MapStyle
  season: MapSeason
  climate: MapClimate
  nations: Region[]
  province: Province
}
