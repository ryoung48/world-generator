import {
  species__assign_symbiot,
  species__inhabits_region,
  species__is_symbiotic,
  species__symbiotes
} from '../../..'
import { beast__spawn } from '../..'
import { BeastTraitFinalize } from '../types'
import { beast__reproduction_trait_tags } from './tags'

export const reproduction_trait__finalize: Partial<
  Record<beast__reproduction_trait_tags, (_params: BeastTraitFinalize) => void>
> = {
  brood_parasitism: ({ species, region }) => {
    const existing = species__symbiotes(species).some(species__inhabits_region(region))
    if (!existing) {
      const { activity_period, size, environment, role } = species
      const [chosen] = region.beasts[environment.key]
        .map(i => window.world.beasts[i])
        .filter(prospect => {
          return (
            prospect.activity_period === activity_period &&
            prospect.size === size &&
            prospect.genus.name === species.genus.name &&
            !prospect.appearance.mimicry &&
            !species__is_symbiotic(prospect)
          )
        })
      if (chosen) {
        species__assign_symbiot({ host: chosen, species })
      } else {
        const host = beast__spawn({
          environment,
          region,
          role,
          size: species.size,
          activity_period: species.activity_period,
          family: species.family,
          genus: species.genus,
          symbiosis: true
        })
        species__assign_symbiot({ host: window.world.beasts[host], species })
      }
    }
  }
}
