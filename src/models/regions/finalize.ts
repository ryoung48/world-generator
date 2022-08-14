import { regional__beasts } from '../npcs/species/beasts/finalize'
import { regional__primordials } from '../npcs/species/primordials/finalize'
import { day_ms } from '../utilities/math/time'
import { decorated_profile } from '../utilities/performance'
import { Region } from './types'

const _region__finalize = (region: Region) => {
  if (region.memory.finalize_check < window.world.date) {
    if (Object.keys(region.beasts).length === 0) {
      regional__beasts(region)
    }
    if (Object.keys(region.primordials).length === 0) {
      regional__primordials(region)
    }
    // spawn provincial factions
    region.regions
      .filter(p => p !== region.capital)
      .map(p => window.world.regions[window.world.provinces[p].region])
      .forEach(province => region__finalize(province))
    region.memory.finalize_check = window.world.date + 10 * day_ms
  }
}

/**
 * Finalizes the region, which includes the following:
 * 1. society traits
 * 2. faction spawns
 * 3. beast spawns
 * @param region - region to finalize
 */
export const region__finalize = decorated_profile(_region__finalize)
