/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { FarmIcon } from './types'

const generic = locationIconSize

export const farmIcons: Record<FarmIcon, LocationIconDef> = {
  farm_1: {
    height: generic.height,
    path: 'locations/farms/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  farm_2: {
    height: generic.height,
    path: 'locations/farms/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  farm_3: {
    height: generic.height * 1.5,
    path: 'locations/farms/3.png',
    opacity: 1,
    fontScale: generic.font
  }
}
