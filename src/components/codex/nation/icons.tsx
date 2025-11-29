import { ComponentType } from 'react'

// Custom Tent icon from Lucide
const Tent = ({ fontSize }: { fontSize?: any }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={fontSize === 'inherit' ? '1em' : 24}
    height={fontSize === 'inherit' ? '1em' : 24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    style={{ display: 'inline-block', verticalAlign: 'middle', paddingBottom: 5 }}
  >
    <path d='M3.5 21 14 3' />
    <path d='M20.5 21 10 3' />
    <path d='M15.5 21 12 15l-3.5 6' />
    <path d='M2 21h20' />
  </svg>
)

const Spool = ({ fontSize }: { fontSize?: any }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={fontSize === 'inherit' ? '1em' : 24}
    height={fontSize === 'inherit' ? '1em' : 24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    style={{ display: 'inline-block', verticalAlign: 'middle', paddingBottom: 1 }}
  >
    <path d='M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66' />
    <path d='m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178' />
  </svg>
)

import {
  AccountCog,
  AccountGroup,
  AccountSupervisor,
  AccountTie,
  AccountTieWoman,
  AtomVariant,
  Bank,
  Barley,
  BookOpenVariant,
  ChartTimelineVariant,
  City,
  CityVariantOutline,
  CogSync,
  Crown,
  CrossCeltic,
  CurrencyUsd,
  Factory,
  Feather,
  Gavel,
  HandCoin,
  HandsPray,
  HomeGroup,
  Link,
  MapMarkerRadius,
  SailBoat,
  ScaleBalance,
  School,
  ShieldCheck,
  ShieldHome,
  ShieldSword,
  Sprout,
  SwapHorizontalVariant,
  Sword,
  SwordCross,
  TownHall,
  Waves,
  AlertDecagram,
  LinkVariantOff,
  AccountAlert,
  AccountLock,
  Account,
  ChartLine,
  Home,
  Tractor,
  Flask,
  Palette,
  Bee,
  ImageFrame,
  Telescope,
  GlassWine,
  Pot,
  ClockOutline,
  Fire,
  FoodApple,
  Coffee,
  TshirtCrew,
  InvertColors,
  Wall,
  Cow,
  PineTree,
  Cog,
  Pillar,
  TreeOutline,
  FileDocument,
  Necklace,
  ShakerOutline,
  Pickaxe,
  Sunglasses,
  Violin,
  Briefcase,
  Beach,
  Anvil as WarArmaments,
  Fish,
  SpoonSugar,
  Gold,
  Beer,
  Candle,
  Horse,
  Liquor,
  Doctor,
  Gesture,
  Elephant,
  Jellyfish,
  Meteor,
  Candy,
  Grass,
  Bomb,
  Barrel,
  Volleyball,
  DiamondStone,
  OctahedronOff,
  Octahedron,
  GlassMug,
  RhombusSplit,
  ShapeOutline,
  Airballoon,
  FlaskRoundBottom,
  FruitCherries,
  CubeOutline,
  Sphere,
  PentagonOutline
} from 'mdi-material-ui'

import { Province } from '../../../models/provinces/types'
import { PROVINCE } from '../../../models/provinces'
import { HUB } from '../../../models/provinces/hubs'
import { Unit } from '../../../models/nations/military'
import { TradeGood } from '../../../models/provinces/trade/types'

// Province icons
export const getProvinceIcon = (province: Province) => {
  const hub = PROVINCE.hub(province)
  const settlement = HUB.settlement(hub)
  const isCapital = PROVINCE.capital(province)
  const isCoastal = PROVINCE.coastal(province)
  const isFarmland = province.farmland

  if (isCapital) return <Crown fontSize='inherit' />
  if (hub.nomadic || settlement === 'tribal camp') return <Tent fontSize='inherit' />
  if (settlement === 'metropolis' || settlement === 'huge city')
    return <CityVariantOutline fontSize='inherit' />
  if (settlement.includes('city')) return <City fontSize='inherit' />
  if (settlement.includes('town')) return <TownHall fontSize='inherit' />
  if (settlement.includes('village')) return <HomeGroup fontSize='inherit' />
  if (isCoastal) return <Waves fontSize='inherit' />
  if (isFarmland) return <Sprout fontSize='inherit' />
  return <City fontSize='inherit' />
}

// Military icons
export const getMilitaryIcon = (unitType: Unit) => {
  const iconProps = { fontSize: 'inherit' as const }
  switch (unitType) {
    case 'standing army':
      return <ShieldSword {...iconProps} />
    case 'national militia':
      return <AccountTie {...iconProps} />
    case 'levies':
      return <Barley {...iconProps} />
    case 'holy orders':
      return <CrossCeltic {...iconProps} />
    case 'mercenaries':
      return <SwordCross {...iconProps} />
    case 'tribal warbands':
      return <Tent {...iconProps} />
    case 'slaves':
      return <Link {...iconProps} />
    case 'warships':
      return <SailBoat {...iconProps} />
    default:
      return <Sword {...iconProps} />
  }
}

// Policy icons
type PolicyCategory = 'religion' | 'economy' | 'trade' | 'bureaucracy' | 'slavery' | 'land'

const policyIcons: Record<PolicyCategory, Record<string, ComponentType<{ fontSize?: any }>>> = {
  religion: {
    atheism: AtomVariant,
    pluralism: AccountGroup,
    secularized: ScaleBalance,
    moralism: HandsPray
  },
  economy: {
    traditionalism: Bank,
    'laissez-faire': Feather,
    interventionism: AccountCog,
    'state capitalism': Factory,
    'command economy': CogSync
  },
  trade: {
    isolationist: ShieldHome,
    protectionism: ShieldCheck,
    mercantilism: HandCoin,
    'free trade': SwapHorizontalVariant
  },
  bureaucracy: {
    'meritocratic exams': School,
    'venal offices': CurrencyUsd,
    'hereditary officials': Crown,
    'court eunuchs': AccountTieWoman,
    'appointed officials': AccountSupervisor
  },
  slavery: {
    'abolished slavery': LinkVariantOff,
    'legacy slavery': AccountAlert,
    'domestic servants': Home,
    'indentured labor': AccountLock,
    'slave trade': Link
  },
  land: {
    'ancestral holdings': AccountGroup,
    serfdom: Account,
    'tenant farmers': HomeGroup,
    'commercial farms': ChartLine,
    'collective farms': Tractor
  }
}

const policyFallbackIcon: Record<PolicyCategory, ComponentType<{ fontSize?: any }>> = {
  religion: HandsPray,
  economy: ChartTimelineVariant,
  trade: SwapHorizontalVariant,
  bureaucracy: Gavel,
  slavery: Link,
  land: Sprout
}

export const getPolicyIcon = (category: PolicyCategory, value?: string) => {
  if (!value) return null
  const Icon = policyIcons[category][value] ?? policyFallbackIcon[category]
  return <Icon fontSize='inherit' />
}

// Law icons
const lawIcons: Partial<Record<Province['law'], ComponentType<{ fontSize?: any }>>> = {
  'customary law': ShieldHome,
  'localized codes': MapMarkerRadius,
  'hierarchical law': Crown,
  'bureaucratic law': Gavel,
  'esoteric codified': BookOpenVariant,
  'arbitrary rule': AlertDecagram
}

export const getLawIcon = (law?: Province['law']) => {
  if (!law) return null
  const Icon = lawIcons[law] ?? ScaleBalance
  return <Icon fontSize='inherit' />
}

// Trade good icons
const tradeGoodIcons: Record<TradeGood, ComponentType<{ fontSize?: any }>> = {
  'academic research': School,
  'aeronautical supplies': Airballoon,
  'alchemical herbs': FlaskRoundBottom,
  alum: Palette,
  'anti-magic alloys': OctahedronOff,
  apiaries: Bee,
  'arcane reagents': Octahedron,
  artillery: Bomb,
  artwork: Palette,
  'astronomical equipment': Telescope,
  beer: GlassMug,
  ceramics: Pot,
  clay: CubeOutline,
  'clockwork devices': ClockOutline,
  coal: Fire,
  cocoa: Candy,
  coffee: Coffee,
  copper: Pickaxe,
  cotton: Spool,
  cybernetics: ShapeOutline,
  'daemonic curios': RhombusSplit,
  'deep-sea harvests': Jellyfish,
  dyes: InvertColors,
  enchantments: Sphere,
  'fiber crops': Gesture,
  'fine clothing': TshirtCrew,
  fishing: Fish,
  fruits: FoodApple,
  fur: PentagonOutline,
  furniture: Home,
  gemstones: DiamondStone,
  glassware: GlassWine,
  gold: Gold,
  grain: Barley,
  horses: Horse,
  incense: Candle,
  'industrial parts': Cog,
  iron: Pickaxe,
  ivory: Elephant,
  jewelry: Necklace,
  lacquerware: Pot,
  'leather products': Briefcase,
  legumes: Sprout,
  liquor: Liquor,
  livestock: Cow,
  logging: PineTree,
  'manufactured goods': Factory,
  marble: Pillar,
  'medical services': Doctor,
  mercenaries: SwordCross,
  mercury: Flask,
  'meteorite fragments': Meteor,
  'musical instruments': Violin,
  narcotics: Grass,
  'olive oil': FruitCherries,
  'ornamental woods': TreeOutline,
  paper: FileDocument,
  pearls: Necklace,
  petroleum: Barrel,
  salt: ShakerOutline,
  sand: Beach,
  shipbuilding: SailBoat,
  silk: Spool,
  silver: Gold,
  slaves: Link,
  spices: ShakerOutline,
  stone: Wall,
  sugar: CubeOutline,
  tea: Coffee,
  tin: Pickaxe,
  tourism: Sunglasses,
  'war armaments': WarArmaments,
  wine: GlassWine,
  wool: Volleyball,
  'whale products': Waves
}

export const getTradeGoodIcon = (good: string) => {
  const Icon = tradeGoodIcons[good as TradeGood] ?? SwapHorizontalVariant
  return <Icon fontSize='inherit' />
}
