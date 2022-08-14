import { species__size } from '../../../../size'
import { PrimordialGenus } from '../types'
import { shrubs } from './shrubs'

export const trees: PrimordialGenus = {
  ...shrubs,
  size: () => [
    { v: species__size.large, w: 0.3 },
    { v: species__size.huge, w: 0.4 },
    { v: species__size.gargantuan, w: 0.2 },
    { v: species__size.colossal, w: 0.1 }
  ]
}
