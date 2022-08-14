import { species__size } from '../../../../size'
import { primordial__random_flowers } from '../../../appearance/flowers'
import { primordial__random_leaves } from '../../../appearance/leaves'
import { primordial__random_sap } from '../../../appearance/sap'
import { primordial__random_thorns } from '../../../appearance/thorns'
import { primordial__coloration } from '../../../appearance/types'
import { Primordial } from '../../../types'
import { primordial__random_seeds } from '../../seeds'
import { PrimordialGenus } from '../types'

export const herbaceous: PrimordialGenus = {
  appearance: species => ({
    color: window.dice.choice(primordial__coloration.greens),
    leaves: primordial__random_leaves(),
    flowers: window.dice.random > 0.1 ? primordial__random_flowers(species) : undefined,
    sap: window.dice.random > 0.9 ? primordial__random_sap() : undefined,
    thorns: window.dice.random > 0.9 ? primordial__random_thorns('thorns') : undefined,
    roots: true
  }),
  size: () => [
    { v: species__size.diminutive, w: 0.4 },
    { v: species__size.tiny, w: 0.4 },
    { v: species__size.small, w: 0.15 },
    { v: species__size.medium, w: 0.05 }
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
