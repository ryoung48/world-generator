import { weighted_distribution } from '../../../../utilities/math'
import { entity_placeholder } from '../../../../utilities/text/placeholders'
import { species__size } from '../../size'
import { Beast } from '../types'

const territoriality = ({
  environment,
  size,
  flying
}: Beast): Record<Beast['social'], weighted_distribution<Beast['territory']>> => {
  const can_migrate = size > species__size.small || flying
  // deserts have less available resources and will favor migratory behavior amongst larger species
  const desert = environment.terrain === 'Desert'
  return {
    solitary: [
      { v: 'nomadic', w: can_migrate ? 15 : 5 },
      { v: 'migratory', w: can_migrate ? 15 : 1 },
      { v: 'range', w: 30 },
      { v: 'nest', w: 40 }
    ],
    small: [
      { v: 'nomadic', w: can_migrate ? 35 : 5 },
      { v: 'migratory', w: can_migrate ? 15 : 0 },
      { v: 'range', w: 25 },
      { v: 'nest', w: 25 }
    ],
    medium: [
      { v: 'nomadic', w: can_migrate ? 25 : 5 },
      { v: 'migratory', w: desert ? 45 : 25 },
      { v: 'range', w: 25 },
      { v: 'nest', w: desert ? 5 : 25 }
    ],
    large: [
      { v: 'nomadic', w: 10 },
      { v: 'migratory', w: can_migrate ? (desert ? 40 : 25) : 1 },
      { v: 'range', w: 45 },
      { v: 'nest', w: desert ? 5 : 20 }
    ],
    huge: [
      { v: 'nomadic', w: 5 },
      { v: 'migratory', w: can_migrate ? (desert ? 60 : 55) : 1 },
      { v: 'range', w: 35 },
      { v: 'nest', w: desert ? 0 : 5 }
    ]
  }
}

/**
 * determines the activity period of a species
 * @param location - spawn location
 * @returns activity period
 */
export const beast_territory = (params: Beast) => {
  const { social } = params
  return window.dice.weighted_choice(territoriality(params)[social])
}

/**
 * describes a species' territory
 * @param species
 * @returns descriptive text
 */
export const beast__describe_territory = (species: Beast) => {
  const terr = species.territory
  if (terr === 'nest')
    return `${entity_placeholder} keeps a small territory, usually centered around a nest.`
  if (terr === 'range') return `${entity_placeholder} usually stays within a mid-sized range.`
  if (terr === 'migratory')
    return `${entity_placeholder} migrates between large swathes of territories.`
  return `${entity_placeholder} is nomadic, constantly migrating in search of food, shelter, or nesting grounds.`
}
