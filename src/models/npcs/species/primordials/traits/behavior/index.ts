import { province__hub } from '../../../../../regions/provinces'
import { coarse__quality, scarcity } from '../../../../../utilities/quality'
import { decorate_text } from '../../../../../utilities/text/decoration'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { terrain__is_aquatic, terrain__is_arctic } from '../../../../../world/climate/terrain'
import { species__conflicting_traits } from '../../..'
import { species__random_height, species__size } from '../../../size'
import { primordial__coloration } from '../../appearance/types'
import { Primordial } from '../../types'
import { appearance_conflicts } from '../aesthetic'
import { PrimordialTrait } from '../types'
import { primordial__behavior_trait_tags } from './tags'

const non_carnivorous: Primordial['genus'][] = ['fern', 'grass']

export const primordial__behavioral_traits: Record<
  primordial__behavior_trait_tags,
  PrimordialTrait
> = {
  'bloom quirk': {
    tag: 'bloom quirk',
    type: 'flower',
    apply: ({ species }) => {
      const { terrain } = species.environment
      if (terrain === 'Desert' && window.dice.random > 0.8) {
        return `${entity_placeholder} only blooms ${window.dice.choice([
          'before',
          'during',
          'after'
        ])} rain.`
      }
      return `${entity_placeholder} only blooms ${window.dice.choice([
        'during a full moon',
        'at dusk',
        'at dawn',
        decorate_text({ label: 'during the day', tooltip: 'closing at dusk' }),
        'at night'
      ])}.`
    },
    weight: ({ species }) =>
      species.appearance.flowers &&
      !terrain__is_aquatic(species.environment.terrain) &&
      !terrain__is_arctic(species.environment.terrain) &&
      !species__conflicting_traits(['carnivorous'])(species)
        ? 1
        : 0
  },
  carnivorous: {
    tag: 'carnivorous',
    type: 'behavior',
    apply: ({ species }) => {
      species.prey = []
      if (species.size < species__size.tiny) {
        species.size = window.dice.weighted_choice([
          { v: species__size.tiny, w: 0.4 },
          { v: species__size.small, w: 0.3 },
          { v: species__size.medium, w: 0.2 },
          { v: species__size.large, w: 0.1 }
        ])
        species.length = species__random_height(species.size)
      }
      return `${entity_placeholder} is carnivorous and derives some of it's nutrients from trapping and consuming smaller creatures.`
    },
    weight: ({ species }) =>
      non_carnivorous.includes(species.genus) ||
      species__conflicting_traits([
        'bloom quirk',
        'attractors',
        'ambient',
        'symbiotic',
        'weeds',
        'algal blooms',
        'decorative',
        'ceremonial'
      ])(species) ||
      species.rarity < scarcity.uncommon
        ? 0
        : 0.5
  },
  attractors: {
    tag: 'attractors',
    type: 'hidden',
    apply: ({ species, region }) => {
      const prospects = region.beasts[species.environment.key].map(i => window.world.beasts[i])
      const family = window.dice.choice(prospects.map(beast => beast.family))
      const role = window.dice.choice(
        prospects.filter(beast => beast.family === family).map(beast => beast.role)
      )
      species.attractors = {
        species: [],
        type: window.dice.choice(['attract', 'repel']),
        family,
        role
      }
      return ''
    },
    weight: ({ species }) =>
      species__conflicting_traits(['carnivorous', 'symbiotic', 'hazardous'])(species)
        ? 0
        : species.rarity > scarcity.abundant
        ? 1
        : 0.2
  },
  symbiotic: {
    tag: 'symbiotic',
    type: 'hidden',
    apply: ({ species }) => {
      species.symbiosis = {
        species: [],
        tag: window.dice.choice(['beast', 'primordial']),
        type: window.dice.choice(['mutualistic', 'commensalistic', 'parasitic'])
      }
      if (species.symbiosis.type === 'commensalistic') {
        species.symbiosis.subtype = 'housing'
      } else if (species.symbiosis.type === 'parasitic') {
        species.symbiosis.subtype = 'vampirism'
      }
      return ''
    },
    weight: ({ species }) =>
      species.size >= species__size.medium ||
      species__conflicting_traits([
        'carnivorous',
        'ambient',
        'hazardous',
        'attractors',
        'cliffs',
        'subterranean',
        'volcanic',
        'decay'
      ])(species)
        ? 0
        : species.rarity > scarcity.abundant
        ? 1
        : 0.2
  },
  hazardous: {
    tag: 'hazardous',
    type: 'behavior',
    apply: ({ species }) => {
      const status = coarse__quality.poisons(species.rarity)
      return `${entity_placeholder} ${window.dice.weighted_choice([
        {
          v: `emits poisonous fumes that ${decorate_text({
            label: 'burn on contact',
            tooltip: status
          })}`,
          w: 1
        },
        {
          v: `${decorate_text({
            label: window.dice.choice(['saps', 'leeches', 'absorbs']),
            tooltip: status
          })} ${window.dice.weighted_choice([
            { v: 'magic', w: 1 },
            { v: 'heat', w: species.environment.climate === 'Cold' ? 1 : 0 }
          ])} from nearby sources`,
          w: 1
        }
      ])}.`
    },
    weight: ({ species }) =>
      species.rarity > scarcity.abundant &&
      species.size < species__size.large &&
      !species__conflicting_traits([
        'ambient',
        'symbiotic',
        'attractors',
        'decorative',
        'ceremonial'
      ])(species)
        ? 1
        : 0
  },
  necrotic: {
    tag: 'necrotic',
    type: 'behavior',
    apply: ({ species: { appearance } }) => {
      appearance.color = window.dice.choice(primordial__coloration.greys)
      appearance.texture = window.dice.choice(['withering', 'decaying'])
      if (appearance.leaves) {
        appearance.leaves.color = window.dice.choice(primordial__coloration.greys)
        appearance.leaves.texture = 'wilting'
      }
      return `${entity_placeholder} naturally emits necrotic energy${window.dice.weighted_choice([
        { v: ` and can periodically release terrible blights`, w: 1 },
        {
          v: `. Creatures that die in the vicinity reanimate within ${window.dice.choice([
            'three',
            'five',
            'seven'
          ])} days`,
          w: 1
        }
      ])}.`
    },
    weight: ({ species }) =>
      species.rarity === scarcity.exceptional &&
      !species__conflicting_traits(['ambient', 'decorative', 'ceremonial', 'edible'])(species) &&
      !appearance_conflicts(species)
        ? 1
        : 0
  },
  ambient: {
    tag: 'ambient',
    type: 'behavior',
    apply: ({ species }) => {
      const flora = species.family === 'fungi' ? 'fungus' : 'plant'
      return `Creatures that continually ingest this ${flora} ${window.dice.weighted_choice([
        { v: `grow one size ${window.dice.choice(['larger', 'smaller'])}`, w: 1 },
        { v: `become smarter, possibly even capable of speech`, w: 1 }
      ])}.`
    },
    weight: ({ species }) =>
      species.rarity === scarcity.exceptional &&
      !species__conflicting_traits([
        'symbiotic',
        'hazardous',
        'necrotic',
        'decorative',
        'ceremonial'
      ])(species)
        ? 1
        : 0
  },
  extinct: {
    tag: 'extinct',
    type: 'behavior',
    apply: ({ region }) => {
      const capital = province__hub(window.world.provinces[region.capital])
      return `${entity_placeholder} is extinct. Ancient ${window.dice.choice([
        'libraries',
        'granaries'
      ])} in ${decorate_text({
        link: capital,
        tooltip: capital.type
      })} are rumored to have seeds.`
    },
    weight: ({ species }) =>
      species.rarity === scarcity.exceptional &&
      !species__conflicting_traits(['ceremonial', 'decorative'])
        ? 1
        : 0
  },
  weeds: {
    tag: 'weeds',
    type: 'behavior',
    apply: () => {
      return `${entity_placeholder} ${window.dice.choice([
        'grows',
        'reproduces'
      ])} very quickly and is considered a weed by most farmers.`
    },
    weight: ({ species }) =>
      species.rarity < scarcity.uncommon &&
      !terrain__is_aquatic(species.environment.terrain) &&
      !species__conflicting_traits([
        'carnivorous',
        'cliffs',
        'subterranean',
        'symbiotic',
        'decay',
        'volcanic'
      ])(species)
        ? 1
        : 0
  },
  resilient: {
    tag: 'resilient',
    type: 'behavior',
    apply: () => {
      return `${entity_placeholder} is ${window.dice.choice([
        'naturally resistant to most diseases',
        'very durable and can survive in extreme conditions'
      ])}.`
    },
    weight: 0.5
  },
  'algal blooms': {
    tag: 'algal blooms',
    type: 'behavior',
    apply: ({ species: { environment } }) => {
      return `${entity_placeholder} is known to periodically form large algal blooms${
        environment.climate === 'Temperate' ? 'in the warmer months' : ''
      }.`
    },
    weight: ({ species }) =>
      species.size < species__size.diminutive &&
      species.genus === 'algae' &&
      species.environment.climate !== 'Cold' &&
      !species__conflicting_traits(['carnivorous'])(species)
        ? 1
        : 0
  }
}
