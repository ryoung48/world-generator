import { all_colors } from '../../../../../utilities/colors'
import { primordial_relative_sizes, primordial_textures } from '../types'

export interface Leaves {
  color: all_colors
  variegation?: all_colors
  texture?: primordial_textures
  size?: primordial_relative_sizes
  sparsity?: 'numerous' | 'sparse'
  veins?: all_colors
}
