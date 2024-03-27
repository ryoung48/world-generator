import { Place } from '../types'

export interface Hub extends Place {
  type: 'hub'
  population: number
  leadership?: string
  locals?: number[]
  trade?: string[]
}
