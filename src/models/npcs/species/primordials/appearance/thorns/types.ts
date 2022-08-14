import { all_colors } from '../../../../../utilities/colors'
import { primordial_density } from '../types'

export interface Thorns {
  type: 'thorns' | 'spines'
  sharpness: 'sharp' | 'tapered'
  color: all_colors
  density?: primordial_density
  length?: 'long' | 'short'
}
