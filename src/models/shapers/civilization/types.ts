import { Religion } from '../../heritage/religions/types'
import { SpeciesKey } from '../../heritage/species/types'
import { Heritage } from '../../heritage/types'
import { Region } from '../../regions/types'
import { WeightedDistribution } from '../../utilities/math/dice/types'

export type DistributeCulturesParams = {
  groups: Region[][]
  dist: WeightedDistribution<SpeciesKey>
}

export type DistributeReligionsPArams = {
  groups: Heritage[]
  dist: WeightedDistribution<Religion['type']>
}
