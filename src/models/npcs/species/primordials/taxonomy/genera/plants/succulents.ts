import { species__size } from '../../../../size'
import { primordial__random_flowers } from '../../../appearance/flowers'
import { primordial__random_leaves } from '../../../appearance/leaves'
import { primordial__random_sap } from '../../../appearance/sap'
import { primordial__random_thorns } from '../../../appearance/thorns'
import { primordial__coloration } from '../../../appearance/types'
import { bark_textures } from '../../../appearance/woody'
import { Primordial } from '../../../types'
import { primordial__random_seeds } from '../../seeds'
import { PrimordialGenus } from '../types'

export const succulents: PrimordialGenus = {
  appearance: species => {
    const woody = species.size > species__size.small && window.dice.random > 0.9
    return {
      color: window.dice.choice(primordial__coloration[woody ? 'woody' : 'greens']),
      leaves: window.dice.random > 0.9 ? primordial__random_leaves() : undefined,
      flowers: window.dice.random > 0.1 ? primordial__random_flowers(species) : undefined,
      sap: window.dice.random > 0.9 ? primordial__random_sap() : undefined,
      thorns: window.dice.random > 0.1 ? primordial__random_thorns('thorns') : undefined,
      texture: woody ? window.dice.choice(bark_textures) : undefined,
      roots: true,
      woody
    }
  },
  size: () => [
    { v: species__size.diminutive, w: 0.2 },
    { v: species__size.tiny, w: 0.3 },
    { v: species__size.small, w: 0.2 },
    { v: species__size.medium, w: 0.1 },
    { v: species__size.large, w: 0.05 }
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
