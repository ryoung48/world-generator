import { IconDef } from '../../types'
import { battle__icons } from './battles'
import { penguin__icons } from './penguins'
import { ship__icons } from './ships'
import { element__icon } from './types'

export const element__icons: Record<element__icon, IconDef> = {
  ...battle__icons,
  ...ship__icons,
  ...penguin__icons,
  compass: {
    height: 220,
    path: 'terrain/elements/compass.png',
    opacity: 0.7
  },
  borderH: {
    height: 150,
    path: 'terrain/elements/borderH.png',
    opacity: 1
  },
  borderV: {
    height: 150,
    path: 'terrain/elements/borderV.png',
    opacity: 1
  },
  box: {
    height: 100,
    path: 'terrain/elements/box.png',
    opacity: 1
  }
}
