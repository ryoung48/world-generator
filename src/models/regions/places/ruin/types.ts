import { Place } from '../types'

export interface Ruin extends Place {
  type: 'ruin'
  mood?: string
  hazards?: string
  enigmas?: string
  treasure?: string
  locations?: string
}

export interface RuinLocation {
  locations: { label: string; tooltip: string; explanation: string }[]
}
