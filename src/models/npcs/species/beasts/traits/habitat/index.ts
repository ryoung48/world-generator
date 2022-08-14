import { scarcity } from '../../../../../utilities/quality'
import { title_case } from '../../../../../utilities/text'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { terrain__is_aquatic, terrain__is_wet } from '../../../../../world/climate/terrain'
import { npc__opposite_gender } from '../../../../actors/stats/appearance/gender'
import { species__conflicting_traits } from '../../..'
import { decorated_culture } from '../../../humanoids/cultures'
import { species__size } from '../../../size'
import { BeastTrait } from '../types'
import { beast__culture_conflicts } from '../uses'
import { beast__habitat_trait_tags } from './tags'

const conflicting_habitats: beast__habitat_trait_tags[] = [
  'terrestrial',
  'arboreal',
  'semi_arboreal',
  'burrowing'
]

export const beast__habitat_traits: Record<beast__habitat_trait_tags, BeastTrait> = {
  terrestrial: {
    tag: 'terrestrial',
    type: 'habitat',
    weight: ({ species }) => {
      const is_small = species.size < species__size.medium
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      const wet = terrain__is_wet(species.environment.terrain)
      return !aquatic &&
        is_small &&
        wet &&
        !species__conflicting_traits(conflicting_habitats)(species)
        ? 5
        : 0
    },
    apply: ({ species: { role } }) => {
      return `${entity_placeholder} spends the majority of its time on the ground ${
        role === 'prey' ? 'foraging' : 'hunting'
      }.`
    }
  },
  arboreal: {
    tag: 'arboreal',
    type: 'habitat',
    weight: ({ species }) => {
      const is_small = species.size < species__size.medium
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      const wet = terrain__is_wet(species.environment.terrain)
      return !aquatic &&
        is_small &&
        wet &&
        !species__conflicting_traits(conflicting_habitats)(species)
        ? 5
        : 0
    },
    apply: ({ species }) => {
      let text = `${entity_placeholder} is mainly arboreal, and is very good at moving around trees and branches.`
      if (species.family === 'mammal' && window.dice.random > 0.8) {
        const glider = 'has special membranes that help it glide between trees'
        text += ` ${entity_placeholder} ${window.dice.choice([
          glider,
          `has a long prehensile tail that helps it climb easily between branches`
        ])}.`
        species.flying = species.flying || text.includes(glider)
      }
      return text
    }
  },
  semi_arboreal: {
    tag: 'semi_arboreal',
    type: 'habitat',
    weight: ({ species }) => {
      const is_small = species.size < species__size.medium
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      const wet = terrain__is_wet(species.environment.terrain)
      return !aquatic &&
        is_small &&
        wet &&
        !species__conflicting_traits(conflicting_habitats)(species)
        ? 5
        : 0
    },
    apply: ({ species: { gender_variation } }) => {
      let text = `${entity_placeholder} is adapted to both arboreal and terrestrial environments.`
      if (window.dice.random > 0.8) {
        const { primary } = gender_variation
        const secondary = npc__opposite_gender(primary)
        text += ` ${title_case(
          secondary
        )}s spend more time in trees and ${primary}s spend more time on the ground.`
      }
      return text
    }
  },
  burrowing: {
    tag: 'burrowing',
    type: 'habitat',
    weight: ({ species }) => {
      const is_small = species.size < species__size.medium
      return is_small && !species__conflicting_traits(conflicting_habitats)(species) ? 5 : 0
    },
    apply: `${entity_placeholder} spends most of its time in self-excavated burrows.`
  },
  urban: {
    tag: 'urban',
    type: 'habitat',
    weight: ({ species }) =>
      !terrain__is_aquatic(species.environment.terrain) && species.size < species__size.small
        ? 5
        : 0,
    apply: () =>
      `${entity_placeholder} is well adapted to urban environments.${
        window.dice.random > 0.8
          ? ` ${entity_placeholder} is especially friendly in areas where it is regularly fed by residents.`
          : ''
      }`
  },
  decline: {
    tag: 'decline',
    type: 'habitat',
    weight: ({ species }) => (species.rarity > scarcity.common ? 5 : 0),
    apply: () =>
      `${entity_placeholder} has declined in number over the years, mainly due to ${window.dice.choice(
        ['hunting', 'habitat loss']
      )}.`
  },
  pest: {
    tag: 'pest',
    type: 'behavior',
    weight: ({ species }) => {
      const { size } = species
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      return !aquatic && size < species__size.small && !beast__culture_conflicts(species) ? 2 : 0
    },
    apply: ({ region }) => {
      const culture = window.world.cultures[region.culture.native]
      const reasons = [
        `damage ${window.dice.choice(['crops', 'livestock', 'forestry', 'homes'])}`,
        'create loud, disruptive noises',
        'steal food',
        'act as a disease vector'
      ]
      return `${entity_placeholder} is considered a pest by the ${decorated_culture({
        culture
      })} due to its tendency to ${window.dice.choice(reasons)}.`
    }
  }
}
