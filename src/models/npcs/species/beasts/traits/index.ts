import { Region } from '../../../../regions/types'
import { Beast } from '../types'
import { beast__appearance_traits } from './appearance'
import { beast__behavior_traits } from './behavior'
import { beast__combat_traits } from './combat'
import { beast__habitat_traits } from './habitat'
import { beast__reproduction_traits } from './reproduction'
import { beast_traits, BeastTrait } from './types'
import { beast__use_traits } from './uses'

export const beast__trait_lookup: Record<beast_traits, BeastTrait> = {
  ...beast__appearance_traits,
  ...beast__reproduction_traits,
  ...beast__habitat_traits,
  ...beast__behavior_traits,
  ...beast__use_traits,
  ...beast__combat_traits
}

const templates = Object.values(beast__trait_lookup)

const beast__valid_trait = (params: { species: Beast; region: Region; tag: beast_traits }) => {
  const { species, region, tag } = params
  const { weight } = beast__trait_lookup[tag]
  // check if the trait was already used
  const used = species.traits.some(trait => tag === trait.tag)
  // check to see if it conflicts with other species parameters
  return used ? 0 : typeof weight === 'number' ? weight : weight({ species, region })
}

/**
 * selects a random, non-conflicting trait for a given species
 * @param species - beast species
 * @returns trait tag
 */
const random_trait_tag = (params: { species: Beast; region: Region }) => {
  const { species, region } = params
  const filtered = templates.map(template => {
    const { tag } = template
    // set the weight to zero if there are any conflicts
    // so that it is not chosen
    return { v: template.tag, w: beast__valid_trait({ species, region, tag }) }
  })
  return window.dice.weighted_choice(filtered)
}

/**
 * adds a trait to a species of beast
 * @param params.species - species to add the trait to
 * @param params.tag - optional trait tag; trait will be selected randomly if not specified
 */
export const beast__add_trait = (params: {
  species: Beast
  region: Region
  tag?: beast_traits
}) => {
  const { species, region } = params
  const tag = params.tag ?? random_trait_tag({ species, region })
  const { apply } = beast__trait_lookup[tag]
  species.traits.push({ tag, text: typeof apply === 'string' ? apply : apply({ species, region }) })
}
