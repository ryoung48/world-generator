/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { CampIcon } from './types'

const generic = locationIconSize

export const campIcons: Record<CampIcon, LocationIconDef> = {
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
