import { range } from 'd3'

import { province__culture } from '../../regions/provinces'
import { Province } from '../../regions/provinces/types'
import { decorateText } from '../../utilities/text/decoration'
import { professions } from '../professions'
import { species__map } from '../species'
import { NPC, NPCParams } from '../types'
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
        ['sympathetic', 'callous'],
        ['generous', 'greedy'],
        ['gregarious', 'enigmatic'],
        ['calm', 'wrathful'],
        ['honest', 'deceptive'],
        ['diligent', 'lazy'],
        ['pious', 'irreverent'],
        ['forgiving', 'vengeful'],
        ['xenophilic', 'xenophobic'],
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

const seekers: Quirk[] = ['seeking redemption']
const hobbyist: Quirk[] = [
  'botanist',
  'artistic',
  'academic',
  'musician',
  'seafarer',
  'huntsman',
  'chef',
  'poet'
]
const relations: Quirk[] = ['troubled romance']
const talent: Quirk[] = ['well-off', 'despised', 'struggling', 'respected', 'negligent']
const connections: Quirk[] = ['connections', 'secret sectarian', 'foreign agent']
const vice: Quirk[] = ['alcoholic', 'drug addict', 'gluttonous']

const quirks: Record<Quirk, QuirkDetails> = {
  'seeking redemption': { conflicts: seekers, spawn: () => 0.5 },
  optimistic: { conflicts: ['melancholic'], spawn: () => 1 },
  melancholic: {
    text: decorateText({
      label: 'melancholic',
      tooltip:
        '{death of a {friend|relative}|terrible betrayal|ruined relationship|crushing failure|burnt out}'
    }),
    conflicts: ['optimistic'],
    spawn: () => 1
  },
  alcoholic: { conflicts: vice, spawn: () => 1 },
  'drug addict': { conflicts: vice, spawn: () => 1 },
  gluttonous: { conflicts: vice, spawn: ({ austere }) => (austere ? 0 : 1) },
  corruption: {
    text: '{corrupt|venal}',
    spawn: ({ official, honest }) => (official && !honest ? 1 : 0)
  },
  lustful: { spawn: ({ austere, youthful }) => (austere || !youthful ? 0 : 1) },
  sadistic: {
    spawn: ({ sympathetic, context }) => (!sympathetic && context?.role === 'enemy' ? 1 : 0)
  },
  blackmailed: { conflicts: ['blackmailer'], spawn: () => 1 },
  blackmailer: {
    conflicts: ['blackmailed'],
    spawn: ({ sympathetic, honest, context }) =>
      sympathetic || honest || context?.role !== 'enemy' ? 0 : 1
  },
  'trades gossip': { spawn: ({ enigmatic }) => (enigmatic ? 0 : 1) },
  manipulative: {
    spawn: ({ honest, sympathetic, context }) =>
      honest || sympathetic || context?.role === 'friend' ? 0 : 1
  },
  childhood: {
    text: '{{adopted|orphaned} as a child|twin sibling|sheltered upbringing|large family}',
    spawn: () => 0.5
  },
  'social outcast': { spawn: () => 0.5 },
  outfit: {
    text: '{formal & clean|ragged & dirty|flamboyant & outlandish} outfit',
    spawn: () => 1
  },
  accessory: {
    text: '{distinctive|unusual} {necklace|amulet|ring|earrings|trinket|hat}',
    spawn: () => 1
  },
  tattoos: { text: '{colorful|intricate|runic} tattoos', spawn: ({ skin }) => (skin ? 1 : 0) },
  'facial piercings': { spawn: ({ piercings }) => (piercings ? 1 : 0) },
  'aromatic scent': { spawn: () => 1 },
  'strong accent': { spawn: ({ foreigner }) => (foreigner ? 1 : 0) },
  traveler: {
    text: '{well-traveled|wanderlust}',
    spawn: () => 1,
    conflicts: ['homesick']
  },
  homesick: { spawn: ({ foreigner }) => (foreigner ? 1 : 0), conflicts: ['traveler'] },
  speech: {
    text: '{speaks {quickly|slowly|quietly|loudly|copiously|sparsely}|{melodic|rough|sharp|deep} voice}',
    spawn: () => 1
  },
  verbiage: {
    text: '{evasive when questioned|uses {flowery language|metaphors}|never directly {denies|refuses} anything}',
    spawn: () => 1
  },
  mannerism: {
    text: ({ hair }) =>
      decorateText({
        label: 'distinct mannerism',
        tooltip: `{nervous {twitch|habit|gesture}|{whistles|hums} occasionally${
          hair ? '|{tosses hair|plays with hair}' : ''
        }|likes to wink|paces constantly|{taps|drums} fingers}`
      }),
    spawn: () => 1
  },
  scars: {
    text: ({ skin }) => `{light|light|light|heavy} {scars|scars|scars${skin ? '|burns' : ''}}`,
    spawn: () => 1,
    conflicts: ['disease marks']
  },
  maimed: { text: 'missing {{arm|hand}|leg|eye}', spawn: ({ youthful }) => (youthful ? 0 : 0.5) },
  afflicted: {
    text: 'afflicted ({illness|cursed})',
    spawn: ({ youthful }) => (youthful ? 0 : 0.5),
    conflicts: ['disease marks']
  },
  'disease marks': {
    text: 'old {pox marks|disease scars} are present',
    conflicts: ['scars', 'afflicted'],
    spawn: () => 0.25
  },
  horns: {
    text: '{broken|cracked|ringed} horns',
    spawn: ({ youngAdult, horns }) => (youngAdult || !horns ? 0 : 0.5)
  },
  height: { text: '{tall|short}', conflicts: ['weight'], spawn: () => 2 },
  weight: {
    text: ({ species }) => (species === 'elf' ? 'thin' : '{thin|fat}'),
    conflicts: ['height'],
    spawn: () => 2
  },
  intellect: { text: '{idiotic|{brilliant|genius}}', spawn: () => 1 },
  wisdom: { text: '{oblivious|{perceptive|insightful}}', spawn: () => 1 },
  charisma: {
    text: '{awkward|obnoxious|charismatic|beautiful}',
    conflicts: ['natural leader'],
    spawn: () => 1
  },
  strength: { text: '{muscular|frail}', spawn: () => 1 },
  dexterity: { text: '{clumsy|dexterous}', spawn: () => 1 },
  constitution: { text: '{fatigued|vigorous}', spawn: () => 1 },
  organization: { text: '{meticulous & organized|chaotic & disorganized}', spawn: () => 1 },
  companion: { text: 'animal companion', spawn: () => 0.5 },
  botanist: { conflicts: hobbyist, spawn: () => 0.5 },
  artistic: {
    conflicts: hobbyist,
    spawn: ({ profession }) => (profession.includes('artist') ? 0 : 0.5)
  },
  academic: {
    conflicts: hobbyist,
    spawn: ({ profession }) =>
      profession.includes('scholar') || profession.includes('lawyer') ? 0 : 0.5
  },
  musician: {
    conflicts: hobbyist,
    spawn: ({ profession }) => (profession.includes('musician') ? 0 : 0.5)
  },
  seafarer: {
    conflicts: hobbyist,
    spawn: ({ coastal, profession }) =>
      coastal && !profession.includes('sailor') && !profession.includes('ship captain') ? 0.5 : 0
  },
  huntsman: { conflicts: hobbyist, spawn: () => 0.5 },
  chef: { conflicts: hobbyist, spawn: ({ profession }) => (profession.includes('chef') ? 0 : 0.5) },
  poet: { conflicts: hobbyist, spawn: ({ profession }) => (profession.includes('poet') ? 0 : 0.5) },
  gambler: { spawn: () => 0.5 },
  funny: { text: '{humorous|sarcastic|whimsical}', spawn: () => 1 },
  storyteller: { spawn: ({ youngAdult }) => (youngAdult ? 0 : 0.5) },
  nostalgic: { spawn: ({ youngAdult }) => (youngAdult ? 0 : 0.5) },
  superstitious: {
    text: decorateText({
      label: 'superstitious',
      tooltip: '{carries various good luck charms|is careful to avoid certain actions}'
    }),
    spawn: () => 1
  },
  inquisitive: { spawn: () => 1 },
  obsessive: { spawn: () => 1 },
  'criminal past': { spawn: ({ profession }) => (profession.includes('criminal') ? 0 : 1) },
  dissident: {
    text: decorateText({ label: 'dissident', tooltip: 'dislikes figures of authority' }),
    spawn: () => 1
  },
  'war veteran': { spawn: ({ youngAdult }) => (youngAdult ? 0 : 1) },
  connections: {
    text: ({ profession }) =>
      decorateText({
        label: 'connections',
        tooltip: `{${profession.includes('clergy') ? '' : 'temple|'}${
          profession.includes('criminal') ? '' : 'criminal|'
        }${profession.includes('aristocrat') ? '' : 'aristocratic|'}${
          profession.includes('bureaucrat') ? '' : 'bureaucratic|'
        }${profession.includes('merchant') ? '' : 'mercantile'}}`
      }),
    conflicts: connections,
    spawn: () => 0.5
  },
  'foreign agent': { conflicts: connections, spawn: ({ xenophobic }) => (xenophobic ? 0 : 0.5) },
  'secret sectarian': {
    text: decorateText({ label: 'secret sectarian', tooltip: '{dark cult|heretic|syncretic}' }),
    conflicts: connections,
    spawn: () => 0.5
  },
  'natural leader': { conflicts: ['charisma'], spawn: ({ youthful }) => (youthful ? 0 : 0.5) },
  'magical gift': { spawn: ({ sorcerer }) => (sorcerer ? 0 : 0.5) },
  'well-off': { text: '{well-off|prosperous}', conflicts: talent, spawn: () => 1 },
  struggling: { conflicts: talent, spawn: () => 1 },
  respected: { conflicts: talent, spawn: () => 1 },
  despised: { conflicts: talent, spawn: () => 1 },
  negligent: { conflicts: talent, spawn: () => 1 },
  'concealed sin': {
    text: decorateText({
      label: 'concealed sin',
      tooltip: '{adulterous|treacherous|theft|incompetence|dark bargain}'
    }),
    spawn: () => 0.5
  },
  'troubled romance': {
    text: decorateText({
      label: 'troubled romance',
      tooltip:
        '{utterly unobtainable|wholly disinterested|profoundly unhealthy|socially unacceptable}'
    }),
    conflicts: relations,
    spawn: ({ youthful }) => (youthful ? 1 : 0)
  }
}

const rollQuirks = ({
  loc,
  npc,
  context
}: {
  loc: Province
  npc: NPC
  context?: NPCParams['context']
}) => {
  const { personality, culture, age } = npc
  const { key: profession } = npc.profession
  const { local, ruling } = province__culture(loc)
  const { appearance } = window.world.cultures[culture]
  const species = species__map[window.world.cultures[culture].species]
  const { strata, official } = professions[profession]
  const params = {
    coastal: loc.hub.coastal,
    foreigner: local.culture.native !== culture && ruling.culture.native !== culture,
    callous: personality.some(trait => trait === 'callous'),
    sympathetic: personality.some(trait => trait === 'sympathetic'),
    generous: personality.some(trait => trait === 'generous'),
    austere: personality.some(trait => trait === 'austere'),
    honest: personality.some(trait => trait === 'honest'),
    enigmatic: personality.some(trait => trait === 'enigmatic'),
    courteous: personality.some(trait => trait === 'courteous'),
    cautious: personality.some(trait => trait === 'cautious'),
    xenophobic: personality.some(trait => trait === 'xenophobic'),
    youthful: age === 'young adult' || age === 'adult',
    youngAdult: age === 'young adult',
    profession,
    sorcerer: profession.includes('sorcerer'),
    official,
    skin: species.traits.skin === 'skin' && !appearance.skin.texture?.includes('long'),
    hair: appearance.hair !== undefined,
    piercings: species.traits.piercings ?? true,
    horns: species.traits.horns,
    poor: strata === 'lower',
    comfortable: strata === 'middle',
    rich: strata === 'upper',
    context,
    species: window.world.cultures[culture].species
  }
  let count = 2
  const results: NPC['quirks'] = []
  const locals = loc.actors
    .map(i => window.world.npcs[i])
    .reduce((dict: Record<string, number>, actor) => {
      actor.quirks.forEach(quirk => {
        if (!dict[quirk.tag]) dict[quirk.tag] = 0
        dict[quirk.tag]++
      })
      return dict
    }, {})
  while (count-- > 0) {
    const selected = results.map(({ tag }) => tag)
    const quirk = window.dice.weightedChoice(
      Object.entries(quirks).map(([_tag, { spawn, conflicts }]) => {
        const tag = _tag as Quirk
        const conflict = selected.includes(tag) || conflicts?.some(c => selected.includes(c))
        const exists = 10 ** -(locals[tag] ?? 0)
        return { v: tag, w: conflict ? 0 : spawn(params) * exists }
      })
    )
    const { text } = quirks[quirk]
    results.push({
      tag: quirk,
      text: window.dice.spin(typeof text === 'string' ? text : text?.(params) ?? quirk)
    })
  }
  return results
}

export const npc__traits = (params: {
  loc: Province
  npc: NPC
  context?: NPCParams['context']
}) => {
  const { npc, loc, context } = params
  npc.personality = rollPersonality({ count: 3, role: context?.role })
  npc.quirks = rollQuirks({ npc, loc, context })
}
