import { AllColors, ColorHue, Hue } from '../../utilities/color'
import { TaggedEntity } from '../../utilities/entities/types'
import { Directions } from '../../utilities/math/points/types'
import { WeightedDistribution } from '../../utilities/math/types'
import { Trait } from '../../utilities/traits/types'
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

export type CultureValues = Record<CulturalValue, Trait<CulturalValue, { coastal?: boolean }>>

export type CulturePerformances = Record<
  string,
  Trait<string, { seasonal?: boolean; wet?: boolean }>
>
export type CultureVisual = Record<
  string,
  Trait<string, { tribal?: boolean; wet?: boolean; coastal?: boolean }>
>

export type CultureDishes = Record<string, Trait<string, { coastal?: boolean; wet?: boolean }>>
export type CultureFlavors = Record<string, Trait<string, { coastal?: boolean }>>

export type CultureTraditionsGood = Record<
  string,
  Trait<string, { coastal?: boolean; seasonal?: boolean; wet?: boolean; tribal?: boolean }>
>
export type CultureTraditionsBad = Record<string, Trait<string, { tribal?: boolean }>>

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
  zone: Climate[keyof Climate]['zone']
  side: Directions
  // cultural traits
  civilized?: boolean
  language?: Language
  lineage: Gender
  religion?: number
  values: CulturalValue[]
  motifs?: string
  fashion: { color: Hue; scheme?: string }
  cuisine?: { dish: string; flavor: string }
  art?: { performance: string; visual: string }
  traditions?: { good: string; bad: string }
  // display colors (for maps)
  display: string
}
