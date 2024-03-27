/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { KeepIcon } from './types'

const generic = locationIconSize

export const keepIcons: Record<KeepIcon, LocationIconDef> = {
  keep_1: {
    height: generic.height * 1.5,
    path: 'locations/keeps/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  keep_2: {
    height: generic.height * 1.5,
    path: 'locations/keeps/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  keep_3: {
    height: generic.height * 1.5,
    path: 'locations/keeps/3.png',
    opacity: 1,
    fontScale: generic.font
  },
  keep_4: {
    height: generic.height * 1.5,
    path: 'locations/keeps/4.png',
    opacity: 1,
    fontScale: generic.font
  },
  keep_5: {
    height: generic.height,
    path: 'locations/keeps/5.png',
    opacity: 1,
    fontScale: generic.font
  }
}
