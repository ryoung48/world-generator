import { TaggedEntity } from '../../../utilities/codex/entities'
import { TraitEnriched } from '../../../utilities/traits/types'
import { Gender } from '../../actors/stats/appearance/gender'
import type { religion__tags } from './traits/types'

export interface Religion extends TaggedEntity, TraitEnriched<religion__tags> {
  tag: 'religion'
  name: string
  idx: number
  type: 'monotheism' | 'polytheism' | 'philosophy'
  organization: 'geographic' | 'doctrinal' | 'transmission' | 'ethnicity' | 'functional'
  leadership: 'pontiff' | 'bishops' | 'secular' | 'priests' | 'none'
  clergy: {
    gender?: Gender
    family: 'none' | 'rare' | 'normal' | 'large'
  }
  display: string
  cultures: number[]
  folk?: boolean
}
