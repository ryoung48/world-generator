import { weighted_distribution } from '../../../../../utilities/math'
import { Primordial } from '../../types'

export interface PrimordialGenus {
  appearance: (_species: Primordial) => Primordial['appearance']
  size: (_species: Primordial) => weighted_distribution<Primordial['size']>
  reproduction: (_species: Primordial) => Primordial['reproduction']
}
