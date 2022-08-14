import { coarse__quality } from '../../../../../utilities/quality'
import { decorate_text } from '../../../../../utilities/text/decoration'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { terrain__is_aquatic } from '../../../../../world/climate/terrain'
import { species__conflicting_traits } from '../../..'
import { decorated_culture } from '../../../humanoids/cultures'
import { religion__decorated } from '../../../humanoids/religions'
import { species__size } from '../../../size'
import { beast__families } from '../../taxonomy/types'
import { BeastTrait } from '../types'
import { beast__use_trait_tags } from './tags'

export const beast__culture_conflicts = species__conflicting_traits([
  'cultural',
  'livestock',
  'transportation',
  'pest',
  'companions'
])

export const beast__use_traits: Record<beast__use_trait_tags, BeastTrait> = {
  cultural: {
    tag: 'cultural',
    type: 'use',
    weight: ({ species }) => (!beast__culture_conflicts(species) ? 2 : 0),
    apply: ({ region }) => {
      const culture = window.world.cultures[region.culture.native]
      const religion = window.world.religions[culture.religion]
      return `${entity_placeholder} ${window.dice.choice([
        `is a well-known subject of ${decorated_culture({ culture })} ${window.dice.choice([
          'poetry',
          'mythology',
          'folklore'
        ])}`,
        `is considered sacred ${window.dice.choice([
          `in the ${decorated_culture({ culture })} culture`,
          `to the worshipers of ${religion__decorated(religion)}`
        ])}`
      ])}.`
    }
  },
  livestock: {
    tag: 'livestock',
    type: 'use',
    weight: ({ species }) => {
      const { size, role } = species
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      return !aquatic &&
        size > species__size.diminutive &&
        role === 'prey' &&
        !beast__culture_conflicts(species)
        ? 2
        : 0
    },
    apply: ({ species, region }) => {
      const culture = window.world.cultures[region.culture.native]
      return `${entity_placeholder} has been domesticated by the ${decorated_culture({
        culture
      })} culture and is used as livestock (${coarse__quality.material(species.rarity)}).`
    }
  },
  transportation: {
    tag: 'transportation',
    type: 'use',
    weight: 0,
    apply: ({ species, region }) => {
      const culture = window.world.cultures[region.culture.native]
      return `${entity_placeholder} has been domesticated by the ${decorated_culture({
        culture
      })} culture and is used ${decorate_text({
        label: 'for transportation',
        tooltip: coarse__quality.material(species.rarity)
      })}.`
    }
  },
  companions: {
    tag: 'companions',
    type: 'use',
    weight: ({ species }) => {
      const { size } = species
      const aquatic = terrain__is_aquatic(species.environment.terrain)
      return !aquatic &&
        size > species__size.diminutive &&
        size < species__size.medium &&
        !beast__culture_conflicts(species)
        ? 2
        : 0
    },
    apply: ({ species, region }) => {
      const culture = window.world.cultures[region.culture.native]
      return `${entity_placeholder} has been domesticated by the ${decorated_culture({
        culture
      })} culture and are often kept as ${decorate_text({
        label: 'pets',
        tooltip: coarse__quality.material(species.rarity)
      })}.`
    }
  },
  textiles: {
    tag: 'textiles',
    type: 'use',
    apply: ({ species }) => {
      return `The ${
        species.family === 'mammal' ? 'wool' : 'silk'
      } of this species is used to make textiles (${coarse__quality.material(species.rarity)}).`
    },
    weight: 0
  },
  leather: {
    tag: 'leather',
    type: 'use',
    apply: ({ species }) => {
      return `The hide of this species is used to make leather products (${coarse__quality.material(
        species.rarity
      )}).`
    },
    weight: ({ species }) => {
      const valid_family = species.family === 'mammal' || species.family === 'reptile'
      return valid_family && species.size > species__size.small ? 2 : 0
    }
  },
  fur: {
    tag: 'fur',
    type: 'use',
    apply: ({ species }) => {
      return `The pelt of this species is used to make fur products (${coarse__quality.material(
        species.rarity
      )}).`
    },
    weight: ({ species }) =>
      species.environment.climate === 'Cold' &&
      beast__families[species.family].skin === 'fur' &&
      species.size > species__size.diminutive &&
      !terrain__is_aquatic(species.environment.terrain)
        ? 2
        : 0
  },
  honey: {
    tag: 'honey',
    type: 'use',
    apply: ({ species }) => {
      return `${entity_placeholder} produces honey (${coarse__quality.material(species.rarity)}).`
    },
    weight: 0
  }
}
