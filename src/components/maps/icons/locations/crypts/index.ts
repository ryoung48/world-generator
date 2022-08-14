import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { crypt__icon } from './types'

const generic = location_icon__size

export const crypt__icons: Record<crypt__icon, LocationIcon> = {
  crypt_1: {
    height: generic.height * 1.5,
    path: 'locations/crypts/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  crypt_2: {
    height: generic.height * 1.5,
    path: 'locations/crypts/2.png',
    opacity: 1,
    font_scale: generic.font
  },
  crypt_3: {
    height: generic.height,
    path: 'locations/crypts/3.png',
    opacity: 1,
    font_scale: generic.font
  }
}
