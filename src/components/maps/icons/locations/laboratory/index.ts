/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { laboratory__icon } from './types'

const generic = locationIcon__size

export const laboratory__icons: Record<laboratory__icon, LocationIconDetails> = {
  lab_1: {
    height: generic.height,
    path: 'locations/laboratory/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  lab_2: {
    height: generic.height,
    path: 'locations/laboratory/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  lab_3: {
    height: generic.height,
    path: 'locations/laboratory/3.png',
    opacity: 1,
    fontScale: generic.font
  },
  observatory_1: {
    height: generic.height,
    path: 'locations/laboratory/4.png',
    opacity: 1,
    fontScale: generic.font
  },
  academy_1: {
    height: generic.height * 1.25,
    path: 'locations/laboratory/5.png',
    opacity: 1,
    fontScale: generic.font
  }
}
