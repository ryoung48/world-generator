import { LocationTrait } from '../types'
import { settlement__conflict_traits } from './conflicts'
import { settlement__environment_traits } from './environment'
import { settlement__faction_traits } from './factions'
import { community__trait } from './types'

export const settlement__traits: Record<community__trait, LocationTrait> = {
  ...settlement__conflict_traits,
  ...settlement__environment_traits,
  ...settlement__faction_traits
}
