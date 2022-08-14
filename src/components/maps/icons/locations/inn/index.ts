import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { inn__icon } from './types'

const generic = location_icon__size

export const inn__icons: Record<inn__icon, LocationIcon> = {
  inn_1: {
    height: generic.height,
    path: 'locations/inn/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  inn_2: {
    height: generic.height,
    path: 'locations/inn/2.png',
    opacity: 1,
    font_scale: generic.font
  },
  inn_3: {
    height: generic.height * 1.5,
    path: 'locations/inn/3.png',
    opacity: 1,
    font_scale: generic.font
  }
}
