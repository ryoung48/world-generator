import { TaggedEntity } from '../../utilities/codex/entities'
import { NPC } from '../types'
import { Equipment } from './equipment/types'
import { Gender } from './stats/appearance/gender'
import { ActorAttribute } from './stats/attributes/types'
import type {
  ActorProfessions,
  Occupation,
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

type ActorRelation = 'parent' | 'spouse' | 'child' | 'party'

export interface Actor extends NPC, TaggedEntity {
  tag: 'actor' // codex tag
  surname: string // family name
  lineage: string // house name (can be different than surname if married or non-standard cultural last name)
  culture: number // actor culture idx
  finalized?: boolean // used to determine if the actor needs to be finalized (appearance|traits|relations|profession)
  // location
  location: { curr: number; birth: number }
  // physique
  gender: Gender
  appearance?: ActorAppearance // how does this actor look?
  voice?: {
    pitch?: string
    quality?: string
    volume?: string
    speed?: string
    verbosity?: string
  } // how does this actor sound?
  // dates of importance
  dates: {
    spawn: number // when was this actor spawned? (ms)
    birth: number // when was this actor born? (ms)
    death: number // when will this actor (naturally?) expire? (ms)
  }
  // physical traits
  attributes: Record<ActorAttribute, number>
  // personality traits
  persona?: {
    morals: number
    order: number
    change: number
    conflict: number
    social: number
    ego: number
  }
  // occupation
  occupation: Occupation
  skills: { skill: ActorSkills; weight: number }[]
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
  parent: { name: string; plan?: number }
  relations: { type: ActorRelation; actor: number }[]
  // containers
  equipment: Equipment
  carryCapacity: number
  // history
  history: {
    planned?: boolean
    unbound: boolean
    events: number[]
  }
}
