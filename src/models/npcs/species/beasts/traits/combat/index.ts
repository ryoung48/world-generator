import { coarse__quality, scarcity } from '../../../../../utilities/quality'
import { decorate_text } from '../../../../../utilities/text/decoration'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { species__conflicting_traits } from '../../..'
import { species__size } from '../../../size'
import { beast__families } from '../../taxonomy/types'
import { BeastTrait } from '../types'
import { beast__combat_trait_tags } from './tags'

const venom_conflict: beast__combat_trait_tags[] = ['venomous', 'constrictor', 'breath', 'electric']

export const beast__combat_traits: Record<beast__combat_trait_tags, BeastTrait> = {
  chameleon: {
    tag: 'chameleon',
    type: 'combat',
    weight: ({ species: { family, size } }) => {
      return size < species__size.large &&
        beast__families[family].skin !== 'fur' &&
        beast__families[family].skin !== 'feathers'
        ? 5
        : 0
    },
    apply: ({ species: { role } }) => {
      const prey = role === 'prey'
      return `${entity_placeholder} is able to change the color of it's skin to better ${
        prey ? 'hide from predators' : 'hunt prey'
      }.`
    }
  },
  armored: {
    tag: 'armored',
    type: 'combat',
    weight: ({ species: { role, family, flying } }) => {
      return !flying && role === 'prey' && family !== 'avian' && family !== 'arthropod' ? 2 : 0
    },
    apply: () => {
      const osteoderms = `skin is covered in bony deposits forming ${window.dice.choice([
        'heavy',
        'light'
      ])} ${window.dice.choice(['scales', 'plates'])}`
      const shelled = `body is protected by an ${window.dice.choice([
        'scaly',
        'leathery'
      ])}, armored shell`
      const armor = window.dice.choice([osteoderms, shelled])
      return `Their ${armor}, which provide${
        armor === shelled ? 's' : ''
      } an effective defense against most predators.`
    }
  },
  packs: {
    tag: 'packs',
    type: 'combat',
    weight: ({ species: { role, social } }) => {
      return role === 'predator' && social !== 'solitary' ? 5 : 0
    },
    apply: ({ species }) =>
      `${entity_placeholder} is able to take down larger prey by hunting in ${
        species.size > species__size.diminutive ? 'packs' : 'swarms'
      }.`
  },
  keen_senses: {
    tag: 'keen_senses',
    type: 'combat',
    weight: ({ species }) => {
      return species.role === 'predator' && !species__conflicting_traits(['echolocation'])(species)
        ? 5
        : 0
    },
    apply: () => {
      return `${entity_placeholder} is known for its keen sense of ${window.dice.choice([
        'smell',
        'hearing',
        'sight'
      ])}.`
    }
  },
  vicious: {
    tag: 'vicious',
    type: 'combat',
    weight: ({ species: { role, family } }) => {
      return role === 'predator' && family !== 'amphibian' ? 2 : 0
    },
    apply: () => {
      return `${entity_placeholder} is known for its very strong ${window.dice.choice([
        'bite',
        'claws'
      ])}, which can easily slice through even the heaviest armor.`
    }
  },
  stealth: {
    tag: 'stealth',
    type: 'combat',
    weight: ({ species: { size, social } }) => {
      return size < species__size.large && social === 'solitary' ? 5 : 0
    },
    apply: ({ species: { role } }) => {
      return `${entity_placeholder} is adapted for silent movement, allowing it to better ${
        role === 'prey' ? 'avoid predators' : 'ambush prey'
      }.`
    }
  },
  venomous: {
    tag: 'venomous',
    type: 'combat',
    weight: ({ species }) => (!species__conflicting_traits(venom_conflict)(species) ? 2 : 0),
    apply: ({ species: { role, rarity } }) => {
      const strength = coarse__quality.poisons(rarity)
      const poison = `${window.dice.weighted_choice([
        { v: 'latent', w: 3 },
        { v: 'atrophy', w: 1 },
        { v: 'corrosive', w: 1 },
        { v: 'neurotoxin', w: 1 }
      ])} (${strength})`
      const predator = `uses ${decorate_text({ label: 'venom', tooltip: poison })} to hunt prey`
      const prey = `has ${decorate_text({
        label: `${window.dice.choice(['toxic', 'venomous'])} ${window.dice.choice([
          'skin',
          'blood'
        ])}`,
        tooltip: poison
      })} used for defense`
      return `${entity_placeholder} ${role === 'prey' ? prey : predator}.`
    }
  },
  constrictor: {
    tag: 'constrictor',
    type: 'combat',
    weight: 0,
    apply: `${entity_placeholder} crushes its prey by constriction.`
  },
  odor: {
    tag: 'odor',
    type: 'combat',
    weight: ({ species: { role, size } }) => {
      return role === 'prey' && size < species__size.medium ? 2 : 0
    },
    apply: `${entity_placeholder} emits a strong odor to ward off predators.`
  },
  agile: {
    tag: 'agile',
    type: 'combat',
    weight: ({ species: { role, size } }) => {
      return role === 'prey' && size < species__size.medium ? 2 : 0
    },
    apply: `${entity_placeholder} is very quick and hard to catch.`
  },
  unpalatable: {
    tag: 'unpalatable',
    type: 'combat',
    weight: ({ species: { role, size } }) => {
      return role === 'prey' && size < species__size.medium ? 2 : 0
    },
    apply: `${entity_placeholder} is extremely unpalatable to most predators.`
  },
  quills: {
    tag: 'quills',
    type: 'combat',
    weight: 0,
    apply: `${entity_placeholder} has sharp quills on its back for protection against predators.`
  },
  breath: {
    tag: 'breath',
    type: 'combat',
    weight: 0,
    apply: ({ species: { environment } }) =>
      `${entity_placeholder} is able to breath ${environment.climate === 'Cold' ? 'ice' : 'fire'}.`
  },
  electric: {
    tag: 'electric',
    type: 'combat',
    weight: 0,
    apply: `${entity_placeholder} is able to use electricity to stun prey.`
  },
  petrify: {
    tag: 'petrify',
    type: 'combat',
    weight: 0,
    apply: ({ species: { rarity } }) =>
      `${entity_placeholder} is able to turn prey ${
        rarity <= scarcity.rare ? 'temporarily' : 'permanently'
      } into stone.`
  },
  regeneration: {
    tag: 'regeneration',
    type: 'combat',
    weight: ({ species: { rarity } }) => (rarity > scarcity.uncommon ? 1 : 0),
    apply: ({ species: { rarity } }) =>
      `${entity_placeholder} is able to very quickly heal ${
        rarity >= scarcity.rare ? 'minor' : 'major'
      } wounds.`
  },
  invisibility: {
    tag: 'invisibility',
    type: 'combat',
    weight: ({ species: { rarity } }) => (rarity > scarcity.uncommon ? 1 : 0),
    apply: ({ species: { rarity } }) =>
      `${entity_placeholder} is able to distort light and turn invisible for ${
        rarity >= scarcity.rare ? 'short' : 'extended'
      } periods of time.`
  },
  teleportation: {
    tag: 'teleportation',
    type: 'combat',
    weight: ({ species: { rarity } }) => (rarity > scarcity.uncommon ? 1 : 0),
    apply: ({ species: { role } }) =>
      `${entity_placeholder} is able to teleport short distances to ${
        role === 'prey' ? 'escape predators' : 'catch prey'
      }.`
  },
  illusions: {
    tag: 'illusions',
    type: 'combat',
    weight: ({ species: { rarity } }) => (rarity > scarcity.uncommon ? 1 : 0),
    apply: ({ species: { role, rarity } }) =>
      `${entity_placeholder} is able to create ${
        rarity >= scarcity.rare ? 'minor' : 'major'
      } illusions to confuse ${role === 'prey' ? 'predators' : 'prey'}.`
  }
}
