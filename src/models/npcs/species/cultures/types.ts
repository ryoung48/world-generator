import { TaggedEntity } from '../../../utilities/codex/entities'
import { Hue } from '../../../utilities/colors'
import { directions } from '../../../utilities/math/points'
import { Climate } from '../../../world/climate/types'
import { Gender } from '../../actors/stats/appearance/gender'
import { Language } from '../languages/types'
import { humanoid__species, HumanoidAppearance } from '../taxonomy/types'

type CulturalTerms = 'tribes' | 'diplomat' | 'royal guards' | 'district' | 'palace'

export interface Culture extends TaggedEntity {
  tag: 'culture'
  // neighboring cultures
  neighbors: number[]
  // origin region
  origin: number
  // cultural homelands (dialects)
  regions: number[]
  // species stats
  species: humanoid__species
  subspecies: string
  zone: Climate['zone']
  side: directions
  // cultural traits
  civilized?: boolean
  language?: Language
  lineage: Gender
  religion?: number
  appearance?: HumanoidAppearance
  terms: Record<CulturalTerms, string>
  fashion: { color: Hue }
  currency: string
  // display colors (for maps)
  display: string
}
