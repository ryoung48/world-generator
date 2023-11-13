import { TaggedEntity } from '../../../../utilities/entities/types'

export interface Ruin extends TaggedEntity {
  tag: 'ruin'
  subtype: string
  hostiles: string
  hazards: string
  enigmas: string
  treasures: string
  mood: string
  locations: string
}
