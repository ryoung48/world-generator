import { Province } from '../provinces/types'
import { Hue } from '../utilities/color'
import { Trait } from '../utilities/traits/types'
import { FindParams } from '../utilities/types'
import { Language } from './languages/types'
import { Species, SpeciesAppearance } from './species/types'

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
  | 'domination'
  | 'etiquette'
  | 'exploration'
  | 'forgiveness'
  | 'guile'
  | 'hierarchy'
  | 'history'
  | 'honor'
  | 'hospitality'
  | 'humility'
  | 'imperialism'
  | 'industry'
  | 'intellect'
  | 'intrigue'
  | 'justice'
  | 'legacy'
  | 'legalism'
  | 'independence'
  | 'loyalty'
  | 'lust'
  | 'might'
  | 'nature'
  | 'perfection'
  | 'philosophy'
  | 'purity'
  | 'purification'
  | 'revanchism'
  | 'sacrifice'
  | 'seafaring'
  | 'stewardship'
  | 'stoicism'
  | 'tenacity'
  | 'tradition'
  | 'vengeance'
  | 'wealth'
  | 'zeal'

export type CultureValues = Record<
  CulturalValue,
  Trait<CulturalValue, { coastal?: boolean }> & { text: string }
>

export interface Culture {
  idx: number
  name: string
  provinces: number[]
  neighbors: number[]
  species: Species
  appearance: SpeciesAppearance
  // cultural traits
  language: Language
  religion:
    | 'animistic'
    | 'syncretic'
    | 'monotheistic'
    | 'dualistic'
    | 'polytheistic'
    | 'nontheistic'
    | 'pluralistic'
    | 'atheistic'
  values: CulturalValue[]
  fashion: { color: Hue; scheme: string }
  display: { color: string; hue: number }
}

export type CultureSortParams = FindParams<Culture>

export type CultureSpawnParams = {
  provinces: Province[]
}

export type CultureColorParams = {
  culture: Culture
  opacity?: number
}
