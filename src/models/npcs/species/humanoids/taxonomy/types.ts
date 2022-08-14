import { Loc } from '../../../../regions/locations/types'
import { weighted_distribution } from '../../../../utilities/math'
import { life_phase_boundaries } from '../../../actors/stats/age/life_phases'
import { genders } from '../../../actors/stats/appearance/gender'
import { beastfolk__species } from './beastfolk/types'
import { demihuman__species } from './demihumans/types'

export type humanoid__species = beastfolk__species | demihuman__species | 'human'

export interface HumanoidAppearance {
  skin: {
    type: string
    colors: string[]
    texture?: string
  }
  eyes: {
    epicanthic_folds: number
    colors: string[]
  }
  hair?: {
    textures: string[]
    colors: string[]
    styles: Record<genders, weighted_distribution<string>>
    ageless?: boolean
  }
  facial_hair?: {
    chance: number
    styles: string[]
  }
  horn_dressing?: {
    chance: number
    side: string[]
    styles: string[]
  }
  tattoos: boolean
  earings?: boolean // defaults to true
  nose_piercing?: {
    chance: number
    styles: string[]
  }
}

export interface Humanoid {
  name: humanoid__species
  cultures: number[]
  // age
  ages: typeof life_phase_boundaries
  life_span: number
  // heights
  heights: {
    male: number
    female: number
    std: number
  }
  // weights
  bmi: {
    mean: number
    boundary: number
    std: number
  }
  size: number
  appearance: (_origin: Loc) => HumanoidAppearance
}
