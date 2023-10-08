import { Region } from '../../../models/regions/types'
import { DrawMapParams } from '../common/types'
import { MapSeason, MapStyle } from '../types'

export type DrawBorderParams = DrawMapParams & {
  style: MapStyle
  season: MapSeason
  nations: Region[]
}
