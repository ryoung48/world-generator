import { species__map } from '../../../models/npcs/species'
import { species__heights } from '../../../models/npcs/species/types'
import { Gender } from '../../../models/npcs/types'
import { computeWeight, imperialHeight, scale } from '../../../models/utilities/math'
import { view__context } from '../../context'
import { DataTable } from '../common/DataTable'

const scaledSize = (culture: number) => {
  const { species } = window.world.cultures[culture]
  const { traits } = species__map[species]
  const mod = species__heights[traits.height]
  const height = 69 * mod
  const std = 3 * (mod <= 1 ? scale([0.6, 1], [0.33, 1], mod) : mod)
  return {
    heights: {
      male: height,
      female: height - (mod <= 0.8 ? 2 : mod <= 0.9 ? 3 : 4),
      std
    },
    bmi: {
      mean: traits.bmi,
      boundary: 3,
      std: 2.5
    }
  }
}

const roundedWeight = (...params: Parameters<typeof computeWeight>) =>
  `${Math.round(computeWeight(...params))} lbs`

const weightByGender = (params: { culture: number; gender: Gender }) => {
  const { culture, gender } = params
  const { heights, bmi } = scaledSize(culture)
  const height = heights[gender]
  const short = [height - heights.std * 2, height - heights.std]
  const average = [height - heights.std, height + heights.std]
  const tall = [height + heights.std, height + heights.std * 2]
  const { boundary, mean } = bmi
  const underweight = mean - boundary * 1.5
  const normal = mean
  const overweight = mean + boundary * 1.5
  const headers = [
    { value: 'weight' as const, text: `Weight / Height` },
    {
      value: 'short' as const,
      text: `Short (${imperialHeight(short[0])} - ${imperialHeight(short[1])})`
    },
    {
      value: 'average' as const,
      text: `Average (${imperialHeight(average[0])} - ${imperialHeight(average[1])})`
    },
    {
      value: 'tall' as const,
      text: `Tall (${imperialHeight(tall[0])} - ${imperialHeight(tall[1])})`
    }
  ]
  const items = [
    {
      weight: `Underweight (${underweight.toFixed(0)})`,
      short: `${roundedWeight(short[0], underweight)} - ${roundedWeight(short[1], underweight)}`,
      average: `${roundedWeight(average[0], underweight)} - ${roundedWeight(
        average[1],
        underweight
      )}`,
      tall: `${roundedWeight(tall[0], underweight)} - ${roundedWeight(tall[1], underweight)}`
    },
    {
      weight: `Normal (${normal.toFixed(0)})`,
      short: `${roundedWeight(short[0], normal)} - ${roundedWeight(short[1], normal)}`,
      average: `${roundedWeight(average[0], normal)} - ${roundedWeight(average[1], normal)}`,
      tall: `${roundedWeight(tall[0], normal)} - ${roundedWeight(tall[1], normal)}`
    },
    {
      weight: `Overweight (${overweight.toFixed(0)})`,
      short: `${roundedWeight(short[0], overweight)} - ${roundedWeight(short[1], overweight)}`,
      average: `${roundedWeight(average[0], overweight)} - ${roundedWeight(
        average[1],
        overweight
      )}`,
      tall: `${roundedWeight(tall[0], overweight)} - ${roundedWeight(tall[1], overweight)}`
    }
  ]
  return { headers, items }
}

export function PhysiqueView() {
  const { state } = view__context()
  const { headers, items } = weightByGender({ culture: state.codex.culture, gender: 'male' })
  return <DataTable data={items} headers={headers}></DataTable>
}
