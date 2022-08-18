/* eslint-disable camelcase */
import { desert_icon } from './desert/types'
import { element__icon } from './elements/types'
import { grass_icon } from './grass/types'
import { mountain_icon } from './mountains/types'
import { tree__icons } from './trees/types'

export type TerrainIcon = mountain_icon | grass_icon | desert_icon | tree__icons | element__icon
