import { weighted_distribution } from '../../../../utilities/math'
import { species__random_bmi, species__random_height, species__size } from '../../size'
import { Beast } from '../types'

const terrestrial = (params: {
  civilized: boolean
  desert: boolean
}): weighted_distribution<number> => [
  { v: species__size.fine, w: 0.4 },
  { v: species__size.diminutive, w: 0.3 },
  { v: species__size.tiny, w: 0.15 },
  { v: species__size.small, w: 0.06 },
  { v: species__size.medium, w: 0.05 },
  { v: species__size.large, w: 0.02 },
  { v: species__size.huge, w: params.civilized || params.desert ? 0 : 0.01 }
]

const saltwater = (params: { prey: boolean }): weighted_distribution<number> => [
  { v: species__size.fine, w: 0.4 },
  { v: species__size.diminutive, w: 0.3 },
  { v: species__size.tiny, w: 0.15 },
  { v: species__size.small, w: 0.06 },
  { v: species__size.medium, w: params.prey ? 0.04 : 0.05 },
  { v: species__size.large, w: params.prey ? 0.02 : 0.025 },
  { v: species__size.huge, w: params.prey ? 0.02 : 0.0125 },
  { v: species__size.gargantuan, w: params.prey ? 0.01 : 0.0075 },
  { v: species__size.colossal, w: params.prey ? 0.01 : 0 }
]

const freshwater = (params: { civilized: boolean }): weighted_distribution<number> => [
  { v: species__size.fine, w: 0.4 },
  { v: species__size.diminutive, w: 0.3 },
  { v: species__size.tiny, w: 0.15 },
  { v: species__size.small, w: 0.06 },
  { v: species__size.medium, w: 0.03 },
  { v: species__size.large, w: params.civilized ? 0 : 0.01 }
]

/**
 * determine a species' size rank
 * @param {size_group} params.group - size group [small|large] (all ranks fall in one of these groups)
 * @param {boolean} params.civilized - civilized regions cannot spawn huge terrestrial species
 * @returns - size rank, average length, and bmi for the species
 */
export const beast__size = (params: {
  size?: number
  civilized: boolean
  environment: Beast['environment']
  role: Beast['role']
}) => {
  const { civilized, environment, role } = params
  const desert = environment.terrain === 'Desert'
  const prey = role === 'prey'
  const dist =
    environment.terrain === 'Oceanic'
      ? saltwater({ prey })
      : environment.terrain === 'Marsh'
      ? freshwater({ civilized })
      : terrestrial({ civilized, desert })
  const size = params.size ?? window.dice.weighted_choice(dist)
  return {
    size,
    length: species__random_height(size),
    bmi: species__random_bmi(size)
  }
}
