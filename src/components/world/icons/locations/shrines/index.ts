/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { ShrineIcon } from './types'

const generic = locationIconSize

export const shrineIcons: Record<ShrineIcon, LocationIconDef> = {
  shrine_1: {
    height: generic.height,
    path: 'locations/shrines/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_2: {
    height: generic.height,
    path: 'locations/shrines/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_3: {
    height: generic.height * 1.5,
    path: 'locations/shrines/3.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_4: {
    height: generic.height * 1.5,
    path: 'locations/shrines/4.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_5: {
    height: generic.height,
    path: 'locations/shrines/5.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_6: {
    height: generic.height,
    path: 'locations/shrines/6.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_7: {
    height: generic.height * 1.5,
    path: 'locations/shrines/7.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_8: {
    height: generic.height * 1.5,
    path: 'locations/shrines/8.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_9: {
    height: generic.height * 1.5,
    path: 'locations/shrines/9.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_10: {
    height: generic.height * 1.5,
    path: 'locations/shrines/10.png',
    opacity: 1,
    fontScale: generic.font
  },
  shrine_11: {
    height: generic.height * 1.5,
    path: 'locations/shrines/11.png',
    opacity: 1,
    fontScale: generic.font
  }
}
