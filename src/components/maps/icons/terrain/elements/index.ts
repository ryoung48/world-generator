import { IconDef } from '../../types'
import { battle__icons } from './battles'
import { penguin__icons } from './penguins'
import { ship__icons } from './ships'
import { element__icon } from './types'

export const element__icons: Record<element__icon, IconDef> = {
  ...battle__icons,
  ...ship__icons,
  ...penguin__icons
}
