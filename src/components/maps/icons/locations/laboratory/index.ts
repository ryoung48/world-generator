import { location_icon__size } from '../common'
import { LocationIcon } from '../types'
import { laboratory__icon } from './types'

const generic = location_icon__size

export const laboratory__icons: Record<laboratory__icon, LocationIcon> = {
  lab_1: {
    height: generic.height,
    path: 'locations/laboratory/1.png',
    opacity: 1,
    font_scale: generic.font
  },
  lab_2: {
    height: generic.height,
    path: 'locations/laboratory/2.png',
    opacity: 1,
    font_scale: generic.font
  },
  lab_3: {
    height: generic.height,
    path: 'locations/laboratory/3.png',
    opacity: 1,
    font_scale: generic.font
  },
  observatory_1: {
    height: generic.height,
    path: 'locations/laboratory/4.png',
    opacity: 1,
    font_scale: generic.font
  },
  academy_1: {
    height: generic.height * 1.25,
    path: 'locations/laboratory/5.png',
    opacity: 1,
    font_scale: generic.font
  }
}
