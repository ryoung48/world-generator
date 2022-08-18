/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { inn__icon } from './types'

const generic = locationIcon__size

export const inn__icons: Record<inn__icon, LocationIconDetails> = {
  inn_1: {
    height: generic.height,
    path: 'locations/inn/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  inn_2: {
    height: generic.height,
    path: 'locations/inn/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  inn_3: {
    height: generic.height * 1.5,
    path: 'locations/inn/3.png',
    opacity: 1,
    fontScale: generic.font
  }
}
