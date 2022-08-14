import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { farm__icon } from './types'

const generic = location_icon__size

export const farm__icons: Record<farm__icon, LocationIcon> = {
  farm_1: {
    height: generic.height,
    path: 'locations/farms/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  farm_2: {
    height: generic.height,
    path: 'locations/farms/2.png',
    opacity: 1,
    font_scale: generic.font
  },
  farm_3: {
    height: generic.height * 1.5,
    path: 'locations/farms/3.png',
    opacity: 1,
    font_scale: generic.font
  }
}
