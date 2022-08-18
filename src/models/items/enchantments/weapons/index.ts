import { resistances } from '../../../npcs/stats/types'
import {
  BasicEnchantmentDescription,
  Enchantment,
  enchantment__basicDetails,
  enchantment__itemTag,
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

const randomSpeciesType = () =>
  window.dice.choice<BaneEnchantmentInstance['speciesType']>([
    'beasts',
    'vessels',
    'spirits',
    'primordials'
  ])

export const enchantments__weapons: Record<weapon__enchant, Enchantment> = {
  bane: {
    tag: 'bane',
    ...enchantment__basicDetails,
    key: (instance: BaneEnchantmentInstance) => `${instance.tag}:${instance.speciesType}`,
    description: function (params: EnchantmentDescriptionParams<BaneEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__itemTag(item)} deals additional damage against ${
        instance.speciesType
      } enemies.`
    },
    spawn: function (instance: BaneEnchantmentInstance) {
      instance.speciesType = instance.speciesType ?? randomSpeciesType()
      return instance
    }
  },
  bound: {
    tag: 'bound',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} is bound to the wearer. A bound weapon can be summoned and dismissed at will.`
  },
  celestial: {
    tag: 'celestial',
    ...enchantment__basicDetails,
    key: (instance: CelestialEnchantmentInstance) => `${instance.tag}:${instance.time}`,
    description: function (params: EnchantmentDescriptionParams<CelestialEnchantmentInstance>) {
      const { instance, item } = params
      const during = instance.time === 'dawn' ? 'during the day' : 'at night'
      return `${enchantment__itemTag(item)} deals additional damage ${during} starting at ${
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
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} restores a small amount of health to the wielder upon slaying an enemy.`
  },
  elemental: {
    tag: 'elemental',
    ...enchantment__basicDetails,
    key: (instance: ElementalEnchantmentInstance) => `${instance.tag}:${instance.element}`,
    description: function (params: EnchantmentDescriptionParams<ElementalEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__itemTag(item)} deals additional ${instance.element} damage on hit.`
    },
    spawn: function (instance: ElementalEnchantmentInstance) {
      instance.element = instance.element ?? window.dice.choice(elements)
      return instance
    }
  },
  fear: {
    tag: 'fear',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} applies a curse that reduces an enemy's resolve on hit (stacks up to 3 times).`
  },
  harvest: {
    tag: 'harvest',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `enemies slain by ${enchantment__itemTag(
        item
      )} increase the wielder's damage for a short time.`
  },
  havoc: {
    tag: 'havoc',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} increases the wielder's damage against enemies that are severely wounded.`
  },
  insanity: {
    tag: 'insanity',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} applies a curse that slowly reduces an enemy's sanity on hit, causing them to mistake friends for foes.`
  },
  faith: {
    tag: 'faith',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} has a small chance to restore a small amount of the wielder's health.`
  },
  nobility: {
    tag: 'nobility',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(item)} deals additional damage while the wielder is not wounded.`
  },
  reaper: {
    tag: 'reaper',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `enemies slain by ${enchantment__itemTag(
        item
      )} are reanimated under the control of the wearer for a short time.`
  },
  ruin: {
    tag: 'ruin',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} applies a curse that weakens enemies on hit (stacks up to 3 times).`
  },
  sentient: {
    tag: 'sentient',
    ...enchantment__basicDetails,
    key: (instance: SentientEnchantmentInstance) => `${instance.tag}:${instance.spirit}`,
    description: function (params: EnchantmentDescriptionParams<SentientEnchantmentInstance>) {
      const { instance, item } = params
      return `A ${instance.spirit} spirit has been bound to this ${enchantment__itemTag(
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
    ...enchantment__basicDetails,
    key: (instance: SentinelEnchantmentInstance) => `${instance.tag}:${instance.speciesType}`,
    description: function (params: EnchantmentDescriptionParams<SentinelEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__itemTag(item)} glows faintly in the presence of ${
        instance.speciesType
      }.`
    },
    spawn: function (instance: SentinelEnchantmentInstance) {
      instance.speciesType = instance.speciesType ?? randomSpeciesType()
      return instance
    }
  },
  torpor: {
    tag: 'torpor',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} applies a curse that makes enemies slower on hit (stacks up to 3 times).`
  },
  vampiric: {
    tag: 'vampiric',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} steals life essence from enemies on hit to restore the wielder's health.`
  },
  vengeance: {
    tag: 'vengeance',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(item)} deals additional damage when the wielder is severely wounded.`
  },
  windsong: {
    tag: 'windsong',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(item)} weighs 50% less and attacks faster than normal.`
  },
  withering: {
    tag: 'withering',
    ...enchantment__basicDetails,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__itemTag(
        item
      )} applies a curse that reduces healing received by enemies on hit (stacks up to 3 times).`
  }
}
