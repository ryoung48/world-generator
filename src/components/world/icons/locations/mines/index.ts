/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { MinesIcon } from './types'

const generic = locationIconSize

export const minesIcons: Record<MinesIcon, LocationIconDef> = {
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
