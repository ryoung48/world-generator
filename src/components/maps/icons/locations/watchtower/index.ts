import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { watchtower__icon } from './types'

const generic = location_icon__size

export const watchtower__icons: Record<watchtower__icon, LocationIcon> = {
  watchtower_1: {
    height: generic.height,
    path: 'locations/watchtowers/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  watchtower_2: {
    height: generic.height,
    path: 'locations/watchtowers/2.png',
    opacity: 1,
    font_scale: generic.font
  },
  watchtower_3: {
    height: generic.height * 1.5,
    path: 'locations/watchtowers/3.png',
    opacity: 1,
    font_scale: generic.font
  },
  watchtower_4: {
    height: generic.height,
    path: 'locations/watchtowers/4.png',
    opacity: 1,
    font_scale: generic.font
  }
}
