import { terrain__is_aquatic } from '../../../../../world/climate/terrain'
import { species__size } from '../../../size'
import { nectar_diet } from '../../behavior/diet'
import { beast__add_trait } from '../../traits'
import { BeastGenus } from '../types'

type bird_types =
  | 'small_birds'
  | 'lake_birds'
  | 'coastal_birds'
  | 'birds_of_prey'
  | 'vultures'
  | 'ostrich'
  | 'penguins'

export const avians: BeastGenus<bird_types> = {
  distribution: ({ environment, size, role }) => {
    const prey = role === 'prey'
    const saltwater = environment.terrain === 'Oceanic'
    const freshwater = environment.terrain === 'Marsh'
    const aquatic = terrain__is_aquatic(environment.terrain)
    const cold = environment.climate === 'Cold'
    return [
      { v: 'small_birds', w: !aquatic && size < species__size.small ? 1 : 0 },
      {
        v: 'lake_birds',
        w: size > species__size.diminutive && size < species__size.medium && freshwater ? 1 : 0
      },
      { v: 'coastal_birds', w: size < species__size.small && saltwater ? 1 : 0 },
      { v: 'birds_of_prey', w: size > species__size.diminutive && !prey ? (aquatic ? 0.1 : 1) : 0 },
      {
        v: 'vultures',
        w:
          !aquatic && size > species__size.diminutive && size < species__size.large && prey
            ? 0.1
            : 0
      },
      { v: 'ostrich', w: !aquatic && size > species__size.tiny && prey ? 1 : 0 },
      { v: 'penguins', w: size < species__size.medium && saltwater && cold ? 1 : 0 }
    ]
  },
  classify: {
    small_birds: ({ species, override, region }) => {
      const prey = species.role === 'prey'
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'pigeon', w: 2 },
          { v: 'raven', w: 1 },
          { v: 'finch', w: 2 },
          { v: 'sparrow', w: 2 },
          { v: 'starling', w: 2 },
          { v: 'hummingbird', w: prey && species.size === species__size.diminutive ? 0.5 : 0 }
        ])
      species.flying = true
      if (genus === 'raven') {
        species.appearance.skin.color = ['black']
      }
      if (genus === 'hummingbird') {
        species.diet = nectar_diet()
      }
      if (window.dice.random > 0.95) {
        beast__add_trait({ species, tag: window.dice.choice(['hemophage', 'scavenger']), region })
      }
      return genus
    },
    lake_birds: ({ species, override }) => {
      const genus =
        override ??
        window.dice.choice(
          species.size <= species__size.tiny ? ['duck', 'heron'] : ['goose', 'crane']
        )
      species.flying = true
      species.semi_aquatic = true
      return genus
    },
    coastal_birds: ({ species, override }) => {
      const prey = species.role === 'prey'
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'pelican', w: prey ? 0 : 1 },
          { v: 'seagull', w: 4 },
          { v: 'albatross', w: 2 }
        ])
      species.flying = true
      species.semi_aquatic = true
      return genus
    },
    birds_of_prey: ({ species, override, region }) => {
      const diurnal = species.activity_period === 'diurnal'
      const large = species.size > species__size.small
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'eagle', w: diurnal ? 5 : 1 },
          { v: 'hawk', w: diurnal ? 5 : 1 },
          { v: 'falcon', w: large ? 0 : diurnal ? 5 : 1 },
          { v: 'owl', w: large ? 0 : diurnal ? 1 : 15 }
        ])
      species.flying = true
      beast__add_trait({ species, tag: 'keen_senses', region })
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      if (aquatic) species.semi_aquatic = true
      return genus
    },
    ostrich: ({ override }) => {
      return override ?? window.dice.choice(['ostrich', 'emu', 'cassowary'])
    },
    penguins: ({ override, species }) => {
      const genus = override ?? 'penguin'
      species.semi_aquatic = true
      return genus
    },
    vultures: ({ species, override, region }) => {
      const genus = override ?? window.dice.choice(['vulture', 'condor'])
      species.flying = true
      beast__add_trait({ species, tag: 'scavenger', region })
      return genus
    }
  }
}
