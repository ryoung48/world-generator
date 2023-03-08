import { cssColors } from '../../../components/theme/colors'
import { hub__fillSite, hub__isVillage, hub__site } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { ThreadContext } from '../../threads/types'
import { buildDistribution, WeightedDistribution } from '../../utilities/math'
import { decorateText } from '../../utilities/text/decoration'
import { Gender, LifePhase } from '../types'
import { Profession, ProfessionDetails } from './types'

export const professions: Record<Profession, ProfessionDetails> = {
  custom: { strata: 'middle', weight: 0 },
  // lower class
  peasant: { strata: 'lower', urban: false, weight: 10 },
  'village elder': { strata: 'lower', urban: false, age: 'master', culture: 'native' },
  laborer: { strata: 'lower', urban: true },
  beggar: { strata: 'lower', urban: true },
  servant: { title: 'servant ({ordinary|indentured})', strata: 'lower' },
  'servant (master)': { strata: 'lower', age: 'veteran', weight: 0.1 },
  sailor: {
    title: 'sailor ({deckhand|deckhand|deckhand|{cannoneer|navigator|helmsman}})',
    strata: 'lower',
    coastal: true,
    urban: true
  },
  'dock worker': { strata: 'lower', coastal: true, urban: true },
  artist: { strata: 'lower', urban: true, weight: 0.2 },
  musician: { strata: 'lower', urban: true, weight: 0.2 },
  courtesan: { strata: 'lower', urban: true },
  criminal: { strata: 'lower' },
  mercenary: {
    title: `mercenary ({${decorateText({
      label: 'barbarian',
      tooltip: '{berserker|tempest|fanatic}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'chanter',
      tooltip: '{beckoner|skald|troubadour}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'cipher',
      tooltip: '{witch|beguiler|soul blade|wild mind}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'druid',
      tooltip: '{elements|rejuvenation|shifter|decay}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'fighter',
      tooltip: '{mage-slayer|devoted|unbroken|tactician}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'monk',
      tooltip: '{sage|shadowdancer|kensai|brewmaster}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'paladin',
      tooltip: '{protection|compassion|justice|dread}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'cleric',
      tooltip: '{death|life|war|knowledge|order}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'ranger',
      tooltip: '{marksman|stalker|arcana|beast master}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'rogue',
      tooltip: '{assassin|duelist|trickster|debonaire}',
      color: cssColors.subtitle
    })}|${decorateText({
      label: 'wizard',
      tooltip: '{conjuration|enchantment|evocation|illusion|transmutation}',
      color: cssColors.subtitle
    })}})`,
    strata: 'lower',
    weight: 0
  },
  guard: { title: `guard (${hub__site})`, strata: 'lower', urban: true, official: true },
  'monster hunter': {
    title: '{monster|witch|undead} hunter ({itinerant|itinerant|famous})',
    strata: 'lower',
    age: 'veteran',
    weight: 0.25,
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
  // middle class
  gentry: { title: '{gentry|landlord} ({minor|minor|major|fallen})', strata: 'middle' },
  investigator: { strata: 'middle', official: true },
  'tax collector': { strata: 'middle', official: true },
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
  'master criminal': {
    title: 'master {assassin|thief|forger|smuggler}',
    strata: 'middle',
    age: 'veteran',
    urban: true
  },
  'criminal boss': { strata: 'middle', age: 'veteran' },
  innkeeper: { strata: 'middle' },
  priest: { strata: 'middle', official: true },
  lawyer: { strata: 'middle', urban: true, official: true },
  scholar: { strata: 'middle', urban: true },
  sorcerer: { strata: 'middle' },
  'artist (famous)': { strata: 'middle', urban: true, weight: 0.3 },
  'musician (famous)': { strata: 'middle', urban: true, weight: 0.3 },
  'courtesan (famous)': { strata: 'middle', urban: true, weight: 0.3 },
  artisan: { strata: 'middle', urban: true },
  herbalist: { title: '{herbalist|physician}', strata: 'middle', weight: 0.5 },
  alchemist: { strata: 'middle', urban: true, weight: 0.5 },
  artificer: { strata: 'middle', urban: true, weight: 0.1 },
  merchant: { strata: 'middle' },
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
  'ship captain (pirate)': {
    strata: 'middle',
    coastal: true,
    urban: true,
    villain: true,
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
  oligarch: { strata: 'upper', age: 'veteran', urban: true, official: true },
  magistrate: {
    title: `magistrate (${hub__site})`,
    age: 'master',
    strata: 'upper',
    urban: true,
    official: true
  },
  'merchant prince': { strata: 'upper', urban: true, age: 'master', weight: 0.1 },
  archmage: { strata: 'upper', urban: true, age: 'master', weight: 0.1 },
  'high priest': { strata: 'upper', urban: true, official: true, age: 'master', weight: 0.1 },
  'templar (grandmaster)': { strata: 'upper', urban: true, age: 'master', weight: 0.1 },
  'exiled pretender': { strata: 'upper', urban: true, culture: 'foreign', weight: 0.1 },
  'ethnarch (minority)': {
    strata: 'upper',
    urban: true,
    age: 'master',
    culture: 'foreign',
    weight: 0.1
  },
  aristocrat: {
    title: 'aristocrat ({minor|minor|major|disgraced})',
    strata: 'upper',
    urban: true,
    weight: 6
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
  middle: { lower: 0.3, middle: 0.4, upper: 0.3 },
  upper: { lower: 0, middle: 0.4, upper: 0.6 }
}

const distribution = (params: {
  strata: ProfessionDetails['strata']
  loc: Province
  context?: ThreadContext
  target: number
}) => {
  const { strata, loc, context, target } = params
  const rural = hub__isVillage(loc.hub)
  return buildDistribution(
    Object.entries(professions)
      .filter(([_, profession]) => profession.strata === strata)
      .map(([_tag, profession]) => {
        const tag = _tag as Profession
        const urbanCheck = profession.urban === undefined || profession.urban === !rural
        const coastalCheck =
          profession.coastal === undefined || profession.coastal === loc.hub.coastal
        const uniqueCheck =
          !profession.unique ||
          loc.actors.map(i => window.world.actors[i]).every(actor => actor.profession.key !== tag)
        const villainCheck = !profession.villain || context?.role === 'rival'
        const weight = profession.weight ?? 1
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

  const key = params.profession ?? stratified({ loc, social, context })
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
