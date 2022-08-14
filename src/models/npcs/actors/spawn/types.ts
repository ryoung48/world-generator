import { Loc } from '../../../regions/locations/types'
import { Culture } from '../../species/humanoids/cultures/types'
import { genders } from '../stats/appearance/gender'
import { social_class } from '../stats/professions/types'
import { Actor } from '../types'

export interface Relation {
  before_spawn: (_params: ActorParams) => void
  after_spawn: (_npc: Actor) => void
}

export type ActorParams = {
  living: boolean // forces the actor to be alive for at least **3** years
  location: Loc // spawn location
  birth_loc?: Loc // birth location - will randomize if not provided based on spawn location
  ages?: number[] // age range at spawn time (years) - defaults to the profession standard
  birth_time?: number // birthday (ms) - will randomize if not provided (will override ages)
  relative_time?: number // spawn time relative to birthday (ms) - defaults to the current date
  culture?: Culture // actor culture - will randomize if not provided based on spawn location
  social_class?: social_class // social class (used to randomize profession) - overridden by profession
  gender?: genders // actor gender - will randomize if not provided
  first?: string // actor first name
  last?: string // actor surname
  parent_name?: string // parent first name (used for patronymics)
  lineage?: string // family lineage name (typically the surname but not always if the npc is married or has a non-standard surname)
  occupation?: Actor['occupation'] // actor occupation
  relation?: Relation // relations with other actors (family, friends, coworkers, etc)
  level?: number // combat rating
  tier?: string // descriptive level (enemies only)
  venerable?: boolean // will live to a venerable age
  planned?: boolean
  unbound?: boolean // will not plan out history if provided (used for PCs)
  unknown_loc?: boolean // used if the actor's location is unknown
  alias?: string // name alias (nickname or NPC type)
}
