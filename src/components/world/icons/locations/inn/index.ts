/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { InnIcon } from './types'

const generic = locationIconSize

export const innIcons: Record<InnIcon, LocationIconDef> = {
  inn_1: {
    height: generic.height,
    path: 'locations/inn/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  inn_2: {
    height: generic.height,
    path: 'locations/inn/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  inn_3: {
    height: generic.height * 1.5,
    path: 'locations/inn/3.png',
    opacity: 1,
    fontScale: generic.font
  }
}
