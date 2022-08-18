/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { camp__icon } from './types'

const generic = locationIcon__size

export const camp__icons: Record<camp__icon, LocationIconDetails> = {
  camp_1: {
    height: generic.height,
    path: 'locations/camps/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  camp_2: {
    height: generic.height * 1.5,
    path: 'locations/camps/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  camp_3: {
    height: generic.height * 1.5,
    path: 'locations/camps/3.png',
    opacity: 1,
    fontScale: generic.font
  }
}
