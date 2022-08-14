import { scale } from '../../../../../utilities/math'
import {
  compute_life_phase_boundaries,
  life_phase_boundaries
} from '../../../../actors/stats/age/life_phases'
import { species__compute_size } from '../../../size'
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
  const modded_age = humanoid__ages[age]
  const modded_height = humanoid__heights[props.height]
  const height = 69 * modded_height
  const std = 3 * (modded_height <= 1 ? scale([0.6, 1], [0.33, 1], modded_height) : modded_height)
  return {
    name,
    size: species__compute_size(height),
    cultures: [],
    life_span: modded_age,
    ages: compute_life_phase_boundaries(life_phase_boundaries, modded_age),
    heights: {
      male: height,
      female: height - (modded_height <= 0.8 ? 2 : modded_height <= 0.9 ? 3 : 4),
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
