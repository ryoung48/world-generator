/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { CaveIcon } from './types'

const generic = locationIconSize

export const caveIcons: Record<CaveIcon, LocationIconDef> = {
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
