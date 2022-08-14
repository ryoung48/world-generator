import { Region } from '../../../../regions/types'
import { Primordial, primordial__trait_tags } from '../types'

export interface PrimordialTraitParams {
  species: Primordial
  region: Region
}
export interface PrimordialTrait {
  // tag used to index trait_templates__lookup
  tag: primordial__trait_tags
  // used to determine where the text is displayed
  type: 'hidden' | 'appearance' | 'flower' | 'use' | 'behavior' | 'habitat' | 'flower coloration'
  // applies any changes needed and returns text to be displayed
  apply: string | ((_params: PrimordialTraitParams) => string)
  // determines if there are conflicts
  weight: number | ((_params: PrimordialTraitParams) => number)
}
