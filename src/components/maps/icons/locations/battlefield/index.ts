/* eslint-disable camelcase */
import { locationIcon__size } from '../common'
import { LocationIconDetails } from '../types'
import { battlefield__icon } from './types'

const generic = locationIcon__size

export const battlefield__icons: Record<battlefield__icon, LocationIconDetails> = {
  battlefield_1: {
    height: generic.height,
    path: 'locations/battlefield/1.png',
    opacity: 1,
    fontScale: generic.font
  }
}
