/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { CoastalIcon } from './types'

const generic = locationIconSize

export const coastalIcons: Record<CoastalIcon, LocationIconDef> = {
  shipwreck_1: {
    height: generic.height * 1.5,
    path: 'locations/coastal/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  lighthouse_1: {
    height: generic.height * 1.5,
    path: 'locations/coastal/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  lighthouse_2: {
    height: generic.height,
    path: 'locations/coastal/3.png',
    opacity: 1,
    fontScale: generic.font
  }
}
