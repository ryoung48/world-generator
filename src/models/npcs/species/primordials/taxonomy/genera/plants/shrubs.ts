import { species__size } from '../../../../size'
import { primordial__random_flowers } from '../../../appearance/flowers'
import { primordial__random_foliage, primordial__random_leaves } from '../../../appearance/leaves'
import { primordial__random_sap } from '../../../appearance/sap'
import { primordial__random_thorns } from '../../../appearance/thorns'
import { primordial__coloration } from '../../../appearance/types'
import { bark_textures, primordial__coniferous } from '../../../appearance/woody'
import { Primordial } from '../../../types'
import { primordial__random_seeds } from '../../seeds'
import { PrimordialGenus } from '../types'

export const shrubs: PrimordialGenus = {
  appearance: species => {
    const foliage = primordial__random_foliage(species)
    const coniferous = primordial__coniferous({ foliage, environment: species.environment })
    return {
      color: window.dice.choice(primordial__coloration.woody),
      texture: window.dice.choice(bark_textures),
      leaves: primordial__random_leaves(),
      flowers: coniferous ? undefined : primordial__random_flowers(species),
      sap: window.dice.random > 0.8 ? primordial__random_sap() : undefined,
      thorns: window.dice.random > 0.8 ? primordial__random_thorns('thorns') : undefined,
      foliage,
      roots: true,
      woody: true
    }
  },
  size: () => [
    { v: species__size.tiny, w: 0.2 },
    { v: species__size.small, w: 0.4 },
    { v: species__size.medium, w: 0.4 }
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
