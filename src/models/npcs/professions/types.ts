import type { NPC } from '../types'

const _professions = [
  'custom',
  // adventurers
  'barbarian',
  'chanter',
  'cipher',
  'druid',
  'fighter',
  'monk',
  'paladin',
  'cleric',
  'ranger',
  'rogue',
  'wizard',
  // lower
  'peasant',
  'village elder',
  'laborer',
  'beggar',
  'servant',
  'servant (master)',
  'sailor',
  'dock worker',
  'artist',
  'poet',
  'musician',
  'courtesan',
  'criminal',
  'guard',
  'monster hunter',
  'grave keeper',
  'missionary',
  // middle
  'tax collector',
  'investigator',
  'gentry',
  'guard captain',
  'bodyguard',
  'templar',
  'master criminal',
  'criminal boss',
  'innkeeper',
  'priest',
  'lawyer',
  'scholar',
  'sorcerer',
  'poet (famous)',
  'artist (famous)',
  'musician (famous)',
  'courtesan (famous)',
  'butcher',
  'baker',
  'brewer',
  'tailor',
  'weaver',
  'cobbler',
  'leatherworker',
  'shipwright',
  'jeweler',
  'blacksmith',
  'herbalist',
  'alchemist',
  'artificer',
  'merchant',
  'banker',
  'caravan trader',
  'caravan master',
  'ship captain (merchant)',
  'dock master',
  // upper
  'oligarch',
  'magistrate',
  'archmage',
  'high priest',
  'templar (grandmaster)',
  'ethnarch (minority)',
  'merchant prince',
  'exiled pretender',
  'aristocrat',
  'diplomat',
  'courtier'
] as const
export type Profession = typeof _professions[number]
export type ProfessionDetails = {
  title?: string | { male: string; female: string }
  strata: 'lower' | 'middle' | 'upper'
  coastal?: boolean
  official?: boolean
  urban?: boolean
  culture?: 'foreign' | 'native'
  age?: 'novice' | 'veteran' | 'master'
  weight?: number
  unique?: boolean
  villain?: boolean
  adventurer?: boolean
  equipment?: () => NPC['equipment']
}
