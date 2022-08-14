import { scarcity } from '../../../../../utilities/quality'
import { terrain__is_aquatic, terrain__is_wet } from '../../../../../world/climate/terrain'
import { species__size } from '../../../size'
import { beast__skin_color } from '../../appearance'
import {
  filter_feeder_diet,
  herbivore_diet,
  myrmecophage_diet,
  shellfish_diet
} from '../../behavior/diet'
import { beast__add_trait } from '../../traits'
import { Beast } from '../../types'
import { BeastGenus } from '../types'

type mammal_types =
  | 'rodents'
  | 'beavers'
  | 'ferrets'
  | 'otters'
  | 'cats'
  | 'hounds'
  | 'bears'
  | 'apes'
  | 'anteater'
  | 'sloth'
  | 'bats'
  | 'boar'
  | 'goat'
  | 'elk'
  | 'alpaca'
  | 'equine'
  | 'oxen'
  | 'camel'
  | 'rhino'
  | 'hippo'
  | 'elephant'
  | 'seal'
  | 'manatee'
  | 'whale'
  | 'trolls'
  | 'chimeric'

const leathery_hide = (species: Beast) => {
  const cold = species.environment.climate === 'Cold'
  if (!cold) species.appearance.skin.type = 'skin'
}

export const mammals: BeastGenus<mammal_types> = {
  distribution: ({ environment, size, role, rarity }) => {
    const prey = role === 'prey'
    const wet = environment.terrain === 'Forest'
    const aquatic = terrain__is_aquatic(environment.terrain)
    const freshwater = environment.terrain === 'Marsh'
    const saltwater = environment.terrain === 'Oceanic'
    const desert = environment.terrain === 'Desert'
    const plains = environment.terrain === 'Plains'
    const cold = environment.climate === 'Cold'
    const warm = environment.climate === 'Warm'
    return [
      { v: 'rodents', w: !aquatic && size <= species__size.tiny ? 1 : 0 },
      {
        v: 'beavers',
        w: freshwater && prey && size >= species__size.tiny && size <= species__size.small ? 1 : 0
      },
      {
        v: 'ferrets',
        w: !aquatic && size >= species__size.tiny && size <= species__size.small && !prey ? 1 : 0
      },
      {
        v: 'otters',
        w: aquatic && size >= species__size.tiny && size <= species__size.small && !prey ? 1 : 0
      },
      { v: 'cats', w: !aquatic && size >= species__size.tiny && !prey ? 1 : 0 },
      { v: 'hounds', w: !aquatic && size >= species__size.tiny && !prey ? 1 : 0 },
      { v: 'bears', w: !aquatic && size >= species__size.large && !prey ? 3 : 0 },
      {
        v: 'apes',
        w:
          !aquatic && size > species__size.diminutive && size <= species__size.large && wet && prey
            ? 1
            : 0
      },
      { v: 'anteater', w: !aquatic && size === species__size.medium && wet && prey ? 0.1 : 0 },
      {
        v: 'sloth',
        w:
          !aquatic && size >= species__size.tiny && size <= species__size.medium && wet && prey
            ? 0.1
            : 0
      },
      {
        v: 'bats',
        w: !aquatic && size >= species__size.diminutive && size <= species__size.medium ? 0.1 : 0
      },
      {
        v: 'boar',
        w: !aquatic && size >= species__size.small && size <= species__size.medium && prey ? 1 : 0
      },
      {
        v: 'elk',
        w: !aquatic && size >= species__size.small && size <= species__size.medium && prey ? 5 : 0
      },
      {
        v: 'goat',
        w: !aquatic && size >= species__size.small && size <= species__size.medium && prey ? 5 : 0
      },
      {
        v: 'alpaca',
        w:
          !aquatic && !warm && size >= species__size.medium && size <= species__size.large && prey
            ? 1
            : 0
      },
      { v: 'equine', w: !aquatic && size === species__size.large && plains && prey ? 1 : 0 },
      { v: 'oxen', w: !aquatic && size === species__size.large && prey ? 5 : 0 },
      { v: 'camel', w: !aquatic && size === species__size.large && prey && desert ? 1 : 0 },
      { v: 'rhino', w: !aquatic && size === species__size.large && prey ? 1 : 0 },
      { v: 'hippo', w: freshwater && size === species__size.large && prey && !cold ? 1 : 0 },
      { v: 'elephant', w: !aquatic && size === species__size.huge && prey ? 1 : 0 },
      {
        v: 'seal',
        w: saltwater && size >= species__size.small && size <= species__size.large && cold ? 1 : 0
      },
      {
        v: 'manatee',
        w:
          freshwater && size >= species__size.small && size <= species__size.large && warm && prey
            ? 1
            : 0
      },
      { v: 'whale', w: saltwater && size >= species__size.medium ? 1 : 0 },
      {
        v: 'trolls',
        w:
          size >= species__size.medium &&
          size <= species__size.huge &&
          rarity > scarcity.uncommon &&
          !prey
            ? 1
            : 0
      },
      {
        v: 'chimeric',
        w:
          !freshwater &&
          size >= species__size.large &&
          size <= species__size.huge &&
          rarity > scarcity.uncommon &&
          !prey
            ? 1
            : 0
      }
    ]
  },
  classify: {
    rodents: ({ species, override, region }) => {
      const prey = species.role === 'prey'
      const wet = terrain__is_wet(species.environment.terrain)
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'rat', w: 2 },
          { v: 'squirrel', w: prey ? 1 : 0 },
          { v: 'chipmunk', w: prey && wet ? 1 : 0 },
          { v: 'rabbit', w: !prey ? 0 : wet ? 2 : 1 },
          { v: 'gopher', w: !prey ? 0 : wet ? 1 : 2 },
          { v: 'hedgehog', w: prey ? 0.5 : 0 },
          { v: 'porcupine', w: prey ? 0.5 : 0 },
          { v: 'armadillo', w: prey ? 0.5 : 0 }
        ])
      if (genus === 'squirrel' && wet) {
        beast__add_trait({ species, tag: 'arboreal', region })
      }
      if (genus === 'porcupine' || genus === 'hedgehog') {
        beast__add_trait({ species, tag: 'quills', region })
      }
      if (genus === 'gopher') {
        beast__add_trait({ species, tag: 'burrowing', region })
      }
      if (genus === 'armadillo') {
        beast__add_trait({ species, tag: 'armored', region })
      }
      return genus
    },
    beavers: ({ override, species }) => {
      const genus = override ?? 'beaver'
      species.semi_aquatic = true
      return genus
    },
    ferrets: ({ species, override, region }) => {
      const wet = terrain__is_wet(species.environment.terrain)
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'ferret', w: 3 },
          { v: 'mongoose', w: 1 },
          { v: 'raccoon', w: wet ? 2 : 1 },
          { v: 'badger', w: 1 }
        ])
      if (genus === 'badger') {
        beast__add_trait({ species, tag: 'burrowing', region })
      }
      return genus
    },
    otters: ({ species, override }) => {
      const genus = override ?? 'otter'
      if (species.environment.terrain === 'Oceanic' && window.dice.random > 0.4) {
        species.diet = shellfish_diet()
      }
      species.semi_aquatic = true
      return genus
    },
    cats: ({ species, override, region }) => {
      const { size } = species
      const genus =
        override ??
        (size < species__size.small
          ? 'cat'
          : size < species__size.medium
          ? 'lynx'
          : window.dice.choice(['panther', 'leopard', 'tiger', 'lion']))
      if (genus === 'leopard' || genus === 'tiger') {
        species.appearance.skin.color = [beast__skin_color({ species })]
        beast__add_trait({ species, tag: 'markings', region })
      }
      if (genus === 'lion') {
        beast__add_trait({ species, tag: 'ornamentation', region })
      }
      return genus
    },
    hounds: ({ species, override }) => {
      const { size } = species
      const warm = species.environment.climate === 'Warm'
      const hounds = ['hound']
      if (size <= species__size.small) hounds.push('fox')
      const medium = size > species__size.small
      if (medium && warm) hounds.push('hyena')
      if (medium && !warm) hounds.push('wolf')
      return override ?? window.dice.choice(hounds)
    },
    bears: ({ override }) => {
      return override ?? 'bear'
    },
    apes: ({ species, override, region }) => {
      const genus = override ?? 'ape'
      if (species.size < species__size.medium)
        beast__add_trait({ species, tag: 'arboreal', region })
      return genus
    },
    anteater: ({ species, override }) => {
      const genus = override ?? 'anteater'
      species.diet = myrmecophage_diet()
      return genus
    },
    sloth: ({ species, override, region }) => {
      const genus = override ?? 'sloth'
      species.diet = herbivore_diet(species)
      beast__add_trait({ species, tag: 'arboreal', region })
      return genus
    },
    bats: ({ species, override, region }) => {
      const genus = override ?? 'bat'
      species.flying = true
      const { role, size } = species
      const prey = role === 'prey'
      if (prey && size < species__size.tiny && window.dice.random > 0.8) {
        beast__add_trait({ species, tag: 'hemophage', region })
      } else if (prey && window.dice.random > 0.8) {
        beast__add_trait({ species, tag: 'scavenger', region })
      }
      return genus
    },
    boar: ({ species, override, region }) => {
      const genus = override ?? 'boar'
      beast__add_trait({ species, tag: 'tusks', region })
      return genus
    },
    elk: ({ species, override, region }) => {
      const genus = override ?? 'elk'
      species.diet = herbivore_diet(species)
      beast__add_trait({ species, tag: 'antlers', region })
      return genus
    },
    goat: ({ species, override, region }) => {
      const warm = species.environment.climate === 'Warm'
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'goat', w: 1 },
          { v: 'sheep', w: warm ? 0 : 1 }
        ])
      species.diet = herbivore_diet(species)
      if (genus === 'goat' || window.dice.random > 0.3)
        beast__add_trait({ species, tag: 'horns', region })
      if (genus === 'sheep') beast__add_trait({ species, tag: 'textiles', region })
      return genus
    },
    alpaca: ({ species, override, region }) => {
      const genus = override ?? 'alpaca'
      species.diet = herbivore_diet(species)
      beast__add_trait({ species, tag: 'textiles', region })
      return genus
    },
    equine: ({ species, override, region }) => {
      const genus = override ?? 'horse'
      species.diet = herbivore_diet(species)
      beast__add_trait({ species, tag: 'transportation', region })
      leathery_hide(species)
      return genus
    },
    oxen: ({ species, override, region }) => {
      const genus = override ?? 'oxen'
      species.diet = herbivore_diet(species)
      beast__add_trait({ species, tag: 'horns', region })
      leathery_hide(species)
      return genus
    },
    camel: ({ species, override, region }) => {
      const genus = override ?? 'camel'
      species.diet = herbivore_diet(species)
      beast__add_trait({ species, tag: 'humps', region })
      return genus
    },
    rhino: ({ species, override, region }) => {
      const genus = override ?? 'rhino'
      species.diet = herbivore_diet(species)
      beast__add_trait({ species, tag: 'nose_horns', region })
      leathery_hide(species)
      return genus
    },
    hippo: ({ species, override }) => {
      const genus = override ?? 'hippo'
      leathery_hide(species)
      species.semi_aquatic = true
      return genus
    },
    elephant: ({ species, override, region }) => {
      const genus = override ?? 'elephant'
      beast__add_trait({ species, tag: 'tusks', region })
      leathery_hide(species)
      return genus
    },
    seal: ({ species, override, region }) => {
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'seal', w: 5 },
          { v: 'walrus', w: species.size > species__size.small ? 1 : 0 }
        ])
      species.appearance.skin.type = 'skin'
      if (genus === 'walrus') {
        beast__add_trait({ species, tag: 'tusks', region })
      }
      if (species.role === 'prey' && window.dice.random > 0.4) {
        species.diet = shellfish_diet()
      }
      species.semi_aquatic = true
      return genus
    },
    manatee: ({ species, override }) => {
      const genus =
        override ??
        window.dice.weighted_choice([
          { v: 'manatee', w: 5 },
          { v: 'dolphin', w: 1 }
        ])
      species.appearance.skin.type = 'skin'
      return genus
    },
    whale: ({ species, override }) => {
      const genus =
        override ??
        (species.size < species__size.huge && window.dice.random > 0.8 ? 'dolphin' : 'whale')
      species.appearance.skin.type = 'skin'
      const prey = species.role === 'prey'
      if (prey && species.size >= species__size.large) {
        species.diet = filter_feeder_diet()
      }
      return genus
    },
    trolls: ({ species, override, region }) => {
      const genus = override ?? 'troll'
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      if (aquatic) species.semi_aquatic = true
      beast__add_trait({ species, region, tag: 'regeneration' })
      return genus
    },
    chimeric: ({ species, override }) => {
      const genus = override ?? window.dice.choice(['gryphon', 'chimera'])
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      if (aquatic) species.semi_aquatic = true
      species.flying = true
      return genus
    }
  }
}
