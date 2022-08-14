import { LocationContext } from '../../../../regions/locations/context/types'
import type { Actor } from '../../types'
import { actor_skills } from '../skills/categories'
import { artist_professions } from './artistic/artists/types'
import { performer_professions } from './artistic/performers/types'
import { craftsman_professions } from './craftsman/types'
import { government_professions } from './government/types'
import { servant_professions } from './laborers/servants/types'
import { sailor_specs, transport_professions } from './laborers/transport/types'
import { laborer_professions } from './laborers/types'
import { aristocrat_professions } from './landowners/types'
import { merchant_professions, merchant_specializations } from './merchants/types'
import { scholar_professions } from './scholars/academics/types'
import { religious_professions } from './scholars/religious/types'
import { wizard_professions } from './scholars/wizards/types'
import { martial_professions, mercenary_specs, soldier_specs } from './soldiers/types'
import { underworld_professions } from './underworld/types'

export type actor_professions =
  | transport_professions
  | servant_professions
  | religious_professions
  | merchant_professions
  | government_professions
  | underworld_professions
  | martial_professions
  | artist_professions
  | craftsman_professions
  | laborer_professions
  | performer_professions
  | wizard_professions
  | scholar_professions
  | aristocrat_professions

export type profession__specialization =
  | mercenary_specs
  | merchant_specializations
  | soldier_specs
  | sailor_specs

export const profession_categories = [
  'laborers',
  'soldiers',
  'artisans',
  'artistic',
  'scholars',
  'bureaucrats',
  'aristocrats',
  'underclass',
  'merchants'
] as const
type profession_category = typeof profession_categories[number]

export const profession_subcategories = [
  'farmers',
  'animal handling',
  'millers',
  'servants',
  'construction',
  'transportation',
  'mining',
  'hunting',
  'docks',
  'military',
  'rebels',
  'mercenary',
  'guards',
  'navy',
  'blacksmithing',
  'whitesmithing',
  'mechanics',
  'textiles',
  'leatherworking',
  'woodworking',
  'alchemical',
  'produce',
  'clergy',
  'monks',
  'templars',
  'inquisitors',
  'academic',
  'wizards',
  'artists',
  'performers'
] as const
type profession_subcategory = typeof profession_subcategories[number]

export type profession__skill_kits = {
  primary: actor_skills[]
  secondary?: actor_skills[]
  tertiary: actor_skills[]
}

export type social_class = 'upper' | 'middle' | 'lower'

export interface Profession {
  key: actor_professions // key used to lookup profession details
  title?: string | ((_params: { actor: Actor; spec: profession__specialization }) => string) // occupational title
  specialization?: (_params: { actor: Actor }) => profession__specialization
  lifestyle: 'impoverished' | 'poor' | 'modest' | 'comfortable' | 'prosperous' | 'rich'
  progression?: Partial<
    Record<actor_professions, { years: number; weight: number; transition: boolean }>
  >
  category: profession_category
  subcategory?: profession_subcategory
  ages?: number[] // specific age range allowed for a profession
  prevalence?: 'abundant' | 'common' | 'uncommon' | 'rare'
  occurrence?: number | ((_params: { context: LocationContext; time: number }) => number) // how likely a profession will spawn at a location (default = 0)
  after_spawn?: (_npc: Actor) => void // ran on actor at actor__finalize
  attributes?: number[] | ((_params: { actor: Actor }) => number[])
  skills: profession__skill_kits | ((_params: { actor: Actor }) => profession__skill_kits)
}

export type ProfessionKit = {
  attributes?: number[]
  skills: profession__skill_kits
}

export type occupation = { key: actor_professions; spec?: profession__specialization }
