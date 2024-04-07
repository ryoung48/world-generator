import { Region } from '../regions/types'
import { Language } from './languages/types'
import { SpeciesKey } from './species/types'

export type Heritage = {
  idx: number
  name: string
  regions: number[]
  species: SpeciesKey
  language: Language
}

export type HeritageSpawnParams = {
  regions: Region[]
  species: SpeciesKey
}
