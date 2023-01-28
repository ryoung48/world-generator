import { range } from 'd3'

import { province__culture } from '../../regions/provinces'
import { Province } from '../../regions/provinces/types'
import { ThreadContext } from '../../threads/types'
import { decorateText } from '../../utilities/text/decoration'
import { professions } from '../professions'
import { species__map } from '../species'
import { NPC } from '../types'
import { Personality, Quirk, QuirkDetails } from './types'

const rollPersonality = (params: { count: number; role?: ThreadContext['role'] }) => {
  const { count, role } = params
  const preference =
    role === 'patron'
      ? window.dice.weightedChoice([
          { v: [0, 0, 1], w: 5 },
          { v: [0, 0, 0], w: 1 }
        ])
      : role === 'rival'
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
        ['respectful', 'arrogant'],
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
const relations: Quirk[] = [
  'troubled romance',
  'lovesick fool',
  'load-bearing relationship',
  'misplaced trust',
  'troublesome relationship'
]
const talent: Quirk[] = ['well-off', 'despised', 'struggling', 'respected', 'delusional self-image']
const connections: Quirk[] = ['connections', 'secret sectarian', 'foreign agent']
const perspective: Quirk[] = ['victim', 'supporting', 'against']
const vice: Quirk[] = ['alcoholic', 'drug addict', 'gluttonous', 'masochistic']
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
  masochistic: { conflicts: vice, spawn: () => 0.5 },
  corruption: {
    text: '{corrupt|venal}',
    spawn: ({ official, honest }) => (official && !honest ? 1 : 0)
  },
  lustful: { spawn: ({ austere }) => (austere ? 0 : 1) },
  sadistic: {
    spawn: ({ sympathetic, context }) => (sympathetic || context?.role === 'patron' ? 0 : 1)
  },
  gossiper: { spawn: ({ enigmatic }) => (enigmatic ? 0 : 1) },
  manipulative: {
    spawn: ({ honest, sympathetic, context }) =>
      honest || sympathetic || context?.role === 'patron' ? 0 : 1
  },
  sexuality: { text: '{bisexual|homosexual}', spawn: () => 0.5 },
  childhood: { text: '{{adopted|orphaned} as a child|twin sibling|bastard}', spawn: () => 0.5 },
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
  'foreign visitor': { spawn: ({ foreigner, official }) => (foreigner && !official ? 1 : 0) },
  speech: {
    text: '{speaks {quickly|slowly|quietly|loudly|copiously|sparsely}|{melodic|rough|sharp|deep} voice}',
    spawn: () => 1
  },
  scars: {
    text: ({ skin }) => `{light|light|light|heavy} {scars|scars|scars${skin ? '|burns' : ''}}`,
    spawn: () => 1
  },
  maimed: { text: 'missing {{arm|hand}|leg|eye}', spawn: ({ youthful }) => (youthful ? 0 : 0.5) },
  'afflicted (illness)': { spawn: ({ youthful }) => (youthful ? 0 : 0.5) },
  horns: {
    text: '{broken|cracked|ringed} horns',
    spawn: ({ youngAdult, horns }) => (youngAdult || !horns ? 0 : 0.5)
  },
  height: { text: '{tall|short}', conflicts: ['weight'], spawn: () => 2 },
  weight: { text: '{thin|fat}', conflicts: ['height'], spawn: () => 2 },
  intellect: { text: '{myopic|idiotic|smart|tactician}', spawn: () => 1 },
  wisdom: { text: '{oblivious|{perceptive|insightful}}', spawn: () => 1 },
  charisma: { text: '{awkward|charismatic}', conflicts: ['local leader'], spawn: () => 1 },
  aesthetic: { text: '{unattractive|beautiful}', spawn: () => 1 },
  strength: { text: '{muscular|frail}', spawn: () => 1 },
  dexterity: { text: '{clumsy|dexterous}', spawn: () => 1 },
  constitution: { text: '{fatigued|vigorous}', spawn: () => 1 },
  organization: { text: '{meticulous & organized|chaotic & disorganized}', spawn: () => 1 },
  companion: { text: 'animal companion', spawn: () => 0.5 },
  drifter: { text: '{drifter|wanderer}', spawn: () => 0.5 },
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
  'war veteran': { spawn: ({ youngAdult }) => (youngAdult ? 0 : 1) },
  connections: {
    text: ({ profession }) =>
      decorateText({
        label: 'connections',
        tooltip: `{${profession.includes('clergy') ? '' : 'religious|'}${
          profession.includes('criminal') ? '' : 'criminal|'
        }${profession.includes('aristocrat') ? '' : 'aristocratic|'}${
          profession.includes('bureaucrat') ? '' : 'bureaucratic|'
        }${profession.includes('merchant') ? '' : 'mercantile'}}`
      }),
    conflicts: connections,
    spawn: () => 0.5
  },
  'foreign agent': { conflicts: connections, spawn: ({ xenophobic }) => (xenophobic ? 0 : 0.5) },
  'secret sectarian': { conflicts: connections, spawn: () => 0.5 },
  'local leader': { conflicts: ['charisma'], spawn: ({ youthful }) => (youthful ? 0 : 0.5) },
  'magical gift': { spawn: ({ sorcerer }) => (sorcerer ? 0 : 0.5) },
  'well-off': { conflicts: talent, spawn: () => 1 },
  struggling: { conflicts: talent, spawn: () => 1 },
  respected: { conflicts: talent, spawn: () => 1 },
  despised: { conflicts: talent, spawn: () => 1 },
  'delusional self-image': {
    text: decorateText({
      label: 'delusional self-image',
      tooltip: '{despised|respected}'
    }),
    conflicts: talent,
    spawn: () => 1
  },
  'brash overconfidence': { spawn: ({ respectful }) => (respectful ? 0 : 1) },
  'fatal extravagance': { spawn: ({ austere }) => (austere ? 0 : 0.5) },
  'concealed sin': {
    text: decorateText({
      label: 'concealed sin',
      tooltip:
        '{adulterous|incestuous|treacherous|theft|incompetence|dark pact|murderous|kinslayer}'
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
  },
  'lovesick fool': {
    conflicts: relations,
    spawn: ({ youthful }) => (youthful ? 1 : 0)
  },
  'load-bearing relationship': {
    text: `load-bearing relationship (${decorateText({
      label: '{friend|relative|associate}',
      tooltip: '{emotional support|practical assistance}'
    })})`,
    conflicts: relations,
    spawn: () => 0.5
  },
  'misplaced trust': {
    text: `misplaced trust (${decorateText({
      label: '{friend|relative|associate}',
      tooltip: '{incompetence|self-interest|secret malice}'
    })})`,
    conflicts: relations,
    spawn: () => 0.5
  },
  'troublesome relationship': {
    text: `troublesome ${decorateText({
      label: '{friend|relative|associate}',
      tooltip: '{poor decisions|reckless indulgences|threatened by an enemy}'
    })}`,
    conflicts: relations,
    spawn: () => 0.5
  },
  'ticking bomb': {
    text: decorateText({
      label: 'ticking bomb',
      tooltip: '{self-destructive choices|impending {doom|treachery}|internal strife}'
    }),
    spawn: () => 0.5
  },
  'rags to riches': { text: 'rags to riches', spawn: ({ rich }) => (rich ? 0.5 : 0) },
  'riches to rags': { text: 'riches to rags', spawn: ({ poor }) => (poor ? 0.5 : 0) },
  wraith: {
    text: decorateText({ label: 'wraith', color: 'indigo', bold: true }),
    spawn: () => 0.1
  },
  victim: {
    text: ({ backgrounds }) =>
      decorateText({
        label: 'victim',
        tooltip: window.dice.choice(backgrounds)
      }),
    conflicts: perspective,
    spawn: () => 0.5
  },
  supporting: {
    text: ({ backgrounds }) =>
      decorateText({
        label: 'supporting',
        tooltip: window.dice.choice(backgrounds)
      }),
    conflicts: perspective,
    spawn: () => 0.5
  },
  against: {
    text: ({ backgrounds }) =>
      decorateText({
        label: 'against',
        tooltip: window.dice.choice(backgrounds)
      }),
    conflicts: perspective,
    spawn: () => 0.5
  }
}

const rollQuirks = ({
  loc,
  npc,
  context
}: {
  loc: Province
  npc: NPC
  context?: ThreadContext
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
    respectful: personality.some(trait => trait === 'respectful'),
    cautious: personality.some(trait => trait === 'cautious'),
    xenophobic: personality.some(trait => trait === 'xenophobic'),
    youthful: age === 'young adult' || age === 'adult',
    youngAdult: age === 'young adult',
    profession,
    sorcerer: profession.includes('sorcerer'),
    official,
    skin: species.traits.skin === 'skin' && !appearance.skin.texture?.includes('long'),
    piercings: species.traits.piercings ?? true,
    horns: species.traits.horns,
    poor: strata === 'lower',
    comfortable: strata === 'middle',
    rich: strata === 'upper',
    backgrounds: loc.backgrounds,
    context
  }
  let count = 2
  const results: NPC['quirks'] = []
  const locals = loc.actors
    .map(i => window.world.actors[i])
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

export const npc__traits = (params: { loc: Province; npc: NPC; context?: ThreadContext }) => {
  const { npc, loc, context } = params
  npc.personality = rollPersonality({ count: 3, role: context?.role })
  npc.quirks = rollQuirks({ npc, loc, context })
}
