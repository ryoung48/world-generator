import { interpolateViridis, scaleLinear } from 'd3'

import { MATH } from '../../../utilities/math'
import { TIME } from '../../../utilities/math/time'
import { Cell } from '../../types'
import { GetMonthlyRainParams } from './types'

const thresholds = {
  monthly: {
    parched: 5,
    arid: 10,
    dry: 20,
    low: 40,
    moderate: 62,
    moist: 83,
    wet: 125,
    humid: 165,
    saturated: 250
  },
  annual: {
    parched: 62.5,
    arid: 125,
    dry: 250,
    low: 500,
    moderate: 750,
    moist: 1000,
    wet: 1500,
    humid: 2000,
    saturated: 3000
  },
  clouds: {
    dry: 0.05,
    low: 0.15,
    moderate: 0.25,
    wet: 0.4,
    humid: 0.8,
    saturated: 1.0
  }
}

const rainChanceScale = scaleLinear(
  [0, 10, 25, 50, 100, 150, 200, 250].reverse(),
  [0.92, 0.8, 0.68, 0.54, 0.42, 0.3, 0.18, 0.06]
)

export const RAIN = {
  annual: {
    color: (mm: number) => interpolateViridis(RAIN.annual.scale(mm)),
    scale: scaleLinear(
      Object.values(thresholds.annual).reverse(),
      MATH.scaleDiscrete(Object.keys(thresholds.annual).length)
    ),
    total: (cell: Cell) =>
      TIME.month.names
        .map((_, month) => RAIN.monthly.total({ cell, month }))
        .reduce((sum, rain) => sum + rain, 0)
  },
  describe: (rainfall: number, key: 'monthly' | 'annual') => {
    if (rainfall > thresholds[key].saturated) return 'saturated'
    if (rainfall > thresholds[key].humid) return 'humid'
    if (rainfall > thresholds[key].wet) return 'wet'
    if (rainfall > thresholds[key].moist) return 'moist'
    if (rainfall > thresholds[key].moderate) return 'moderate'
    if (rainfall > thresholds[key].low) return 'low'
    if (rainfall > thresholds[key].dry) return 'dry'
    if (rainfall > thresholds[key].arid) return 'arid'
    return 'parched'
  },
  monthly: {
    chance: (params: GetMonthlyRainParams) => {
      const { cell, month } = params
      const rain = RAIN.monthly.total({ cell, month })
      return rainChanceScale(rain)
    },
    color: (mm: number) => interpolateViridis(RAIN.monthly.scale(mm)),
    scale: scaleLinear(
      Object.values(thresholds.monthly).reverse(),
      MATH.scaleDiscrete(Object.keys(thresholds.monthly).length)
    ),
    total: (params: GetMonthlyRainParams) => {
      const { cell } = params
      return cell.rain.pattern?.[params.month]
      // const month = params.month + 1
      // const { summer, winter } = cell.rain
      // const amp = Math.abs(summer - winter) / 2
      // const base = (summer + winter) / 2
      // const shift = summer > winter ? 4 : 10
      // return amp * Math.sin((month - shift) * (Math.PI / 6)) + base
    }
  },
  thresholds
}
