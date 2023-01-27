import { hub__fillSite, hub__isVillage, hub__site } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { backgrounds } from '../../threads/backgrounds'
import { ThreadContext } from '../../threads/types'
import { buildDistribution, WeightedDistribution } from '../../utilities/math'
import { Gender, LifePhase } from '../types'
import { Profession, ProfessionDetails } from './types'

export const professions: Record<Profession, ProfessionDetails> = {
  // lower class
  peasant: { strata: 'lower', urban: false, weight: 10 },
  'clan head': {
    title: { male: 'clan patriarch', female: 'clan matriarch' },
    strata: 'lower',
    age: 'master',
    weight: 0.2
  },
  'village elder': { strata: 'lower', urban: false, age: 'master', culture: 'native' },
  laborer: { strata: 'lower', urban: true },
  beggar: { strata: 'lower', urban: true },
  servant: { title: 'servant ({ordinary|indentured|master})', strata: 'lower' },
  sailor: {
    title: 'sailor ({deckhand|deckhand|deckhand|{cannoneer|navigator|helmsman}})',
    strata: 'lower',
    coastal: true,
    urban: true
  },
  'dock worker': { strata: 'lower', coastal: true, urban: true },
  actor: {
    title: { male: 'actor', female: 'actress' },
    strata: 'lower',
    urban: true,
    weight: 0.2
  },
  singer: { strata: 'lower', urban: true, weight: 0.2 },
  poet: { strata: 'lower', urban: true, weight: 0.2 },
  artist: { strata: 'lower', urban: true, weight: 0.2 },
  musician: { strata: 'lower', urban: true, weight: 0.2 },
  courtesan: { strata: 'lower', urban: true },
  criminal: { strata: 'lower' },
  'bandit warlord': { strata: 'lower', urban: false, villain: true, age: 'veteran' },
  'tomb robber': {
    title: '{tomb|grave} robber',
    strata: 'lower',
    weight: 0
  },
  'ruins explorer': { strata: 'lower', weight: 0 },
  guard: { title: `guard (${hub__site})`, strata: 'lower', urban: true, official: true },
  'monster hunter': {
    title: '{monster|witch|undead} hunter ({itinerant|itinerant|famous})',
    strata: 'lower',
    age: 'veteran'
  },
  chef: { strata: 'lower' },
  waiter: { title: { male: 'waiter', female: 'waitress' }, strata: 'lower' },
  bartender: { strata: 'lower' },
  'grave keeper': {
    title: '{grave|cemetary} keeper',
    strata: 'lower',
    urban: true
  },
  'sorcerer (petty)': { strata: 'lower', urban: false },
  'clergy (petty)': { strata: 'lower', official: true },
  missionary: { strata: 'lower', culture: 'foreign', urban: true },
  'merchant (petty)': { strata: 'lower' },
  'bureaucrat (petty)': {
    strata: 'lower',
    urban: false,
    official: true
  },
  coachman: { strata: 'lower', urban: true },
  archivist: { strata: 'lower', urban: true },
  beastmaster: { strata: 'lower', age: 'veteran', urban: true, weight: 0.5 },
  // middle class
  'ruler (rural)': {
    title: 'ruler (village)',
    strata: 'middle',
    urban: false,
    unique: true,
    age: 'veteran',
    culture: 'native'
  },
  gentry: { title: '{gentry|landlord}', strata: 'middle', urban: true },
  'visiting gentry': {
    strata: 'middle',
    urban: false,
    age: 'veteran'
  },
  'bureaucrat (minor)': {
    strata: 'middle',
    urban: true,
    official: true
  },
  'bureaucrat (major)': {
    strata: 'middle',
    urban: true,
    official: true
  },
  'guard captain': {
    title: `guard captain (${hub__site})`,
    strata: 'middle',
    urban: true,
    official: true
  },
  bodyguard: { strata: 'middle', urban: true },
  templar: {
    title: '{templar|inquisitor}',
    strata: 'middle',
    urban: true,
    official: true
  },
  'criminal (boss, minor)': { strata: 'middle', age: 'veteran' },
  'criminal (boss, major)': { strata: 'middle', age: 'veteran', urban: true },
  'stable master': { strata: 'middle', age: 'veteran', urban: true },
  innkeeper: { strata: 'middle' },
  'clergy (minor)': { strata: 'middle', official: true },
  'clergy (major)': {
    strata: 'middle',
    urban: true,
    official: true,
    age: 'veteran'
  },
  lawyer: { strata: 'middle', urban: true, official: true },
  scholar: { strata: 'middle', urban: true },
  'sorcerer (minor)': { strata: 'middle' },
  'sorcerer (major)': { strata: 'middle', urban: true },
  'singer (famous)': { strata: 'middle', urban: true, weight: 0.25 },
  'poet (famous)': { strata: 'middle', urban: true, weight: 0.25 },
  'artist (famous)': { strata: 'middle', urban: true, weight: 0.25 },
  'musician (famous)': { strata: 'middle', urban: true, weight: 0.25 },
  'courtesan (famous)': {
    title: 'courtesan ({famous|madame})',
    strata: 'middle',
    urban: true
  },
  baker: { strata: 'middle', urban: true, weight: 0.1 },
  butcher: { strata: 'middle', urban: true, weight: 0.1 },
  brewer: { strata: 'middle', urban: true, weight: 0.1 },
  blacksmith: { strata: 'middle', weight: 0.5 },
  silversmith: { strata: 'middle', urban: true, weight: 0.1 },
  goldsmith: { strata: 'middle', weight: 0.1, urban: true },
  glassblower: { strata: 'middle', urban: true, weight: 0.1 },
  jeweler: { strata: 'middle', urban: true, weight: 0.5 },
  leatherworker: { strata: 'middle', urban: true, weight: 0.5 },
  woodcarver: { strata: 'middle', weight: 0.1 },
  cobbler: { strata: 'middle', urban: true, weight: 0.1 },
  weaver: { strata: 'middle', weight: 0.1 },
  tailor: {
    title: { male: 'tailor', female: 'seamstress' },
    strata: 'middle',
    weight: 0.5,
    urban: true
  },
  herbalist: { strata: 'middle', weight: 0.5 },
  alchemist: { strata: 'middle', urban: true, weight: 0.5 },
  surgeon: { strata: 'middle', weight: 0.1 },
  artificer: { strata: 'middle', urban: true, weight: 0.1 },
  'merchant (minor)': { strata: 'middle' },
  'merchant (major)': {
    strata: 'middle',
    urban: true,
    age: 'veteran'
  },
  'caravan trader': { strata: 'middle', urban: true, culture: 'foreign' },
  'caravan master': {
    strata: 'middle',
    urban: true,
    culture: 'foreign',
    age: 'veteran'
  },
  'ship captain': {
    strata: 'middle',
    coastal: true,
    urban: true,
    age: 'veteran'
  },
  'dock master': {
    title: '{dock|harbor} master',
    strata: 'middle',
    coastal: true,
    urban: true,
    age: 'veteran'
  },
  // upper class
  'ruler (urban)': {
    title: `ruler (${hub__site})`,
    strata: 'upper',
    urban: true,
    unique: true,
    culture: 'native',
    age: 'master'
  },
  'guild master': {
    title: 'guild master (artisan)',
    strata: 'upper',
    urban: true,
    weight: 0.1,
    official: true,
    age: 'master'
  },
  'sorcerer (great)': {
    title: 'archmage',
    strata: 'upper',
    urban: true,
    age: 'master'
  },
  'clergy (great)': {
    strata: 'upper',
    urban: true,
    official: true,
    age: 'master'
  },
  'templar (grandmaster)': {
    strata: 'upper',
    urban: true,
    weight: 0.1
  },
  ethnarch: {
    title: 'ethnarch (minority)',
    strata: 'upper',
    urban: true,
    age: 'master',
    culture: 'foreign'
  },
  'merchant (prince)': { strata: 'upper', urban: true, age: 'veteran' },
  'aristocrat (lord)': {
    title: {
      male: 'aristocrat ({minor|minor|major}, lord)',
      female: 'aristocrat ({minor|minor|major}, lady)'
    },
    strata: 'upper',
    urban: true,
    age: 'veteran',
    weight: 3
  },
  'aristocrat (heir)': {
    title: {
      male: 'aristocrat ({minor|minor|major}, {gentleman|scion})',
      female: 'aristocrat ({minor|minor|major}, {maiden|scion})'
    },
    strata: 'upper',
    urban: true,
    age: 'novice',
    weight: 3
  },
  diplomat: {
    title: 'courtier ({diplomat|ambassador})',
    strata: 'upper',
    urban: true,
    age: 'veteran',
    culture: 'foreign'
  },
  courtier: {
    title: 'courtier ({statesman|spymaster|kingmaker|marshal|chancellor|steward|majordomo})',
    strata: 'upper',
    urban: true,
    official: true,
    age: 'veteran'
  }
}

const ages: Record<ProfessionDetails['age'], WeightedDistribution<LifePhase>> = {
  novice: [{ v: 'young adult', w: 1 }],
  veteran: [
    { v: 'adult', w: 0.5 },
    { v: 'middle age', w: 0.25 },
    { v: 'old', w: 0.25 }
  ],
  master: [
    { v: 'middle age', w: 0.5 },
    { v: 'old', w: 0.5 }
  ]
}

type StrataMap<T> = Record<ProfessionDetails['strata'], T>

const relations: StrataMap<StrataMap<number>> = {
  lower: { lower: 0.4, middle: 0.6, upper: 0 },
  middle: { lower: 0.1, middle: 0.5, upper: 0.4 },
  upper: { lower: 0, middle: 0.2, upper: 0.8 }
}

const distribution = (params: {
  strata: ProfessionDetails['strata']
  loc: Province
  context?: ThreadContext
  target: number
}) => {
  const { strata, loc, context, target } = params
  const rural = hub__isVillage(loc.hub)
  const cast = backgrounds[context?.background]?.actors?.[context?.role]
  return buildDistribution(
    Object.entries(professions)
      .filter(
        ([tag, profession]) =>
          profession.strata === strata && (cast?.includes?.(tag as Profession) ?? true)
      )
      .map(([_tag, profession]) => {
        const tag = _tag as Profession
        const urbanCheck = profession.urban === undefined || profession.urban === !rural
        const coastalCheck =
          profession.coastal === undefined || profession.coastal === loc.hub.coastal
        const uniqueCheck =
          !profession.unique ||
          loc.actors.map(i => window.world.actors[i]).every(actor => actor.profession.key !== tag)
        const villainCheck = !profession.villain || context?.role === 'rival'
        const weight = Math.max(
          ...loc.backgrounds.map(background => backgrounds[background].professions?.[tag] ?? 0),
          profession.weight ?? 1
        )
        return { v: tag, w: urbanCheck && coastalCheck && uniqueCheck && villainCheck ? weight : 0 }
      }),
    target
  )
}

const stratified = (params: {
  loc: Province
  context: ThreadContext
  social: StrataMap<number>
}) => {
  const { loc, social, context } = params
  return window.dice.weightedChoice([
    ...distribution({ strata: 'lower', loc, context, target: social.lower }),
    ...distribution({ strata: 'middle', loc, context, target: social.middle }),
    ...distribution({ strata: 'upper', loc, context, target: social.upper })
  ])
}

export const profession__spawn = (params: {
  loc: Province
  gender: Gender
  context?: ThreadContext
}) => {
  const { loc, gender, context } = params
  const strata = professions[context?.ref?.profession?.key]?.strata
  const social = relations[strata] ?? {
    lower: 1,
    middle: 1,
    upper: 0.5
  }
  const rural = hub__isVillage(loc.hub)
  if (rural) social.lower += social.upper
  const key = stratified({ loc, social, context })
  const profession = professions[key]
  const title = hub__fillSite({
    text: !profession.title
      ? key
      : typeof profession.title === 'string'
      ? profession.title
      : gender === 'male'
      ? profession.title.male
      : profession.title.female,
    hub: loc.hub
  })

  return {
    key,
    title: window.dice.spin(title),
    culture: profession.culture,
    age: window.dice.weightedChoice<LifePhase>(
      ages[profession.age] ?? [
        { v: 'young adult', w: 0.2 },
        { v: 'adult', w: 0.45 },
        { v: 'middle age', w: 0.3 },
        { v: 'old', w: 0.05 }
      ]
    )
  }
}
