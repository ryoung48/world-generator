import { LocationContext } from '../../../../regions/locations/context/types'
import type { Actor } from '../../types'
import { ActorSkills } from '../skills/categories'
import { LowerStratum, MercenarySpecs } from './lower/types'
import { ArtisanSpecializations, MiddleStratum } from './middle/types'
import { UpperStratum } from './upper/types'

export type ActorProfessions = LowerStratum | MiddleStratum | UpperStratum

export type ProfessionSpecialization = MercenarySpecs | ArtisanSpecializations

export type ProfessionSkillKits = {
  primary: ActorSkills[]
  secondary?: ActorSkills[]
}

export const socialStrata = ['lower', 'middle', 'upper'] as const

export type SocialStratum = typeof socialStrata[number]

export interface Profession {
  key: ActorProfessions // key used to lookup profession details
  title?: string | ((_params: { actor: Actor; spec: ProfessionSpecialization }) => string) // occupational title
  specialization?: (_params: { actor: Actor }) => ProfessionSpecialization
  stratum: SocialStratum
  ages?: number[] // specific age range allowed for a profession
  occurrence?: number | ((_params: { context: LocationContext; time: number }) => number) // how likely a profession will spawn at a location (default = 0)
  attributes?: number[] | ((_params: { actor: Actor }) => number[])
  skills:
    | ProfessionSkillKits
    | ((_params: { actor: Actor; occupation: Occupation }) => ProfessionSkillKits)
}

export type ProfessionKit = {
  attributes?: number[]
  skills: ProfessionSkillKits
}

export type Occupation = { key: ActorProfessions; spec?: ProfessionSpecialization }
