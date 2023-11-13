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
  | 'rain tundra (subpolar)'
  | 'wet tundra (subpolar)'
  | 'moist tundra (subpolar)'
  | 'dry tundra (subpolar)'
  | 'desert (polar)'

export type ClimateZone = 'arctic' | 'temperate' | 'tropical'
export type BiomeDetails = {
  idx: number
  name: string
  latitude:
    | 'tropical' // 20
    | 'subtropical' // 30
    | 'warm temperate' // 40
    | 'cool temperate' // 50
    | 'boreal' // 60
    | 'subpolar' // 75
    | 'polar'
  altitude:
    | 'lowlands'
    | 'highlands'
    | 'lower montane'
    | 'montane'
    | 'subalpine'
    | 'alpine'
    | 'ice cap'
  color: string
  habitability: number
  diurnalVariation: 'low' | 'standard' | 'high'
  terrain: 'forest' | 'plains' | 'desert' | 'tundra' | 'glacier'
  koppen: { color: string; code: string }
}
