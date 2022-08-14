import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { settlement__icon } from './types'

const generic = location_icon__size

export const settlement__icons: Record<settlement__icon, LocationIcon> = {
  city: {
    height: generic.height,
    path: 'locations/settlements/city.png',
    opacity: 1,
    font_scale: generic.font
  },
  town: {
    height: generic.height,
    path: 'locations/settlements/town.png',
    opacity: 1,
    font_scale: generic.font
  },
  village: {
    height: generic.height,
    path: 'locations/settlements/village.png',
    opacity: 1,
    font_scale: generic.font
  },
  hamlet: {
    height: generic.height,
    path: 'locations/settlements/hamlet.png',
    opacity: 1,
    font_scale: generic.font
  },
  fishing_village: {
    height: generic.height * 1.5,
    path: 'locations/settlements/fishing_village.png',
    opacity: 1,
    font_scale: generic.font
  }
}
