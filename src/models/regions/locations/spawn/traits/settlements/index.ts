import { LocationTrait } from '../types'
import { settlement__conflictTraits } from './conflicts'
import { settlement__environmentTraits } from './environment'
import { settlement__factionTraits } from './factions'
import { community__trait } from './types'

export const settlement__traits: Record<community__trait, LocationTrait> = {
  ...settlement__conflictTraits,
  ...settlement__environmentTraits,
  ...settlement__factionTraits
}
