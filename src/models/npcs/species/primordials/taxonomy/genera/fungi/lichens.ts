import { species__size } from '../../../../size'
import { primordial__coloration } from '../../../appearance/types'
import { PrimordialGenus } from '../types'

export const lichens: PrimordialGenus = {
  appearance: () => ({
    color: window.dice.choice(primordial__coloration.fungal)
  }),
  size: () => [{ v: species__size.fine, w: 1 }],
  reproduction: () => {
    return {
      type: 'seeds',
      seeds: 'spores'
    }
  }
}
