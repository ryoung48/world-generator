import { scarcity } from '../../../../../utilities/quality'
import { terrain__is_aquatic, terrain__is_wet } from '../../../../../world/climate/terrain'
import { species__size } from '../../../size'
import { beast__skin_color } from '../../appearance'
import { beast__add_trait } from '../../traits'
import { BeastGenus } from '../types'

type reptile_types =
  | 'lizards'
  | 'amphibians'
  | 'serpents'
  | 'turtles'
  | 'crocodiles'
  | 'raptors'
  | 'scalehide'
  | 'sauropods'
  | 'basilisks'
  | 'hydras'
  | 'wyverns'
  | 'dragons'

export const reptiles: BeastGenus<reptile_types> = {
  distribution: ({ environment, size, role, rarity }) => {
    const cold = environment.climate === 'Cold'
    const prey = role === 'prey'
    const wet = terrain__is_wet(environment.terrain)
    const aquatic = terrain__is_aquatic(environment.terrain)
    const freshwater = environment.terrain === 'Marsh'
    return [
      { v: 'lizards', w: !cold && size < species__size.large ? (aquatic ? 0.1 : 1) : 0 },
      { v: 'amphibians', w: !cold && size < species__size.large && (wet || freshwater) ? 1 : 0 },
      { v: 'serpents', w: !cold && size <= species__size.large && !prey ? (aquatic ? 0.1 : 1) : 0 },
      { v: 'turtles', w: !cold && size <= species__size.large && (prey || aquatic) ? 1 : 0 },
      {
        v: 'basilisks',
        w:
          !cold &&
          !aquatic &&
          rarity > scarcity.uncommon &&
          size <= species__size.large &&
          size >= species__size.medium &&
          !prey
            ? 1
            : 0
      },
      {
        v: 'hydras',
        w:
          !cold &&
          aquatic &&
          rarity > scarcity.uncommon &&
          size <= species__size.huge &&
          size >= species__size.large &&
          !prey
            ? 1
            : 0
      },
      {
        v: 'crocodiles',
        w:
          !cold && size <= species__size.large && size > species__size.tiny && aquatic && !prey
            ? 1
            : 0
      },
      { v: 'raptors', w: !cold && !aquatic && size > species__size.tiny && !prey ? 1 : 0 },
      { v: 'scalehide', w: !cold && !aquatic && size === species__size.large && prey ? 1 : 0 },
      { v: 'sauropods', w: !cold && !aquatic && size === species__size.huge && prey ? 1 : 0 },
      {
        v: 'wyverns',
        w:
          rarity >= scarcity.uncommon &&
          size > species__size.small &&
          size < species__size.huge &&
          !prey
            ? 1
            : 0
      },
      {
        v: 'dragons',
        w: !freshwater && rarity > scarcity.uncommon && size >= species__size.large && !prey ? 1 : 0
      }
    ]
  },
  classify: {
    lizards: ({ override }) => {
      const genus = override ?? 'lizard'
      return genus
    },
    amphibians: ({ species, override, region }) => {
      const genus = override ?? window.dice.choice(['toad', 'frog', 'salamander'])
      species.appearance.skin.type = 'skin'
      species.family = 'amphibian'
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      if (aquatic) species.semi_aquatic = true
      if (window.dice.random > 0.6) beast__add_trait({ species, tag: 'vocalization', region })
      if (window.dice.random > 0.95) beast__add_trait({ species, region, tag: 'electric' })
      return genus
    },
    serpents: ({ species, override, region }) => {
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'sea serpent', w: aquatic ? 1 : 0 },
          { v: 'wind serpent', w: species.rarity <= scarcity.common ? 0 : aquatic ? 0.1 : 1 },
          { v: 'serpent', w: aquatic ? 0 : 1 },
          { v: 'viper', w: aquatic ? 0 : 1 },
          { v: 'boa', w: aquatic ? 0 : 1 },
          { v: 'python', w: aquatic ? 0 : 1 },
          { v: 'cobra', w: aquatic ? 0 : 0.1 }
        ])
      if (aquatic) species.semi_aquatic = true
      if (genus === 'wind serpent') species.flying = true
      if (['viper', 'cobra'].includes(genus)) beast__add_trait({ species, tag: 'venomous', region })
      else if (['boa', 'python'].includes(genus))
        beast__add_trait({ species, tag: 'constrictor', region })
      return genus
    },
    turtles: ({ species, override, region }) => {
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      const genus = override ?? (aquatic ? 'turtle' : 'tortoise')
      species.appearance.skin.color = [beast__skin_color({ species })]
      beast__add_trait({ species, tag: 'shell', region })
      if (species.environment.terrain === 'Marsh') species.semi_aquatic = true
      return genus
    },
    crocodiles: ({ override, species }) => {
      const genus = override ?? 'crocodile'
      species.semi_aquatic = true
      return genus
    },
    raptors: ({ species, override }) => {
      const genus = override ?? 'raptor'
      if (window.dice.random > 0.9) species.appearance.skin.type = 'feathers'
      return genus
    },
    scalehide: ({ override, species, region }) => {
      const genus = override ?? 'scalehide'
      if (window.dice.random > 0.6) beast__add_trait({ species, region, tag: 'nose_horns' })
      return genus
    },
    sauropods: ({ override }) => {
      const genus = override ?? 'sauropod'
      return genus
    },
    basilisks: ({ override, species, region }) => {
      const genus = override ?? 'basilisk'
      beast__add_trait({ species, region, tag: 'petrify' })
      return genus
    },
    hydras: ({ override, species }) => {
      const genus = override ?? 'hydra'
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      if (aquatic) species.semi_aquatic = true
      return genus
    },
    wyverns: ({ override, species, region }) => {
      const genus = override ?? 'wyvern'
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      beast__add_trait({ species, region, tag: 'venomous' })
      if (aquatic) species.semi_aquatic = true
      species.flying = true
      return genus
    },
    dragons: ({ override, species, region }) => {
      const genus = override ?? 'dragon'
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      if (!aquatic) beast__add_trait({ species, region, tag: 'breath' })
      if (aquatic) species.semi_aquatic = true
      species.flying = true
      return genus
    }
  }
}
