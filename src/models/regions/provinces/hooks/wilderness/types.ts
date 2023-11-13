import { TaggedEntity } from '../../../../utilities/entities/types'

export interface Wilderness extends TaggedEntity {
  tag: 'wilderness'
  subtype: string
  weather: string
  mood: string
  hazards: string
  locations: string
}

export type WildernessTemplate = {
  moods: string[]
  hazards: { name: string; description: string }[]
  locations: { name: string; description: string }[]
}
