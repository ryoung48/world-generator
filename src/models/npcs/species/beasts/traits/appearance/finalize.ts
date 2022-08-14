import {
  species__add_to_region,
  species__conflicting_traits,
  species__is_symbiotic
} from '../../..'
import { beast__spawn } from '../..'
import { Beast } from '../../types'
import { BeastTraitFinalize } from '../types'
import { mimicry__conflict, mimicry_valid } from './mimicry'
import { beast__appearance_trait_tags } from './tags'

const assign_mimic = (params: { model: Beast; mimic: Beast }) => {
  const { model, mimic } = params
  const mimic_defense = mimicry_valid(mimic)
  const model_defense = mimicry_valid(model)
  const type: Beast['appearance']['mimicry']['type'] =
    mimic_defense && model_defense
      ? 'mullerian'
      : !mimic_defense && model_defense
      ? 'batesian'
      : 'mertensian'
  model.appearance.mimicry = {
    species: mimic.idx,
    role: 'model',
    type
  }
  mimic.appearance.mimicry = {
    species: model.idx,
    role: 'mimic',
    type
  }
}

export const appearance_trait__finalize: Partial<
  Record<beast__appearance_trait_tags, (_params: BeastTraitFinalize) => void>
> = {
  mimicry: ({ species: mimic, region }) => {
    if (!window.world.beasts[mimic.appearance.mimicry.species]) {
      const { activity_period, size, environment, role } = mimic
      const [chosen] = region.beasts[environment.key]
        .map(i => window.world.beasts[i])
        .filter(model => {
          const similar = model.genus.name === mimic.genus.name
          return (
            model.role === role &&
            model.activity_period === activity_period &&
            model.size === size &&
            similar &&
            !model.appearance.mimicry &&
            !species__is_symbiotic(model) &&
            species__conflicting_traits(mimicry__conflict)(model) &&
            mimicry_valid(model)
          )
        })
      if (chosen) {
        assign_mimic({ model: chosen, mimic })
      } else {
        const model = beast__spawn({
          region,
          environment,
          role,
          size: mimic.size,
          activity_period: mimic.activity_period,
          family: mimic.family,
          genus: mimic.genus,
          territory: mimic.territory,
          mimicry: true
        })
        assign_mimic({ model: window.world.beasts[model], mimic })
      }
    }
    const model = window.world.beasts[mimic.appearance.mimicry.species]
    if (!model.regions.includes(region.idx)) {
      species__add_to_region({ species: model, region })
    }
  }
}
