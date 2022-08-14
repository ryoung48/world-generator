import { resistances } from '../../../npcs/stats/types'
import {
  BasicEnchantmentDescription,
  Enchantment,
  enchantment__basic_details,
  enchantment__item_tag,
  EnchantmentDescriptionParams
} from '../types'
import {
  BaneEnchantmentInstance,
  CelestialEnchantmentInstance,
  ElementalEnchantmentInstance,
  SentientEnchantmentInstance,
  SentinelEnchantmentInstance,
  weapon__enchant
} from './types'

const elements = [...resistances]

const random_species_type = () =>
  window.dice.choice<BaneEnchantmentInstance['species_type']>([
    'beasts',
    'vessels',
    'spirits',
    'primordials'
  ])

export const enchantments__weapons: Record<weapon__enchant, Enchantment> = {
  bane: {
    tag: 'bane',
    ...enchantment__basic_details,
    key: (instance: BaneEnchantmentInstance) => `${instance.tag}:${instance.species_type}`,
    description: function (params: EnchantmentDescriptionParams<BaneEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__item_tag(item)} deals additional damage against ${
        instance.species_type
      } enemies.`
    },
    spawn: function (instance: BaneEnchantmentInstance) {
      instance.species_type = instance.species_type ?? random_species_type()
      return instance
    }
  },
  bound: {
    tag: 'bound',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} is bound to the wearer. A bound weapon can be summoned and dismissed at will.`
  },
  celestial: {
    tag: 'celestial',
    ...enchantment__basic_details,
    key: (instance: CelestialEnchantmentInstance) => `${instance.tag}:${instance.time}`,
    description: function (params: EnchantmentDescriptionParams<CelestialEnchantmentInstance>) {
      const { instance, item } = params
      const during = instance.time === 'dawn' ? 'during the day' : 'at night'
      return `${enchantment__item_tag(item)} deals additional damage ${during} starting at ${
        instance.time
      }.`
    },
    spawn: function (instance: CelestialEnchantmentInstance) {
      instance.time = instance.time ?? window.dice.choice(['dusk', 'dawn'])
      return instance
    }
  },
  devour: {
    tag: 'devour',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} restores a small amount of health to the wielder upon slaying an enemy.`
  },
  elemental: {
    tag: 'elemental',
    ...enchantment__basic_details,
    key: (instance: ElementalEnchantmentInstance) => `${instance.tag}:${instance.element}`,
    description: function (params: EnchantmentDescriptionParams<ElementalEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__item_tag(item)} deals additional ${instance.element} damage on hit.`
    },
    spawn: function (instance: ElementalEnchantmentInstance) {
      instance.element = instance.element ?? window.dice.choice(elements)
      return instance
    }
  },
  fear: {
    tag: 'fear',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} applies a curse that reduces an enemy's resolve on hit (stacks up to 3 times).`
  },
  harvest: {
    tag: 'harvest',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `enemies slain by ${enchantment__item_tag(
        item
      )} increase the wielder's damage for a short time.`
  },
  havoc: {
    tag: 'havoc',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} increases the wielder's damage against enemies that are severely wounded.`
  },
  insanity: {
    tag: 'insanity',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} applies a curse that slowly reduces an enemy's sanity on hit, causing them to mistake friends for foes.`
  },
  faith: {
    tag: 'faith',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} has a small chance to restore a small amount of the wielder's health.`
  },
  nobility: {
    tag: 'nobility',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} deals additional damage while the wielder is not wounded.`
  },
  reaper: {
    tag: 'reaper',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `enemies slain by ${enchantment__item_tag(
        item
      )} are reanimated under the control of the wearer for a short time.`
  },
  ruin: {
    tag: 'ruin',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} applies a curse that weakens enemies on hit (stacks up to 3 times).`
  },
  sentient: {
    tag: 'sentient',
    ...enchantment__basic_details,
    key: (instance: SentientEnchantmentInstance) => `${instance.tag}:${instance.spirit}`,
    description: function (params: EnchantmentDescriptionParams<SentientEnchantmentInstance>) {
      const { instance, item } = params
      return `A ${instance.spirit} spirit has been bound to this ${enchantment__item_tag(
        item
      )}, making it self-aware and giving it a distinct personality. The wielder will receive boons as long as they and the spirit remain on good terms.`
    },
    spawn: function (instance: SentientEnchantmentInstance) {
      instance.spirit =
        instance.spirit ?? window.dice.choice(['elemental', 'fiend', 'celestial', 'shadow'])
      return instance
    }
  },
  sentinel: {
    tag: 'sentinel',
    ...enchantment__basic_details,
    key: (instance: SentinelEnchantmentInstance) => `${instance.tag}:${instance.species_type}`,
    description: function (params: EnchantmentDescriptionParams<SentinelEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__item_tag(item)} glows faintly in the presence of ${
        instance.species_type
      }.`
    },
    spawn: function (instance: SentinelEnchantmentInstance) {
      instance.species_type = instance.species_type ?? random_species_type()
      return instance
    }
  },
  torpor: {
    tag: 'torpor',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} applies a curse that makes enemies slower on hit (stacks up to 3 times).`
  },
  vampiric: {
    tag: 'vampiric',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} steals life essence from enemies on hit to restore the wielder's health.`
  },
  vengeance: {
    tag: 'vengeance',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} deals additional damage when the wielder is severely wounded.`
  },
  windsong: {
    tag: 'windsong',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} weighs 50% less and attacks faster than normal.`
  },
  withering: {
    tag: 'withering',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} applies a curse that reduces healing received by enemies on hit (stacks up to 3 times).`
  }
}
