/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { keep__icon } from './types'

const generic = locationIcon__size

export const keep__icons: Record<keep__icon, LocationIconDetails> = {
  keep_1: {
    height: generic.height * 1.5,
    path: 'locations/keeps/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  keep_2: {
    height: generic.height * 1.5,
    path: 'locations/keeps/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  keep_3: {
    height: generic.height * 1.5,
    path: 'locations/keeps/3.png',
    opacity: 1,
    fontScale: generic.font
  },
  keep_4: {
    height: generic.height * 1.5,
    path: 'locations/keeps/4.png',
    opacity: 1,
    fontScale: generic.font
  },
  keep_5: {
    height: generic.height,
    path: 'locations/keeps/5.png',
    opacity: 1,
    fontScale: generic.font
  }
}
