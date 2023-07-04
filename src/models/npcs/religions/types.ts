import { TaggedEntity } from '../../utilities/entities/types'
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
  | 'dire sacrifices'
  | 'divine bloodlines'
  | 'doctrinal schools'
  | 'dualistic'
  | 'ecstatic trance'
  | 'entropic cult'
  | 'esoteric doctrine'
  | 'ethnic creed'
  | 'fertility rituals'
  | 'funerary rites'
  | 'geomancy'
  | 'green pact'
  | 'heavenly hymns'
  | 'holy grounds'
  | 'initiation rites'
  | 'lay clergy'
  | 'localized variation'
  | 'marriage ceremonies'
  | 'martyrdom'
  | 'material luxuriance'
  | 'missionary zeal'
  | 'monastic clergy'
  | 'mutilated clergy'
  | 'nature veneration'
  | 'penitential practices'
  | 'polarized genders'
  | 'polyamory'
  | 'purification rituals'
  | 'religious laws'
  | 'remnant faith'
  | 'ritual scarification'
  | 'sacred pilgrimage'
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

export interface Religion extends TaggedEntity {
  tag: 'religion'
  type: 'philosophy' | 'monotheistic' | 'polytheistic' | 'ancestor worship' | 'spirit worship'
  display: string
  cultures: number[]
  leadership: 'hierocratic' | 'multicephalous' | 'autonomous'
  clergy: string
  themes: { tag: ReligionTheme; text: string }[]
  traditions: { tag: ReligionTradition; text: string }[]
}

export const religion__leadership = {
  hierocratic: 'a single pontiff presides over a highly organized clerical hierarchy',
  multicephalous: 'multiple pontiffs control different realms of the faith',
  autonomous: 'there is no central authority, and each priest is independent of the others'
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
  >
>

export type ReligionThemes = Record<ReligionTheme, Trait<ReligionTheme, { coastal?: boolean }>>
