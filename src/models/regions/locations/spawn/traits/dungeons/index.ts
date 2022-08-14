import { LocationTrait } from '../types'
import { dungeon__complication_traits } from './complications'
import { dungeon__environment_traits } from './environment'
import { dungeon__inhabitant_traits } from './inhabitants'
import { dungeon__rewards_traits } from './rewards'
import { dungeon__trait } from './types'

export const dungeon__traits: Record<dungeon__trait, LocationTrait> = {
  ...dungeon__complication_traits,
  ...dungeon__environment_traits,
  ...dungeon__inhabitant_traits,
  ...dungeon__rewards_traits
}
