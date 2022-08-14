import { TaggedEntity } from '../../utilities/codex/entities'
import { NPC } from '../types'
import { Equipment } from './equipment/types'
import { genders } from './stats/appearance/gender'
import { attribute } from './stats/attributes/types'
import type {
  actor_professions,
  occupation,
  profession__specialization
} from './stats/professions/types'
import { actor_skills } from './stats/skills/categories'

export interface ActorAppearance {
  bmi: number // body mass index
  height: number // height (in)
  skin?: { color: string }
  eyes?: { color: string }
  hair?: { color: string; texture: string; style: string }
  facial_hair?: string
  tattoos?: { style: string; location: string }
  wounds?: { type: string; intensity: string; side: string }
  horns?: { dressing: string; side: string }
  piercings: { nose?: string; ears?: string }
  outfit?: {
    quality: string
    cultures: number[]
    color: { primary: string; accents?: string }
  }
}

type actor_relation = 'parent' | 'spouse' | 'child' | 'party'

export interface Actor extends NPC, TaggedEntity {
  tag: 'actor' // codex tag
  alias?: string // used for generic encounter npcs
  surname: string // family name
  lineage: string // house name (can be different than surname if married or non-standard cultural last name)
  culture: number // actor culture idx
  finalized?: boolean // used to determine if the actor needs to be finalized (appearance|traits|relations|profession)
  // location
  location: { curr: number; residence: number; birth: number }
  // physique
  gender: genders
  appearance?: ActorAppearance // how does this actor look?
  voice?: {
    pitch?: string
    quality?: string
    volume?: string
    speed?: string
    verbosity?: string
  } // how does this actor sound?
  // age
  spawn_date: number
  birth_date: number // when was this actor born? (ms)
  expires: number // when will this actor (naturally?) expire? (ms)
  // physical traits
  attributes: Record<attribute, number>
  // personality traits
  persona?: {
    altruism: number
    lawful: number
    change: number
    conflict: number
    social: number
    neuroticism: number
  }
  // known skill proficiencies
  skills: Partial<Record<actor_skills, number>>
  languages: Record<number, number>
  // occupation
  occupation: occupation
  progression: Partial<
    Record<
      actor_professions,
      {
        profession: actor_professions
        duration: number
        age: number
        spec?: profession__specialization
      }
    >
  >
  // relations
  parent_name: string
  relations: { type: actor_relation; actor: number }[]
  // containers
  equipment: Equipment
  carry_capacity: number
  // interactions
  barter?: boolean // can this actor trade goods?
  // history
  history: {
    planned?: boolean
    unbound: boolean
    events: number[]
    backgrounds: {
      loc: number
      target?: actor_professions
      occupation?: occupation
      skills?: {
        start: number
        end?: number
        check_date: number
        tiers?: {
          primary: actor_skills[]
          secondary: actor_skills[]
          tertiary: actor_skills[]
        }
        exp: Partial<Record<actor_skills, number>>
      }[]
      start: number
      end?: number
    }[]
    childhood_end: number
    next_background: number
    // cutoff after which profession|location transitions are not allowed
    transition_cutoff?: number
  }
  // quest threads
  threads: number[]
}
