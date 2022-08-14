import { Region } from '../../../regions/types'
import { TaggedEntity } from '../../../utilities/codex/entities'
import { all_colors } from '../../../utilities/colors'
import { Beast } from '../beasts/types'
import { Species, Symbiotic } from '../types'
import { Flowers } from './appearance/flowers/types'
import { Leaves } from './appearance/leaves/types'
import { Sap } from './appearance/sap/types'
import { Thorns } from './appearance/thorns/types'
import { primordial_textures } from './appearance/types'
import { primordial__aesthetic_trait_tags } from './traits/aesthetic/tags'
import { primordial__behavior_trait_tags } from './traits/behavior/tags'
import { primordial__habitat_trait_tags } from './traits/habitat/tags'
import { primordial__use_trait_tags } from './traits/uses/tags'

export type primordial__trait_tags =
  | primordial__aesthetic_trait_tags
  | primordial__use_trait_tags
  | primordial__habitat_trait_tags
  | primordial__behavior_trait_tags

export interface Primordial extends TaggedEntity, Species, Symbiotic {
  tag: 'primordial'
  finalized: Record<number, boolean>
  length: number
  family: 'fungi' | 'plant'
  genus:
    | 'mushroom'
    | 'lichen'
    | 'mold'
    | 'tree'
    | 'shrub'
    | 'vine'
    | 'herbaceous'
    | 'grass'
    | 'fern'
    | 'moss'
    | 'algae'
    | 'succulent'
  appearance: {
    woody?: boolean
    roots?: boolean
    bioluminescence?: all_colors
    color: all_colors
    texture?: primordial_textures
    foliage?: 'evergreen' | 'deciduous'
    leaves?: Leaves
    flowers?: Flowers
    sap?: Sap
    thorns?: Thorns
  }
  rarity: number
  reproduction: {
    type: 'seeds' | 'budding' | 'fragmentation'
    seeds?: 'spores' | 'nuts' | 'fruit' | 'berries' | 'grain' | 'seeds'
    dispersal?: 'animal' | 'wind' | 'water' | 'gravity'
  }
  traits: { text: string; tag: primordial__trait_tags }[]
  attractors?: {
    species: number[]
    type: 'attract' | 'repel'
    family: Beast['family']
    role: Beast['role']
  }
  mimicry?: {
    species: number
    role: 'mimic' | 'model'
  }
  prey?: number[]
}

export interface PrimordialSpawnParams {
  environment: Primordial['environment']
  region: Region
  family?: Primordial['family']
  genus?: Primordial['genus']
  size?: number
  rarity?: number
  symbiosis?: boolean
  mimicry?: boolean
}
