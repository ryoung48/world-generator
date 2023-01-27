import { TaggedEntity } from '../../utilities/codex/entities'
import { AllColors, ColorHue, Hue } from '../../utilities/colors'
import { WeightedDistribution } from '../../utilities/math'
import { Directions } from '../../utilities/math/points'
import { Climate } from '../../world/climate/types'
import { Language } from '../languages/types'
import { Gender } from '../types'

export interface Culture extends TaggedEntity {
  tag: 'culture'
  // neighboring cultures
  neighbors: number[]
  // origin region
  origin: number
  // cultural homelands (dialects)
  regions: number[]
  // species stats
  species: 'human' | 'elf' | 'dwarf' | 'orc' | 'orlan' | 'bovine' | 'feline' | 'avian' | 'draconic'
  appearance?: {
    skin: {
      colors: (AllColors | 'fair' | 'pale')[]
      texture?: string
    }
    eyes: {
      colors: (ColorHue | 'hazel')[]
    }
    hair?: {
      textures: ('straight' | 'wavy' | 'curly' | 'kinky')[]
      colors: ('white' | 'blond' | 'red' | 'auburn' | 'brown' | 'black')[]
      styles?: Record<
        Gender,
        WeightedDistribution<'long' | 'short' | 'ponytail' | 'topknot' | 'braided' | 'bun'>
      >
    }
    facialHair?: {
      chance: number
      styles: `${'trimmed' | 'full' | 'thick' | 'braided'} beard`[]
    }
  }
  zone: Climate['zone']
  side: Directions
  // cultural traits
  civilized?: boolean
  language?: Language
  lineage: Gender
  religion?: number
  fashion: { color: Hue }
  // display colors (for maps)
  display: string
}
