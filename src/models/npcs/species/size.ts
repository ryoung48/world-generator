/**
 * size ranks:
 * -----------------------------------------------------
 * [fine]: 1 in - 6 in :: (1/500 lb - 1/8 lb) :: less than 1 year
 * [diminutive]: 6 in - 1 ft :: (1/8 lb – 1 lb) :: 1-5 years
 * [tiny]: 1 ft – 2 ft :: (1 lb – 8 lb) :: 5-10 years
 * [small]: 2 ft – 4 ft :: (8 lb – 60 lb) :: 10-20 years
 * [medium]: 4 ft – 8 ft :: (60 lb – 500 lb) :: 20-30 years
 * [large]: 8 ft – 16 ft :: (500 lb – 2 tons) :: 30-40 years
 * [huge]: 16 ft – 32 ft :: (2 tons – 16 tons) :: 40-60 years
 * [gargantuan]: 32 ft – 64 ft :: ft (16 tons – 125 tons) :: 60-80 years
 * [colossal]: 64 ft – 128 ft :: (125 tons - 1000 tons) :: 80-100 years
 * -----------------------------------------------------
 */

import { compute_weight, imperial_height } from '../../utilities/math'

const _species_sizes = [
  'Fine',
  'Diminutive',
  'Tiny',
  'Small',
  'Medium',
  'Large',
  'Huge',
  'Gargantuan',
  'Colossal'
] as const

export const species__size = {
  fine: _species_sizes.findIndex(size => size === 'Fine'),
  diminutive: _species_sizes.findIndex(size => size === 'Diminutive'),
  tiny: _species_sizes.findIndex(size => size === 'Tiny'),
  small: _species_sizes.findIndex(size => size === 'Small'),
  medium: _species_sizes.findIndex(size => size === 'Medium'),
  large: _species_sizes.findIndex(size => size === 'Large'),
  huge: _species_sizes.findIndex(size => size === 'Huge'),
  gargantuan: _species_sizes.findIndex(size => size === 'Gargantuan'),
  colossal: _species_sizes.findIndex(size => size === 'Colossal')
}

export type species__sizes = keyof typeof species__size

/**
 * returns a descriptive adjective for an object's size
 * using average human height as the referential medium
 * @param size size rank [0-8]
 * @returns size descriptor
 */
export const species__size_rank = (size: number) => _species_sizes[size] ?? 'Colossal'

/**
 * returns the size of a species given an average height
 * @param  {number} height
 * @returns number [size rank]
 */
export const species__compute_size = (height: number): number =>
  Math.ceil(Math.log2(Math.max(1, height / 6)))

/**
 * helper function to determine species dimensions
 * @param params - params to determine [length|height|bmi] range
 * @param params.base - the base number that will be doubled at every size rank increment
 * @param params.size - size rank
 * @param params.fine - the lower bound size at rank 0
 * @returns - average length and bmi for a species (with 15% buffer between ranks for 5% std)
 */
const species__dim_range = (params: { base: number; size: number; fine: number }) => {
  const { base, size, fine } = params
  const buffer = 0.15 // 15% buffer allows 5% std to stay in within a given size rank's range
  if (size === 0) return [fine * (1 + buffer), base * (1 - buffer)]
  return [base * 2 ** (size - 1) * (1 + buffer), base * 2 ** size * (1 - buffer)]
}

/**
 * generates a random height (inches) for a given size rank
 * @param size - size rank
 * @returns height (inches)
 */
export const species__random_height = (size: number) => {
  const [low, high] = species__dim_range({ base: 6, size, fine: 1 })
  return window.dice.uniform(low, high)
}

/**
 * generates a random bmi for a given size rank
 * @param size - size rank
 * @returns bmi
 */
export const species__random_bmi = (size: number) => {
  const [low, high] = species__dim_range({ base: 2.4, size, fine: 1.4 })
  return window.dice.uniform(low, high)
}

/**
 * describes the length of a given species
 * @param param0  - species
 * @returns descriptive text
 */
export const species__length = (length: number) =>
  length >= 12 ? `${imperial_height(length)} feet` : `${length.toFixed(2)} inches`

/**
 * describes the weight of a given species
 * @param param0  - species
 * @returns descriptive text
 */
export const species__weight = (params: { length: number; bmi: number }) => {
  const { length, bmi } = params
  const weight = compute_weight(length, bmi)
  const tons = weight / 2000
  return tons >= 1
    ? `${tons.toFixed(2)} tons`
    : weight >= 1
    ? `${Math.round(weight)} pounds`
    : `${(weight * 16).toFixed(2)} ounces`
}

/**
 * Computes a coarser size grouping given a size rank
 * @param size - size rank
 * @returns size group
 */
export const species__size_group = (size: number) => {
  if (size === species__size.fine) return 'fine'
  else if (size < species__size.medium) return 'small'
  return 'large'
}

export type size_group = ReturnType<typeof species__size_group>
