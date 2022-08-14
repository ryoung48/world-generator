import { range } from 'd3'

import { region__borders } from '../../regions'
import { location__terrain } from '../../regions/locations/environment'
import { province__hub } from '../../regions/provinces'
import { Region } from '../../regions/types'
import { scarcity } from '../../utilities/quality'
import { climate_lookup } from '../../world/climate/types'
import { Beast } from './beasts/types'
import { Primordial } from './primordials/types'

export type Creature = Beast | Primordial

/**
 * creates a symbiotic relationship between two species
 * @param params.species - the guest species
 * @param params.host - the host species
 */
export const species__assign_symbiot = (params: { species: Creature; host: Creature }) => {
  const { species, host } = params
  species.symbiosis = {
    ...species.symbiosis,
    species: [...species.symbiosis.species, host.idx]
  }
  host.partner = { idx: species.idx, tag: species.tag }
}

// returns the world index depending on the creature tag
const species__indexer = (tag: Creature['tag']) => (tag === 'beast' ? 'beasts' : 'primordials')

/**
 * returns a creature from the world dictionary given a tag & index
 * @param param.tag - creature tag
 * @param param.idx - creature idx
 * @returns creature (primordial or beast)
 */
const species__world_indexer = ({ tag, idx }: Pick<Creature, 'idx' | 'tag'>) => {
  const index = species__indexer(tag)
  return window.world[index][idx]
}

/**
 * gets the symbiotic partner (if applicable) for a given species
 * @param param - creature (primordial or beast)
 * @returns a creature if found or undefined
 */
export const species_symbiotic_partner = ({ partner }: Creature) => {
  if (!partner) return undefined
  return species__world_indexer(partner)
}

/**
 * finds all symbiotic hosts for a given creature
 * @param param - creature
 * @returns an array of creatures (symbiotes)
 */
export const species__symbiotes = ({ symbiosis }: Creature) =>
  symbiosis.species.map(idx => species__world_indexer({ idx, tag: symbiosis.tag }))

/**
 * determines if a species is symbiotic or not
 * @param species - creature
 * @returns {boolean}
 */
export const species__is_symbiotic = (species: Creature) =>
  Boolean(species.symbiosis) || Boolean(species_symbiotic_partner(species))

export const species__inhabits_region = (region: Region) => (species: Creature) =>
  species.regions.includes(region.idx)

export const species__conflicting_traits =
  <T extends Creature>(tags: Creature['traits'][number]['tag'][]) =>
  (species: T) => {
    const conflict = species.traits.some(({ tag }) => tags.includes(tag))
    return conflict
  }

const species__trait_chance: Record<number, number[]> = {
  [scarcity.abundant]: [0, 1, 1],
  [scarcity.common]: [1, 1, 2],
  [scarcity.uncommon]: [1, 2, 2],
  [scarcity.rare]: [3],
  [scarcity.exceptional]: [3]
}

export const species__random_trait_count = (rarity: number) =>
  window.dice.choice(species__trait_chance[rarity])

export const species__add_to_region = (params: { species: Creature; region: Region }) => {
  const { species, region } = params
  const { key } = species.environment
  species.regions = [...species.regions, region.idx]
  const index = species__indexer(species.tag)
  if (!region[index][key]) region[index][key] = []
  region[index][key] = [...region[index][key], species.idx]
  region[index] = { ...region[index] }
}

interface SpeciesSpawnParams {
  region: Region
  environment: Creature['environment']
}

type SpeciesSpawn = (_params: SpeciesSpawnParams) => number

interface RegionalSpreadParams {
  prospects: Creature[]
  region: Region
  spawn: SpeciesSpawn
}

/**
 * creates a function spawns creature with a chance to spread from neighboring regions
 * @param param.region - region to spawn a given species in
 * @param param.prospects - prospect creature to spread
 * @returns {(params: SpeciesSpawnParams) => number} a function that returns takes species params and returns a species index
 */
const regional_spread =
  ({ region, prospects, spawn }: RegionalSpreadParams) =>
  (params: SpeciesSpawnParams) => {
    const { environment } = params
    // look for primordial that matches the params we are looking for
    // and is not spawned in too many places already
    const valid = prospects.filter(
      species => species.regions.length < 3 && !species.regions.includes(region.idx)
    )
    // roll for chance to pull existing if prospects are available
    if (valid.length > 0 && window.dice.random > 0.4) {
      const chosen = window.dice.choice(valid)
      species__add_to_region({ region, species: chosen })
      return chosen.idx
    }
    // otherwise, create something new
    return spawn({ environment, region })
  }

export const regional__species =
  (params: { spawn: SpeciesSpawn; index: 'primordials' | 'beasts' }) => (region: Region) => {
    const { index, spawn } = params
    // collect all bordering nations
    const borders = region__borders(region)
    const biodiversity = Math.ceil(climate_lookup[region.climate].biodiversity)
    // go through all 'regional' territories
    region.regional.provinces
      .map(i => province__hub(window.world.provinces[i]))
      .forEach(location => {
        // use the terrain to identify the habitat of prospect species
        const { terrain, climate, key } = location__terrain(location)
        if (!region[index][key]) {
          const environment = { terrain, climate, key }
          // collect all borders that have already spawned species for this terrain type
          const prospects = borders
            .filter(border => border[index][key])
            .map(border => border[index][key].map(i => window.world[index][i]))
            .flat()
          // prepare a species generator for this region and the regions that support this terrain type
          const terrestrial_spread = regional_spread({ region, prospects, spawn })
          // and generate the base group of primordial
          range(biodiversity).map(() => terrestrial_spread({ environment, region }))
          const provinces = window.world.provinces[location.province]
          const saltwater = `${climate} Oceanic`
          if (provinces.ocean > 0 && !region[index][saltwater]) {
            const saltwater_env = { terrain: 'Oceanic' as const, climate, key: saltwater }
            const oceanic_spread = regional_spread({
              region,
              prospects: borders
                .filter(border => border[index][saltwater])
                .map(border => border[index][saltwater].map(i => window.world[index][i]))
                .flat(),
              spawn
            })
            range(biodiversity).map(() => oceanic_spread({ environment: saltwater_env, region }))
          }
        }
      })
  }
