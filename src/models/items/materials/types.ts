import type { Item } from '../types'

export const material__types = ['reagent', 'herbs', 'gemstone'] as const

export type material__tag = typeof material__types[number]

export interface Material extends Item {
  tag: material__tag
}
