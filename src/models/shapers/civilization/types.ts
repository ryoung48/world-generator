import { SpeciesKey } from '../../heritage/species/types'
import { Culture } from '../../heritage/types'
import { Region } from '../../regions/types'
import { WeightedDistribution } from '../../utilities/math/dice/types'

export type DistributeCulturesParams = {
  groups: Region[][]
  dist: WeightedDistribution<SpeciesKey>
}

export type DistributeReligionsPArams = {
  groups: Culture[]
  dist: WeightedDistribution<Region['religion']>
}
