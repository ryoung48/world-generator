/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { PortalIcon } from './types'

const generic = locationIconSize

export const portalIcons: Record<PortalIcon, LocationIconDef> = {
  portal_1: {
    height: generic.height * 1.5,
    path: 'locations/portals/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  portal_2: {
    height: generic.height,
    path: 'locations/portals/2.png',
    opacity: 1,
    fontScale: generic.font
  }
}
