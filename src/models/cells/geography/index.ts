import { mean, scaleLinear, scalePow } from 'd3'

import { World } from '../../types'
import { MATH } from '../../utilities/math'
import { PERFORMANCE } from '../../utilities/performance'
import { Cell } from '../types'

const _land = () =>
  window.world.cells.filter(e => {
    return e.h >= GEOGRAPHY.elevation.seaLevel
  })
const land = PERFORMANCE.memoize.decorate({ f: _land })

const _water = () =>
  window.world.cells.filter(e => {
    return e.h < GEOGRAPHY.elevation.seaLevel
  })
const water = PERFORMANCE.memoize.decorate({ f: _water })

export const GEOGRAPHY = {
  elevation: {
    seaLevel: 0.1,
    mountains: 0.5,
    max: 0.95,
    compute: (cell: Cell) => {
      const { oceanDist } = cell
      const landmark = window.world.landmarks[cell.landmark]
      const influence = [
        landmark.type === 'continent' || cell.mountainDist > 0
          ? scaleLinear([0, 20], [GEOGRAPHY.elevation.seaLevel, 0.2]).clamp(true)(oceanDist)
          : scalePow([0, 5], [GEOGRAPHY.elevation.seaLevel, 0.6]).exponent(2).clamp(true)(oceanDist)
      ]
      if (cell.mountainDist > 0) {
        influence.push(
          scalePow([0, 15], [GEOGRAPHY.elevation.mountains, GEOGRAPHY.elevation.seaLevel])
            .exponent(1.5)
            .clamp(true)(cell.mountainDist)
        )
      }
      return mean(influence)
    },
    heightToKM: (h: number) =>
      MATH.scale(
        [GEOGRAPHY.elevation.seaLevel, GEOGRAPHY.elevation.mountains, GEOGRAPHY.elevation.max],
        [0, 0.6, 8],
        h
      )
  },
  land: () => land(),
  landmarks: (type: 'water' | 'land') => {
    const water = (v: World['landmarks'][number]) => v.water
    const land = (v: World['landmarks'][number]) => !v.water
    const filter = type === 'water' ? water : land
    return Object.entries(window.world.landmarks)
      .filter(([, v]) => filter(v))
      .map(([k]) => parseInt(k))
  },
  reshape: () => {
    PERFORMANCE.memoize.remove(_land)
    PERFORMANCE.memoize.remove(_water)
  },
  water: () => water()
}
