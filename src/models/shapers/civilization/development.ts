import { mean, range } from 'd3'

import { CELL } from '../../cells'
import { PLACEMENT } from '../../cells/placement'
import { PROVINCE } from '../../provinces'
import { Province } from '../../provinces/types'
import { MATH } from '../../utilities/math'
import { PERFORMANCE } from '../../utilities/performance'

const GROWTH_STEPS = 10

const HAB = {
  climate: {
    arctic: 0.01,
    subarctic: 0.2,
    boreal: 0.6,
    temperate: 1.2,
    subtropical: 1.1,
    tropical: 1,
    infernal: 0.01,
    chaotic: 0.01
  },
  vegetation: {
    desert: 0.1,
    sparse: 0.4,
    grasslands: 1,
    farmlands: 1.2,
    woods: 1,
    forest: 0.8,
    jungle: 0.6
  },
  topography: {
    coastal: 1.5,
    marsh: 0.6,
    flat: 1,
    hills: 0.6,
    plateau: 0.8,
    mountains: 0.3
  }
}

export const DEVELOPMENT_SPREAD = PERFORMANCE.profile.wrapper({
  label: 'DEVELOPMENT_SPREAD',
  o: {
    crowding: (province: Province) => Math.min(province.population / province.capacity, 1),
    init: () => {
      window.world.provinces.forEach(province => {
        const cells = PROVINCE.cells.land(province).map(cell => {
          const { climate, topography, vegetation } = cell
          const landmark = window.world.landmarks[cell.landmark]
          const size = landmark.type === 'continent' || landmark.type === 'island' ? 1 : 0.8
          return (
            HAB.climate[climate] * HAB.topography[topography] * HAB.vegetation[vegetation] * size
          )
        })
        province.habitability = mean(cells)
        province.population = 0
        province.development = 1
        province.area = province.land * MATH.conversion.area.mi.km(window.world.cell.area)
        province.capacity = province.area * province.habitability
      })
      const sorted = [...window.world.provinces].sort((a, b) => b.habitability - a.habitability)
      const cradles = sorted.length * 0.01
      sorted.slice(0, cradles).forEach(province => {
        const density = window.dice.uniform(0.5, 1)
        province.population = density * province.area
        PROVINCE.neighbors({ province }).forEach(n => {
          n.population = density * n.area * 0.3
        })
      })
    },
    run: () => {
      range(0, 5001, GROWTH_STEPS).forEach(() => {
        const populated = window.dice.shuffle(
          window.world.provinces.filter(province => province.population >= 1)
        )
        populated.forEach(province => {
          province.development *=
            (1.00009 + 0.00012 * Math.log10(Math.max(1, province.population / 1000))) **
            GROWTH_STEPS
          province.capacity =
            province.area * 3 ** (province.development - 1) * province.habitability
          const crowding = DEVELOPMENT_SPREAD.crowding(province)
          const births = 0.04 * province.development * (1 - crowding)
          const deaths = 0.035 * (1 / province.development) * (1 + crowding)
          province.population *= (1 + (births - deaths)) ** GROWTH_STEPS
        })
        populated.forEach(province => {
          const push = DEVELOPMENT_SPREAD.crowding(province) ** 2
          const pop = province.population
          const neighbors = PROVINCE.neighbors({ province }).filter(
            n =>
              CELL.distance(PROVINCE.cell(n), PROVINCE.cell(province)) <=
              PLACEMENT.spacing.regions * province.development * 2
          )
          const spread = neighbors.filter(n => n.development > province.development)
          if (spread.length) {
            const max = spread.reduce((max, n) => (max < n.development ? n.development : max), 0)
            province.development = province.development * 0.998 + max * 0.002
          }
          neighbors.forEach(n => {
            const pull = Math.max(0, 1 - DEVELOPMENT_SPREAD.crowding(n)) * n.habitability
            const migration = pop * 0.025 * pull * push * GROWTH_STEPS
            n.population += migration
            province.population -= migration
          })
        })
      })
      const cellArea = window.world.cell.area
      window.world.provinces.forEach(province => {
        province.area = MATH.conversion.distance.km.miles(province.area)
        province.population = province.desolate
          ? 0
          : PROVINCE.cells.land(province).reduce(sum => {
              return sum + province.habitability * province.development ** 1.25
            }, 0) *
            cellArea *
            6
      })
    }
  }
})
