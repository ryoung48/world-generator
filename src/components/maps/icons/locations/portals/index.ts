import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { portal__icon } from './types'

const generic = location_icon__size

export const portal__icons: Record<portal__icon, LocationIcon> = {
  portal_1: {
    height: generic.height * 1.5,
    path: 'locations/portals/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  portal_2: {
    height: generic.height,
    path: 'locations/portals/2.png',
    opacity: 1,
    font_scale: generic.font
  }
}
