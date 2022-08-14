import { decorated_profile } from '../../../utilities/performance'
import { regional__species } from '..'
import { primordial__spawn } from '.'
import { primordial__trait_finalize } from './traits/finalize'
import { Primordial } from './types'

export const primordial__finalize = (species: Primordial) => {
  species.regions
    .filter(r => !species.finalized[r])
    .map(r => window.world.regions[r])
    .forEach(region => {
      species.finalized[region.idx] = true
      species.traits.forEach(({ tag }) => primordial__trait_finalize[tag]?.({ species, region }))
    })
}

const _regional_primordials = regional__species({ spawn: primordial__spawn, index: 'primordials' })

/**
 * Generates primordial for a given region
 * @param region - region to generate primordial in
 */
export const regional__primordials = decorated_profile(
  _regional_primordials,
  'regional_primordials'
)
