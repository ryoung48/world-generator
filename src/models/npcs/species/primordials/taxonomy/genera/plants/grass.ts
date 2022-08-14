import { species__size } from '../../../../size'
import { primordial__random_flowers } from '../../../appearance/flowers'
import { primordial__coloration } from '../../../appearance/types'
import { Primordial } from '../../../types'
import { primordial__random_seeds } from '../../seeds'
import { PrimordialGenus } from '../types'

export const grass: PrimordialGenus = {
  appearance: species => ({
    color: window.dice.choice([
      ...primordial__coloration.greens,
      ...primordial__coloration.yellows
    ]),
    flowers: window.dice.random > 0.1 ? primordial__random_flowers(species) : undefined
  }),
  size: ({ environment }) => [
    { v: species__size.diminutive, w: 0.4 },
    { v: species__size.tiny, w: 0.4 },
    { v: species__size.small, w: 0.15 },
    {
      v: species__size.medium,
      w: environment.terrain === 'Plains' && environment.climate !== 'Cold' ? 0.05 : 0
    }
  ],
  reproduction: ({ environment, appearance }) => {
    const reproduction: Primordial['reproduction'] = {
      type: 'seeds'
    }
    if (reproduction.type === 'seeds') {
      primordial__random_seeds({ environment, reproduction, appearance })
      if (reproduction.seeds !== 'spores') reproduction.seeds = 'grain'
    }
    return reproduction
  }
}
