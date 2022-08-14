import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { cave__icon } from './types'

const generic = location_icon__size

export const cave__icons: Record<cave__icon, LocationIcon> = {
  cave_1: {
    height: generic.height,
    path: 'locations/caves/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  cave_2: {
    height: generic.height * 1.5,
    path: 'locations/caves/2.png',
    opacity: 1,
    font_scale: generic.font
  }
}
