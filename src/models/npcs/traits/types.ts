import { Culture } from '../cultures/types'
import { NPCParams } from '../types'

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
  | 'homesick'
  | 'speech'
  | 'mannerism'
  | 'scars'
  | 'maimed'
  | 'afflicted'
  | 'disease marks'
  | 'verbiage'
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
  | 'nostalgic'
  | 'superstitious'
  | 'inquisitive'
  | 'obsessive'
  | 'war veteran'
  | 'connections'
  | 'criminal past'
  | 'dissident'
  | 'foreign agent'
  | 'secret sectarian'
  | 'natural leader'
  | 'magical gift'
  | 'well-off'
  | 'struggling'
  | 'negligent'
  | 'respected'
  | 'despised'
  | 'concealed sin'
  | 'troubled romance'

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
  hair: boolean
  horns: boolean
  poor: boolean
  comfortable: boolean
  rich: boolean
  official: boolean
  profession: string
  coastal: boolean
  piercings: boolean
  context: NPCParams['context']
  species: Culture['species']
}

export type QuirkDetails = {
  text?: string | ((_params: QuirkParams) => string)
  spawn: (_params: QuirkParams) => number
  conflicts?: Quirk[]
}
