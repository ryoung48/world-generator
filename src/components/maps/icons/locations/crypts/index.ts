/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { crypt__icon } from './types'

const generic = locationIcon__size

export const crypt__icons: Record<crypt__icon, LocationIconDetails> = {
  crypt_1: {
    height: generic.height * 1.5,
    path: 'locations/crypts/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  crypt_2: {
    height: generic.height * 1.5,
    path: 'locations/crypts/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  crypt_3: {
    height: generic.height,
    path: 'locations/crypts/3.png',
    opacity: 1,
    fontScale: generic.font
  }
}
