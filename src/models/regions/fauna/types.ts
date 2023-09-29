import { AllColors } from '../../utilities/color'
import { Province } from '../provinces/types'

export type Fauna = {
  name: string
  size: number
  family: 'avian' | 'mammal' | 'reptile' | 'amphibian' | 'arthropod' | 'mollusk' | 'piscine'
  diet:
    | 'herbivore'
    | 'carnivore'
    | 'omnivore'
    | 'scavenger'
    | 'hemophage'
    | 'detritivore'
    | 'filter feeder'
    | 'shellfish'
    | 'insects'
  appearance: AllColors[]
  social: 'solitary' | 'small' | 'medium' | 'large' | 'huge'
  territory: 'nomadic' | 'migratory' | 'range' | 'nest'
  activity_period: 'diurnal' | 'nocturnal' | 'crepuscular' | 'cathemeral'
  environment: Province['environment']
}
