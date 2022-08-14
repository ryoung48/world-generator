import { Region } from '../../../../regions/types'
import { weighted_distribution } from '../../../../utilities/math'
import { size_group, species__size_group } from '../../size'
import { beast__appearance } from '../appearance'
import { Beast } from '../types'
import { aquatic } from './genera/aquatic'
import { arthropods } from './genera/arthropods'
import { avians } from './genera/avians'
import { mammals } from './genera/mammals'
import { mollusks } from './genera/mollusks'
import { reptiles } from './genera/reptiles'
import { BeastGenus } from './types'

const beast__genera: Record<Beast['family'], BeastGenus<string>> = {
  avian: avians,
  mammal: mammals,
  reptile: reptiles,
  amphibian: reptiles,
  arthropod: arthropods,
  mollusk: mollusks,
  fish: aquatic
}

/**
 * determines terrestrial taxonomic family
 * @param params.prey - species role is prey?
 * @param params.cold - species climate is cold?
 * @returns species family
 */
const terrestrial_spawn = (params: {
  prey: boolean
  cold: boolean
}): Record<size_group, weighted_distribution<Beast['family']>> => {
  const { prey, cold } = params
  return {
    fine: [
      { v: 'mollusk', w: 0.15 },
      { v: 'arthropod', w: 0.85 }
    ],
    small: [
      { v: 'mollusk', w: 0.025 },
      { v: 'arthropod', w: prey ? 0 : 0.1 },
      { v: 'reptile', w: cold ? 0.02 : 0.3 },
      { v: 'mammal', w: 0.3 },
      { v: 'avian', w: 0.3 }
    ],
    large: [
      { v: 'arthropod', w: prey ? 0 : 0.1 },
      { v: 'reptile', w: cold ? 0.02 : 0.3 },
      { v: 'mammal', w: 0.5 },
      { v: 'avian', w: 0.1 }
    ]
  }
}

/**
 * determines saltwater taxonomic family
 * @param params.prey - species role is prey?
 * @returns species family
 */
const saltwater_spawn = (params: {
  prey: boolean
}): Record<size_group, weighted_distribution<Beast['family']>> => {
  const { prey } = params
  return {
    fine: [
      { v: 'mollusk', w: 0.2 },
      { v: 'arthropod', w: 0.2 },
      { v: 'fish', w: 0.6 }
    ],
    small: [
      { v: 'mollusk', w: 0.15 },
      { v: 'arthropod', w: 0.15 },
      { v: 'reptile', w: 0.05 },
      { v: 'mammal', w: 0.05 },
      { v: 'avian', w: 0.05 },
      { v: 'fish', w: 0.55 }
    ],
    large: [
      { v: 'arthropod', w: prey ? 0 : 0.05 },
      { v: 'mollusk', w: prey ? 0 : 0.2 },
      { v: 'fish', w: prey ? 0.05 : 0.3 },
      { v: 'reptile', w: 0.05 },
      { v: 'avian', w: 0.03 },
      { v: 'mammal', w: 0.5 }
    ]
  }
}

/**
 * determines freshwater taxonomic family
 * @returns species family
 */
const freshwater_spawn = (): Record<size_group, weighted_distribution<Beast['family']>> => ({
  fine: [
    { v: 'fish', w: 0.8 },
    { v: 'arthropod', w: 0.1 },
    { v: 'mollusk', w: 0.1 }
  ],
  small: [
    { v: 'fish', w: 0.6 },
    { v: 'arthropod', w: 0.2 },
    { v: 'reptile', w: 0.1 },
    { v: 'mammal', w: 0.1 },
    { v: 'avian', w: 0.1 }
  ],
  large: [
    { v: 'fish', w: 0.05 },
    { v: 'reptile', w: 0.3 },
    { v: 'mammal', w: 0.3 },
    { v: 'avian', w: 0.3 }
  ]
})

/**
 * randomly determines beast taxonomic family
 * @param species - species that needs to be classified
 * @returns species family
 */
const random_family = (species: Beast) => {
  const { environment, role } = species
  const { terrain, climate } = environment
  const cold = climate === 'Cold'
  const prey = role === 'prey'
  const group = species__size_group(species.size)
  const family_dist =
    terrain === 'Marsh'
      ? freshwater_spawn()
      : terrain === 'Oceanic'
      ? saltwater_spawn({ prey })
      : terrestrial_spawn({ cold, prey })
  const valid: weighted_distribution<Beast['family']> = family_dist[group].map(({ v, w }) => {
    const dist = beast__genera[v].distribution(species).filter(({ w: weight }) => weight > 0)
    return { v, w: dist.length > 0 ? w : 0 }
  })
  return window.dice.weighted_choice(valid)
}

/**
 * determines species taxonomic family and genus
 * @param params.species - species to classify
 * @param params.region - spawning region
 * @param params.genus - genus override
 * @param params.family - family override
 */
export const beast__taxonomy = (params: {
  species: Beast
  region: Region
  genus?: Beast['genus']
  family?: Beast['family']
}) => {
  const { species, region, family = random_family(species), genus } = params
  species.family = family
  const { appearance, gender_variation } = beast__appearance({ species })
  species.gender_variation = gender_variation
  species.appearance = appearance
  const { distribution, classify } = beast__genera[species.family]
  const group = params.genus?.group ?? window.dice.weighted_choice(distribution(species))
  const name = classify[group]({ species, override: genus?.name, region })
  species.genus = { group, name }
}
