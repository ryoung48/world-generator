/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { cave__icon } from './types'

const generic = locationIcon__size

export const cave__icons: Record<cave__icon, LocationIconDetails> = {
  cave_1: {
    height: generic.height,
    path: 'locations/caves/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  cave_2: {
    height: generic.height * 1.5,
    path: 'locations/caves/2.png',
    opacity: 1,
    fontScale: generic.font
  }
}
