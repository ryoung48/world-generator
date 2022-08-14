import { decorated_profile } from '../../../utilities/performance'
import { regional__species } from '..'
import { beast__spawn } from '.'
import { beast__finalize_diet, beast__finalize_predators } from './behavior/diet/finalize'
import { beast__trait_finalize } from './traits/finalize'
import { Beast } from './types'

export const beast__finalize = (species: Beast) => {
  species.regions
    .filter(r => !species.finalized[r])
    .map(r => window.world.regions[r])
    .forEach(region => {
      species.finalized[region.idx] = true
      beast__finalize_diet[species.diet.type]?.({ region, species })
      beast__finalize_predators({ species, region })
      species.traits.forEach(({ tag }) => beast__trait_finalize[tag]?.({ species, region }))
    })
}

const _regional_beasts = regional__species({ spawn: beast__spawn, index: 'beasts' })

/**
 * Generates beast for a given region
 * @param region - region to generate beast in
 */
export const regional__beasts = decorated_profile(_regional_beasts, 'regional__beasts')
