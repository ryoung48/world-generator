import { species__size } from '../../../size'
import { beast__skin_color } from '../../appearance'
import { detritivore_diet } from '../../behavior/diet'
import { beast__add_trait } from '../../traits'
import { BeastGenus } from '../types'

type mollusk_types = 'slugs' | 'cephalopods'

export const mollusks: BeastGenus<mollusk_types> = {
  distribution: ({ environment, size }) => {
    return [
      { v: 'slugs', w: size < species__size.medium ? 1 : 0 },
      { v: 'cephalopods', w: environment.terrain === 'Oceanic' ? 3 : 0 }
    ]
  },
  classify: {
    slugs: ({ species, override, region }) => {
      const genus = override ?? window.dice.choice(['slug', 'snail'])
      if (genus === 'snail') {
        species.appearance.skin.color = [beast__skin_color({ species })]
        beast__add_trait({ species, tag: 'shell', region })
      }
      const { role, size } = species
      if (role === 'prey' && size < species__size.tiny && window.dice.random > 0.3) {
        species.diet = detritivore_diet()
      }
      if (species.environment.terrain === 'Marsh') species.semi_aquatic = true
      return genus
    },
    cephalopods: ({ override }) => {
      return override ?? window.dice.choice(['squid', 'octopus'])
    }
  }
}
