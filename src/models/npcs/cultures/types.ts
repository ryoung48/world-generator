import { AllColors, ColorHue, Hue } from '../../utilities/color'
import { WeightedDistribution } from '../../utilities/math/types'
import { Trait } from '../../utilities/traits/types'
import { FindParams } from '../../utilities/types'
import { Language } from '../languages/types'
import { Gender } from '../types'

type CulturalValue =
  | 'adaptation'
  | 'aesthetic'
  | 'ancestry'
  | 'arcana'
  | 'austerity'
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
  | 'stewardship'
  | 'stoicism'
  | 'subterfuge'
  | 'tenacity'
  | 'vengeance'
  | 'wealth'
  | 'zeal'

export type CultureValues = Record<
  CulturalValue,
  Trait<CulturalValue, { coastal?: boolean }> & { text: string }
>

export type CultureTraditionsGood = Record<
  string,
  Trait<
    string,
    {
      coastal?: boolean
      seasonal?: boolean
      wet?: boolean
      tribal?: boolean
      mountains?: boolean
      plains?: boolean
      desert?: boolean
    }
  > & { text: string }
>
export type CultureTraditionsBad = Record<
  string,
  Trait<string, { tribal?: boolean }> & { text: string }
>

export interface Culture {
  idx: number
  name: string
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
  // cultural traits
  language?: Language
  lineage: Gender
  religion?: number
  values: CulturalValue[]
  fashion: { color: Hue; scheme?: string }
  traditions?: { good: string; bad: string }
  // display colors (for maps)
  display: string
}

export type CultureSortParams = FindParams<Culture>
