import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { BattlefieldIcon } from './types'

const generic = locationIconSize

export const battlefieldIcons: Record<BattlefieldIcon, LocationIconDef> = {
  // eslint-disable-next-line camelcase
  battlefield_1: {
    height: generic.height,
    path: 'locations/battlefield/1.png',
    opacity: 1,
    fontScale: generic.font
  }
}
