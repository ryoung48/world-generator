import { Place } from '../types'

export interface Village extends Place {
  type: 'village'
  population: number
  leadership?: string
  locals?: number[]
}
