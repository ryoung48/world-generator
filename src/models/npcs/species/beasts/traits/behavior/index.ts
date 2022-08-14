import { Region } from '../../../../../regions/types'
import { scarcity } from '../../../../../utilities/quality'
import { proper_list, title_case } from '../../../../../utilities/text'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { terrain__is_aquatic } from '../../../../../world/climate/terrain'
import { climate_lookup, climates } from '../../../../../world/climate/types'
import { npc__opposite_gender } from '../../../../actors/stats/appearance/gender'
import { species__conflicting_traits, species__is_symbiotic } from '../../..'
import { species__size } from '../../../size'
import { beast__skin_type } from '../../appearance'
import { detritivore_diet, hemophage_diet, scavenger_diet } from '../../behavior/diet'
import { beast__life_cycle } from '../../behavior/life_cycle'
import { Beast } from '../../types'
import { BeastTrait } from '../types'
import { beast__behavior_trait_tags } from './tags'

const seasons = (species: Beast, region: Region) => {
  const climate = climate_lookup[region.climate]
  const dry_season = species.environment.climate === 'Warm' && climate.type !== climates.EQUATORIAL
  const winter =
    species.environment.climate === 'Cold' &&
    (climate.type === climates.CONTINENTAL ||
      climate.type === climates.OCEANIC ||
      climate.type === climates.COLD_STEPPE)
  return { dry_season, winter }
}

export const beast__behavior_traits: Record<beast__behavior_trait_tags, BeastTrait> = {
  territorial: {
    tag: 'territorial',
    type: 'territory',
    weight: 5,
    apply: ({ species: { gender_variation, territory } }) => {
      const { primary } = gender_variation
      const secondary = npc__opposite_gender(primary)
      const variants = [
        `${entity_placeholder} becomes  ${window.dice.choice([
          'very territorial',
          'aggressive'
        ])} during breeding season`,
        `${title_case(primary + 's')} aggressively fight each other during mating season`,
        `They are very aggressive with each other during the breeding season with ${primary}s being more bellicose than ${secondary}s`
      ]
      if (territory === 'nest')
        variants.push(
          `${entity_placeholder} is known to fiercely defend their territory, and will fight each other to gain access to nesting locations`
        )
      return `${window.dice.choice(variants)}.`
    }
  },
  vocalization: {
    tag: 'vocalization',
    type: 'behavior',
    weight: ({ species }) =>
      species.family !== 'fish' && species.family !== 'mollusk' && species.family !== 'arthropod'
        ? 5
        : 0,
    apply: ({ species: { gender_variation } }) => {
      const sounds =
        'loud|shrill|sharp|deep|low|gruff|pleasant|melodic|melancholic|deep|hoarse|cheerful'.split(
          '|'
        )
      const { primary } = gender_variation
      const variants = [
        `${entity_placeholder} is known for its ${window.dice.choice(
          sounds
        )} call heard during breeding season`,
        `The ${primary} has a monotonous chant of two low and fast calls, repeated continuously for several seconds`,
        `They are known to have a variety of calls. The calls sound ${proper_list(
          window.dice.sample(sounds, 3),
          'and'
        )}`,
        `${entity_placeholder} has a complex repertoire of calls including advertising calls, a display call, contact calls, alarm calls and threat calls. Calls can be ${proper_list(
          window.dice.sample(sounds, 2),
          'or'
        )} sounding`
      ]
      return `${window.dice.choice(variants)}.`
    }
  },
  heat_tolerant: {
    tag: 'heat_tolerant',
    type: 'behavior',
    weight: ({ species: { environment } }) =>
      !terrain__is_aquatic(environment.terrain) && environment.terrain === 'Desert' ? 5 : 0,
    apply: () => {
      const variants = [
        `has a great tolerance to high heat levels due to adaptations in body temperature, metabolism, respiration, water balance, and behavior`,
        `can go through extended periods without eating or drinking`
      ]
      return `${entity_placeholder} ${window.dice.choice(variants)}.`
    }
  },
  cold_tolerant: {
    tag: 'cold_tolerant',
    type: 'behavior',
    weight: ({ species }) => {
      return beast__skin_type(species) === 'fur' && species.environment.climate === 'Cold' ? 5 : 0
    },
    apply: () =>
      `${entity_placeholder} has a ${window.dice.choice([
        'thick layer of blubber',
        'thick winter coat'
      ])} to help keep warm in frigid temperatures.`
  },
  scarcity: {
    tag: 'scarcity',
    type: 'behavior',
    weight: ({ species, region }) => {
      const { winter, dry_season } = seasons(species, region)
      return !terrain__is_aquatic(species.environment.terrain) && (winter || dry_season) ? 5 : 0
    },
    apply: ({ species, region }) => {
      const { winter } = seasons(species, region)
      const season = winter
        ? 'winter to combat cold temperatures'
        : 'dry season to combat water shortages'
      const variants = ['stores surplus food for periods of scarcity']
      if (species.size < species__size.large) variants.push(`hibernates during the ${season}`)
      return `${entity_placeholder} ${window.dice.choice(variants)}.`
    }
  },
  mutualistic: {
    tag: 'mutualistic',
    type: 'hidden',
    weight: ({ species }) => {
      const { size, appearance } = species
      return size < species__size.small &&
        !appearance.mimicry &&
        !species__is_symbiotic(species) &&
        !species.semi_aquatic
        ? 2
        : 0
    },
    apply: ({ species }) => {
      species.symbiosis = { species: [], type: 'mutualistic', tag: 'beast' }
      return ''
    }
  },
  commensalistic: {
    tag: 'commensalistic',
    type: 'hidden',
    weight: ({ species }) => {
      const { size, appearance } = species
      return size < species__size.small &&
        !appearance.mimicry &&
        !species__is_symbiotic(species) &&
        !species.semi_aquatic
        ? 2
        : 0
    },
    apply: ({ species }) => {
      species.symbiosis = {
        species: [],
        tag: 'beast',
        type: 'commensalistic',
        subtype: window.dice.choice(['transport', 'housing', 'protection'])
      }
      return ''
    }
  },
  echolocation: {
    tag: 'echolocation',
    type: 'behavior',
    weight: ({ species }) => {
      const { activity_period } = species
      return activity_period === 'nocturnal' &&
        !species__conflicting_traits(['keen_senses'])(species)
        ? 2
        : 0
    },
    apply: () => {
      return `${entity_placeholder} has poor eyesight and instead uses echolocation to navigate.`
    }
  },
  navigation: {
    tag: 'navigation',
    type: 'behavior',
    weight: ({ species: { family, size, territory } }) => {
      return family === 'avian' && size < species__size.small && territory === 'migratory' ? 2 : 0
    },
    apply: () => {
      return `${entity_placeholder} well known for their ability to find their way home from long distances${
        window.dice.random > 0.95
          ? ` and are ${window.dice.choice([
              'sometimes',
              'often'
            ])} used by locals to deliver messages`
          : ''
      }.`
    }
  },
  hemophage: {
    tag: 'hemophage',
    type: 'hidden',
    weight: 0,
    apply: ({ species }) => {
      species.diet = hemophage_diet()
      species.symbiosis = { species: [], type: 'parasitic', subtype: 'vampirism', tag: 'beast' }
      return ''
    }
  },
  infestation: {
    tag: 'infestation',
    type: 'hidden',
    weight: 0,
    apply: ({ species }) => {
      species.diet = hemophage_diet()
      species.symbiosis = { species: [], type: 'parasitic', subtype: 'infestation', tag: 'beast' }
      return ''
    }
  },
  scavenger: {
    tag: 'scavenger',
    type: 'hidden',
    weight: 0,
    apply: ({ species }) => {
      species.diet = scavenger_diet()
      return ''
    }
  },
  detritivore: {
    tag: 'detritivore',
    type: 'hidden',
    weight: 0,
    apply: ({ species }) => {
      species.diet = detritivore_diet()
      return ''
    }
  },
  ancient: {
    tag: 'ancient',
    type: 'hidden',
    weight: ({ species: { size, rarity } }) =>
      size !== species__size.fine && rarity > scarcity.common ? 2 : 0,
    apply: ({ species }) => {
      const { life_span, gestation, maturation, brood_size } = beast__life_cycle({
        size: species.size,
        ancient: true
      })
      species.life_span = life_span
      species.gestation = gestation
      species.maturation = maturation
      species.brood_size = brood_size
      return ''
    }
  }
}
