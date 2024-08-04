import { Site } from '../type'

export interface Hub extends Site {
  type: 'hub'
  population: number
  locals?: number[]
}
