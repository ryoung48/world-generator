import { species__size } from '../../../../size'
import { primordial__coloration } from '../../../appearance/types'
import { PrimordialGenus } from '../types'

export const moss: PrimordialGenus = {
  appearance: () => ({
    color: window.dice.choice(primordial__coloration.greens)
  }),
  size: () => [
    { v: species__size.fine, w: 0.95 },
    { v: species__size.tiny, w: 0.05 }
  ],
  reproduction: () => {
    return {
      type: 'seeds',
      seeds: 'spores'
    }
  }
}
