import { Region } from '../../regions/types'
import { colors__hues, colors__randomHue } from '../../utilities/colors'
import { titleCase } from '../../utilities/text'
import { decorateText } from '../../utilities/text/decoration'
import { climates } from '../../world/climate/types'
import { spawnConstruct } from '../languages/spawn'
import { lang__uniqueName } from '../languages/words'
import { species__appearance } from '../species'
import { Culture, CultureValueDetails } from './types'

export const culture__values: CultureValueDetails = {
  adaptation: { text: 'embracing foreign customs and traditions', conflicts: ['purity'] },
  aesthetic: { text: 'beauty in material goods and architecture', conflicts: ['function'] },
  arcana: { text: 'magical prowess and occult ability' },
  austerity: {
    text: 'ascetic unworldliness and pious poverty',
    conflicts: ['decadence', 'wealth']
  },
  beasts: { text: 'the ability to tame and control wild animals' },
  bravery: { text: 'courage and valiance in danger' },
  charity: { text: 'sharing wealth and goods with others' },
  decadence: { text: 'personal indulgence and luxuriant pleasure', conflicts: ['austerity'] },
  diplomacy: { text: 'pacifism and peaceful resolution of problems', conflicts: ['might'] },
  etiquette: { text: 'eloquence and social expertise' },
  exploration: { text: 'exploring the unknown and discovering secrets' },
  family: { text: 'filial devotion to family and parents' },
  forethought: { text: 'planning and anticipating future events and consequences' },
  forgiveness: { text: 'showing mercy to enemies', conflicts: ['vengeance'] },
  freedom: { text: 'individual rights and localized rule', conflicts: ['hierarchy'] },
  function: { text: 'building things in service of their posterity', conflicts: ['aesthetic'] },
  hierarchy: { text: 'social stratification and the rule of the elite', conflicts: ['freedom'] },
  history: { text: 'remembrance of the past and memorializing history' },
  honor: { text: 'honesty and truthfulness in speech and action', conflicts: ['subterfuge'] },
  hospitality: { text: 'generosity and welcoming of strangers' },
  humility: { text: 'self-effacement and modesty' },
  industry: { text: "hard work and diligence in one's profession" },
  intellect: { text: 'intellectual curiosity and the pursuit of knowledge' },
  imperialism: { text: "spreading one's culture and religion" },
  justice: { text: 'fairness and impartiality in decision-making' },
  logic: { text: 'humanistic reason and "rational" religion' },
  loyalty: { text: 'faithfulness towards friends and figures of authority' },
  lust: { text: 'seductive charm and sexual license' },
  might: { text: 'aggression, raw strength, and martial prowess', conflicts: ['diplomacy'] },
  nature: { text: 'harmony with nature and existing life' },
  legalism: { text: 'strict adherence to the law and order' },
  philosophy: { text: 'abstract thought and contemplation' },
  purity: { text: 'ethnic purity of blood and culture', conflicts: ['adaptation'] },
  revanchism: { text: 'restoring some real or imagined glorious past' },
  sacrifice: { text: "personal sacrifice for one's causes or purposes" },
  seafaring: { text: 'expertise in navigation and living at sea', coastal: true },
  stewardship: { text: 'guardianship of their own land and holy sites' },
  stoicism: { text: 'patience and restraint in the face of adversity' },
  subterfuge: { text: 'subtlety and indirectness of action' },
  success: { text: "excellence in one's profession or trade" },
  tenacity: { text: 'persevering and surviving against all odds' },
  vengeance: { text: 'execution of just vendettas', conflicts: ['forgiveness'] },
  wealth: { text: 'prosperity and accruing material wealth', conflicts: ['austerity'] },
  zeal: { text: 'piety and devotion to religious ideals' }
}

export const culture__spawn = (region: Region) => {
  const idx = window.world.cultures.length
  const hue = window.dice.choice([...colors__hues])
  const culture: Culture = {
    idx,
    origin: region.idx,
    tag: 'culture',
    zone: climates[region.climate].zone,
    side: region.side,
    neighbors: [],
    fashion: {
      color: hue
    },
    display: colors__randomHue(hue),
    regions: [],
    name: '',
    species: 'human',
    lineage: window.dice.random > 0.1 ? 'male' : 'female',
    values: []
  }
  window.world.cultures.push(culture)
  return culture
}

export const culture__finalize = (culture: Culture, species: Culture['species']) => {
  culture.species = species
  const civil = culture__regions(culture).filter(r => r.civilized).length * 2
  culture.civilized = civil > culture.regions.length
  culture.language = spawnConstruct(culture)
  culture.name = lang__uniqueName({ lang: culture.language, key: 'culture' })
  species__appearance(culture)
  culture.motifs = window.dice.choice([
    'culturally important animals',
    "rulers' faces or heraldry",
    'symbols of the dominant faith',
    'family heraldry or clan sigils',
    'important plants or local flora',
    'magically-meaningful runes',
    'decorative script or writing',
    'geometric shapes or patterns'
  ])
  culture.fashion.scheme = window.dice.choice([
    'dull, natural, earthen colors',
    'intensely bright, clashing colors',
    'reds, oranges, and warm hues',
    'bright but complementary colors',
    'intricate weaves of colors',
    'blues, greens, and cool hues',
    'monochrome shades',
    'subdued pastels and soft shades'
  ])
  // values
  const coastal = culture__coastal(culture)
  while (culture.values.length < 4) {
    const dist = Object.entries(culture__values).map(([_key, value]) => {
      const key = _key as keyof typeof culture__values
      const coast = value.coastal === undefined || value.coastal === coastal
      const used = culture.values.includes(key)
      const conflict = value.conflicts && value.conflicts.some(c => culture.values.includes(c))
      return { v: key, w: coast && !used && !conflict ? 1 : 0 }
    })
    const value = window.dice.weightedChoice(dist)
    culture.values.push(value)
  }
}

export const culture__regions = (culture: Culture) =>
  culture.regions.map(r => window.world.regions[r])
export const culture__coastal = (culture: Culture) => culture__regions(culture).some(r => r.coastal)
export const culture__subCulture = (culture: Culture, nation: Region) => {
  // increment region count
  culture.regions.push(nation.idx)
  // set the native species for the region
  nation.culture.ruling = culture.idx
  nation.culture.native = culture.idx
}
export const culture__culturize = (culture: Culture, nation: Region) => {
  // generate a regional name
  nation.name = lang__uniqueName({ lang: culture.language, key: 'region' })
  // generate settlement names
  nation.provinces
    .map(t => window.world.provinces[t])
    .forEach(settlement => {
      settlement.name ||= lang__uniqueName({ lang: culture.language, key: 'settlement' })
    })
}

export const culture__decorations = (params: {
  culture: Culture
  title?: boolean
  color?: string
}) => {
  const { culture, title, color } = params
  return decorateText({
    label: title ? titleCase(culture.name) : culture.name.toLowerCase(),
    link: culture,
    tooltip: culture.species,
    color
  })
}
