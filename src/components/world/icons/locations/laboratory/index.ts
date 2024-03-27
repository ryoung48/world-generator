/* eslint-disable camelcase */
import { locationIconSize } from '../common'
import { LocationIconDef } from '../types'
import { LaboratoryIcon } from './types'

const generic = locationIconSize

export const laboratoryIcons: Record<LaboratoryIcon, LocationIconDef> = {
  lab_1: {
    height: generic.height,
    path: 'locations/laboratory/1.png',
    opacity: 1,
    fontScale: generic.font
  },
  lab_2: {
    height: generic.height,
    path: 'locations/laboratory/2.png',
    opacity: 1,
    fontScale: generic.font
  },
  lab_3: {
    height: generic.height,
    path: 'locations/laboratory/3.png',
    opacity: 1,
    fontScale: generic.font
  },
  observatory_1: {
    height: generic.height,
    path: 'locations/laboratory/4.png',
    opacity: 1,
    fontScale: generic.font
  },
  academy_1: {
    height: generic.height * 1.25,
    path: 'locations/laboratory/5.png',
    opacity: 1,
    fontScale: generic.font
  }
}
