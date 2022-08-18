import { TaggedEntity } from '../../utilities/codex/entities'
import { NPC } from '../types'
import { Equipment } from './equipment/types'
import { genders } from './stats/appearance/gender'
import { attribute } from './stats/attributes/types'
import type {
  ActorProfessions,
  occupation,
  ProfessionSpecialization
} from './stats/professions/types'
import { ActorSkills } from './stats/skills/categories'

export interface ActorAppearance {
  bmi: number // body mass index
  height: number // height (in)
  skin?: { color: string }
  eyes?: { color: string }
  hair?: { color: string; texture: string; style: string }
  facialHair?: string
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
  spawnDate: number
  birthDate: number // when was this actor born? (ms)
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
  skills: Partial<Record<ActorSkills, number>>
  languages: Record<number, number>
  // occupation
  occupation: occupation
  progression: Partial<
    Record<
      ActorProfessions,
      {
        profession: ActorProfessions
        duration: number
        age: number
        spec?: ProfessionSpecialization
      }
    >
  >
  // relations
  parentName: string
  relations: { type: actor_relation; actor: number }[]
  // containers
  equipment: Equipment
  carryCapacity: number
  // interactions
  barter?: boolean // can this actor trade goods?
  // history
  history: {
    planned?: boolean
    unbound: boolean
    events: number[]
    backgrounds: {
      loc: number
      target?: ActorProfessions
      occupation?: occupation
      skills?: {
        start: number
        end?: number
        checkDate: number
        tiers?: {
          primary: ActorSkills[]
          secondary: ActorSkills[]
          tertiary: ActorSkills[]
        }
        exp: Partial<Record<ActorSkills, number>>
      }[]
      start: number
      end?: number
    }[]
    childhoodEnd: number
    nextBackground: number
    // cutoff after which profession|location transitions are not allowed
    transitionCutoff?: number
  }
  // quest threads
  threads: number[]
}
