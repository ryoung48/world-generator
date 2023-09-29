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
