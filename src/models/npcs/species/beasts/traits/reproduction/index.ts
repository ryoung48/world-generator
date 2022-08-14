import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { npc__opposite_gender } from '../../../../actors/stats/appearance/gender'
import { species__conflicting_traits, species__is_symbiotic } from '../../..'
import { species__size } from '../../../size'
import { beast__families } from '../../taxonomy/types'
import { BeastTrait } from '../types'
import { beast__reproduction_trait_tags } from './tags'

const conflicting_reproduction: beast__reproduction_trait_tags[] = [
  'parthenogenic',
  'hermaphrodites',
  'lek',
  'brood_parasitism',
  'cooperative'
]

export const beast__reproduction_traits: Record<beast__reproduction_trait_tags, BeastTrait> = {
  parthenogenic: {
    tag: 'parthenogenic',
    type: 'reproduction',
    weight: ({ species }) =>
      !species__conflicting_traits(conflicting_reproduction)(species) ? 1 : 0,
    apply: `${entity_placeholder} is notable because it is parthenogenic, which means that males are not necessary for reproduction. As such, while males do exist, they are very rare and often sterile.`
  },
  hermaphrodites: {
    tag: 'hermaphrodites',
    type: 'reproduction',
    weight: ({ species }) =>
      !species__conflicting_traits(conflicting_reproduction)(species) ? 1 : 0,
    apply: () =>
      window.dice.choice([
        `Members of this species can act as either female or male at different stages of life.`,
        `Members of this species can be considered both male and female.`
      ])
  },
  lek: {
    tag: 'lek',
    type: 'reproduction',
    weight: ({ species }) =>
      species.size < species__size.huge &&
      !species__conflicting_traits(conflicting_reproduction)(species)
        ? 1
        : 0,
    apply: ({ species: { gender_variation } }) => {
      const { primary } = gender_variation
      const secondary = npc__opposite_gender(primary)
      return `During mating season, ${primary}s gather in large groups to engage in competitive displays and courtship rituals to entice visiting ${secondary}s which are surveying prospective partners to mate with.`
    }
  },
  brood_parasitism: {
    tag: 'brood_parasitism',
    type: 'reproduction',
    weight: ({ species }) => {
      return beast__families[species.family].reproduction === 'eggs' &&
        species.size < species__size.small &&
        !species__conflicting_traits(conflicting_reproduction)(species) &&
        !species__is_symbiotic(species)
        ? 1
        : 0
    },
    apply: ({ species }) => {
      species.symbiosis = {
        species: [],
        type: 'parasitic',
        subtype: 'brood parasitism',
        tag: 'beast'
      }
      return `Members of this species are brood parasites, laying their eggs in the nests of other ${
        beast__families[species.family].plural
      }. ${window.dice.choice(['Juveniles', 'Eggs'])} are colored to resemble the host.`
    }
  },
  cooperative: {
    tag: 'cooperative',
    type: 'reproduction',
    weight: ({ species }) => {
      return species.social !== 'solitary' &&
        !species__conflicting_traits(conflicting_reproduction)(species)
        ? 1
        : 0
    },
    apply: () => `Juveniles are ${window.dice.choice(['raised', 'nurtured'])} by the entire group.`
  }
}
