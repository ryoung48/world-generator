import type { Profession } from '../../npcs/professions/types'
import { Gender, LifePhase } from '../../npcs/types'

export type Background =
  | 'ancient infrastructure'
  | 'awful curse'
  | 'bad neighbors'
  | 'blood feud'
  | 'brilliant innovation'
  | 'broken spirits'
  | 'buried ruins'
  | 'corrupt laws'
  | 'criminal bosses'
  | 'cultural center'
  | 'dark cult'
  | 'deadly plague'
  | 'decadent locals'
  | 'decaying enchantment'
  | 'despotic lord'
  | 'enemy within'
  | 'ethnic tensions'
  | 'evil sorcerer'
  | 'faded remnant'
  | 'fallen prosperity'
  | 'foreign enclave'
  | 'great famine'
  | 'guild oligarchy'
  | 'heavy fortification'
  | 'hidden ruler'
  | 'hostile terrain'
  | 'incompetent leaders'
  | 'inherited architecture'
  | 'invading army'
  | 'lawless chaos'
  | 'magical academy'
  | 'malignant slum'
  | 'martial tradition'
  | 'monstrous tribute'
  | 'natural disaster'
  | 'neglectful ruler'
  | 'new industry'
  | 'nomadic traders'
  | 'pilgrimage site'
  | 'population boom'
  | 'raider scourge'
  | 'rebel stronghold'
  | 'rich land'
  | 'runaway power'
  | 'savage custom'
  | 'scars of war'
  | 'secret treachery'
  | 'sinking city'
  | 'terrible beast'
  | 'theocratic authorities'
  | 'toxic economy'
  | 'trade hub'
  | 'unique product'
  | 'upstart faith'
  | 'warring council'
  | 'witch hunts'
  | 'xenophobic locals'

type BackgroundActor = {
  alias: string
  culture?: 'foreign' | 'native'
  monstrous?: boolean
  age?: LifePhase[]
  relative?: boolean
  gender?: Gender
}
export interface BackgroundDetails {
  context: string
  complications: string[]
  friends: BackgroundActor[]
  enemies: BackgroundActor[]
  professions?: Partial<Record<Profession, number>>
  things: string[]
  places: string[]
  constraints?: {
    conflicts?: Background[]
    urban?: boolean
    regional?: boolean
    coastal?: boolean
    tribal?: true
  }
}
