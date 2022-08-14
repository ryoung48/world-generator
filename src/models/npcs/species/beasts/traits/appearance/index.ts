import { hues } from '../../../../../utilities/colors'
import { range } from '../../../../../utilities/math'
import { singular, title_case } from '../../../../../utilities/text'
import { decorate_text } from '../../../../../utilities/text/decoration'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { terrain__is_aquatic } from '../../../../../world/climate/terrain'
import { npc__opposite_gender } from '../../../../actors/stats/appearance/gender'
import { species__conflicting_traits, species__is_symbiotic } from '../../..'
import { species__size } from '../../../size'
import { beast__accent_color, beast__skin_color, beast__skin_type } from '../../appearance'
import { beast__families } from '../../taxonomy/types'
import { Beast } from '../../types'
import { BeastTrait } from '../types'
import { mimicry__conflict } from './mimicry'
import { beast__appearance_trait_tags } from './tags'

const conflicting_appearances: beast__appearance_trait_tags[] = [
  'polymorphic',
  'markings',
  'contrast',
  'aged_coloration',
  'mimicry'
]

const gender_coloration = (species: Beast) => {
  const { gender_variation } = species
  const { primary_shades, primary_color, secondary_shades, secondary_color } = gender_variation
  return primary_shades || primary_color || secondary_shades || secondary_color
}

const has_gender_variation = (species: Beast) => {
  const { gender_variation } = species
  const { size } = gender_variation
  return size !== 1 || gender_coloration(species)
}

const beast_markings = (...params: Parameters<typeof beast__accent_color>) => {
  return {
    color: beast__accent_color(...params),
    markings: window.dice.choice(['accents', 'markings', 'patches', 'stripes', 'bands', 'spots'])
  }
}

export const beast__appearance_traits: Record<beast__appearance_trait_tags, BeastTrait> = {
  polymorphic: {
    tag: 'polymorphic',
    type: 'hidden',
    weight: ({ species }) =>
      species.appearance.skin.type !== 'skin' &&
      !gender_coloration(species) &&
      !species__conflicting_traits(conflicting_appearances)(species)
        ? 5
        : 0,
    apply: ({ species }) => {
      const { appearance } = species
      const morphs = window.dice.choice([1, 2])
      range(morphs).forEach(() => {
        const morph = beast__skin_color({
          species,
          color_blacklist: appearance.skin.color
        })
        species.appearance.skin.color.push(morph)
      })
      return ''
    }
  },
  markings: {
    tag: 'markings',
    type: 'appearance',
    weight: ({ species }) =>
      !species__conflicting_traits(conflicting_appearances)(species) ? 5 : 0,
    apply: ({ species }) => {
      const { appearance, family, gender_variation } = species
      const skin = appearance.skin.type ?? beast__families[family].skin
      const { color, markings } = beast_markings({ species })
      const variation =
        has_gender_variation(species) && window.dice.random > 0.7
          ? ` These ${markings} are only present on ${gender_variation.primary}s.`
          : ''
      return `${entity_placeholder} has ${color} ${markings} scattered across its ${skin}.${variation}`
    }
  },
  contrast: {
    tag: 'contrast',
    type: 'appearance',
    weight: ({ species }) =>
      !species__conflicting_traits(conflicting_appearances)(species) ? 5 : 0,
    apply: ({ species }) => {
      const color = beast__accent_color({ species })
      const body_part = window.dice.choice(['head', 'underside', 'back'])
      const { gender_variation } = species
      const variation =
        has_gender_variation(species) && window.dice.random > 0.95
          ? ` This contrasting coloration is only present on ${gender_variation.primary}s.`
          : ''
      return `The color of their ${body_part} is ${color} in contrast to the rest of the body.${variation}`
    }
  },
  aged_coloration: {
    tag: 'aged_coloration',
    type: 'appearance',
    weight: ({ species }) =>
      !gender_coloration(species) && !species__conflicting_traits(conflicting_appearances)(species)
        ? 5
        : 0,
    apply: ({ species: { appearance, family } }) => {
      const [color] = appearance.skin.color
      const skin = appearance.skin.type ?? beast__families[family].skin
      const transition = color.includes('light')
        ? 'darkens'
        : color.includes('dark')
        ? 'lightens'
        : 'fades'
      return `${title_case(singular(skin))} coloration ${transition} with age.`
    }
  },
  arctic_coloration: {
    tag: 'arctic_coloration',
    type: 'appearance',
    weight: ({ species: { environment } }) => {
      return !terrain__is_aquatic(environment.terrain) && environment.climate === 'Cold' ? 5 : 0
    },
    apply: ({ species: { appearance, family } }) => {
      const skin = appearance.skin.type ?? beast__families[family].skin
      return `${title_case(
        singular(skin)
      )} coloration changes to white in the winter to help camouflage with the snow.`
    }
  },
  mimicry: {
    tag: 'mimicry',
    type: 'hidden',
    weight: ({ species }) => {
      const { role, size, appearance } = species
      return role === 'prey' &&
        size < species__size.medium &&
        !appearance.mimicry &&
        !species__is_symbiotic(species) &&
        !species__conflicting_traits([...conflicting_appearances, ...mimicry__conflict])(species)
        ? 2
        : 0
    },
    apply: ({ species }) => {
      species.appearance.mimicry = { species: -1, role: 'mimic' }
      return ''
    }
  },
  ornamentation: {
    tag: 'ornamentation',
    type: 'appearance',
    weight: ({ species }) => {
      const { family } = species
      const weight_families: Beast['family'][] = ['mammal', 'avian', 'reptile']
      const skin = beast__skin_type(species)
      const non_furry_mammal = skin !== 'fur' && family === 'mammal'
      return weight_families.includes(family) && !non_furry_mammal ? 5 : 0
    },
    apply: ({ species }) => {
      const { gender_variation, family } = species
      const ornament = family === 'avian' ? 'crest' : family === 'mammal' ? 'mane' : 'frill'
      const ornamented = ornament == 'crest' ? `${ornament} on top of its head` : `neck ${ornament}`
      const variation =
        has_gender_variation(species) && window.dice.random > 0.6
          ? ` This ${ornament} is only present on ${gender_variation.primary}s.`
          : ''
      return `${entity_placeholder} has a distinctive ${ornamented}.${variation}`
    }
  },
  horns: {
    tag: 'horns',
    type: 'appearance',
    weight: 0,
    apply: ({ species }) => {
      const length = window.dice.choice(['long', 'short'])
      const pairs = window.dice.weighted_choice([
        { v: 'one', w: 0.95 },
        { v: 'two', w: 0.05 }
      ])
      const { gender_variation } = species
      const secondary = npc__opposite_gender(gender_variation.primary)
      const variation =
        has_gender_variation(species) && window.dice.random > 0.6
          ? ` ${window.dice.choice([
              `${title_case(gender_variation.primary)}s have shorter horns than ${secondary}s.`,
              `${title_case(secondary)}s do not have horns.`
            ])}`
          : ''
      return `${entity_placeholder} has ${pairs} pair${
        pairs === 'two' ? 's' : ''
      } of ${length} horns.${variation}`
    }
  },
  nose_horns: {
    tag: 'nose_horns',
    type: 'appearance',
    weight: 0,
    apply: ({ species }) => {
      const length = window.dice.choice(['long', 'short'])
      const count = window.dice.weighted_choice([
        { v: 'one', w: 0.95 },
        { v: 'two', w: 0.05 }
      ])
      const { gender_variation } = species
      const secondary = npc__opposite_gender(gender_variation.primary)
      const variation =
        has_gender_variation(species) && window.dice.random > 0.6
          ? ` ${window.dice.choice([
              `${title_case(gender_variation.primary)}s have ${window.dice.choice([
                'shorter',
                'thinner',
                'smaller'
              ])} horns than ${secondary}s.`,
              `${title_case(secondary)}s do not have horns.`
            ])}`
          : ''
      return `${entity_placeholder} has ${count} ${length} horn${
        count === 'one' ? '' : 's'
      }.${variation}`
    }
  },
  tusks: {
    tag: 'tusks',
    type: 'appearance',
    weight: 0,
    apply: ({ species }) => {
      const { gender_variation } = species
      const secondary = npc__opposite_gender(gender_variation.primary)
      const variation =
        has_gender_variation(species) && window.dice.random > 0.6
          ? ` ${window.dice.choice([
              `${title_case(gender_variation.primary)}s have shorter tusks than ${secondary}s.`,
              `${title_case(secondary)}s do not have tusks.`
            ])}`
          : ''
      return `${entity_placeholder} has ${window.dice.choice([
        'large',
        'small'
      ])} tusks.${variation}`
    }
  },
  antlers: {
    tag: 'antlers',
    type: 'appearance',
    weight: 0,
    apply: ({ species }) => {
      const size = window.dice.choice(['large', 'small'])
      const { gender_variation } = species
      const secondary = npc__opposite_gender(gender_variation.primary)
      const variation =
        has_gender_variation(species) && window.dice.random > 0.6
          ? ` ${window.dice.choice([
              `${title_case(gender_variation.primary)}s have shorter antlers than ${secondary}s.`,
              `${title_case(secondary)}s do not have antlers.`
            ])}`
          : ''
      return `${entity_placeholder} has distinctive ${size} antlers.${variation}`
    }
  },
  shell: {
    tag: 'shell',
    type: 'appearance',
    weight: 0,
    apply: ({ species }) => {
      const { appearance } = species
      const shell_color = beast__skin_color({
        species,
        color_blacklist: appearance.skin.color
      })
      let embellish = { color: '', markings: '' }
      if (window.dice.random > 0.8) {
        embellish = beast_markings({ species, blacklist: [shell_color] })
      }
      const color = !embellish.markings && window.dice.random > 0.99 ? 'translucent' : shell_color
      return `${entity_placeholder} is characterized by a protective ${color} shell${
        embellish.markings ? ` with ${embellish.color} ${embellish.markings}` : ''
      }.`
    }
  },
  humps: {
    tag: 'humps',
    type: 'appearance',
    weight: 0,
    apply: () =>
      `${entity_placeholder} is characterized by the ${window.dice.choice([
        'single hump',
        'two humps'
      ])} on its back, which stores fat for times when resources are scarce.`
  },
  bioluminescence: {
    tag: 'bioluminescence',
    type: 'behavior',
    weight: ({ species: { activity_period, environment } }) => {
      return activity_period === 'nocturnal' || environment.terrain === 'Oceanic' ? 2 : 0
    },
    apply: ({ species: { role } }) => {
      const uses = ['attraction', 'warning', 'signaling', role === 'prey' ? 'defense' : 'hunting']
      return `${entity_placeholder} can emit ${decorate_text({
        label: 'light',
        tooltip: window.dice.choice([...hues])
      })} used for ${window.dice.choice(uses)}.`
    }
  }
}
