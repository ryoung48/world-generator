import { LocationContext } from '../../../../regions/locations/context/types'
import type { Actor } from '../../types'
import { ActorSkills } from '../skills/categories'
import { ArtistProfessions } from './artistic/artists/types'
import { PerformerProfessions } from './artistic/performers/types'
import { CraftsmanProfessions } from './craftsman/types'
import { GovernmentProfessions } from './government/types'
import { ServantProfessions } from './laborers/servants/types'
import { SailorSpecs, TransportProfessions } from './laborers/transport/types'
import { LaborerProfessions } from './laborers/types'
import { AristocratProfessions } from './landowners/types'
import { MerchantProfessions, MerchantSpecializations } from './merchants/types'
import { ScholarProfessions } from './scholars/academics/types'
import { ReligiousProfessions } from './scholars/religious/types'
import { WizardProfessions } from './scholars/wizards/types'
import { MartialProfessions, MercenarySpecs, SoldierSpecs } from './soldiers/types'
import { UnderworldProfessions } from './underworld/types'

export type ActorProfessions =
  | TransportProfessions
  | ServantProfessions
  | ReligiousProfessions
  | MerchantProfessions
  | GovernmentProfessions
  | UnderworldProfessions
  | MartialProfessions
  | ArtistProfessions
  | CraftsmanProfessions
  | LaborerProfessions
  | PerformerProfessions
  | WizardProfessions
  | ScholarProfessions
  | AristocratProfessions

export type ProfessionSpecialization =
  | MercenarySpecs
  | MerchantSpecializations
  | SoldierSpecs
  | SailorSpecs

export const professionCategories = [
  'aristocrats',
  'artisans',
  'artistic',
  'bureaucrats',
  'laborers',
  'merchants',
  'scholars',
  'soldiers',
  'underclass'
] as const
type ProfessionCategory = typeof professionCategories[number]

export const professionSubcategories = [
  'academic',
  'alchemical',
  'animal handling',
  'artists',
  'blacksmithing',
  'priests',
  'construction',
  'docks',
  'farmers',
  'guards',
  'hunting',
  'inquisitors',
  'leatherworking',
  'mechanics',
  'mercenary',
  'military',
  'millers',
  'mining',
  'monks',
  'navy',
  'performers',
  'produce',
  'rebels',
  'servants',
  'templars',
  'textiles',
  'transportation',
  'whitesmithing',
  'wizards',
  'woodworking'
] as const
type profession_subcategory = typeof professionSubcategories[number]

export type ProfessionSkillKits = {
  primary: ActorSkills[]
  secondary?: ActorSkills[]
  tertiary: ActorSkills[]
}

export type SocialClass = 'upper' | 'middle' | 'lower'

export interface Profession {
  key: ActorProfessions // key used to lookup profession details
  title?: string | ((_params: { actor: Actor; spec: ProfessionSpecialization }) => string) // occupational title
  specialization?: (_params: { actor: Actor }) => ProfessionSpecialization
  lifestyle: 'impoverished' | 'poor' | 'modest' | 'comfortable' | 'prosperous' | 'rich'
  progression?: Partial<
    Record<ActorProfessions, { years: number; weight: number; transition: boolean }>
  >
  category: ProfessionCategory
  subcategory?: profession_subcategory
  ages?: number[] // specific age range allowed for a profession
  prevalence?: 'abundant' | 'common' | 'uncommon' | 'rare'
  occurrence?: number | ((_params: { context: LocationContext; time: number }) => number) // how likely a profession will spawn at a location (default = 0)
  afterSpawn?: (_npc: Actor) => void // ran on actor at actor__finalize
  attributes?: number[] | ((_params: { actor: Actor }) => number[])
  skills: ProfessionSkillKits | ((_params: { actor: Actor }) => ProfessionSkillKits)
}

export type ProfessionKit = {
  attributes?: number[]
  skills: ProfessionSkillKits
}

export type occupation = { key: ActorProfessions; spec?: ProfessionSpecialization }
