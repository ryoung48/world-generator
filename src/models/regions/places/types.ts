import { TerrainIcon } from '../../../components/world/icons/terrain/types'
import { Point } from '../../utilities/math/points/types'

export interface Place extends Point {
  idx: number
  name?: string
  type: 'hub' | 'village' | 'camp' | 'ruin' | 'wilderness'
  subtype?: string
  icon?: TerrainIcon
  coastal?: boolean
  cell?: number
  finalized?: boolean
}
