import { Background } from '../../threads/backgrounds/types'
import { ThreadContext } from '../../threads/types'

export type Personality =
  | 'sympathetic'
  | 'callous'
  | 'generous'
  | 'greedy'
  | 'gregarious'
  | 'enigmatic'
  | 'calm'
  | 'wrathful'
  | 'honest'
  | 'deceptive'
  | 'diligent'
  | 'lazy'
  | 'pious'
  | 'irreverent'
  | 'forgiving'
  | 'vengeful'
  | 'xenophilic'
  | 'xenophobic'
  | 'capricious'
  | 'stubborn'
  | 'reckless'
  | 'cautious'
  | 'respectful'
  | 'arrogant'
  | 'content'
  | 'ambitious'
  | 'austere'
  | 'decadent'
  | 'patient'
  | 'impatient'
  | 'trusting'
  | 'paranoid'

export type Quirk =
  | 'seeking redemption'
  | 'optimistic'
  | 'melancholic'
  | 'alcoholic'
  | 'drug addict'
  | 'gluttonous'
  | 'masochistic'
  | 'lustful'
  | 'sadistic'
  | 'gossiper'
  | 'manipulative'
  | 'corruption'
  | 'sexuality'
  | 'childhood'
  | 'social outcast'
  | 'outfit'
  | 'accessory'
  | 'tattoos'
  | 'facial piercings'
  | 'aromatic scent'
  | 'strong accent'
  | 'foreign visitor'
  | 'speech'
  | 'scars'
  | 'maimed'
  | 'afflicted (illness)'
  | 'horns'
  | 'height'
  | 'weight'
  | 'intellect'
  | 'wisdom'
  | 'charisma'
  | 'aesthetic'
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'organization'
  | 'companion'
  | 'drifter'
  | 'botanist'
  | 'artistic'
  | 'academic'
  | 'musician'
  | 'seafarer'
  | 'huntsman'
  | 'chef'
  | 'poet'
  | 'brawler'
  | 'gambler'
  | 'funny'
  | 'storyteller'
  | 'war veteran'
  | 'veiled backers'
  | 'secret sectarian'
  | 'local leader'
  | 'magical gift'
  | 'underworld connections'
  | 'talent'
  | 'brash overconfidence'
  | 'fatal extravagance'
  | 'concealed sin'
  | 'troubled romance'
  | 'lovesick fool'
  | 'load-bearing relationship'
  | 'misplaced trust'
  | 'troublesome relationship'
  | 'ticking bomb'
  | 'rags to riches'
  | 'riches to rags'
  | 'wraith'
  | 'victim'
  | 'supporter'
  | 'adversary'

interface QuirkParams {
  sympathetic: boolean
  callous: boolean
  generous: boolean
  austere: boolean
  honest: boolean
  enigmatic: boolean
  respectful: boolean
  cautious: boolean
  xenophobic: boolean
  foreigner: boolean
  youthful: boolean
  youngAdult: boolean
  sorcerer: boolean
  skin: boolean
  horns: boolean
  poor: boolean
  comfortable: boolean
  rich: boolean
  official: boolean
  profession: string
  coastal: boolean
  piercings: boolean
  backgrounds: Background[]
  context: ThreadContext
}

export type QuirkDetails = {
  text?: string | ((_params: QuirkParams) => string)
  spawn: (_params: QuirkParams) => number
  conflicts?: Quirk[]
}
