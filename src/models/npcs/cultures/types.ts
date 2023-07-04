import { AllColors, ColorHue, Hue } from '../../utilities/colors'
import { TaggedEntity } from '../../utilities/entities/types'
import { WeightedDistribution } from '../../utilities/math'
import { Directions } from '../../utilities/math/points'
import { Climate } from '../../world/climate/types'
import { Language } from '../languages/types'
import { Gender } from '../types'

type CulturalValue =
  | 'adaptation'
  | 'aesthetic'
  | 'ancestry'
  | 'arcana'
  | 'austerity'
  | 'beasts'
  | 'bravery'
  | 'charity'
  | 'cultivation'
  | 'decadence'
  | 'diplomacy'
  | 'etiquette'
  | 'exploration'
  | 'forethought'
  | 'forgiveness'
  | 'freedom'
  | 'function'
  | 'hierarchy'
  | 'history'
  | 'honor'
  | 'hospitality'
  | 'humility'
  | 'industry'
  | 'intellect'
  | 'imperialism'
  | 'justice'
  | 'logic'
  | 'loyalty'
  | 'lust'
  | 'might'
  | 'nature'
  | 'legalism'
  | 'philosophy'
  | 'purity'
  | 'revanchism'
  | 'sacrifice'
  | 'seafaring'
  | 'stewardship'
  | 'stoicism'
  | 'subterfuge'
  | 'tenacity'
  | 'vengeance'
  | 'wealth'
  | 'zeal'

export type CultureValueDetails = Record<
  CulturalValue,
  {
    text: string
    conflicts?: CulturalValue[]
    coastal?: boolean
  }
>

export interface Culture extends TaggedEntity {
  tag: 'culture'
  // neighboring cultures
  neighbors: number[]
  // origin region
  origin: number
  // cultural homelands (dialects)
  regions: number[]
  // species stats
  species:
    | 'human'
    | 'elf'
    | 'dwarf'
    | 'orc'
    | 'orlan'
    | 'bovine'
    | 'feline'
    | 'avian'
    | 'draconic'
    | 'goblin'
    | 'hobgoblin'
    | 'ogre'
    | 'gnoll'
    | 'vulpine'
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
  values: CulturalValue[]
  motifs?: string
  fashion: { color: Hue; scheme?: string }
  // display colors (for maps)
  display: string
}
