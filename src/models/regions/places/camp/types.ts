import { Place } from '../types'

export interface Camp extends Place {
  type: 'camp'
  population: number
  leadership?: string
  locals?: number[]
}
