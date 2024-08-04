import { CELL } from '../../../cells'
import { Cell } from '../../../cells/types'
import { SITE } from '..'
import { Hub } from './types'

export const HUB = {
  isCity: (place: Hub) => place.population > 10e3,
  province: (place: Hub) => CELL.province(window.world.cells[place.cell]),
  region: (place: Hub) => window.world.regions[HUB.province(place).region],
  spawn: (cell: Cell): Hub => {
    const site = SITE.spawn({ cell, coastal: true, idx: 0 })
    return { ...site, type: 'hub', population: 0 }
  },
  type: ({ population }: Hub) => {
    return population > 200e3
      ? 'metropolis'
      : population > 50e3
      ? 'huge city'
      : population > 20e3
      ? 'large city'
      : population > 10e3
      ? 'small city'
      : population > 5e3
      ? 'large town'
      : population > 1e3
      ? 'small town'
      : population > 500
      ? 'large village'
      : population > 100
      ? 'small village'
      : 'tiny village'
  }
}
