/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { farm__icon } from './types'

const generic = locationIcon__size

export const farm__icons: Record<farm__icon, LocationIconDetails> = {
  farm_1: {
    height: generic.height,
    path: 'locations/farms/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  farm_2: {
    height: generic.height,
    path: 'locations/farms/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  farm_3: {
    height: generic.height * 1.5,
    path: 'locations/farms/3.png',
    opacity: 1,
    fontScale: generic.font
  }
}
