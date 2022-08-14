import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { mines__icon } from './types'

const generic = location_icon__size

export const mines__icons: Record<mines__icon, LocationIcon> = {
  mines_1: {
    height: generic.height,
    path: 'locations/mines/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  mines_2: {
    height: generic.height,
    path: 'locations/mines/2.png',
    opacity: 1,
    font_scale: generic.font
  }
}
