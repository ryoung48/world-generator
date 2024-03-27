import { Trait } from '../../utilities/traits/types'
import { Culture } from '../cultures/types'

type ReligionTradition =
  | 'ancient ways'
  | 'ancestral tombs'
  | 'apocalyptic cycles'
  | 'apotropaic symbols'
  | 'aristocratic'
  | 'ascetic traditions'
  | 'caste system'
  | 'celestial omens'
  | 'charitable'
  | 'crusading'
  | 'blood sacrifices'
  | 'doctrinal schools'
  | 'entropic cult'
  | 'esoteric doctrine'
  | 'ethnic creed'
  | 'fertility rituals'
  | 'green pact'
  | 'heathen tax'
  | 'heavenly hymns'
  | 'holy grounds'
  | 'localized variation'
  | 'martyrdom'
  | 'material luxuriance'
  | 'missionary zeal'
  | 'mutilated clergy'
  | 'nature veneration'
  | 'otherworldly patrons'
  | 'pacifism'
  | 'penitential practices'
  | 'polarized genders'
  | 'polyamory'
  | 'purification rituals'
  | 'religious laws'
  | 'remnant faith'
  | 'sacred pilgrimage'
  | 'sky burials'
  | 'soul reincarnation'
  | 'spirit possession'
  | 'syncretic'
  | 'temple architects'
  | 'totemic worship'
  | 'underclass'
  | 'warrior monks'
  | 'venal clergy'

type ReligionTheme =
  | 'aesthetics'
  | 'ancestry'
  | 'authority'
  | 'commerce'
  | 'death'
  | 'dreams'
  | 'earth'
  | 'eldritch'
  | 'empathy'
  | 'fire'
  | 'harmony'
  | 'hatred'
  | 'industry'
  | 'intrigue'
  | 'knowledge'
  | 'life'
  | 'light'
  | 'luck'
  | 'pariah'
  | 'revelry'
  | 'ruin'
  | 'seasons'
  | 'shadows'
  | 'sky'
  | 'tyranny'
  | 'warfare'
  | 'water'
  | 'wilderness'

export interface Religion {
  idx: number
  name: string
  type:
    | 'monotheistic'
    | 'polytheistic'
    | 'ancestor worship'
    | 'animistic'
    | 'dualistic'
    | 'nontheistic'
    | 'atheistic'
  display: string
  cultures: number[]
  leadership: string
  clergy: string
  themes: { tag: ReligionTheme; text: string }[]
  traditions: { tag: ReligionTradition; text: string }[]
}

export interface ReligionSpawnParams {
  cultures: Culture[]
  tribal?: boolean
}

export type ReligionTraditions = Record<
  ReligionTradition,
  Trait<
    ReligionTradition,
    {
      ancestral?: boolean
      spirits?: boolean
      organized?: boolean
      tribal?: boolean
      major?: boolean
      coastal?: boolean
    }
  > & { text: string }
>

export type ReligionThemes = Record<
  ReligionTheme,
  Trait<ReligionTheme, { coastal?: boolean }> & { text: string }
>
