import { Loc } from '../../../regions/locations/types'
import { WeightedDistribution } from '../../../utilities/math'
import { lifePhaseBoundaries } from '../../actors/stats/age/life_phases'
import { Gender } from '../../actors/stats/appearance/gender'
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
    epicanthicFolds: number
    colors: string[]
  }
  hair?: {
    textures: string[]
    colors: string[]
    styles: Record<Gender, WeightedDistribution<string>>
    ageless?: boolean
  }
  facialHair?: {
    chance: number
    styles: string[]
  }
  hornDressing?: {
    chance: number
    side: string[]
    styles: string[]
  }
  tattoos: boolean
  earings?: boolean // defaults to true
  nosePiercing?: {
    chance: number
    styles: string[]
  }
}

export interface Humanoid {
  name: humanoid__species
  cultures: number[]
  // age
  ages: typeof lifePhaseBoundaries
  lifeSpan: number
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
