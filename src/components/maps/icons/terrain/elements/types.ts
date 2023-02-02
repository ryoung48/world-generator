/* eslint-disable camelcase */
import { battle_icon } from './battles/types'
import { penguin_icon } from './penguins/types'
import { ship_icon } from './ships/types'

export type element__icon =
  | battle_icon
  | ship_icon
  | penguin_icon
  | 'compass'
  | 'borderH'
  | 'borderV'
  | 'box'
