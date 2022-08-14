import { species__size } from '../../../../size'
import { primordial__random_flowers } from '../../../appearance/flowers'
import { primordial__random_leaves } from '../../../appearance/leaves'
import { primordial__random_thorns } from '../../../appearance/thorns'
import { primordial__coloration } from '../../../appearance/types'
import { bark_textures } from '../../../appearance/woody'
import { Primordial } from '../../../types'
import { primordial__random_seeds } from '../../seeds'
import { PrimordialGenus } from '../types'

export const vines: PrimordialGenus = {
  appearance: species => {
    const woody = species.environment.climate !== 'Cold' && window.dice.random > 0.9
    return {
      color: window.dice.choice(primordial__coloration[woody ? 'woody' : 'greens']),
      texture: woody ? window.dice.choice(bark_textures) : undefined,
      leaves: primordial__random_leaves(),
      flowers: window.dice.random > 0.1 ? primordial__random_flowers(species) : undefined,
      thorns: window.dice.random > 0.6 ? primordial__random_thorns('thorns') : undefined,
      woody
    }
  },
  size: () => [
    { v: species__size.diminutive, w: 0.4 },
    { v: species__size.tiny, w: 0.4 },
    { v: species__size.small, w: 0.15 }
  ],
  reproduction: ({ environment, appearance }) => {
    const reproduction: Primordial['reproduction'] = {
      type: 'seeds'
    }
    if (reproduction.type === 'seeds')
      primordial__random_seeds({ environment, reproduction, appearance })
    return reproduction
  }
}
