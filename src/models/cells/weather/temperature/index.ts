import { mean, scaleLinear } from 'd3'

import { MATH } from '../../../utilities/math'
import { TIME } from '../../../utilities/math/time'
import { CELL } from '../../'
import { Cell } from '../../types'
import { EBM } from '../ebm'
import { RAIN } from '../rain'
import { TemperatureParams } from './types'

const tempScale = scaleLinear<string>()
  .domain([
    -73, -51.11, -40, -28.89, -17.78, 0, 4.44, 10, 15.56, 21.11, 23.89, 26.67, 29.44, 32.22, 35,
    37.78, 40.56, 43.33, 46.11, 48.89, 80
  ])
  .range([
    '#f8fbff',
    '#dceefa',
    '#a3c2e6',
    '#8cb6d8',
    '#6495cd',
    '#2e5984',
    '#3b9ebf',
    '#6acdd8',
    '#9bd59f',
    '#d2e67f',
    '#f1e47e',
    '#f0c66f',
    '#f2a15e',
    '#f49b42',
    '#ef7d3b',
    '#e15c4f',
    '#d64964',
    '#ba2f6d',
    '#a31563',
    '#7d004f',
    '#5a002f'
  ])
  .clamp(true)

const elevationCorrection = (km = 0, celsius = 0): number => {
  return celsius - km * 6.5
}

const calculateDTR = (cell: Cell, month: number, celsius: number) => {
  const DTR0 = 10
  const rotFactor = Math.sqrt(EBM.constants.time.HOURS_PER_DAY / 24)
  const miles = CELL.distMiles(cell)
  const km = MATH.conversion.distance.miles.km(miles)
  const oceanFactor = 1 + 0.8 * (1 - Math.exp(-km / 500))
  const rainFactor = Math.pow(100 / (RAIN.monthly.total({ cell, month }) + 10), 0.3)
  const dtr = DTR0 * rotFactor * oceanFactor * rainFactor
  const max = celsius + dtr / 2
  const min = celsius - dtr / 2
  return { max, min }
}

export const TEMPERATURE = {
  annual: {
    mean: (cell: Cell) => elevationCorrection(cell.elevation, EBM.model.scales.heat.avg(cell.y)),
    max: (cell: Cell) => elevationCorrection(cell.elevation, EBM.model.scales.heat.max(cell.y)),
    min: (cell: Cell) => elevationCorrection(cell.elevation, EBM.model.scales.heat.min(cell.y))
  },
  color: (celsius: number): string => tempScale(celsius),
  daily: {
    mean: (cell: Cell, dayIdx: number, h: number = cell.elevation): number => {
      const scale = EBM.model.scales.heat.daily[dayIdx]
      return elevationCorrection(h, scale(cell.y))
    }
  },
  describe: (celsius: number): string => {
    const t = MATH.conversion.temperature.celsius.fahrenheit(celsius)
    if (t < -40) return 'frozen'
    else if (t >= -40 && t < -30) return 'glacial'
    else if (t >= -30 && t < -20) return 'bitterly cold'
    else if (t >= -20 && t < -10) return 'very cold'
    else if (t >= -10 && t < 0) return 'cold'
    else if (t >= 0 && t < 10) return 'wintry'
    else if (t >= 10 && t < 20) return 'icy'
    else if (t >= 20 && t < 30) return 'frosty'
    else if (t >= 30 && t < 40) return 'chilly'
    else if (t >= 40 && t < 50) return 'brisk'
    else if (t >= 50 && t < 60) return 'cool'
    else if (t >= 60 && t < 70) return 'mild'
    else if (t >= 70 && t < 80) return 'warm'
    else if (t >= 80 && t < 90) return 'balmy'
    else if (t >= 90 && t < 100) return 'sweaty'
    else if (t >= 100 && t < 110) return 'sweltering'
    else if (t >= 110 && t < 120) return 'feverish'
    else if (t >= 120 && t < 130) return 'baking'
    return 'scorching'
  },
  freezingPoint: 33,
  monthly: {
    mean: ({ cell, month, h }: TemperatureParams): number =>
      mean(TIME.month.days(month).map(day => TEMPERATURE.daily.mean(cell, day, h))),
    range: (params: TemperatureParams) => {
      const { cell, month } = params
      const mean = TEMPERATURE.monthly.mean({ cell, month })
      return calculateDTR(cell, month, mean)
    }
  }
}
