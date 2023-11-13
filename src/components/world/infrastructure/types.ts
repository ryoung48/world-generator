import { DrawMapParams } from '../common/types'
import { MapStyle } from '../types'

export type DrawInfraParams = DrawMapParams & { nationSet: Set<number>; style: MapStyle }
