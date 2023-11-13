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
  | 'accessory'
  | 'afflicted'
  | 'alcoholic'
  | 'alluring'
  | 'aromatic scent'
  | 'artistic'
  | 'bastard origins'
  | 'betrothed'
  | 'betting it all'
  | 'bitter grudge'
  | 'blackmailed'
  | 'blackmailer'
  | 'black sheep'
  | 'blithe idealist'
  | 'blunt'
  | 'brawler'
  | 'brilliant'
  | 'broken heart'
  | 'burnt out'
  | 'chance at glory'
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
  | 'delusional self-image'
  | 'dexterous'
  | 'dietary restrictions'
  | 'dirt poor'
  | 'disdains charity'
  | 'disease marks'
  | 'distrustful of magic'
  | 'doomed love'
  | 'drug addict'
  | 'duelist'
  | 'dull'
  | 'early riser'
  | 'easily distracted'
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
  | 'frail'
  | 'gambler'
  | 'gambler'
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
  | 'inheritance dispute'
  | 'inherited debt'
  | 'inquisitive'
  | 'insightful'
  | 'intimidating'
  | 'journaler'
  | 'light sleeper'
  | 'lineage pride'
  | 'lives for today'
  | 'load-bearing relationship'
  | 'lovesick fool'
  | 'lustful'
  | 'magical gift'
  | 'maimed'
  | 'manipulative'
  | 'mannerism'
  | 'medic'
  | 'melancholic'
  | 'misplaced trust'
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
  | 'outfit'
  | 'overextended grasp'
  | 'pacifist'
  | 'perceptive'
  | 'persecuting foe'
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
  | 'seafarer'
  | 'secret sectarian'
  | 'seeking redemption'
  | 'sheltered life'
  | 'simple pleasures'
  | 'snores loudly'
  | 'socially awkward'
  | 'speech'
  | 'squeamish'
  | 'storyteller'
  | 'street urchin'
  | 'streetwise'
  | 'strong accent'
  | 'struggling'
  | 'superstitious'
  | 'suspicious'
  | 'tattoos'
  | 'ticking bomb'
  | 'tragic past'
  | 'traveler'
  | 'troublesome friend'
  | 'underworld connection'
  | 'vampiric'
  | 'verbiage'
  | 'vigorous'
  | 'war veteran'
  | 'wealthy patron'
  | 'weight'
  | 'well-off'
  | 'well-read'
  | 'xenophobic'

export interface QuirkParams {
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
  chef: boolean
  poet: boolean
  thin: boolean
  urban: boolean
}

export type QuirkDetails = {
  text?: string | ((_params: Partial<QuirkParams>) => string)
  tooltip?: string | ((_params: Partial<QuirkParams>) => string)
  constraints?: Partial<QuirkParams>
  conflicts?: Quirk[]
}
