/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { mines__icon } from './types'

const generic = locationIcon__size

export const mines__icons: Record<mines__icon, LocationIconDetails> = {
  mines_1: {
    height: generic.height,
    path: 'locations/mines/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  mines_2: {
    height: generic.height,
    path: 'locations/mines/2.png',
    opacity: 1,
    fontScale: generic.font
  }
}
