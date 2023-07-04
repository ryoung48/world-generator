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
  'poet',
  'musician',
  'courtesan',
  'criminal',
  'guard',
  'monster hunter',
  'grave keeper',
  'missionary',
  'street vendor',
  'hedge wizard',
  'fortune teller',
  'ascetic',
  'soldier (military)',
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
  'abbot',
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
  'shopkeeper',
  'banker',
  'caravan trader',
  'caravan master',
  'ship captain (merchant)',
  'dock master',
  'officer (military)',
  // upper
  'aristocrat',
  'oligarch',
  'crime lord',
  'magistrate',
  'archmage',
  'high priest',
  'templar (grandmaster)',
  'ethnarch (minority)',
  'general (military)',
  'exiled pretender',
  'diplomat',
  'courtier',
  'prince'
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
  war?: boolean
  capital?: boolean
}
