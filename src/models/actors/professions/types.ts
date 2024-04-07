import { Province } from '../../regions/provinces/types'
import { Trait } from '../../utilities/traits/types'
import { QuirkConstraints } from '../traits/types'
import { Gender } from '../types'

const _professions = [
  'custom',
  // tribal
  'shaman',
  'tribal warrior',
  'tribal elder',
  'tribal artisan',
  'hunter',
  'forager',
  'herdsman',
  'foreigner (merchant)',
  // monastic
  'ascetic',
  'scribe',
  'librarian',
  'groundskeeper',
  'abbot',
  // military
  'chef (military)',
  'quartermaster (military)',
  'soldier (military)',
  'officer (military)',
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
  // middle
  'tax collector',
  'investigator',
  'gentry (minor)',
  'gentry (major)',
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
  'aristocrat (minor)',
  'aristocrat (major)',
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
  'prince',
  'suzerain'
] as const
export type Profession = typeof _professions[number]
export interface ProfessionDetails
  extends Trait<
    Profession,
    { war?: boolean; capital?: boolean; kingdom?: boolean; leadership?: boolean; coastal?: boolean }
  > {
  title?:
    | string
    | { male: string; female: string }
    | ((_params: { province: Province; gender: Gender }) => string)
  strata: 'lower' | 'middle' | 'upper'
  lifestyle: 'poor' | 'modest' | 'comfortable' | 'prosperous' | 'rich'
  official?: boolean
  martial?: boolean
  culture?: 'foreign' | 'native'
  age?: 'novice' | 'veteran' | 'master'
  unique?: boolean

  quirks?: Record<
    string,
    { text?: string; constraints?: Partial<QuirkConstraints>; tooltip?: string }
  >
}
