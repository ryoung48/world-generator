import { Region } from '../../../../regions/types'
import { Primordial, primordial__trait_tags } from '../types'
import { primordial__aesthetic_traits } from './aesthetic'
import { primordial__behavioral_traits } from './behavior'
import { primordial__habitat_traits } from './habitat'
import { PrimordialTrait } from './types'
import { primordial__use_traits } from './uses'

export const primordial__trait_lookup: Record<primordial__trait_tags, PrimordialTrait> = {
  ...primordial__aesthetic_traits,
  ...primordial__behavioral_traits,
  ...primordial__habitat_traits,
  ...primordial__use_traits
}

const templates = Object.values(primordial__trait_lookup)

const primordial__valid_trait = (params: {
  species: Primordial
  region: Region
  tag: primordial__trait_tags
}) => {
  const { species, region, tag } = params
  const { weight } = primordial__trait_lookup[tag]
  const used = species.traits.some(trait => trait.tag === tag)
  return used ? 0 : typeof weight === 'number' ? weight : weight({ species, region })
}

/**
 * selects a random, non-conflicting trait for a given species
 * @param species - primordial species
 * @returns trait tag
 */
const random_trait_tag = (params: { species: Primordial; region: Region }) => {
  const { species, region } = params
  const filtered = templates.map(template => {
    const { tag } = template
    // set the weight to zero if there are any conflicts
    // so that it is not chosen
    return { v: template.tag, w: primordial__valid_trait({ species, region, tag }) }
  })
  return window.dice.weighted_choice(filtered)
}

/**
 * adds a trait to a species of primordial
 * @param params.species - species to add the trait to
 * @param params.tag - optional trait tag; trait will be selected randomly if not specified
 */
export const primordial__add_trait = (params: {
  species: Primordial
  region: Region
  tag?: primordial__trait_tags
}) => {
  const { species, region } = params
  const tag = params.tag ?? random_trait_tag({ species, region })
  const { apply } = primordial__trait_lookup[tag]
  species.traits.push({ tag, text: typeof apply === 'string' ? apply : apply({ species, region }) })
}
