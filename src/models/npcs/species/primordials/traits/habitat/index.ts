import { scarcity } from '../../../../../utilities/quality'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { terrain__is_aquatic } from '../../../../../world/climate/terrain'
import { species__conflicting_traits } from '../../..'
import { species__size } from '../../../size'
import { PrimordialTrait } from '../types'
import { primordial__habitat_trait_tags } from './tags'

const habitat_conflicts = species__conflicting_traits([
  'weeds',
  'symbiotic',
  'decay',
  'cliffs',
  'subterranean',
  'volcanic'
])

export const primordial__habitat_traits: Record<primordial__habitat_trait_tags, PrimordialTrait> = {
  subterranean: {
    tag: 'subterranean',
    type: 'habitat',
    apply: () => {
      return `${entity_placeholder} ${window.dice.choice([
        'can often be found growing in caves',
        'wilts in lighting brighter than dim'
      ])}.`
    },
    weight: ({ species }) =>
      species.size < species__size.medium &&
      species.family === 'fungi' &&
      !habitat_conflicts(species)
        ? 1
        : 0
  },
  desert: {
    tag: 'desert',
    type: 'habitat',
    apply: () => {
      return `${entity_placeholder} ${window.dice.choice([
        'retains',
        'stores'
      ])} accessible water anticipating long dry periods.`
    },
    weight: ({ species }) =>
      species.environment.terrain === 'Desert' || species.environment.terrain === 'Plains' ? 1 : 0
  },
  cliffs: {
    tag: 'cliffs',
    type: 'habitat',
    apply: () => {
      return `${entity_placeholder} can be found growing on the side of cliffs.`
    },
    weight: ({ species }) =>
      species.size < species__size.large &&
      !terrain__is_aquatic(species.environment.terrain) &&
      !habitat_conflicts(species)
        ? 1
        : 0
  },
  volcanic: {
    tag: 'volcanic',
    type: 'habitat',
    apply: ({ species }) => {
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      return `${entity_placeholder} found only near ${window.dice.weighted_choice([
        { v: 'volcanoes', w: 1 },
        { v: 'pools of lava', w: aquatic ? 0 : 1 },
        { v: 'hot springs', w: aquatic ? 0 : 1 }
      ])}.`
    },
    weight: ({ species }) =>
      species.rarity > scarcity.uncommon && !habitat_conflicts(species) ? 0.5 : 0
  },
  tropism: {
    tag: 'tropism',
    type: 'habitat',
    apply: ({ species }) => {
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      return `${entity_placeholder} ${window.dice.weighted_choice([
        {
          v: `is able to slowly move (10' per day)`,
          w: species.rarity > scarcity.uncommon ? 1 : 0
        },
        {
          v: `moves involuntarily in response to touch`,
          w: species.rarity > scarcity.abundant ? 1 : 0.1
        },
        {
          v: 'tends hang from other objects as it grows downward with the direction of gravity',
          w: species.size < species__size.small && !aquatic ? 1 : 0
        }
      ])}.`
    },
    weight: 0.5
  },
  decay: {
    tag: 'decay',
    type: 'habitat',
    apply: ({ species }) => {
      return `${entity_placeholder} ${window.dice.weighted_choice([
        {
          v: `thrives near corpses and is often seen on the site of battlefields, or where the dead were quickly buried`,
          w: 1
        },
        { v: `can only grow near the corpses of recently deceased creatures`, w: 1 },
        {
          v: 'grows on corpses and absorbs the memories of the fallen. These memories can be transmitted to those in close proximity',
          w: species.rarity > scarcity.uncommon ? 1 : 0
        },
        {
          v: 'grows on corpses and prevents reanimation',
          w: species.rarity > scarcity.common ? 1 : 0
        }
      ])}.`
    },
    weight: ({ species }) =>
      species.size < species__size.small &&
      !terrain__is_aquatic(species.environment.terrain) &&
      !habitat_conflicts(species)
        ? 1
        : 0
  },
  purifier: {
    tag: 'decay',
    type: 'habitat',
    apply: () => {
      return `The stalks of this species contain purified water.`
    },
    weight: ({ species }) => (species.genus === 'algae' ? 1 : 0)
  }
}
