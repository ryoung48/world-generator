import type { Actor, ActorSpawnParams } from '../types'

export type Personality =
  | 'compassionate'
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
  | 'lawful'
  | 'dissident'
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
  | 'absconded heir'
  | 'absent-minded'
  | 'accessory'
  | 'afflicted'
  | 'alcoholic'
  | 'alluring'
  | 'anxious'
  | 'aromatic scent'
  | 'artistic'
  | 'bastard origins'
  | 'betrothed'
  | 'bitter grudge'
  | 'black sheep'
  | 'blackmailed'
  | 'blackmailer'
  | 'blighted'
  | 'blood feud'
  | 'blunt'
  | 'brawler'
  | 'brilliant'
  | 'broken heart'
  | 'burnt out'
  | 'charismatic'
  | 'charming sycophant'
  | 'chatty gossip'
  | 'chef'
  | 'childhood'
  | 'chronic complainer'
  | 'claustrophobic'
  | 'clumsy'
  | 'companion'
  | 'concealed sin'
  | 'corruption'
  | 'cosmopolitan'
  | 'court fashion'
  | 'criminal past'
  | 'cultivation'
  | 'cursed bloodline'
  | 'delusional self-image'
  | 'devoted mentor'
  | 'dexterous'
  | 'dietary restrictions'
  | 'dirt poor'
  | 'disdains charity'
  | 'disease marks'
  | 'disfigured'
  | 'distrustful of magic'
  | 'drug addict'
  | 'duelist'
  | 'dull'
  | 'early riser'
  | 'easily distracted'
  | 'eldritch mark'
  | 'excess heirs'
  | 'exiled'
  | 'exotic attire'
  | 'exotic collector'
  | 'facial piercings'
  | 'family alienation'
  | 'family chains'
  | 'family recipes'
  | 'fatigued'
  | 'fear of heights'
  | 'forbidden romance'
  | 'foreign agent'
  | 'forsaken by gods'
  | 'frail'
  | 'frugal'
  | 'fugitive'
  | 'gambler'
  | 'gentle giant'
  | 'gluttonous'
  | 'gullible'
  | 'haughty demeanor'
  | 'haunted by doubts'
  | 'height'
  | 'heir apparent'
  | 'homesick'
  | 'horns'
  | 'hospitable'
  | 'humble origins'
  | 'humorous'
  | 'huntsman'
  | 'iconoclast'
  | 'immaculate attire'
  | 'inheritance dispute'
  | 'inherited debt'
  | 'inquisitive'
  | 'insightful'
  | 'intimidating'
  | 'jaded'
  | 'language keeper'
  | 'light sleeper'
  | 'lineage pride'
  | 'lives for today'
  | 'lonely'
  | 'lustful'
  | 'magical gift'
  | 'maimed'
  | 'manipulative'
  | 'mannerism'
  | 'medic'
  | 'melancholic'
  | 'multilingual interpreter'
  | 'muscular'
  | 'musically talented'
  | 'mysterious past'
  | 'negligent'
  | 'night owl'
  | 'nostalgic'
  | 'oblivious'
  | 'obsessive'
  | 'occultist'
  | 'optimistic'
  | 'opulent parties'
  | 'organization'
  | 'ornate jewelry'
  | 'outfit'
  | 'overextended grasp'
  | 'pacifist'
  | 'perceptive'
  | 'petty criminal'
  | 'philanthropist'
  | 'picky eater'
  | 'pilgrim'
  | 'poet'
  | 'political hostage'
  | 'profligate spending'
  | 'provincial'
  | 'religious patron'
  | 'respected'
  | 'romantic'
  | 'sadistic'
  | 'sarcastic'
  | 'scars'
  | 'schemer'
  | 'seafarer'
  | 'secret sectarian'
  | 'seeking redemption'
  | 'sentimental'
  | 'sheltered life'
  | 'simple pleasures'
  | 'snores loudly'
  | 'socially awkward'
  | 'soft-hearted'
  | 'soft-spoken'
  | 'speech'
  | 'squeamish'
  | 'storyteller'
  | 'street urchin'
  | 'streetwise'
  | 'strong accent'
  | 'struggling'
  | 'superstitious'
  | 'suspicious'
  | 'sworn celibate'
  | 'tattooed scripture'
  | 'tattoos'
  | 'ticking bomb'
  | 'tragic past'
  | 'traveler'
  | 'underworld connection'
  | 'vampiric'
  | 'verbiage'
  | 'vigorous'
  | 'war veteran'
  | 'wealthy patron'
  | 'weathered'
  | 'weight'
  | 'well-off'
  | 'well-read'
  | 'xenophobic'

export interface QuirkConstraints {
  compassionate: boolean
  callous: boolean
  generous: boolean
  gregarious: boolean
  austere: boolean
  honest: boolean
  enigmatic: boolean
  courteous: boolean
  cautious: boolean
  irreverent: boolean
  reckless: boolean
  paranoid: boolean
  wrathful: boolean
  foreigner: boolean
  elderly: boolean
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
  martial: boolean
  coastal: boolean
  piercings: boolean
  enemy: boolean
  artistic: boolean
  academic: boolean
  musician: boolean
  seafarer: boolean
  criminal: boolean
  clergy: boolean
  aristocrat: boolean
  merchant: boolean
  soldier: boolean
  chef: boolean
  poet: boolean
  thin: boolean
  urban: boolean
}

export type QuirkDetails = {
  text?: string | ((_params: Partial<QuirkConstraints>) => string)
  tooltip?: string | ((_params: Partial<QuirkConstraints>) => string)
  constraints?: Partial<QuirkConstraints>
  conflicts?: Quirk[]
}

export type QuirkParams = { npc: Actor } & Pick<ActorSpawnParams, 'place' | 'role'>
