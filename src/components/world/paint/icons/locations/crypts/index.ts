/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { CryptIcon } from './types'

const generic = locationIconSize

export const cryptIcons: Record<CryptIcon, LocationIconDef> = {
  crypt_1: {
    height: generic.height * 1.5,
    path: 'locations/crypts/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  crypt_2: {
    height: generic.height * 1.5,
    path: 'locations/crypts/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  crypt_3: {
    height: generic.height,
    path: 'locations/crypts/3.png',
    opacity: 1,
    fontScale: generic.font
  }
}
