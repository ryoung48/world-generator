import { LocationTrait } from '../types'
import { dungeon__complicationTraits } from './complications'
import { dungeon__environmentTraits } from './environment'
import { dungeon__inhabitantTraits } from './inhabitants'
import { dungeon__rewardsTraits } from './rewards'
import { dungeon__trait } from './types'

export const dungeon__traits: Record<dungeon__trait, LocationTrait> = {
  ...dungeon__complicationTraits,
  ...dungeon__environmentTraits,
  ...dungeon__inhabitantTraits,
  ...dungeon__rewardsTraits
}
