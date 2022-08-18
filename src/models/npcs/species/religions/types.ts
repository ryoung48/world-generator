import { TraitEnriched } from '../../../utilities/traits/types'
import { genders } from '../../actors/stats/appearance/gender'
import type { religion__tags } from './traits/types'

export interface Religion extends TraitEnriched<religion__tags> {
  name: string
  idx: number
  type: 'monotheism' | 'polytheism' | 'philosophy'
  organization: 'geographic' | 'doctrinal' | 'transmission' | 'ethnicity' | 'functional'
  leadership: 'pontiff' | 'bishops' | 'secular' | 'priests' | 'none'
  clergy: {
    gender?: genders
    family: 'none' | 'rare' | 'normal' | 'large'
  }
  display: string
  cultures: number[]
  folk?: boolean
}
