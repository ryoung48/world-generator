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
  | 'courteous'
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
  | 'trades gossip'
  | 'blackmailed'
  | 'blackmailer'
  | 'manipulative'
  | 'corruption'
  | 'childhood'
  | 'social outcast'
  | 'outfit'
  | 'accessory'
  | 'tattoos'
  | 'facial piercings'
  | 'aromatic scent'
  | 'strong accent'
  | 'traveler'
  | 'speech'
  | 'scars'
  | 'maimed'
  | 'afflicted'
  | 'horns'
  | 'height'
  | 'weight'
  | 'intellect'
  | 'wisdom'
  | 'charisma'
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'organization'
  | 'companion'
  | 'botanist'
  | 'artistic'
  | 'academic'
  | 'musician'
  | 'seafarer'
  | 'huntsman'
  | 'chef'
  | 'poet'
  | 'gambler'
  | 'funny'
  | 'storyteller'
  | 'war veteran'
  | 'connections'
  | 'foreign agent'
  | 'secret sectarian'
  | 'local leader'
  | 'magical gift'
  | 'well-off'
  | 'struggling'
  | 'negligent'
  | 'respected'
  | 'despised'
  | 'delusional self-image'
  | 'brash overconfidence'
  | 'fatal extravagance'
  | 'dark bargain'
  | 'concealed sin'
  | 'troubled romance'
  | 'lovesick fool'
  | 'load-bearing relationship'
  | 'misplaced trust'
  | 'troublesome relationship'
  | 'ticking bomb'
  | 'irrational hatred'

export interface QuirkParams {
  sympathetic: boolean
  callous: boolean
  generous: boolean
  austere: boolean
  honest: boolean
  enigmatic: boolean
  courteous: boolean
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
  context: ThreadContext
}

export type QuirkDetails = {
  text?: string | ((_params: QuirkParams) => string)
  spawn: (_params: QuirkParams) => number
  conflicts?: Quirk[]
}
