import { species__size } from '../../../size'
import { filter_feeder_diet, shellfish_diet } from '../../behavior/diet'
import { beast__add_trait } from '../../traits'
import { BeastGenus } from '../types'

type aquatic_types = 'fish' | 'sharks' | 'rays' | 'eels' | 'jellyfish'

export const aquatic: BeastGenus<aquatic_types> = {
  distribution: ({ environment, size, role }) => {
    const freshwater = environment.terrain === 'Marsh'
    const prey = role === 'prey'
    return [
      { v: 'fish', w: size < species__size.medium ? 10 : 4 },
      { v: 'sharks', w: prey || freshwater || size < species__size.small ? 0 : 2 },
      {
        v: 'rays',
        w: freshwater || size < species__size.small || size > species__size.large ? 0 : 2
      },
      {
        v: 'eels',
        w: prey || size < species__size.diminutive || size > species__size.large ? 0 : 1
      },
      {
        v: 'jellyfish',
        w:
          freshwater || prey || size < species__size.diminutive || size > species__size.medium
            ? 0
            : 2
      }
    ]
  },
  classify: {
    fish: ({ species, override }) => {
      const genus = override ?? 'fish'
      if (species.size > species__size.medium) {
        species.diet = window.dice.choice([filter_feeder_diet, shellfish_diet])()
      }
      return genus
    },
    sharks: ({ override }) => {
      return override ?? 'shark'
    },
    rays: ({ species, override }) => {
      const genus = override ?? 'ray'
      if (species.role === 'prey') {
        species.diet = window.dice.choice([filter_feeder_diet, shellfish_diet])()
      }
      return genus
    },
    eels: ({ override, species, region }) => {
      const genus = override ?? 'eel'
      if (window.dice.random > 0.8) beast__add_trait({ species, region, tag: 'electric' })
      return genus
    },
    jellyfish: ({ species, override, region }) => {
      const genus = override ?? 'jellyfish'
      species.appearance.skin.type = 'skin'
      if (window.dice.random > 0.95) beast__add_trait({ species, region, tag: 'electric' })
      else beast__add_trait({ species, tag: 'venomous', region })
      return genus
    }
  }
}
