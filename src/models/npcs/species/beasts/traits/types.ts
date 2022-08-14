import { Region } from '../../../../regions/types'
import { Beast } from '../types'
import { beast__appearance_trait_tags } from './appearance/tags'
import { beast__behavior_trait_tags } from './behavior/tags'
import { beast__combat_trait_tags } from './combat/tags'
import { beast__habitat_trait_tags } from './habitat/tags'
import { beast__reproduction_trait_tags } from './reproduction/tags'
import { beast__use_trait_tags } from './uses/tags'

export type beast_traits =
  | beast__appearance_trait_tags
  | beast__reproduction_trait_tags
  | beast__habitat_trait_tags
  | beast__use_trait_tags
  | beast__behavior_trait_tags
  | beast__combat_trait_tags

export interface BeastTrait {
  // tag used to index trait_templates__lookup
  tag: beast_traits
  // applies any changes needed and returns text to be displayed
  apply: string | ((_params: { species: Beast; region: Region }) => string)
  // used to determine where the text is displayed
  type:
    | 'hidden'
    | 'appearance'
    | 'reproduction'
    | 'territory'
    | 'habitat'
    | 'combat'
    | 'behavior'
    | 'use'
  // weight used in random selection process
  weight?: number | ((_params: { species: Beast; region: Region }) => number)
}

export interface BeastTraitFinalize {
  species: Beast
  region: Region
}
