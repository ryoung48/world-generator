const _professions = [
  'custom',
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
  'musician',
  'courtesan',
  'criminal',
  'mercenary',
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
  'artist (famous)',
  'musician (famous)',
  'courtesan (famous)',
  'artisan',
  'herbalist',
  'alchemist',
  'artificer',
  'merchant',
  'banker',
  'caravan trader',
  'caravan master',
  'ship captain (merchant)',
  'ship captain (pirate)',
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
}
