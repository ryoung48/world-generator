import {
  species__assign_symbiot,
  species__inhabits_region,
  species__is_symbiotic,
  species__symbiotes
} from '../../..'
import { beast__spawn } from '../..'
import { BeastTraitFinalize } from '../types'
import { beast__behavior_trait_tags } from './tags'

const symbiosis__finalize = ({ species, region }: BeastTraitFinalize) => {
  const { activity_period, size, environment } = species
  const existing = species__symbiotes(species).some(species__inhabits_region(region))
  if (!existing) {
    const [chosen] = window.dice.shuffle(
      region.beasts[environment.key]
        .map(i => window.world.beasts[i])
        .filter(prospect => {
          const valid_size = prospect.size > size + 1
          return (
            prospect.activity_period === activity_period &&
            valid_size &&
            !prospect.appearance.mimicry &&
            !species__is_symbiotic(prospect) &&
            !species.semi_aquatic
          )
        })
    )
    if (chosen) {
      species__assign_symbiot({ species, host: chosen })
    } else {
      const host = beast__spawn({
        environment,
        region,
        role: window.dice.choice(['predator', 'prey', 'prey']),
        size: size + 2,
        activity_period: species.activity_period,
        symbiosis: true
      })
      species__assign_symbiot({ species, host: window.world.beasts[host] })
    }
  }
}

export const behavior_trait__finalize: Partial<
  Record<beast__behavior_trait_tags, (_params: BeastTraitFinalize) => void>
> = {
  mutualistic: symbiosis__finalize,
  commensalistic: symbiosis__finalize
}
