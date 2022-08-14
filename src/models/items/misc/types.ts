import type { Item } from '../types'

export const misc_item__types = ['saddle', 'waterskin', 'book', 'rope'] as const

export type misc_item__tag = typeof misc_item__types[number]

export interface MiscItem extends Item {
  tag: misc_item__tag
}
