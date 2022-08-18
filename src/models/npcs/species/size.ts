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

const _speciesSizes = [
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
  fine: _speciesSizes.findIndex(size => size === 'Fine'),
  diminutive: _speciesSizes.findIndex(size => size === 'Diminutive'),
  tiny: _speciesSizes.findIndex(size => size === 'Tiny'),
  small: _speciesSizes.findIndex(size => size === 'Small'),
  medium: _speciesSizes.findIndex(size => size === 'Medium'),
  large: _speciesSizes.findIndex(size => size === 'Large'),
  huge: _speciesSizes.findIndex(size => size === 'Huge'),
  gargantuan: _speciesSizes.findIndex(size => size === 'Gargantuan'),
  colossal: _speciesSizes.findIndex(size => size === 'Colossal')
}

export type species__sizes = keyof typeof species__size

/**
 * returns a descriptive adjective for an object's size
 * using average human height as the referential medium
 * @param size size rank [0-8]
 * @returns size descriptor
 */
export const species__sizeRank = (size: number) => _speciesSizes[size] ?? 'Colossal'

/**
 * returns the size of a species given an average height
 * @param  {number} height
 * @returns number [size rank]
 */
export const species__computeSize = (height: number): number =>
  Math.ceil(Math.log2(Math.max(1, height / 6)))
