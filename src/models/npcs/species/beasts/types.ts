import { Region } from '../../../regions/types'
import { TaggedEntity } from '../../../utilities/codex/entities'
import { all_colors } from '../../../utilities/colors'
import { genders } from '../../actors/stats/appearance/gender'
import { Species, Symbiotic } from '../types'
import type { beast_traits } from './traits/types'

interface BeastGenderVariation {
  // primary gender
  primary: genders
  // size variation % (minor: 0.9 | major: 0.8)
  size: number
  // color variations between genders
  secondary_shades?: string
  primary_shades?: string
  secondary_color?: string
  primary_color?: string
}

interface BeastAppearance {
  skin: {
    type?: 'skin' | 'fur' | 'feathers' | 'scales' | 'carapace'
    color: all_colors[]
    patterns?: { type: string; color: all_colors }
    accents?: { location: string; color: all_colors }
  }
  horns?: {
    long?: boolean
    thick?: boolean
    angle?: string
    ridged?: boolean
    pairs?: number
    count?: number
    gender?: number
  }
  antlers?: {
    large?: boolean
    thick?: boolean
    shape?: string
    gender?: number
  }
  tusks?: {
    large?: boolean
    thick?: boolean
    gender?: number
  }
  crest?: {
    large?: boolean
    shape?: string
    gender?: number
  }
  frill?: {
    large?: boolean
    location?: string
    gender?: number
    type?: string
  }
  mimicry?: {
    species: number
    type?: 'batesian' | 'mullerian' | 'mertensian' // mertensian should never occur
    role: 'mimic' | 'model'
  }
}

export interface Beast extends TaggedEntity, Species, Symbiotic {
  tag: 'beast'
  finalized: Record<number, boolean> // finalized for each region
  rarity: number
  // appearance
  family: 'avian' | 'mammal' | 'reptile' | 'amphibian' | 'arthropod' | 'mollusk' | 'fish'
  genus: { group: string; name: string }
  length: number
  bmi: number
  gender_variation: BeastGenderVariation
  appearance: BeastAppearance
  // food web
  role: 'predator' | 'prey'
  diet: {
    type:
      | 'herbivore'
      | 'carnivore'
      | 'omnivore'
      | 'scavenger'
      | 'hemophage'
      | 'detritivore'
      | 'filter feeder'
      | 'shellfish'
      | 'insects'
    text: string
    carrion?: boolean
  }
  predators: { idx: number; type: Species['tag'] }[] // species indices
  prey: number[] // species indices
  // behavior
  flying?: boolean
  semi_aquatic?: boolean
  social: 'solitary' | 'small' | 'medium' | 'large' | 'huge'
  temperament: 'aggressive' | 'defensive' | 'wary' | 'skittish'
  territory: 'nomadic' | 'migratory' | 'range' | 'nest'
  activity_period: 'diurnal' | 'nocturnal' | 'crepuscular' | 'cathemeral'
  traits: { tag: beast_traits; text: string }[]
  // life cycle
  life_span: number // ms
  gestation: number // ms
  maturation: number //  ms
  brood_size: number | number[]
}

export interface BeastSpawnParams {
  region: Region
  environment: Beast['environment']
  role?: Beast['role']
  size?: number
  activity_period?: Beast['activity_period']
  family?: Beast['family']
  genus?: Beast['genus']
  territory?: Beast['territory']
  mimicry?: boolean
  symbiosis?: boolean
}
