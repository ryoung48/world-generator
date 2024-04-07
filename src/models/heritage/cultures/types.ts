import { Region } from '../../regions/types'
import { Hue } from '../../utilities/color'
import { Trait } from '../../utilities/traits/types'
import { FindParams } from '../../utilities/types'
import { Language } from '../languages/types'
import { SpeciesAppearance } from '../species/types'
import { Heritage } from '../types'

type CulturalValue =
  | 'adaptation'
  | 'aesthetic'
  | 'ambition'
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

export type CultureTraditions = Record<
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
      suzerain?: boolean
      warriors?: boolean
    }
  > & { text: string }
>

export interface Culture {
  idx: number
  heritage: number
  region: number
  appearance: SpeciesAppearance
  // cultural traits
  language: Language
  values: CulturalValue[]
  fashion: { color: Hue; scheme: string }
  traditions: string[]
}

export type CultureSortParams = FindParams<Culture>

export type CultureSpawnParams = {
  region: Region
  heritage: Heritage
}
