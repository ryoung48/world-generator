import { range } from 'd3'

import { PROVINCE } from '../../regions/provinces'
import { HUB } from '../../regions/provinces/hubs'
import { Province } from '../../regions/provinces/types'
import { decorateText } from '../../utilities/text/decoration'
import { TRAIT } from '../../utilities/traits'
import { PROFESSION } from '../professions'
import { SPECIES } from '../species'
import { Actor, NPCParams } from '../types'
import { Personality, Quirk, QuirkDetails } from './types'

const rollPersonality = (params: { count: number; role?: NPCParams['context']['role'] }) => {
  const { count, role } = params
  const preference =
    role === 'friend'
      ? window.dice.weightedChoice([
          { v: [0, 0, 1], w: 5 },
          { v: [0, 0, 0], w: 1 }
        ])
      : role === 'enemy'
      ? window.dice.weightedChoice([
          { v: [1, 1, 0], w: 5 },
          { v: [1, 1, 1], w: 1 }
        ])
      : range(3).map(() => window.dice.choice([0, 1]))
  return window.dice
    .sample<Personality[]>(
      [
        ['compassionate', 'callous'],
        ['generous', 'greedy'],
        ['gregarious', 'enigmatic'],
        ['calm', 'wrathful'],
        ['honest', 'deceptive'],
        ['diligent', 'lazy'],
        ['pious', 'irreverent'],
        ['forgiving', 'vengeful'],
        ['lawful', 'dissident'],
        ['stubborn', 'capricious'],
        ['cautious', 'reckless'],
        ['courteous', 'arrogant'],
        ['content', 'ambitious'],
        ['austere', 'decadent'],
        ['patient', 'impatient'],
        ['trusting', 'paranoid']
      ],
      count
    )
    .map((group, i) => group[preference[i]])
}

const desires: Quirk[] = ['seeking redemption', 'romantic']
const hobbyist: Quirk[] = [
  'cultivation',
  'artistic',
  'well-read',
  'musically talented',
  'seafarer',
  'huntsman',
  'chef',
  'poet',
  'brawler',
  'duelist',
  'occultist',
  'medic'
]
const relations: Quirk[] = [
  'doomed love',
  'broken heart',
  'betrothed',
  'forbidden romance',
  'load-bearing relationship',
  'troublesome friend',
  'lovesick fool'
]
const talent: Quirk[] = [
  'well-off',
  'struggling',
  'respected',
  'negligent',
  'delusional self-image'
]
const donations: Quirk[] = ['wealthy patron', 'religious patron', 'philanthropist']
const connections: Quirk[] = ['underworld connection', 'secret sectarian', 'foreign agent']
const vice: Quirk[] = ['alcoholic', 'drug addict', 'gluttonous', 'gambler']
const charisma: Quirk[] = [
  'dull',
  'socially awkward',
  'intimidating',
  'charismatic',
  'charming sycophant',
  'haunted by doubts'
]
const wisdom: Quirk[] = ['oblivious', 'perceptive', 'insightful', 'gullible']
const foreigners: Quirk[] = ['suspicious', 'xenophobic', 'cosmopolitan']
const origins: Quirk[] = [
  'childhood',
  'street urchin',
  'humble origins',
  'bastard origins',
  'sheltered life'
]

const quirks: Record<Quirk, QuirkDetails> = {
  accessory: {
    text: '{distinctive|unusual} {necklace|amulet|ring|earrings|trinket|hat}'
  },
  afflicted: {
    conflicts: ['disease marks'],
    constraints: { youthful: false },
    text: 'afflicted ({illness|cursed})',
    tooltip:
      '{suffers from a chronic illness that requires regular infusions of some costly remedy|is dying from a deadly disease and is desperately seeking a cure}'
  },
  alcoholic: {
    conflicts: vice,
    tooltip: 'often seen with a bottle, seeking solace in the drink'
  },
  alluring: {
    tooltip: 'exceptional physical beauty that often leaves people awestruck',
    constraints: { youthful: true }
  },
  'aromatic scent': {
    tooltip: 'carries a unique fragrance, instantly recognizable'
  },
  artistic: {
    conflicts: hobbyist,
    constraints: { artistic: false },
    tooltip: 'has a talent for painting and drawing'
  },
  'bastard origins': {
    conflicts: origins,
    tooltip:
      'was born out of wedlock and is {unaware of their true parentage|doing everything they can to hide their true parentage|secretly plotting to claim their birthright}'
  },
  betrothed: {
    conflicts: relations,
    constraints: { youthful: true },
    tooltip: 'is the bride or groom in an upcoming marriage'
  },
  'betting it all': {
    tooltip: 'has gambled everything on a risky venture and is desperate for it to succeed'
  },
  'bitter grudge': {
    conflicts: ['persecuting foe'],
    tooltip:
      'has a deep-seated hatred for someone and is always looking for an opportunity to get revenge'
  },
  blackmailed: {
    conflicts: ['blackmailer'],
    tooltip: "lives under someone's thumb, a secret tightly held"
  },
  blackmailer: {
    conflicts: ['blackmailed'],
    constraints: { compassionate: false, enemy: true, honest: false },
    tooltip: 'holds the secret of another, manipulative and controlling'
  },
  'black sheep': {
    tooltip: 'is an outcast within their {family|profession} due to some past transgression'
  },
  'blithe idealist': {
    tooltip: 'has grand ambitions and is willing to sacrifice everything to achieve it'
  },
  blunt: {
    constraints: { compassionate: false },
    tooltip: "speaks their mind without regard for others' feelings"
  },
  brawler: {
    conflicts: [...hobbyist, 'pacifist'],
    constraints: { poor: true, youthful: true },
    tooltip: 'skilled at unarmed combat and enjoys a good fight'
  },
  brilliant: {
    conflicts: ['dull'],
    tooltip: 'has a keen mind and is able to solve complex problems'
  },
  'broken heart': {
    conflicts: relations,
    constraints: { youthful: true },
    tooltip:
      'still recovering from a heartbreaking experience, making them hesitant in relationships'
  },
  'burnt out': {
    tooltip: 'has lost the passion for their work'
  },
  'chance at glory': {
    tooltip:
      'has been given a once-in-a-lifetime opportunity to achieve their dreams, but it comes at a great cost'
  },
  charismatic: {
    conflicts: charisma,
    tooltip: 'has a natural charm and is well-liked by others'
  },
  'charming sycophant': {
    conflicts: charisma,
    tooltip: 'skilled at flattering others and gaining their favor'
  },
  'chatty gossip': {
    constraints: { enigmatic: false },
    tooltip: 'loves chatting about local rumors and scandals'
  },
  'chronic complainer': {
    constraints: { enigmatic: false },
    tooltip: 'always finds something to complain about'
  },
  chef: {
    conflicts: hobbyist,
    constraints: { chef: false },
    tooltip: 'has a talent for cooking and is able to prepare delicious meals'
  },
  childhood: {
    conflicts: origins,
    text: '{{adopted|orphaned} as a child|twin sibling|large family}'
  },
  claustrophobic: {
    conflicts: ['fear of heights', 'squeamish'],
    tooltip: 'uncomfortable in enclosed spaces'
  },
  clumsy: {
    conflicts: ['dexterous'],
    tooltip: 'prone to tripping and dropping things'
  },
  companion: {
    text: 'animal companion',
    tooltip: 'always with a loyal pet, share a close bond'
  },
  'concealed sin': {
    tooltip: '{treachery|theft|incompetence|dark bargain|murderous}'
  },
  corruption: {
    constraints: { honest: false, official: true },
    text: '{corrupt|venal}',
    tooltip: 'accepts bribes and abuses authority for personal gain'
  },
  cosmopolitan: {
    conflicts: foreigners,
    tooltip: 'embraces foreign cultures and ideas'
  },
  'court fashion': {
    conflicts: ['outfit'],
    constraints: { austere: false, rich: true },
    tooltip:
      '{always dresses in the latest fashions and trends|sets trends and standards in high society attire}'
  },
  'criminal past': {
    constraints: { criminal: false }
  },
  cultivation: {
    conflicts: hobbyist,
    tooltip: 'has an immaculate garden and is knowledgeable about plants'
  },
  'delusional self-image': {
    conflicts: talent,
    tooltip: 'believes themselves to be far more talented and capable than they actually are'
  },
  dexterous: {
    conflicts: ['clumsy'],
    tooltip: 'has quick reflexes and is good with their hands'
  },
  'dietary restrictions': {
    conflicts: ['picky eater', 'gluttonous'],
    tooltip: 'cannot eat certain foods'
  },
  'dirt poor': {
    constraints: { poor: true },
    tooltip: 'has barely enough to scrape by day-to-day'
  },
  'disdains charity': {
    constraints: { poor: true },
    tooltip: 'too proud to accept handouts or pity'
  },
  'disease marks': {
    conflicts: ['scars', 'afflicted'],
    text: 'old {pox marks|disease scars} are present'
  },
  'distrustful of magic': {
    constraints: { sorcerer: false },
    tooltip: 'suspicious of magic users, may react unpredictably around them'
  },
  'doomed love': {
    conflicts: relations,
    constraints: { youthful: true },
    tooltip:
      "{is in love with someone who is {utterly unobtainable|wholly disinterested in their devotion|profoundly unhealthy in their affections}|is the unwilling object of someone's {unhealthy|unwanted} affections}"
  },
  'drug addict': {
    conflicts: vice,
    tooltip: 'constantly craves forbidden substances and has visible signs of drug use'
  },
  duelist: {
    conflicts: [...hobbyist, 'pacifist'],
    constraints: { rich: true, youthful: true },
    tooltip: 'skilled with a blade and enjoys a good fight'
  },
  dull: {
    conflicts: [...charisma, 'brilliant'],
    tooltip: 'slow-witted and uninteresting conversationally'
  },
  'early riser': {
    conflicts: ['night owl'],
    tooltip: 'always wakes up before dawn'
  },
  'easily distracted': {
    conflicts: ['obsessive'],
    tooltip: 'struggles to maintain focus and often daydreams'
  },
  'excess heirs': {
    constraints: { youthful: false, poor: false },
    tooltip: 'has too many legitimate heirs, causing a succession crisis'
  },
  exiled: {
    constraints: { foreigner: true },
    tooltip: 'forbidden from ever returning home'
  },
  'exotic attire': {
    tooltip: 'wears outlandish fashion that distinguishes them in any gathering'
  },
  'exotic collector': {
    constraints: { rich: true },
    tooltip: 'accumulates rare trinkets and curios'
  },
  'facial piercings': {
    constraints: { piercings: true }
  },
  'family alienation': {
    tooltip: ({ youthful }) =>
      `has a strained relationship with {their spouse|a ${youthful ? 'parent' : 'child'}|a sibling}`
  },
  'family chains': {
    constraints: { youthful: true },
    tooltip:
      'is {bound to inherit a family duty that they are uninterested in fulfilling|being forced into an arranged marriage that they are not pleased with}'
  },
  'family recipes': {
    tooltip: 'carries a treasured cookbook with generations of wisdom'
  },
  fatigued: {
    conflicts: ['vigorous'],
    tooltip: 'overworked and worn out, moves slowly, often yawns'
  },
  'fear of heights': {
    conflicts: ['claustrophobic', 'squeamish'],
    tooltip: 'vertigo prevents climbing tall structures'
  },
  'forbidden romance': {
    constraints: { youthful: true },
    conflicts: relations,
    tooltip:
      'is {in love with someone from {the wrong {social class|ethnic group}|a rival household}|involved in an {incestuous bond|adulterous relationship}}'
  },
  'foreign agent': {
    conflicts: connections,
    tooltip: 'secretly working for a foreign power, causing intrigue and potential betrayal'
  },
  frail: {
    conflicts: ['muscular'],
    tooltip: 'weak and delicate, tires easily',
    constraints: { martial: false }
  },
  gambler: {
    conflicts: vice,
    tooltip: 'enjoys games of chance and is always looking for a wager'
  },
  gluttonous: {
    conflicts: [...vice, 'picky eater', 'dietary restrictions'],
    constraints: { austere: false },
    tooltip: 'has an insatiable appetite and is always on the lookout for food'
  },
  gullible: {
    conflicts: wisdom,
    tooltip: 'easily tricked and manipulated'
  },
  'haughty demeanor': {
    constraints: { poor: false },
    tooltip: 'looks down on others and is quick to judge'
  },
  'haunted by doubts': {
    constraints: { reckless: false },
    tooltip: 'questions own abilities, plagued by insecurity'
  },
  height: {
    conflicts: ['weight'],
    text: '{tall|short}'
  },
  'heir apparent': {
    constraints: { rich: true, youthful: true },
    tooltip: 'next in line to inherit a great fortune'
  },
  homesick: {
    conflicts: ['traveler', 'provincial'],
    constraints: { foreigner: true },
    tooltip: 'longs for home and family'
  },
  horns: {
    constraints: { horns: true },
    text: '{broken|cracked|ringed} horns'
  },
  hospitable: {
    constraints: { callous: false, paranoid: false },
    tooltip: 'welcomes guests and strangers with open arms'
  },
  'humble origins': {
    conflicts: origins,
    constraints: { poor: false },
    tooltip: 'grew up poor and has worked hard to get where they are today'
  },
  humorous: {
    conflicts: ['sarcastic'],
    tooltip: 'cheerful and jokes often, contagious laughter'
  },
  huntsman: {
    conflicts: hobbyist,
    tooltip: 'at home in the wilderness, knows how to track and hunt animals'
  },
  'inheritance dispute': {
    tooltip: 'embroiled in a legal battle over a disputed inheritance'
  },
  'inherited debt': {
    constraints: { rich: true },
    tooltip: 'owes a great deal of wealth due to the indiscretions of their ancestors'
  },
  inquisitive: {
    tooltip: 'always asking questions, curious about the world'
  },
  insightful: {
    conflicts: wisdom,
    tooltip: 'adept at detecting lies, emotions, and intent of others'
  },
  intimidating: {
    conflicts: charisma,
    tooltip: 'has a commanding presence and is feared by others'
  },
  journaler: {
    tooltip: 'keeps a detailed diary of their life, which could be used to blackmail them'
  },
  'light sleeper': {
    conflicts: ['snores loudly'],
    tooltip: 'wakes at the slightest noise'
  },
  'lineage pride': {
    constraints: { rich: true },
    tooltip: "deeply invested in their family's history and reputation"
  },
  'lives for today': {
    tooltip: 'seeks immediate ends without regard for the future'
  },
  'load-bearing relationship': {
    tooltip:
      'has a {child|spouse|friend|associate} that they rely on for {emotional support|practical assistance}',
    conflicts: relations
  },
  'lovesick fool': {
    tooltip:
      'absolutely and utter smitten with someone, to the point where they are {neglecting|ignoring} critical situations that threaten to explode into outright disaster',
    conflicts: relations,
    constraints: { youthful: true }
  },
  lustful: {
    constraints: { austere: false, youthful: true },
    tooltip: 'has a wandering eye and is always looking for a new lover'
  },
  'magical gift': {
    constraints: { sorcerer: false },
    tooltip: 'uses natural arcane affinity to assist in daily tasks'
  },
  maimed: {
    constraints: { youthful: false },
    text: 'missing {{arm|hand}|leg|eye}'
  },
  manipulative: {
    constraints: { compassionate: false, enemy: true, honest: false }
  },
  mannerism: {
    tooltip: ({ hair }) =>
      `{nervous {twitch|habit|gesture}|{whistles|hums} occasionally${
        hair ? '|{tosses hair|plays with hair}' : ''
      }|likes to wink|paces constantly|{taps|drums} fingers}`
  },
  medic: {
    conflicts: hobbyist,
    tooltip: 'can provide basic medical assistance if needed'
  },
  melancholic: {
    conflicts: ['optimistic'],
    tooltip: '{death of a {friend|relative}|terrible betrayal|ruined relationship|crushing failure}'
  },
  'misplaced trust': {
    tooltip: 'has great trust in someone who is secretly plotting against them'
  },
  'multilingual interpreter': {
    tooltip: 'fluent in various languages, facilitating communication'
  },
  muscular: {
    conflicts: ['frail'],
    tooltip: 'has a strong and athletic build'
  },
  'musically talented': {
    conflicts: hobbyist,
    constraints: { musician: false },
    tooltip: 'plays an instrument and is able to entertain others'
  },
  'mysterious past': {
    tooltip: 'hides a murky past that may come back to haunt them'
  },
  negligent: {
    conflicts: talent
  },
  'night owl': {
    conflicts: ['early riser'],
    tooltip: 'stays up late, sleeps in'
  },
  nostalgic: {
    constraints: { youngAdult: false },
    tooltip: 'longs for the past, shares fond memories'
  },
  oblivious: {
    conflicts: wisdom,
    tooltip: 'unaware of their surroundings, often lost in thought'
  },
  obsessive: {
    conflicts: ['easily distracted'],
    tooltip: 'single-minded intensity, focused to a fault'
  },
  occultist: {
    conflicts: ['humorous'],
    tooltip: 'secretly dabbles with forbidden lore and magic'
  },
  optimistic: {
    conflicts: ['melancholic'],
    tooltip: 'sees the bright side of everything, a beacon of positivity'
  },
  'opulent parties': {
    constraints: { austere: false, rich: true },
    tooltip: 'hosts lavish feasts and galas for other elites'
  },
  organization: {
    text: '{meticulous & organized|chaotic & disorganized}',
    conflicts: ['outfit']
  },
  outfit: {
    text: '{formal & clean|ragged & messy} outfit',
    conflicts: ['organization', 'court fashion']
  },
  'overextended grasp': {
    tooltip: 'has taken on more than they can handle and is struggling to keep up'
  },
  pacifist: {
    conflicts: ['brawler', 'duelist'],
    constraints: { wrathful: false },
    tooltip: 'avoids violence except in dire need'
  },
  perceptive: {
    conflicts: wisdom,
    tooltip: 'notices fine details through sight, hearing, and smell'
  },
  'persecuting foe': {
    conflicts: ['bitter grudge'],
    tooltip: 'has a powerful nemesis that seeks to {destroy|disgrace} them'
  },
  'petty criminal': {
    constraints: { poor: true },
    tooltip: 'resorts to petty crime to supplement income'
  },
  philanthropist: {
    conflicts: donations,
    constraints: { rich: true },
    tooltip: 'donates wealth to charitable causes or public works'
  },
  'picky eater': {
    conflicts: ['dietary restrictions', 'gluttonous'],
    tooltip: 'refuses to eat unfamiliar foods'
  },
  pilgrim: {
    tooltip: 'has traveled to a holy site and returned'
  },
  poet: {
    conflicts: hobbyist,
    constraints: { poet: false },
    tooltip: 'writes poetry during downtime'
  },
  'political hostage': {
    constraints: { rich: true, youngAdult: true },
    tooltip: 'kept as assurance in a shaky political alliance'
  },
  'profligate spending': {
    constraints: { austere: false, poor: false },
    tooltip: 'squanders money on extravagant indulgences'
  },
  provincial: {
    conflicts: ['traveler', 'homesick'],
    constraints: { foreigner: false },
    tooltip: 'has never left the province'
  },
  'religious patron': {
    conflicts: donations,
    constraints: { irreverent: false, rich: true },
    tooltip: 'a generous benefactor of the local religious institutions'
  },
  respected: {
    conflicts: talent,
    tooltip: 'well-respected by the community for some remarkable talent'
  },
  romantic: {
    conflicts: [...relations, ...desires],
    constraints: { youthful: true },
    tooltip: 'seeks to impress a potential love interest'
  },
  sadistic: {
    constraints: { compassionate: false, enemy: true },
    tooltip: "finds pleasure in others' pain, a disturbing smile never far"
  },
  sarcastic: {
    conflicts: ['humorous'],
    tooltip: 'dry, mocking wit; sardonic and cynical observations'
  },
  scars: {
    conflicts: ['disease marks'],
    text: ({ skin }) => `{light|light|light|heavy} {scars|scars|scars${skin ? '|burns' : ''}}`
  },
  seafarer: {
    conflicts: hobbyist,
    constraints: { coastal: true, seafarer: false },
    tooltip: 'at home on the sea, knows its moods and whims'
  },
  'secret sectarian': {
    conflicts: connections,
    tooltip: '{dark cult|heretic|syncretic}'
  },
  'seeking redemption': {
    conflicts: desires,
    tooltip: 'hunts for atonement, haunted by a past mistake'
  },
  'sheltered life': {
    conflicts: origins,
    constraints: { rich: true },
    tooltip: 'limited understanding of how commoners live'
  },
  'simple pleasures': {
    constraints: { poor: true },
    tooltip: 'finds joy in small comforts and diversions'
  },
  'snores loudly': {
    conflicts: ['light sleeper'],
    tooltip: 'keeps others awake at night'
  },
  'socially awkward': {
    conflicts: charisma,
    tooltip: 'terrible at talking to people and making friends'
  },
  speech: {
    text: '{speaks {quickly|slowly|quietly|loudly|copiously|sparsely}|{melodic|rough|sharp|deep} voice}'
  },
  squeamish: {
    conflicts: ['fear of heights', 'claustrophobic'],
    tooltip: 'disturbed by gore and violence',
    constraints: { martial: false }
  },
  storyteller: {
    tooltip: 'entertains with dramatic tales, embellishes for effect'
  },
  'street urchin': {
    conflicts: origins,
    constraints: { urban: true },
    tooltip: "grew up on the streets and has unique knowledge of the city's underbelly"
  },
  streetwise: {
    constraints: { poor: true, urban: true },
    tooltip: 'knows how to survive on the streets and deal with unsavory characters'
  },
  'strong accent': {
    constraints: { foreigner: true },
    tooltip: 'speaks with a distinct lilt, a remnant of a far-off home'
  },
  struggling: {
    conflicts: talent,
    tooltip: 'has fallen on hard times and is struggling to make ends meet'
  },
  superstitious: {
    tooltip: '{carries various good luck charms|is careful to avoid certain actions}'
  },
  suspicious: {
    conflicts: foreigners,
    tooltip: 'wary of outsiders and travelers'
  },
  tattoos: {
    constraints: { skin: true },
    text: '{colorful|intricate|runic} tattoos'
  },
  'ticking bomb': {
    constraints: { austere: false },
    tooltip:
      '{ruinous vice|unendurable pressure|terminal illness|mounting debt} is threatening to shatter their plans at some unknown, but rapidly approaching time'
  },
  'tragic past': {
    tooltip: 'haunted by images of past hardship and loss'
  },
  traveler: {
    conflicts: ['homesick', 'provincial'],
    text: 'well-traveled',
    tooltip: 'well versed in many lands and cultures'
  },
  'troublesome friend': {
    tooltip:
      'has a friend who is prone to {poor decisions|reckless indulgences} and is need of help getting them out of trouble'
  },
  'underworld connection': {
    constraints: { urban: true },
    tooltip:
      'has been seen meeting with known criminals, hinting at a possible secret alliance or obligation'
  },
  vampiric: {
    tooltip: 'has a pale complexion and an insatiable craving for blood'
  },
  verbiage: {
    text: '{evasive when questioned|uses {flowery language|metaphors}|never directly {denies|refuses} anything|overuses of a particular word or phrase|constantly curses and uses crude language}'
  },
  vigorous: {
    conflicts: ['fatigued'],
    tooltip: 'bursting with energy, always on the move, restless'
  },
  'war veteran': {
    constraints: { youngAdult: false },
    tooltip: 'has seen many battles and has the scars to prove it'
  },
  'wealthy patron': {
    conflicts: donations,
    constraints: { rich: true },
    tooltip: 'sponsor of artists or inventors; influence felt in culture and technology'
  },
  weight: {
    conflicts: ['height'],
    text: ({ thin }) => (thin ? 'thin' : '{thin|fat}')
  },
  'well-off': {
    conflicts: talent,
    text: '{well-off|prosperous}',
    tooltip: 'has a comfortable life and is financially secure'
  },
  'well-read': {
    conflicts: hobbyist,
    constraints: { academic: false, poor: false },
    tooltip: 'studious and learned, knowledgeable about many topics'
  },
  xenophobic: {
    conflicts: foreigners,
    tooltip: 'hates foreigners and outsiders'
  }
}

const rollQuirks = ({
  loc,
  npc,
  context
}: {
  loc: Province
  npc: Actor
  context?: NPCParams['context']
}) => {
  const { personality, culture, age } = npc
  const { key: profession } = npc.profession
  const { local, ruling } = PROVINCE.cultures(loc)
  const { appearance } = window.world.cultures[culture]
  const species = SPECIES.lookup[window.world.cultures[culture].species]
  const { strata, official, quirks: _quirks = {}, martial } = PROFESSION.lookup[profession]
  const params = {
    coastal: window.world.cells[loc.hub.cell].beach,
    foreigner: local.culture !== culture && ruling.culture !== culture,
    callous: personality.some(trait => trait === 'callous'),
    compassionate: personality.some(trait => trait === 'compassionate'),
    generous: personality.some(trait => trait === 'generous'),
    gregarious: personality.some(trait => trait === 'gregarious'),
    austere: personality.some(trait => trait === 'austere'),
    honest: personality.some(trait => trait === 'honest'),
    enigmatic: personality.some(trait => trait === 'enigmatic'),
    courteous: personality.some(trait => trait === 'courteous'),
    cautious: personality.some(trait => trait === 'cautious'),
    irreverent: personality.some(trait => trait === 'irreverent'),
    reckless: personality.some(trait => trait === 'reckless'),
    paranoid: personality.some(trait => trait === 'paranoid'),
    wrathful: personality.some(trait => trait === 'wrathful'),
    youthful: age === 'young adult' || age === 'adult',
    youngAdult: age === 'young adult',
    elderly: age === 'old' || age === 'venerable',
    sorcerer:
      profession.includes('sorcerer') ||
      profession.includes('archmage') ||
      profession.includes('hedge') ||
      profession.includes('fortune') ||
      profession.includes('shaman'),
    official,
    martial,
    skin: species.traits.skin === 'skin' && !appearance.skin.texture?.includes('long'),
    hair: appearance.hair !== undefined,
    piercings: species.traits.piercings ?? true,
    horns: species.traits.horns,
    poor: strata === 'lower',
    comfortable: strata === 'middle',
    rich: strata === 'upper',
    enemy: context?.['role'] === 'enemy',
    artistic: profession.includes('artist'),
    academic: profession.includes('scholar') || profession.includes('lawyer'),
    musician: profession.includes('musician'),
    seafarer: profession.includes('sailor') || profession.includes('ship captain'),
    chef: profession.includes('chef'),
    poet: profession.includes('poet'),
    criminal: profession.includes('criminal'),
    aristocrat: profession.includes('aristocrat'),
    clergy: profession.includes('priest'),
    merchant: profession.includes('merchant'),
    thin: window.world.cultures[culture].species === 'elf',
    urban: !HUB.village(loc.hub)
  }
  const available = { ...quirks, ..._quirks }
  const selected = TRAIT.selection({
    available,
    current: [],
    used: loc.actors.map(i => window.world.npcs[i].quirks.map(({ tag }) => tag)).flat(),
    constraints: params,
    samples: 2
  })
  return selected.map(quirk => {
    const details = available[quirk.tag]
    return {
      ...quirk,
      text: details.tooltip
        ? decorateText({
            label: quirk.text,
            tooltip: window.dice.spin(
              typeof details.tooltip === 'string' ? details.tooltip : details.tooltip(params)
            )
          })
        : quirk.text
    }
  })
}

export const NPC_TRAITS = {
  spawn: (params: { loc: Province; npc: Actor; context?: NPCParams['context'] }) => {
    const { npc, loc, context } = params
    npc.personality = rollPersonality({ count: 3, role: context?.role })
    npc.quirks = rollQuirks({ npc, loc, context })
  }
}
