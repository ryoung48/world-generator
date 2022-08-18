import type { Item } from '../types'

export const miscItem__types = ['saddle', 'waterskin', 'book', 'rope'] as const

export type miscItem__tag = typeof miscItem__types[number]

export interface MiscItem extends Item {
  tag: miscItem__tag
}
