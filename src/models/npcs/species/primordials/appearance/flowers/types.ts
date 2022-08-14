import { all_colors } from '../../../../../utilities/colors'
import { primordial_relative_sizes, primordial_textures } from '../types'

export const flower__shapes = [
  'funnel',
  'spike',
  'disc',
  'cone',
  'bell',
  'sphere',
  'complex',
  'compound'
] as const

export const flower__types = ['single', 'pairs', 'clusters'] as const
export const flower__details = ['delicate', 'drooping'] as const

export interface Flowers {
  type: typeof flower__types[number]
  shape: typeof flower__shapes[number]
  size?: primordial_relative_sizes
  detail?: typeof flower__details[number]
  season?: 'warmer' | 'cooler' | 'drier' | 'wetter'
  color: all_colors[]
  texture?: primordial_textures
  exotic?: string
}
