import { scarcity } from '../../../../../utilities/quality'
import { terrain__is_aquatic, terrain__is_wet } from '../../../../../world/climate/terrain'
import { species__size } from '../../../size'
import { nectar_diet } from '../../behavior/diet'
import { beast__add_trait } from '../../traits'
import { BeastGenus } from '../types'

const conditional_size = (params: {
  size: number
  pass: boolean
  lower: number
  upper: number
}) => {
  const { size, pass, lower, upper } = params
  return size <= lower || (pass && size <= upper)
}

// worms don't technically belong here
type arthropod_types =
  | 'prey_insects'
  | 'predator_insects'
  | 'arachnid'
  | 'centipedes'
  | 'crustaceans'

export const arthropods: BeastGenus<arthropod_types> = {
  distribution: ({ environment, size, role, rarity }) => {
    const prey = role === 'prey'
    const wet = terrain__is_wet(environment.terrain)
    const aquatic = terrain__is_aquatic(environment.terrain)
    const uncommon = rarity >= scarcity.uncommon
    const rare = rarity > scarcity.uncommon
    return [
      { v: 'prey_insects', w: prey && size < species__size.tiny ? (aquatic ? 0.1 : 5) : 0 },
      { v: 'predator_insects', w: !prey && wet && size < species__size.tiny ? 1 : 0 },
      {
        v: 'arachnid',
        w:
          conditional_size({
            size,
            pass: uncommon,
            lower: species__size.tiny,
            upper: species__size.medium
          }) &&
          !aquatic &&
          !prey
            ? 5
            : 0
      },
      { v: 'centipedes', w: !aquatic && size < species__size.tiny ? 1 : 0 },
      {
        v: 'crustaceans',
        w:
          conditional_size({
            size,
            pass: rare && !prey,
            lower: species__size.small,
            upper: species__size.large
          }) && aquatic
            ? 1
            : 0
      }
    ]
  },
  classify: {
    prey_insects: ({ species, override, region }) => {
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      const genus =
        override ??
        (aquatic
          ? 'water bug'
          : window.dice.choice([
              'fly',
              'grasshopper',
              species.activity_period === 'diurnal' ? 'butterfly' : 'moth',
              'bee',
              'beetle',
              'roach'
            ]))
      species.flying = true
      const nectar = ['bee', 'butterfly']
      if (window.dice.random > 0.2) nectar.push('moth')
      if (nectar.includes(genus) && window.dice.random > 0.1) {
        species.diet = nectar_diet()
      } else if (
        genus !== 'bee' &&
        species.size < species__size.tiny &&
        window.dice.random > 0.95
      ) {
        beast__add_trait({
          species,
          tag: window.dice.choice(['detritivore', 'scavenger', 'hemophage', 'infestation']),
          region
        })
      }
      if (genus === 'bee' && window.dice.random > 0.1)
        beast__add_trait({ species, region, tag: 'honey' })
      if (genus === 'grasshopper' && window.dice.random > 0.1) {
        beast__add_trait({ species, tag: 'vocalization', region })
      }
      if (['moth', 'butterfly'].includes(genus) && window.dice.random > 0.9) {
        beast__add_trait({ species, region, tag: 'textiles' })
      }
      return genus
    },
    predator_insects: ({ species, override, region }) => {
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      const wet = terrain__is_wet(species.environment.terrain)
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'beetle', w: aquatic ? 0 : 1 },
          { v: 'wasp', w: aquatic ? 0 : 1 },
          { v: 'mantis', w: aquatic ? 0 : 1 },
          { v: 'dragonfly', w: aquatic || wet ? 1 : 0 }
        ])
      species.flying = true
      if (aquatic) species.semi_aquatic = true
      if ((genus === 'wasp' || genus === 'beetle') && window.dice.random > 0.95) {
        beast__add_trait({
          species,
          tag: window.dice.choice(['detritivore', 'scavenger', 'hemophage', 'infestation']),
          region
        })
      }
      return genus
    },
    arachnid: ({ species, override, region }) => {
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'spider', w: 5 },
          { v: 'tarantula', w: 1 },
          { v: 'scorpion', w: 1 }
        ])
      beast__add_trait({ species, tag: 'venomous', region })
      if (genus === 'tarantula') {
        species.appearance.skin.type = 'fur'
      }
      if (['spider', 'tarantula'].includes(genus) && window.dice.random > 0.9) {
        beast__add_trait({ species, region, tag: 'textiles' })
      }
      return genus
    },
    centipedes: ({ species, override, region }) => {
      const predator = species.role === 'predator'
      const genus = override ?? (predator ? 'centipede' : 'millipede')
      if (predator) beast__add_trait({ species, tag: 'venomous', region })
      if (!predator && window.dice.random > 0.3)
        beast__add_trait({
          species,
          tag: 'detritivore',
          region
        })
      return genus
    },
    crustaceans: ({ species, override, region }) => {
      const genus =
        override ??
        window.dice.choice(
          species.size < species__size.tiny ? ['shrimp', 'prawn'] : ['crab', 'lobster']
        )
      if (genus === 'crab' && species.role === 'prey' && window.dice.random > 0.8) {
        beast__add_trait({ species, tag: 'shell', region })
      }
      return genus
    }
  }
}
