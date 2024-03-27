/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { WatchtowerIcon } from './types'

const generic = locationIconSize

export const watchtowerIcons: Record<WatchtowerIcon, LocationIconDef> = {
  watchtower_1: {
    height: generic.height,
    path: 'locations/watchtowers/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  watchtower_2: {
    height: generic.height,
    path: 'locations/watchtowers/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  watchtower_3: {
    height: generic.height * 1.5,
    path: 'locations/watchtowers/3.png',
    opacity: 1,
    fontScale: generic.font
  },
  watchtower_4: {
    height: generic.height,
    path: 'locations/watchtowers/4.png',
    opacity: 1,
    fontScale: generic.font
  }
}
