import { species__size } from '../../../../size'
import { primordial__coloration } from '../../../appearance/types'
import { bark_textures } from '../../../appearance/woody'
import { PrimordialGenus } from '../types'

export const ferns: PrimordialGenus = {
  appearance: ({ size }) => {
    const woody = size > species__size.medium
    return {
      color: window.dice.choice(primordial__coloration[woody ? 'woody' : 'greens']),
      texture: woody ? window.dice.choice(bark_textures) : undefined,
      woody,
      roots: true
    }
  },
  size: () => [
    { v: species__size.diminutive, w: 0.25 },
    { v: species__size.tiny, w: 0.5 },
    { v: species__size.small, w: 0.15 },
    { v: species__size.medium, w: 0.05 },
    { v: species__size.large, w: 0.05 }
  ],
  reproduction: () => {
    return {
      type: 'seeds',
      seeds: 'spores'
    }
  }
}
