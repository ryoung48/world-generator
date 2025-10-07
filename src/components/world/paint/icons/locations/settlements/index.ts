/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { SettlementIcon } from './types'

const generic = locationIconSize

export const settlementIcons: Record<SettlementIcon, LocationIconDef> = {
  city: {
    height: generic.height,
    path: 'locations/settlements/city.png',
    opacity: 1,
    fontScale: generic.font
  },
  town: {
    height: generic.height,
    path: 'locations/settlements/town.png',
    opacity: 1,
    fontScale: generic.font
  },
  village: {
    height: generic.height,
    path: 'locations/settlements/village.png',
    opacity: 1,
    fontScale: generic.font
  },
  hamlet: {
    height: generic.height,
    path: 'locations/settlements/hamlet.png',
    opacity: 1,
    fontScale: generic.font
  },
  fishing_village: {
    height: generic.height * 1.5,
    path: 'locations/settlements/fishing_village.png',
    opacity: 1,
    fontScale: generic.font
  }
}
