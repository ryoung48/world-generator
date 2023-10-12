import { Region } from '../../regions/types'

export type Climate = Record<
  | 'tropical rainforest'
  | 'tropical monsoon'
  | 'savanna'
  | 'hot steppe'
  | 'hot desert'
  | 'cold desert'
  | 'cold steppe'
  | 'subtropical'
  | 'temperate monsoon'
  | 'mediterranean'
  | 'oceanic'
  | 'laurentian'
  | 'manchurian'
  | 'subarctic'
  | 'siberian'
  | 'polar'
  | 'ice cap',
  {
    zone: 'arctic' | 'temperate' | 'tropical'
    code: string
    display: string
    population: number
    scorePenalty: number
    heatMod?: { summer: number; winter: number }
    diurnalHeat: [number, number]
    precipitation: [number, number]
    affixes: string[]
    terrain: 'forest' | 'plains' | 'desert' | 'arctic'
    arid?: boolean
  }
>

export type ClimateClassifyParams = {
  region: Region
  location: 'inland' | 'west_coast' | 'east_coast'
  latitude: number
  continent: boolean
  monsoon: boolean
}

export type Biome =
  | 'rain forest (tropical)'
  | 'wet forest (tropical)'
  | 'moist forest (tropical)'
  | 'dry forest (tropical)'
  | 'very dry forest (tropical)'
  | 'thorn woodland (tropical)'
  | 'desert scrub (tropical)'
  | 'desert (tropical)'
  | 'rain forest (subtropical)'
  | 'wet forest (subtropical)'
  | 'moist forest (subtropical)'
  | 'dry forest (subtropical)'
  | 'thorn steppe (subtropical)'
  | 'desert scrub (subtropical)'
  | 'desert (subtropical)'
  | 'rain forest (warm temperate)'
  | 'wet forest (warm temperate)'
  | 'moist forest (warm temperate)'
  | 'dry forest (warm temperate)'
  | 'thorn steppe (warm temperate)'
  | 'desert scrub (warm temperate)'
  | 'desert (warm temperate)'
  | 'rain forest (cool temperate)'
  | 'wet forest (cool temperate)'
  | 'moist forest (cool temperate)'
  | 'steppe (cool temperate)'
  | 'desert scrub (cool temperate)'
  | 'desert (cool temperate)'
  | 'rain forest (boreal)'
  | 'wet forest (boreal)'
  | 'moist forest (boreal)'
  | 'dry scrub (boreal)'
  | 'desert (boreal)'
  | 'rain tundra (subarctic)'
  | 'wet tundra (subarctic)'
  | 'moist tundra (subarctic)'
  | 'dry tundra (subarctic)'
  | 'desert (arctic)'

export type BiomeDetails = {
  name: string
  latitude: string
  altitude: string
  color: string
}
