import { PROVINCE } from '../provinces'
import { COLOR } from '../utilities/color'
import { TEXT } from '../utilities/text'
import { TRAIT } from '../utilities/traits'
import { LANGUAGE } from './languages'
import { SPECIES } from './species'
import { Species } from './species/types'
import { Culture, CultureColorParams, CultureSpawnParams, CultureValues } from './types'

const values: CultureValues = {
  adaptation: {
    conflicts: ['purity', 'tradition'],
    text: 'embracing foreign customs and traditions'
  },
  aesthetic: { text: 'beauty in material goods and architecture' },
  ancestry: { text: 'bloodline and family heritage' },
  arcana: { text: 'magical prowess and occult ability' },
  austerity: {
    conflicts: ['decadence', 'wealth'],
    text: 'ascetic unworldliness and pious poverty'
  },
  beasts: { text: 'the ability to train and work alongside beasts' },
  bravery: { text: 'courage and valiance in danger' },
  charity: { text: 'sharing wealth and goods with others' },
  cultivation: { text: 'agriculture, gardens, and mastery over plants' },
  decadence: { conflicts: ['austerity'], text: 'personal indulgence and luxuriant pleasure' },
  diplomacy: {
    conflicts: ['might', 'domination'],
    text: 'pacifism and peaceful resolution of problems'
  },
  domination: {
    text: 'conquest and the enslavement of others',
    conflicts: ['diplomacy', 'independence']
  },
  etiquette: { text: 'eloquence, courtesy, and social expertise' },
  exploration: { text: 'exploring the unknown and discovering secrets' },
  forgiveness: { conflicts: ['vengeance'], text: 'showing mercy to enemies' },
  guile: { conflicts: ['honor'], text: 'cunning and the ability to trick others' },
  hierarchy: { conflicts: ['independence'], text: 'social stratification and class distinctions' },
  history: { text: 'remembrance of the past and memorializing history' },
  honor: {
    conflicts: ['guile', 'intrigue'],
    text: 'honesty and truthfulness in speech and action'
  },
  hospitality: { text: 'generosity and welcoming of strangers' },
  humility: { text: 'self-effacement and modesty' },
  imperialism: { text: "spreading one's culture and religion" },
  independence: {
    conflicts: ['hierarchy', 'domination'],
    text: 'individual rights and freedom of action; slavery is frowned upon'
  },
  industry: { conflicts: ['tradition'], text: 'ingenuity and technological advancement' },
  intellect: { text: 'education and knowledge-seeking' },
  intrigue: { conflicts: ['honor'], text: 'scheming subtly against enemies or rivals' },
  justice: { text: 'fairness and impartiality in decision-making' },
  legacy: { text: 'building things in service of their posterity' },
  legalism: { text: 'strict adherence to the law and order' },
  loyalty: { text: 'faithfulness towards friends and figures of authority' },
  lust: { text: 'seductive charm and sexual license; polygamy is common' },
  might: { conflicts: ['diplomacy'], text: 'aggression, raw strength, and martial prowess' },
  nature: { text: 'harmony with nature and existing life' },
  perfection: { text: "excellence in one's profession or trade" },
  philosophy: { text: 'abstract thought and contemplation' },
  purification: { text: 'purging evil and expelling the wicked' },
  purity: { conflicts: ['adaptation'], text: 'ethnic purity of blood and culture' },
  revanchism: { text: 'restoring some real or imagined glorious past' },
  sacrifice: { text: "personal sacrifice for one's causes or purposes" },
  seafaring: { constraints: { coastal: true }, text: 'expertise in navigation and living at sea' },
  stewardship: { text: 'guardianship of their own land and holy sites' },
  stoicism: { text: 'patience and restraint in the face of adversity' },
  tenacity: { text: 'persevering and surviving against all odds' },
  tradition: { conflicts: ['adaptation', 'industry'], text: 'submission to the collective norms' },
  vengeance: { conflicts: ['forgiveness'], text: 'execution of just vendettas' },
  wealth: { conflicts: ['austerity'], text: 'prosperity and accruing material wealth' },
  zeal: { text: 'piety and devotion to religious ideals' }
}

const coloration = (target?: [number, number]) => {
  const space = target ?? [0, 360]
  const hue = window.dice.randint(...space)
  const saturation = window.dice.randint(30, 70)
  const lum = window.dice.randint(50, 60)
  return `hsl(${hue}, ${saturation}%, ${lum}%)`
}

export const CULTURE = {
  color: ({ culture, opacity = 1 }: CultureColorParams) =>
    culture.display.color.replace('%)', `%, ${opacity})`),
  describe: (culture: Culture) => {
    const { skin } = culture.appearance
    const species = culture.species
    const region = CULTURE.origin(culture)
    const climate = PROVINCE.climate(region)
    const content = [
      {
        label: 'appearance',
        text: `${TEXT.formatters.list(skin.colors, 'or')} ${SPECIES.lookup[species].traits.skin} ${
          skin.texture ? ` (${skin.texture})` : ''
        }`
      },
      { label: 'fashion', text: culture.fashion.scheme },
      {
        label: 'values',
        text: culture.values
          .map(value =>
            TEXT.decorate({ label: value, tooltip: CULTURE.values[value].text.toString() })
          )
          .join(', ')
      }
    ]
    return {
      title: culture.name,
      subtitle: `(${culture.idx}) ${`${species} (${climate}, ${culture.religion})`}`,
      content
    }
  },
  neighbors: (culture: Culture) =>
    culture.neighbors.map(neighbor => window.world.cultures[neighbor]),
  origin: (culture: Culture) => window.world.provinces[culture.provinces[0]],
  provinces: (culture: Culture) =>
    culture.provinces.map(province => window.world.provinces[province]),
  spawn: ({ provinces }: CultureSpawnParams) => {
    const origin = provinces[0]
    const species: Species =
      provinces.length < 5
        ? window.dice.weightedChoice([
            { w: 3, v: 'human' },
            { w: 1, v: 'orc' },
            { w: 1, v: 'dwarf' },
            { w: 1, v: 'orlan' },
            { w: 1, v: 'elf' },
            { w: 1, v: 'verdant' },
            { w: 1, v: 'lithic' },
            { w: 1, v: 'satyr' },
            { w: 1, v: 'avian' },
            { w: 1, v: 'feline' },
            { w: 1, v: 'bovine' },
            { w: 1, v: 'draconic' },
            { w: 1, v: 'gnoll' }
          ])
        : window.dice.weightedChoice([
            { w: 0.8, v: 'human' },
            { w: 0.1, v: 'orc' },
            { w: 0.1, v: 'dwarf' },
            { w: 0.025, v: 'avian' },
            { w: 0.025, v: 'feline' },
            { w: 0.025, v: 'bovine' },
            { w: 0.025, v: 'draconic' }
          ])
    const language = LANGUAGE.spawn(species)
    const hue = window.dice.randint(0, 360)
    const coastal = PROVINCE.coastal(origin)
    const culture: Culture = {
      idx: window.world.cultures.length,
      name: LANGUAGE.word.unique({ lang: language, key: 'culture' }).word,
      provinces: provinces.map(province => province.idx),
      neighbors: [],
      species,
      language,
      religion: window.dice.weightedChoice([
        { v: 'monotheistic', w: 1 },
        { v: 'dualistic', w: origin.development > 3 ? 0 : 0.25 },
        { v: 'polytheistic', w: origin.development > 3 ? 0 : 0.5 },
        { v: 'animistic', w: origin.development > 2 ? 0 : 1 },
        { v: 'nontheistic', w: 1 },
        { v: 'atheistic', w: origin.development < 2 ? 0 : 0.5 },
        { v: 'pluralistic', w: origin.development < 2 ? 0 : 0.5 },
        { v: 'syncretic', w: 0.25 }
      ]),
      appearance: SPECIES.appearance({ province: origin, species }),
      fashion: {
        color: window.dice.choice([...COLOR.hues]),
        scheme: window.dice.choice([
          'symbols of the dominant faith',
          'family heraldry or clan sigils',
          'important plants or local flora',
          'magically-meaningful runes',
          'decorative script or writing',
          'geometric shapes or patterns',
          'abstract, swirling, chaotic designs',
          'dull, natural, earthen colors',
          'intensely bright, clashing colors',
          'reds, oranges, and warm hues',
          'bright but complementary colors',
          'intricate weaves of colors',
          'blues, greens, and cool hues',
          'subdued pastels and soft shades',
          'intricate hair styles or braiding',
          'tattoos of some cultural significance',
          'piercings, whether minor or elaborate'
        ])
      },
      values: TRAIT.selection({
        available: CULTURE.values,
        used: window.world.cultures.map(c => c.values).flat(),
        constraints: { coastal },
        samples: 3
      }),
      display: { color: coloration([hue, hue]), hue }
    }
    window.world.cultures.push(culture)
    provinces.forEach(province => {
      province.name = LANGUAGE.word.unique({ lang: language, key: 'region' }).word
      PROVINCE.hub(province).name = LANGUAGE.word.unique({
        lang: language,
        key: 'settlement'
      }).word
      province.culture = culture.idx
    })
    return culture
  },
  values
}
