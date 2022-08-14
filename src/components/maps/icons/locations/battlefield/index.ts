import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { battlefield__icon } from './types'

const generic = location_icon__size

export const battlefield__icons: Record<battlefield__icon, LocationIcon> = {
  battlefield_1: {
    height: generic.height,
    path: 'locations/battlefield/1.png',
    opacity: 1,
    font_scale: generic.font
  }
}
