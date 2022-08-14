import { species__size } from '../../../../size'
import { primordial__coloration } from '../../../appearance/types'
import { PrimordialGenus } from '../types'

export const algae: PrimordialGenus = {
  appearance: () => ({
    color: window.dice.choice([
      ...primordial__coloration.greens,
      ...primordial__coloration.reds,
      ...primordial__coloration.browns
    ])
  }),
  size: () => [
    { v: species__size.fine, w: 0.4 },
    { v: species__size.diminutive, w: 0.2 },
    { v: species__size.tiny, w: 0.15 },
    { v: species__size.small, w: 0.1 },
    { v: species__size.medium, w: 0.05 },
    { v: species__size.large, w: 0.04 },
    { v: species__size.huge, w: 0.03 },
    { v: species__size.gargantuan, w: 0.03 }
  ],
  reproduction: () => {
    return {
      type: 'fragmentation'
    }
  }
}
