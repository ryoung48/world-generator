/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { portal__icon } from './types'

const generic = locationIcon__size

export const portal__icons: Record<portal__icon, LocationIconDetails> = {
  portal_1: {
    height: generic.height * 1.5,
    path: 'locations/portals/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  portal_2: {
    height: generic.height,
    path: 'locations/portals/2.png',
    opacity: 1,
    fontScale: generic.font
  }
}
