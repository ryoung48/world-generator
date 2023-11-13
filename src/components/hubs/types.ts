import { MutableRefObject } from 'react'

import { Province } from '../../models/regions/provinces/types'

export type HubPaintParams = {
  canvas: MutableRefObject<HTMLCanvasElement>
  province: Province
  transform: { dx: number; dy: number; scale: number }
}
