import { scale } from '../../../../utilities/math'
import {
  computeLifePhaseBoundaries,
  lifePhaseBoundaries
} from '../../../actors/stats/age/life_phases'
import { species__computeSize } from '../../size'
import { Humanoid } from '../types'

const humanoid__heights = {
  small: 0.6,
  short: 0.8,
  average: 1,
  tall: 1.2,
  large: 1.5,
  giant: 1.8
}

const humanoid__ages = {
  fleeting: 0.8,
  average: 1,
  enduring: 1.2,
  venerable: 2,
  ancient: 3
}

export const humanoid__spawn = (props: {
  age: keyof typeof humanoid__ages
  height: keyof typeof humanoid__heights
  bmi: number
  name: Humanoid['name']
  appearance?: Humanoid['appearance']
}): Humanoid => {
  const { age, bmi, name, appearance } = props
  const moddedAge = humanoid__ages[age]
  const moddedHeight = humanoid__heights[props.height]
  const height = 69 * moddedHeight
  const std = 3 * (moddedHeight <= 1 ? scale([0.6, 1], [0.33, 1], moddedHeight) : moddedHeight)
  return {
    name,
    size: species__computeSize(height),
    cultures: [],
    lifeSpan: moddedAge,
    ages: computeLifePhaseBoundaries(lifePhaseBoundaries, moddedAge),
    heights: {
      male: height,
      female: height - (moddedHeight <= 0.8 ? 2 : moddedHeight <= 0.9 ? 3 : 4),
      std
    },
    bmi: {
      mean: bmi,
      boundary: 3,
      std: 2.5
    },
    appearance
  }
}
