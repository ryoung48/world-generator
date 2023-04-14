import { cssColors } from '../../../components/theme/colors'
import { hub__fillSite, hub__isVillage, hub__site } from '../../regions/hubs'
import { Province } from '../../regions/provinces/types'
import { buildDistribution, WeightedDistribution } from '../../utilities/math'
import { decorateText } from '../../utilities/text/decoration'
import { accessories, armor, weapons } from '../equipment'
import { Gender, LifePhase, NPC, NPCParams } from '../types'
import { Profession, ProfessionDetails } from './types'

export const professions: Record<Profession, ProfessionDetails> = {
  custom: { strata: 'middle', weight: 0 },
  // lower class
  peasant: { strata: 'lower', urban: false, weight: 10 },
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
  poet: { strata: 'lower', urban: true, weight: 0.2 },
  musician: { strata: 'lower', urban: true, weight: 0.2 },
  courtesan: { strata: 'lower', urban: true, weight: 0.5 },
  criminal: { strata: 'lower', weight: 0.5 },
  // adventurer
  barbarian: {
    title: decorateText({
      label: 'barbarian',
      tooltip: '{berserker|tempest|fanatic}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const selected = window.dice.choice([armor.heavy, armor.medium])
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: selected() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: selected === armor.heavy }) }
      ]
      if (window.dice.flip) {
        equipment.push({ slot: 'two-handed', tier: 0, name: weapons.heavy() })
      } else {
        equipment.push({ slot: 'mainhand', tier: 0, name: weapons.medium() })
        equipment.push({ slot: 'offhand', tier: 0, name: weapons.medium() })
      }
      return equipment
    },
    weight: 0
  },
  chanter: {
    title: decorateText({
      label: 'chanter',
      tooltip: '{beckoner|skald|troubadour}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: window.dice.choice([armor.medium, armor.light])() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.light() },
        { slot: 'offhand', tier: 0, name: window.dice.spin('instrument') }
      ]
      return equipment
    },
    weight: 0
  },
  cipher: {
    title: decorateText({
      label: 'cipher',
      tooltip: '{witch|beguiler|soul blade|wild mind}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.medium() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.light() },
        { slot: 'offhand', tier: 0, name: weapons.light() }
      ]
      return equipment
    },
    weight: 0
  },
  druid: {
    title: decorateText({
      label: 'druid',
      tooltip: '{elements|rejuvenation|shifter|decay}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.light() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.implements() },
        { slot: 'offhand', tier: 0, name: weapons.sorcery() }
      ]
      return equipment
    },
    weight: 0
  },
  fighter: {
    title: decorateText({
      label: 'fighter',
      tooltip: '{mage-slayer|devoted|unbroken|tactician}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.heavy() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: true }) }
      ]
      if (window.dice.flip) {
        equipment.push({ slot: 'two-handed', tier: 0, name: weapons.heavy() })
      } else {
        equipment.push({ slot: 'mainhand', tier: 0, name: weapons.medium() })
        equipment.push({ slot: 'offhand', tier: 0, name: armor.shield() })
      }
      return equipment
    },
    weight: 0
  },
  monk: {
    title: decorateText({
      label: 'monk',
      tooltip: '{sage|shadowdancer|kensai|brewmaster}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.light() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'two-handed', tier: 0, name: weapons.monk() }
      ]
      return equipment
    },
    weight: 0
  },
  paladin: {
    title: decorateText({
      label: 'paladin',
      tooltip: '{protection|compassion|justice|dread}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.heavy() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: true }) }
      ]
      if (window.dice.flip) {
        equipment.push({ slot: 'two-handed', tier: 0, name: weapons.heavy() })
      } else {
        equipment.push({ slot: 'mainhand', tier: 0, name: weapons.medium() })
        equipment.push({ slot: 'offhand', tier: 0, name: armor.shield() })
      }
      return equipment
    },
    weight: 0
  },
  cleric: {
    title: decorateText({
      label: 'cleric',
      tooltip: '{death|life|war|knowledge|order}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.light() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.implements() },
        { slot: 'offhand', tier: 0, name: weapons.sorcery() }
      ]
      return equipment
    },
    weight: 0
  },
  rogue: {
    title: decorateText({
      label: 'rogue',
      tooltip: '{assassin|duelist|trickster|debonaire}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.medium() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.light() },
        { slot: 'offhand', tier: 0, name: weapons.light() }
      ]
      return equipment
    },
    weight: 0
  },
  ranger: {
    title: decorateText({
      label: 'ranger',
      tooltip: '{marksman|stalker|arcana|beast master}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.medium() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'two-handed', tier: 0, name: weapons.ranged() }
      ]
      return equipment
    },
    weight: 0
  },
  wizard: {
    title: decorateText({
      label: 'wizard',
      tooltip: '{conjuration|enchantment|evocation|illusion|transmutation}',
      color: cssColors.subtitle
    }),
    strata: 'lower',
    adventurer: true,
    equipment: () => {
      const equipment: NPC['equipment'] = [
        { slot: 'armor', tier: 0, name: armor.light() },
        { slot: 'accessory', tier: 0, name: accessories({ heavy: false }) },
        { slot: 'mainhand', tier: 0, name: weapons.implements() },
        { slot: 'offhand', tier: 0, name: weapons.sorcery() }
      ]
      return equipment
    },
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
  'village elder': { strata: 'middle', urban: false, age: 'master', culture: 'native' },
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
    urban: true,
    weight: 0.5
  },
  'criminal boss': { strata: 'middle', age: 'veteran', weight: 0.5 },
  innkeeper: { strata: 'middle' },
  priest: { strata: 'middle', official: true },
  lawyer: { strata: 'middle', urban: true, official: true },
  scholar: { strata: 'middle', urban: true },
  sorcerer: { strata: 'middle' },
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
          loc.actors.map(i => window.world.npcs[i]).every(actor => actor.profession.key !== tag)
        const weight = profession.weight ?? 1
        return { v: tag, w: urbanCheck && coastalCheck && uniqueCheck ? weight : 0 }
      }),
    target
  )
}

const stratified = (params: { loc: Province; social: StrataMap<number> }) => {
  const { loc, social } = params
  return window.dice.weightedChoice([
    ...distribution({ strata: 'lower', loc, target: social.lower }),
    ...distribution({ strata: 'middle', loc, target: social.middle }),
    ...distribution({ strata: 'upper', loc, target: social.upper })
  ])
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
