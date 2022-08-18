import { range } from 'd3'

import { location__spawn } from '../../locations/spawn'
import { province__neighbors } from '..'
import { Province } from '../types'

/**
 * spawn satellite locations for a given province
 * @param province - province to spawn locations at
 */
const _provinceSprawl = (province: Province) => {
  if (!province.finalized) {
    province.finalized = true
    range(Math.min(province.land, 5)).forEach(() => {
      location__spawn({ cell: window.world.cells[province.cell], sprawl: true })
    })
  }
}

/**
 * Spawns satellite locations for a province and it's neighbors
 * @param province - starting province
 */
export const province__sprawl = (province: Province) =>
  province__neighbors(province).concat([province]).forEach(_provinceSprawl)
