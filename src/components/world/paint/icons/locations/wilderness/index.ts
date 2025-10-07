/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { WildernessIcon } from './types'

const generic = locationIconSize

export const wildernessIcons: Record<WildernessIcon, LocationIconDef> = {
  wilderness_1: {
    height: generic.height,
    path: 'locations/wilderness/1.png',
    opacity: 1,
    fontScale: generic.font
  }
}
