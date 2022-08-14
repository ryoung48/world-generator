import { species__size } from '../../../../size'
import { primordial__coloration } from '../../../appearance/types'
import { PrimordialGenus } from '../types'

export const mushrooms: PrimordialGenus = {
  appearance: () => ({
    color: window.dice.choice(primordial__coloration.fungal)
  }),
  size: () => [
    { v: species__size.diminutive, w: 0.8 },
    { v: species__size.tiny, w: 0.15 },
    { v: species__size.small, w: 0.02 },
    { v: species__size.medium, w: 0.01 },
    { v: species__size.large, w: 0.01 }
  ],
  reproduction: () => {
    return {
      type: 'seeds',
      seeds: 'spores'
    }
  }
}
