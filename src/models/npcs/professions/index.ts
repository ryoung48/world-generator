import { hub__fillSite, hub__isVillage, hub__site } from '../../regions/provinces/hubs'
import { Province } from '../../regions/provinces/types'
import { buildDistribution, counter, WeightedDistribution } from '../../utilities/math'
import { Gender, LifePhase, NPCParams } from '../types'
import { Profession, ProfessionDetails } from './types'

export const professions: Record<Profession, ProfessionDetails> = {
  custom: { strata: 'middle', weight: 0 },
  // lower class
  peasant: { strata: 'lower', urban: false, weight: 10 },
  laborer: { strata: 'lower', urban: true },
  beggar: { strata: 'lower', urban: true },
  criminal: { strata: 'lower', weight: 0.5 },
  servant: { title: 'servant (ordinary)', strata: 'lower' },
  'servant (master)': { strata: 'lower', age: 'veteran', weight: 0.1 },
  sailor: {
    title: 'sailor ({deckhand|deckhand|deckhand|{cannoneer|navigator|helmsman}})',
    strata: 'lower',
    coastal: true,
    urban: true
  },
  'dock worker': { strata: 'lower', coastal: true, urban: true },
  artist: { strata: 'lower', urban: true, weight: 0.2 },
  poet: { strata: 'lower', urban: true, weight: 0.2 },
  musician: { strata: 'lower', urban: true, weight: 0.2 },
  courtesan: { strata: 'lower', urban: true, weight: 0.5 },
  guard: { title: `guard (${hub__site})`, strata: 'lower', urban: true, official: true },
  'monster hunter': {
    title: '{monster|witch|undead} hunter ({itinerant|itinerant|famous})',
    strata: 'lower',
    age: 'veteran',
    weight: 0.1,
    unique: true
  },
  'grave keeper': {
    title: '{grave|cemetary} keeper',
    strata: 'lower',
    urban: true,
    unique: true,
    weight: 0.2
  },
  missionary: { strata: 'lower', culture: 'foreign', urban: true },
  ascetic: { title: 'monk', strata: 'lower', weight: 0.25 },
  'street vendor': { strata: 'lower', urban: true, weight: 0.5 },
  'hedge wizard': {
    title: { male: 'hedge wizard', female: 'hedge witch' },
    strata: 'lower',
    urban: false,
    weight: 0.1,
    unique: true
  },
  'fortune teller': { strata: 'lower', urban: true },
  'soldier (military)': { strata: 'lower', war: true },
  // middle class
  'village elder': { strata: 'middle', urban: false, age: 'master', culture: 'native', weight: 5 },
  gentry: { title: '{gentry|landlord} ({minor|minor|major|fallen})', strata: 'middle' },
  investigator: { strata: 'middle', official: true },
  'tax collector': { strata: 'middle', official: true },
  'guard captain': {
    title: `guard captain (${hub__site})`,
    strata: 'middle',
    urban: true,
    unique: true,
    official: true
  },
  bodyguard: { strata: 'middle', urban: true },
  templar: {
    title: '{templar|inquisitor}',
    strata: 'middle',
    urban: true,
    official: true
  },
  'master criminal': {
    title: 'master {assassin|thief|forger|smuggler}',
    strata: 'middle',
    age: 'veteran',
    urban: true,
    weight: 0.5
  },
  'criminal boss': { strata: 'middle', age: 'veteran', weight: 0.5 },
  innkeeper: { strata: 'middle' },
  priest: { strata: 'middle', official: true },
  abbot: {
    title: { male: 'abbot', female: 'abbess' },
    age: 'veteran',
    strata: 'middle',
    official: true,
    unique: true,
    weight: 0.25
  },
  lawyer: { strata: 'middle', urban: true, official: true },
  scholar: { strata: 'middle', urban: true },
  sorcerer: { title: { male: 'sorcerer', female: 'sorceress' }, strata: 'middle', urban: true },
  'poet (famous)': { strata: 'middle', urban: true, weight: 0.3 },
  'artist (famous)': { strata: 'middle', urban: true, weight: 0.3 },
  'musician (famous)': { strata: 'middle', urban: true, weight: 0.3 },
  'courtesan (famous)': { strata: 'middle', urban: true, weight: 0.3 },
  blacksmith: { strata: 'middle' },
  cobbler: { strata: 'middle', weight: 0.1 },
  tailor: {
    strata: 'middle',
    title: { male: 'tailor', female: 'seamstress' },
    urban: true,
    weight: 0.1
  },
  weaver: { strata: 'middle', weight: 0.1 },
  brewer: { title: '{brewer|vintner|distiller}', strata: 'middle', weight: 0.1 },
  leatherworker: { strata: 'middle', weight: 0.1 },
  shipwright: { strata: 'middle', urban: true, coastal: true },
  jeweler: { title: '{jeweler|silversmith|goldsmith}', strata: 'middle', urban: true },
  butcher: { strata: 'middle', urban: true, weight: 0.1 },
  baker: { strata: 'middle', urban: true, weight: 0.1 },
  herbalist: { title: '{herbalist|physician|apothecary}', strata: 'middle', weight: 0.5 },
  alchemist: { strata: 'middle', urban: true, weight: 0.5 },
  artificer: { strata: 'middle', urban: true, weight: 0.1 },
  merchant: { strata: 'middle' },
  shopkeeper: { strata: 'middle', urban: true, weight: 0.5 },
  banker: { strata: 'middle', age: 'veteran', urban: true, weight: 0.5 },
  'caravan trader': { strata: 'middle', urban: true, culture: 'foreign', weight: 0.5 },
  'caravan master': {
    strata: 'middle',
    urban: true,
    culture: 'foreign',
    age: 'veteran',
    weight: 0.5
  },
  'ship captain (merchant)': { strata: 'middle', coastal: true, urban: true, age: 'veteran' },
  'dock master': {
    title: '{dock|harbor} master',
    strata: 'middle',
    coastal: true,
    urban: true,
    age: 'veteran'
  },
  'officer (military)': { strata: 'middle', war: true },
  // upper class
  aristocrat: {
    title: 'aristocrat ({minor|minor|major|disgraced})',
    strata: 'upper',
    urban: true,
    weight: 6
  },
  oligarch: { strata: 'upper', age: 'veteran', urban: true, official: true },
  'crime lord': { strata: 'upper', age: 'veteran', unique: true, urban: true, weight: 0.1 },
  magistrate: {
    title: `magistrate (${hub__site})`,
    age: 'master',
    strata: 'upper',
    urban: true,
    unique: true,
    official: true
  },
  archmage: {
    title: '{archmage|court wizard}',
    strata: 'upper',
    urban: true,
    unique: true,
    age: 'master',
    weight: 0.1
  },
  'high priest': {
    strata: 'upper',
    urban: true,
    unique: true,
    official: true,
    age: 'master',
    weight: 0.1
  },
  'templar (grandmaster)': {
    strata: 'upper',
    urban: true,
    unique: true,
    age: 'master',
    weight: 0.1
  },
  'general (military)': { strata: 'upper', urban: true, unique: true, war: true, age: 'master' },
  'exiled pretender': {
    strata: 'upper',
    urban: true,
    unique: true,
    culture: 'foreign',
    weight: 0.1
  },
  'ethnarch (minority)': {
    strata: 'upper',
    urban: true,
    unique: true,
    age: 'master',
    culture: 'foreign',
    weight: 0.1
  },
  diplomat: {
    title: 'courtier ({diplomat|ambassador})',
    strata: 'upper',
    urban: true,
    unique: true,
    age: 'veteran',
    culture: 'foreign'
  },
  courtier: {
    title: 'courtier ({statesman|spymaster|kingmaker|marshal|chancellor|steward|majordomo})',
    strata: 'upper',
    urban: true,
    unique: true,
    official: true,
    age: 'veteran'
  },
  prince: {
    title: { male: 'prince', female: 'princess' },
    strata: 'upper',
    culture: 'native',
    urban: true,
    capital: true,
    unique: true,
    age: 'novice'
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
  lower: { lower: 0.1, middle: 0.7, upper: 0.2 },
  middle: { lower: 0, middle: 0.65, upper: 0.35 },
  upper: { lower: 0, middle: 0.35, upper: 0.65 }
}

const distribution = (params: {
  strata: ProfessionDetails['strata']
  loc: Province
  target: number
}) => {
  const { strata, loc, target } = params
  const rural = hub__isVillage(loc.hub)
  const used = counter(loc.actors.map(i => window.world.npcs[i].profession.key))
  const dist = Object.entries(professions)
    .filter(([_, profession]) => profession.strata === strata)
    .map(([_tag, profession]) => {
      const tag = _tag as Profession
      const urbanCheck = profession.urban === undefined || profession.urban === !rural
      const coastalCheck =
        profession.coastal === undefined || profession.coastal === loc.hub.coastal
      const uniqueCheck = !profession.unique || !used[tag]
      const warCheck = !profession.war || loc.conflict === 'war'
      const capitalCheck = !profession.capital || loc.capital
      const weight = (profession.weight ?? 1) * 10 ** -(used[tag] ?? 0)
      return {
        v: tag,
        w: urbanCheck && coastalCheck && uniqueCheck && warCheck && capitalCheck ? weight : 0
      }
    })
  return buildDistribution(dist, target)
}

const stratified = (params: { loc: Province; social: StrataMap<number> }) => {
  const { loc, social } = params
  const dist = [
    ...distribution({ strata: 'lower', loc, target: social.lower }),
    ...distribution({ strata: 'middle', loc, target: social.middle }),
    ...distribution({ strata: 'upper', loc, target: social.upper })
  ]
  return window.dice.weightedChoice(dist)
}

export const profession__spawn = (params: {
  loc: Province
  gender: Gender
  context?: NPCParams['context']
  profession?: Profession
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

  const key = params.profession ?? stratified({ loc, social })
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
        { v: 'young adult', w: 0.1 },
        { v: 'adult', w: 0.4 },
        { v: 'middle age', w: 0.4 },
        { v: 'old', w: 0.1 }
      ]
    )
  }
}
