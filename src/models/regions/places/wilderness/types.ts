import { Place } from '../types'

export interface Wilderness extends Place {
  type: 'wilderness'
  mood?: string
  encounters?: string
  locations?: string
}
