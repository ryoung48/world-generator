import { IconDef } from '../../types'
import { battle__icons } from './battles'
import { ship__icons } from './ships'
import { element__icon } from './types'

export const element__icons: Record<element__icon, IconDef> = {
  ...battle__icons,
  ...ship__icons,
  city: {
    height: 1.5,
    path: 'terrain/city.png',
    opacity: 0.8
  },
  town: {
    height: 0.8,
    path: 'terrain/town.png',
    opacity: 0.8
  },
  village: {
    height: 0.5,
    path: 'terrain/village.png',
    opacity: 0.8
  }
}
