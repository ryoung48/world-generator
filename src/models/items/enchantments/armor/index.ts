import { attributes } from '../../../npcs/actors/stats/attributes/types'
import { personas } from '../../../npcs/actors/stats/persona'
import { all_skills } from '../../../npcs/actors/stats/skills/categories'
import { resistances } from '../../../npcs/stats/types'
import { decorate_text } from '../../../utilities/text/decoration'
import {
  BasicEnchantmentDescription,
  Enchantment,
  enchantment__basic_details,
  enchantment__item_tag,
  EnchantmentDescriptionParams
} from '../types'
import {
  armor__enchant,
  EmpoweredEnchantmentInstance,
  InspirationEnchantmentInstance,
  MemoriesEnchantmentInstance,
  PersonaEnchantmentInstance,
  WardingEnchantmentInstance
} from './types'

const elements = [...resistances]

export const enchantment__armor: Record<armor__enchant, Enchantment> = {
  aquatic: {
    tag: 'aquatic',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} allows the wearer to breathe underwater and increases swim speed.`
  },
  inspiration: {
    tag: 'inspiration',
    ...enchantment__basic_details,
    key: (instance: InspirationEnchantmentInstance) => `${instance.tag}:${instance.attribute}`,
    description: function (params: EnchantmentDescriptionParams<InspirationEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__item_tag(item)} increases the wearer's ${instance.attribute}.`
    },
    spawn: function (instance: InspirationEnchantmentInstance) {
      instance.attribute = instance.attribute ?? window.dice.choice([...attributes])
      return instance
    }
  },
  bastion: {
    tag: 'bastion',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} increases maximum health at the cost of decreased damage dealt.`
  },
  blindsight: {
    tag: 'blindsight',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} allows the wearer to detect hidden objects and foes.`
  },
  dread: {
    tag: 'dread',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} reduces damage dealt by all nearby enemies and allies.`
  },
  emissary: {
    tag: 'emissary',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) => {
      const culture = window.world.cultures[item.culture]
      const languages = [culture].concat(culture.neighbors.map(n => window.world.cultures[n]))
      return `${enchantment__item_tag(
        item
      )} allows the wearer to speak and understand the following languages: ${languages
        .map(lang =>
          decorate_text({
            label: lang.name.toLowerCase(),
            link: lang
          })
        )
        .join(', ')}.`
    }
  },
  empowered: {
    tag: 'empowered',
    ...enchantment__basic_details,
    key: (instance: EmpoweredEnchantmentInstance) => `${instance.tag}:${instance.element}`,
    description: function (params: EnchantmentDescriptionParams<EmpoweredEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__item_tag(item)} increases ${
        instance.element
      } damage dealt by the wearer.`
    },
    spawn: function (instance: EmpoweredEnchantmentInstance) {
      instance.element = instance.element ?? window.dice.choice(elements)
      return instance
    }
  },
  glamored: {
    tag: 'glamored',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} can create illusions, which makes the wearer harder to hit. The wearer can also use the illusions to alter it's aesthetic appearance in minor ways (color|material|condition).`
  },
  guardian: {
    tag: 'guardian',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} provides additional protection when the wearer is severely wounded.`
  },
  memories: {
    tag: 'memories',
    ...enchantment__basic_details,
    key: (instance: MemoriesEnchantmentInstance) => `${instance.tag}:${instance.skills.join(':')}`,
    description: function (params: EnchantmentDescriptionParams<MemoriesEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__item_tag(
        item
      )} has been imbued with the memories of it's former owner, increasing the ${instance.skills.join(
        ','
      )} of the wearer.`
    },
    spawn: function (instance: MemoriesEnchantmentInstance) {
      instance.skills = instance.skills ?? window.dice.sample([...all_skills], 3)
      return instance
    }
  },
  pact: {
    tag: 'pact',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} allows the wearer to deal increased damage, but all attacks cost a small amount of health.`
  },
  persona: {
    tag: 'persona',
    ...enchantment__basic_details,
    key: (instance: PersonaEnchantmentInstance) => `${instance.tag}:${instance.persona}`,
    description: function (params: EnchantmentDescriptionParams<PersonaEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__item_tag(item)} grants a boon, but forces the wearer to act more ${
        instance.persona
      }.`
    },
    spawn: function (instance: PersonaEnchantmentInstance) {
      instance.persona = instance.persona ?? window.dice.choice([...personas])
      return instance
    }
  },
  rebirth: {
    tag: 'rebirth',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} brings the wearer back to life upon death once per encounter.`
  },
  regeneration: {
    tag: 'regeneration',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} periodically restores a small amount of the wearer's health.`
  },
  shadow: {
    tag: 'shadow',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} subtly draws attention away from the wearer and muffles any sounds emitted, allowing them to move more stealthily.`
  },
  shroud: {
    tag: 'shroud',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} prevents the wearer from being tracked by divination magic.`
  },
  swift: {
    tag: 'swift',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} allows the wearer to move faster.`
  },
  thorns: {
    tag: 'thorns',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(item)} reflects a small amount of damage taken back at attackers.`
  },
  vessel: {
    tag: 'vessel',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} increases the wearer's damage dealt at the cost of reduced defenses.`
  },
  warding: {
    tag: 'warding',
    ...enchantment__basic_details,
    key: (instance: WardingEnchantmentInstance) => `${instance.tag}:${instance.element}`,
    description: function (params: EnchantmentDescriptionParams<WardingEnchantmentInstance>) {
      const { instance, item } = params
      return `${enchantment__item_tag(item)} increases the wearer's ${
        instance.element
      } resistance by a small amount.`
    },
    spawn: function (instance: EmpoweredEnchantmentInstance) {
      instance.element = instance.element ?? window.dice.choice(elements)
      return instance
    }
  },
  'wild magic': {
    tag: 'wild magic',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} is infused with chaotic energy. The wearer has a small chance to produce random magical effects when attacked or attacking.`
  },
  wraith: {
    tag: 'wraith',
    ...enchantment__basic_details,
    description: ({ item }: BasicEnchantmentDescription) =>
      `${enchantment__item_tag(
        item
      )} makes the wearer partially incorporeal, making them harder to hit.`
  }
}
