import { Region } from '../../../../regions/types'
import { weighted_distribution } from '../../../../utilities/math'
import { terrain__is_aquatic } from '../../../../world/climate/terrain'
import { species__size } from '../../size'
import { Primordial } from '../types'
import { primordial__genera } from './genera'

type GeneraDist = weighted_distribution<Primordial['genus']>

const valid_genera = (params: { dist: GeneraDist; species: Primordial }): GeneraDist => {
  const { dist, species } = params
  const { size } = species
  return dist.map(({ v, w }) => ({
    v,
    w: size === -1 || primordial__genera[v].size(species).some(({ v: s }) => s === size) ? w : 0
  }))
}

const fungi_genus = (species: Primordial): Primordial['genus'] => {
  return window.dice.weighted_choice(
    valid_genera({
      dist: [
        { v: 'mushroom', w: 0.4 },
        { v: 'lichen', w: 0.2 },
        { v: 'mold', w: 0.2 }
      ],
      species
    })
  )
}

const plant_genus = (species: Primordial): Primordial['genus'] => {
  const { environment } = species
  const aquatic = terrain__is_aquatic(environment.terrain)
  const saltwater = environment.terrain === 'Oceanic'
  const desert = environment.terrain === 'Desert'
  return window.dice.weighted_choice(
    valid_genera({
      dist: !aquatic
        ? [
            { v: 'tree', w: 0.15 },
            { v: 'shrub', w: 0.15 },
            { v: 'herbaceous', w: desert ? 0.1 : 0.3 },
            { v: 'grass', w: 0.1 },
            { v: 'vine', w: 0.1 },
            { v: 'fern', w: desert ? 0 : 0.1 },
            { v: 'moss', w: desert ? 0 : 0.1 },
            { v: 'succulent', w: desert ? 0.3 : 0 }
          ]
        : [
            { v: 'herbaceous', w: saltwater ? 0.1 : 0.5 },
            { v: 'grass', w: 0.05 },
            { v: 'algae', w: saltwater ? 0.85 : 0.45 }
          ],
      species
    })
  )
}

/**
 * determines species taxonomic family
 * @param params.group - size group [small|large]
 * @param location - spawn location
 * @returns species family
 */
export const primordial__taxonomy = (params: { species: Primordial; region: Region }) => {
  const { species } = params
  species.family = window.dice.weighted_choice([
    { v: 'plant', w: 0.8 },
    { v: 'fungi', w: species.size > species__size.small ? 0 : 0.2 }
  ])
  species.genus = (species.family === 'plant' ? plant_genus : fungi_genus)(species)
}
