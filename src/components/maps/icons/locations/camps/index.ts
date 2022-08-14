import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { camp__icon } from './types'

const generic = location_icon__size

export const camp__icons: Record<camp__icon, LocationIcon> = {
  camp_1: {
    height: generic.height,
    path: 'locations/camps/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  camp_2: {
    height: generic.height * 1.5,
    path: 'locations/camps/2.png',
    opacity: 1,
    font_scale: generic.font
  },
  camp_3: {
    height: generic.height * 1.5,
    path: 'locations/camps/3.png',
    opacity: 1,
    font_scale: generic.font
  }
}
