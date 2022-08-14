import { color__modifiers, color__permutations, hue, hues } from '../../../../../utilities/colors'
import { scarcity } from '../../../../../utilities/quality'
import { decorate_text } from '../../../../../utilities/text/decoration'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { terrain__is_aquatic, terrain__is_arctic } from '../../../../../world/climate/terrain'
import { species__conflicting_traits } from '../../..'
import { species__size } from '../../../size'
import { primordial__coloration } from '../../appearance/types'
import { PrimordialTrait } from '../types'
import { primordial__aesthetic_trait_tags } from './tags'

const sounds = 'pleasant|melodic|melancholic|eerie|chaotic'.split('|')

const exotic_leaves = color__permutations(
  [...color__modifiers],
  ['red', 'purple', 'black', 'teal', 'indigo']
)

const flower_conflicts = species__conflicting_traits([
  'polymorphic',
  'mimicry',
  'exotic petals',
  'floral_phasing'
])

export const appearance_conflicts = species__conflicting_traits([
  'polymorphic',
  'mimicry',
  'exotic petals',
  'floral_phasing',
  'exotic leaves',
  'variegated leaves',
  'bioluminescence',
  'necrotic'
])

const mimic_conflict = species__conflicting_traits(['mimicry'])

export const primordial__aesthetic_traits: Record<
  primordial__aesthetic_trait_tags,
  PrimordialTrait
> = {
  'exotic petals': {
    tag: 'exotic petals',
    type: 'hidden',
    apply: ({ species: { appearance, rarity: scarce } }) => {
      const rare = scarce > scarcity.uncommon
      appearance.flowers.exotic = window.dice.weighted_choice([
        { v: 'illusory', w: rare ? 0.1 : 0 },
        { v: 'incorporeal', w: rare ? 0.1 : 0 },
        {
          v: decorate_text({
            label: window.dice.choice(['striped', 'spotted']),
            tooltip: window.dice.choice(
              primordial__coloration.floral.filter(
                color => !appearance.flowers.color.includes(color)
              )
            )
          }),
          w: 1
        }
      ])
      return ''
    },
    weight: ({ species }) =>
      species.appearance.flowers && species.rarity > scarcity.abundant && !flower_conflicts(species)
        ? 1
        : 0
  },
  'exotic leaves': {
    tag: 'exotic leaves',
    type: 'hidden',
    apply: ({ species: { appearance } }) => {
      appearance.leaves.color = window.dice.choice(exotic_leaves)
      return ''
    },
    weight: ({ species }) =>
      species.appearance.leaves && species.rarity > scarcity.abundant && !mimic_conflict(species)
        ? 1
        : 0
  },
  'variegated leaves': {
    tag: 'variegated leaves',
    type: 'hidden',
    apply: ({ species: { appearance } }) => {
      appearance.leaves.variegation = window.dice.choice(['white', 'yellow', 'beige'])
      return ''
    },
    weight: ({ species }) =>
      species.appearance.leaves && species.rarity > scarcity.abundant && !mimic_conflict(species)
        ? 1
        : 0
  },
  polymorphic: {
    tag: 'polymorphic',
    type: 'hidden',
    apply: ({ species }) => {
      species.appearance.flowers.color = window.dice.sample(
        primordial__coloration.floral,
        species.rarity > scarcity.uncommon ? 3 : 2
      )
      return ''
    },
    weight: ({ species }) => (species.appearance.flowers && !flower_conflicts(species) ? 1 : 0)
  },
  scent: {
    tag: 'scent',
    type: 'flower',
    apply: ({ species }) => {
      return `The flowers emit a ${window.dice.choice([
        'faint',
        'subtle',
        'strong',
        'pungent'
      ])} ${window.dice.weighted_choice([
        { v: 'sweet', w: 2 },
        { v: 'musky', w: 2 },
        { v: 'foul', w: 1 },
        { v: 'coppery', w: 1 },
        { v: 'rotting', w: 1 },
        { v: 'earthy', w: 2 },
        { v: 'aromatic', w: 2 },
        { v: 'pleasant', w: 2 },
        { v: 'evocative', w: species.rarity > scarcity.uncommon ? 1 : 0 }
      ])} fragrance.`
    },
    weight: ({ species }) =>
      species.appearance.flowers && !terrain__is_aquatic(species.environment.terrain) ? 1 : 0
  },
  bells: {
    tag: 'bells',
    type: 'flower',
    apply: () => {
      const sound = window.dice.choice(sounds)
      return `Wind causes their seeds to rattle around and create a ${sound} ringing sound.`
    },
    weight: ({ species }) =>
      species.reproduction.type === 'seeds' &&
      species.reproduction.seeds !== 'spores' &&
      !terrain__is_aquatic(species.environment.terrain)
        ? 0.5
        : 0
  },
  chorus: {
    tag: 'chorus',
    type: 'behavior',
    apply: () => {
      const sound = window.dice.choice(sounds)
      return `${entity_placeholder} is filled with deep holes that create ${sound} sounds when wind passes through them.`
    },
    weight: ({ species }) =>
      (species.appearance.woody || species.genus === 'succulent') &&
      !terrain__is_aquatic(species.environment.terrain) &&
      species.size > species__size.small
        ? 0.5
        : 0
  },
  mimicry: {
    tag: 'mimicry',
    type: 'hidden',
    apply: ({ species }) => {
      species.mimicry = { species: -1, role: 'mimic' }
      return ''
    },
    weight: ({ species }) =>
      !appearance_conflicts(species) && species.rarity > scarcity.abundant ? 0.5 : 0
  },
  bioluminescence: {
    tag: 'bioluminescence',
    type: 'hidden',
    apply: ({ species }) => {
      species.appearance.bioluminescence = window.dice.choice([...hues])
      return ''
    },
    weight: ({ species }) => (mimic_conflict(species) ? 0 : 0.1)
  },
  floral_phasing: {
    tag: 'floral_phasing',
    type: 'flower coloration',
    apply: ({ species: { appearance, environment } }) => {
      const [primary, secondary] = window.dice.shuffle(['light', 'dark'])
      const arctic = terrain__is_arctic(environment.terrain)
      return `The flowers are a ${primary} shade of ${
        appearance.flowers.color
      } that ${secondary}en ${window.dice.weighted_choice([
        { v: 'with age', w: 1 },
        { v: 'sporadically', w: 1 },
        { v: 'during the day', w: arctic ? 0 : 1 },
        { v: 'at night', w: arctic ? 0 : 1 }
      ])}`
    },
    weight: ({ species }) => {
      const { appearance } = species
      const valid_color = hues.includes(appearance.flowers?.color[0] as hue)
      return valid_color && !flower_conflicts(species) ? 0.5 : 0
    }
  }
}
