import { Region } from '../../../../regions/types'
import { weighted_distribution } from '../../../../utilities/math'
import { Beast } from '../types'

export interface BeastGenus<GenusType extends string> {
  distribution: (_params: {
    environment: Beast['environment']
    size: Beast['size']
    role: Beast['role']
    rarity: Beast['rarity']
  }) => weighted_distribution<GenusType>
  classify: Record<
    GenusType,
    (_params: { species: Beast; region: Region; override?: string }) => string
  >
}

interface BeastFamily {
  skin: Beast['appearance']['skin']['type']
  reproduction: 'eggs' | 'live birth'
  plural: string
}

export const beast__families: Record<Beast['family'], BeastFamily> = {
  avian: {
    skin: 'feathers',
    reproduction: 'eggs',
    plural: 'birds'
  },
  mammal: {
    skin: 'fur',
    reproduction: 'live birth',
    plural: 'mammals'
  },
  reptile: {
    skin: 'scales',
    reproduction: 'eggs',
    plural: 'reptiles'
  },
  amphibian: {
    reproduction: 'eggs',
    skin: 'skin',
    plural: 'amphibians'
  },
  arthropod: {
    skin: 'carapace',
    reproduction: 'eggs',
    plural: 'arthropods'
  },
  mollusk: {
    skin: 'skin',
    reproduction: 'eggs',
    plural: 'mollusks'
  },
  fish: {
    skin: 'scales',
    reproduction: 'eggs',
    plural: 'fish'
  }
}
