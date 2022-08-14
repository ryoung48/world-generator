import { scarcity } from '../../../../../utilities/quality'
import { species__add_to_region, species__is_symbiotic } from '../../..'
import { primordial__spawn } from '../..'
import { Primordial } from '../../types'
import { PrimordialTraitParams } from '../types'
import { primordial__aesthetic_trait_tags } from './tags'

const rareness = Object.values(scarcity)

const assign_mimic = (params: { model: Primordial; mimic: Primordial }) => {
  const { model, mimic } = params
  model.mimicry = {
    species: mimic.idx,
    role: 'model'
  }
  mimic.mimicry = {
    species: model.idx,
    role: 'mimic'
  }
}

export const primordial__aesthetic_trait_finalize: Partial<
  Record<primordial__aesthetic_trait_tags, (_params: PrimordialTraitParams) => void>
> = {
  mimicry: ({ species: mimic, region }) => {
    if (!window.world.primordials[mimic.mimicry.species]) {
      const { size, environment, rarity } = mimic
      const [chosen] = region.primordials[environment.key]
        .map(i => window.world.primordials[i])
        .filter(model => {
          return (
            model.rarity !== rarity &&
            model.size === size &&
            model.genus === mimic.genus &&
            !model.mimicry &&
            !species__is_symbiotic(model)
          )
        })
      if (chosen) {
        assign_mimic({ model: chosen, mimic })
      } else {
        const model = primordial__spawn({
          region,
          environment,
          size: mimic.size,
          family: mimic.family,
          genus: mimic.genus,
          rarity: window.dice.choice(rareness.filter(rare => rare < rarity)),
          mimicry: true
        })
        assign_mimic({ model: window.world.primordials[model], mimic })
      }
    }
    const model = window.world.primordials[mimic.mimicry.species]
    if (!model.regions.includes(region.idx)) {
      species__add_to_region({ species: model, region })
    }
  }
}
