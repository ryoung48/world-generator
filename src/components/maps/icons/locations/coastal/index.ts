import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { coastal__icon } from './types'

const generic = location_icon__size

export const coastal__icons: Record<coastal__icon, LocationIcon> = {
  shipwreck_1: {
    height: generic.height * 1.5,
    path: 'locations/coastal/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  lighthouse_1: {
    height: generic.height * 1.5,
    path: 'locations/coastal/2.png',
    opacity: 1,
    font_scale: generic.font
  },
  lighthouse_2: {
    height: generic.height,
    path: 'locations/coastal/3.png',
    opacity: 1,
    font_scale: generic.font
  }
}
