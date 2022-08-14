import { coarse__quality, scarcity } from '../../../../../utilities/quality'
import { decorate_text } from '../../../../../utilities/text/decoration'
import { entity_placeholder } from '../../../../../utilities/text/placeholders'
import { attributes } from '../../../../actors/stats/attributes/types'
import { resistances } from '../../../../stats/types'
import { species__conflicting_traits } from '../../..'
import { decorated_culture } from '../../../humanoids/cultures'
import { religion__decorated } from '../../../humanoids/religions'
import { species__size } from '../../../size'
import { Primordial } from '../../types'
import { PrimordialTrait } from '../types'
import { primordial__use_trait_tags } from './tags'

const resist = resistances.map(k => `${k} resistance`).concat('stoneskin')

const effect_permanence = (rare: number) =>
  rare === scarcity.exceptional ? 'permanent' : 'temporary'

const get_part = (params: { species: Primordial; bark?: boolean }) => {
  const { species, bark } = params
  const { appearance, reproduction } = species
  const parts: string[] = []
  if (appearance.roots) parts.push(window.dice.choice(['roots', 'tubers', 'bulbs']))
  if (reproduction.seeds && reproduction.seeds !== 'spores') parts.push(reproduction.seeds)
  if (appearance.sap) parts.push('sap')
  if (appearance.leaves) parts.push('leaves')
  if (appearance.flowers) parts.push('flowers')
  if (appearance.woody && bark) parts.push('bark')
  const part = parts.length > 0 ? window.dice.choice(parts) : entity_placeholder
  const text = parts.length > 0 ? `The ${part} of this species` : part
  const aux = part.slice(-1) === 's' ? 'are' : 'is'
  return { text: `${text} ${aux}`, aux }
}

const non_edible: Primordial['genus'][] = ['mold', 'moss', 'fern']

const conflicting_uses = species__conflicting_traits([
  'wood products',
  'firewood',
  'root bridges',
  'textiles',
  'explosives',
  'adhesives',
  'perfumes',
  'enchantments',
  'inks',
  'edible',
  'elixirs',
  'poisons',
  'drugs',
  'decorative',
  'ceremonial'
])

const faction_control: Primordial['traits'][number]['tag'][] = [
  'elixirs',
  'poisons',
  'textiles',
  'explosives',
  'drugs',
  'enchantments'
]

export const primordial__use_traits: Record<primordial__use_trait_tags, PrimordialTrait> = {
  'wood products': {
    tag: 'wood products',
    type: 'use',
    apply: ({ species }) => {
      return `${entity_placeholder} is used to build ${coarse__quality.material(
        species.rarity
      )} wood products.`
    },
    weight: ({ species }) => (species.genus === 'tree' && !conflicting_uses(species) ? 1 : 0)
  },
  firewood: {
    tag: 'firewood',
    type: 'use',
    apply: ({ species }) => {
      return `${entity_placeholder} is used to for ${coarse__quality.material(
        species.rarity
      )} ${decorate_text({
        label: 'firewood',
        tooltip: window.dice.choice(['warmth', 'duration', 'spark'])
      })}.`
    },
    weight: ({ species }) => (species.genus === 'tree' && !conflicting_uses(species) ? 1 : 0)
  },
  'root bridges': {
    tag: 'root bridges',
    type: 'use',
    apply: ({ region }) => {
      const culture = window.world.cultures[region.culture.native]
      return `The ${decorated_culture({
        culture
      })} tribes utilize tree shaping to create living root bridges with this species.`
    },
    weight: ({ species, region }) =>
      species.genus === 'tree' &&
      species.environment.terrain === 'Forest' &&
      !region.civilized &&
      !conflicting_uses(species)
        ? 1
        : 0
  },
  textiles: {
    tag: 'textiles',
    type: 'use',
    apply: ({ species }) => {
      return `${entity_placeholder} is used to make ${coarse__quality.material(
        species.rarity
      )} textiles.`
    },
    weight: ({ species }) => (species.family === 'plant' && !conflicting_uses(species) ? 1 : 0)
  },
  explosives: {
    tag: 'explosives',
    type: 'use',
    apply: ({ species }) => {
      return `${entity_placeholder} has volatile sap that is used to make ${coarse__quality.alchemical(
        species.rarity
      )} ${window.dice.choice(['explosives', 'incendiaries'])}.`
    },
    weight: ({ species }) => (species.appearance.sap && !conflicting_uses(species) ? 1 : 0)
  },
  adhesives: {
    tag: 'adhesives',
    type: 'use',
    apply: ({ species }) => {
      return `The sap of this species is used to make ${coarse__quality.alchemical(
        species.rarity
      )} adhesives.`
    },
    weight: ({ species }) => (species.appearance.sap && !conflicting_uses(species) ? 1 : 0)
  },
  perfumes: {
    tag: 'perfumes',
    type: 'use',
    apply: ({ species }) => {
      return `${entity_placeholder} is used to make ${coarse__quality.material(
        species.rarity
      )} perfumes.`
    },
    weight: ({ species }) => (!conflicting_uses(species) ? 0.5 : 0)
  },
  enchantments: {
    tag: 'enchantments',
    type: 'use',
    apply: ({ species }) => {
      return `${entity_placeholder} is used to make ${coarse__quality.material(
        species.rarity
      )} ${window.dice.choice(['enchantments', 'spell reagents'])}.`
    },
    weight: ({ species }) =>
      species.rarity > scarcity.abundant && !conflicting_uses(species) ? 1 : 0
  },
  inks: {
    tag: 'enchantments',
    type: 'use',
    apply: ({ species }) => {
      return `${entity_placeholder} is used to make ${coarse__quality.material(
        species.rarity
      )} inks.`
    },
    weight: ({ species }) => (!conflicting_uses(species) ? 0.5 : 0)
  },
  edible: {
    tag: 'edible',
    type: 'use',
    apply: ({ species, region }) => {
      const culture = window.world.cultures[region.culture.native]
      const { text, aux } = get_part({ species })
      return species.rarity === scarcity.abundant
        ? `${text} edible, but ${window.dice.choice([
            `${aux === 'is' ? 'does' : 'do'} not provide much sustenance`,
            `${aux} very distasteful`
          ])}.`
        : `${text} edible and often ${window.dice.weighted_choice([
            {
              v: () =>
                `${window.dice.weighted_choice([
                  { v: 'eaten raw', w: 5 },
                  { v: 'used as a garnish', w: 1 },
                  { v: 'used as seasoning', w: 1 },
                  { v: 'roasted', w: 1 },
                  { v: 'boiled', w: 1 },
                  { v: 'steamed', w: 1 },
                  { v: 'sautéed', w: 1 },
                  { v: 'poached', w: 1 },
                  { v: 'baked', w: 1 },
                  { v: 'grilled', w: 1 },
                  { v: 'deep-fried', w: 1 }
                ])} in ${coarse__quality.material(species.rarity)} ${decorated_culture({
                  culture
                })} dishes`,
              w: 5
            },
            {
              v: () =>
                `used to make ${coarse__quality.material(species.rarity)} ${decorated_culture({
                  culture
                })} ${window.dice.choice(['alcoholic beverages', 'tea'])}`,
              w: 1
            }
          ])()}.`
    },
    weight: ({ species }) =>
      !non_edible.includes(species.genus) &&
      !conflicting_uses(species) &&
      !species__conflicting_traits(['necrotic'])(species)
        ? 2
        : 0
  },
  elixirs: {
    tag: 'elixirs',
    type: 'use',
    apply: ({ species }) => {
      const potion = window.dice.choice(['potions', 'elixirs'])
      const permanence = effect_permanence(species.rarity)
      const { text, aux } = get_part({ species, bark: true })
      return `${text} ${window.dice.weighted_choice([
        {
          v: () =>
            `${aux} used to make ${decorate_text({
              label: `${window.dice.choice(resist)} ${potion}`,
              tooltip: coarse__quality.alchemical(species.rarity)
            })}`,
          w: 1
        },
        {
          v: () =>
            `${aux} used to make ${decorate_text({
              label: `${window.dice.choice([...attributes])} ${potion}`,
              tooltip: coarse__quality.alchemical(species.rarity)
            })}`,
          w: 1
        },
        {
          v: () =>
            `${aux} used to make ${potion} that permanently increases the user's ${window.dice.choice(
              [...attributes]
            )}`,
          w: species.rarity === scarcity.exceptional ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${decorate_text({
              label: `healing ${potion}`,
              tooltip: coarse__quality.alchemical(species.rarity)
            })}`,
          w: 1
        },
        {
          v: () =>
            `${aux} used to make a ${decorate_text({
              label: 'poison antidote',
              tooltip: coarse__quality.alchemical(species.rarity)
            })}`,
          w: 1
        },
        {
          v: () =>
            `${aux} used to make an ${window.dice.choice([
              'oil',
              'balm'
            ])} that ${window.dice.choice(['extends', 'prolongs'])} reanimations`,
          w: species.rarity === scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${potion} that cure ${decorate_text({
              label: window.dice.choice(['diseases', 'blights']),
              tooltip: species.rarity === scarcity.exceptional ? 'greater' : 'lesser'
            })}`,
          w: species.rarity >= scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${potion} that have the tendency to awaken latent arcane potential when consumed`,
          w: species.rarity === scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${potion} that cause the recipient to be unnaturally attracted to the first person they see after consumption`,
          w: species.rarity === scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make any poison non-lethal. Victims will instead lose consciousness at the edge of death`,
          w: species.rarity === scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `can be ${window.dice.choice([
              'mixed',
              'blended'
            ])} with other ingredients to ${decorate_text({
              label: 'mask their taste',
              tooltip: 'useful for hiding poisons'
            })}`,
          w: species.rarity < scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${potion} that allow the recipient to temporarily feign a state of death`,
          w: species.rarity === scarcity.rare ? 1 : 0
        },
        {
          v: () => `${aux} used to make ${potion} that compel the recipient to tell the truth`,
          w: species.rarity === scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${potion} that cause the recipient to experience ${decorate_text({
              label: 'memory loss',
              tooltip: permanence
            })}`,
          w: species.rarity >= scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${potion} that can induce ${decorate_text({
              label: 'personality changes',
              tooltip: `${window.dice.choice([
                'honesty',
                'deception',
                'altruism',
                'greed',
                'social',
                'enigmatic',
                'aggressive',
                'diplomatic',
                'passionate',
                'stoic',
                'traditional',
                'progressive'
              ])} (${permanence})`
            })}`,
          w: species.rarity >= scarcity.rare ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${potion} that can bestow visions of the ${window.dice.choice([
              'past',
              'future'
            ])}`,
          w: species.rarity === scarcity.exceptional ? 1 : 0
        },
        {
          v: () =>
            `${aux} used to make ${decorate_text({
              label: 'vitality',
              tooltip: `makes the user five years younger (${permanence})`
            })} ${potion}`,
          w: species.rarity >= scarcity.rare ? 1 : 0
        }
      ])()}.`
    },
    weight: ({ species }) =>
      conflicting_uses(species) ? 0 : species.rarity > scarcity.abundant ? 2 : 0.5
  },
  poisons: {
    tag: 'poisons',
    type: 'use',
    apply: ({ species }) => {
      const potency = coarse__quality.poisons(species.rarity)
      const permanence = effect_permanence(species.rarity)
      const { text } = get_part({ species, bark: true })
      return `${text} used to make ${window.dice.weighted_choice([
        {
          v: () =>
            decorate_text({
              label: 'latent poisons',
              tooltip: potency
            }),
          w: 1
        },
        {
          v: () =>
            decorate_text({
              label: 'corrosive poisons',
              tooltip: potency
            }),
          w: 1
        },
        {
          v: () =>
            decorate_text({
              label: 'paralytic poisons',
              tooltip: potency
            }),
          w: 1
        },
        {
          v: () =>
            decorate_text({
              label: 'petrification poisons',
              tooltip: permanence
            }),
          w: species.rarity >= scarcity.rare ? 0.2 : 0
        },
        {
          v: () =>
            decorate_text({
              label: `${window.dice.choice(['fear', 'insanity'])} poisons`,
              tooltip: potency
            }),
          w: 1
        },
        {
          v: () =>
            decorate_text({
              label: `atrophy poisons`,
              tooltip: `${window.dice.choice([...attributes])} (${potency})`
            }),
          w: 1
        },
        {
          v: () =>
            decorate_text({
              label: 'withering poisons',
              tooltip: `makes the user five years older (${permanence})`
            }),
          w: species.rarity >= scarcity.rare ? 0.2 : 0
        }
      ])()}.`
    },
    weight: ({ species }) =>
      conflicting_uses(species) ? 0 : species.rarity > scarcity.abundant ? 1 : 0.2
  },
  drugs: {
    tag: 'drugs',
    type: 'use',
    apply: ({ species }) => {
      const potency = coarse__quality.material(species.rarity)
      const { text } = get_part({ species, bark: true })
      return `${text} used to make ${window.dice.choice([
        decorate_text({
          label: 'hallucinogenic',
          tooltip: potency
        }),
        decorate_text({
          label: 'stimulant',
          tooltip: `${window.dice.choice(['mood', 'energy'])} (${potency})`
        }),
        decorate_text({
          label: 'dampener',
          tooltip: `${window.dice.choice(['pain', 'energy'])} (${potency})`
        })
      ])} drugs.`
    },
    weight: ({ species }) =>
      conflicting_uses(species) ? 0 : species.rarity > scarcity.abundant ? 1 : 0.2
  },
  'faction control': {
    tag: 'faction control',
    type: 'use',
    apply: () => {
      return `${window.dice.choice([
        'A prominent faction',
        'The local government'
      ])} strictly controls all harvesting and distribution of this species.`
    },
    weight: ({ species }) =>
      species.rarity > scarcity.uncommon &&
      species.traits.some(({ tag }) => faction_control.includes(tag)) &&
      !species__conflicting_traits(['extinct', 'ambient', 'necrotic'])(species)
        ? 1
        : 0
  },
  decorative: {
    tag: 'decorative',
    type: 'habitat',
    apply: ({ species, region }) => {
      const status = coarse__quality.material(species.rarity)
      const culture = window.world.cultures[region.culture.native]
      return `${entity_placeholder} ${window.dice.weighted_choice([
        {
          v: () =>
            `is often used as ${decorate_text({
              label: window.dice.choice(['decoration', 'ornamentation']),
              tooltip: status
            })} in ${decorated_culture({ culture })} ${window.dice.weighted_choice([
              { v: 'households', w: species.size > species__size.small ? 0 : 1 },
              { v: 'gardens', w: 1 }
            ])}`,
          w: 1
        },
        {
          v: () =>
            `is commonly worn as ${decorate_text({
              label: 'hair decoration',
              tooltip: status
            })} by ${decorated_culture({ culture })} women`,
          w: species.appearance.flowers && species.size === species__size.diminutive ? 1 : 0
        },
        {
          v: () =>
            `is commonly kept in ${decorated_culture({ culture })} homes as ${decorate_text({
              label: 'good luck charms',
              tooltip: status
            })}`,
          w: species.size > species__size.small ? 0 : 1
        },
        {
          v: () =>
            `there is a legend that this species wards away ${window.dice.choice([
              'evil spirits',
              'undead'
            ])}`,
          w: 1
        },
        {
          v: () =>
            `is often found growing on top of older ${decorated_culture({
              culture
            })} urban structures`,
          w: species.genus === 'vine' ? 1 : 0
        }
      ])()}.`
    },
    weight: ({ species }) =>
      conflicting_uses(species) ||
      species__conflicting_traits(['hazardous', 'necrotic', 'ambient', 'carnivorous', 'extinct'])
        ? 0
        : species.rarity > scarcity.abundant
        ? 1
        : 0.2
  },
  ceremonial: {
    tag: 'ceremonial',
    type: 'use',
    apply: ({ species, region }) => {
      const status = coarse__quality.material(species.rarity)
      const culture = window.world.cultures[region.culture.native]
      const religion = window.world.religions[culture.religion]
      return `${entity_placeholder} ${window.dice.weighted_choice([
        {
          v: () =>
            `is often used by the ${decorated_culture({ culture })} in ${decorate_text({
              label: `${window.dice.choice(['courtship', 'wedding'])} rituals`,
              tooltip: status
            })}`,
          w: species.family !== 'fungi' ? 1 : 0
        },
        {
          v: () =>
            `is used as ${decorate_text({
              label: window.dice.choice(['decoration', 'ornamentation']),
              tooltip: status
            })} during ${decorated_culture({ culture })} ${window.dice.choice([
              'summer',
              'autumn',
              'winter',
              'spring'
            ])} ${window.dice.choice(['celebrations', 'festivals', 'holidays'])}`,
          w: species.genus !== 'mold' ? 1 : 0
        },
        {
          v: () =>
            `used by the ${decorated_culture({ culture })} in ${decorate_text({
              label: 'rituals',
              tooltip: status
            })} ${window.dice.choice([
              'surrounding the burying and preservation of the dead',
              'designed to contact and speak with the dead'
            ])}`,
          w: species.rarity > scarcity.common ? 1 : 0
        },
        {
          v: () =>
            `is considered sacred to worshipers of ${religion__decorated(
              religion
            )} and is used to decorate many ${decorate_text({
              label: 'holy sites',
              tooltip: status
            })}`,
          w: species.genus !== 'mold' ? 1 : 0
        },
        {
          v: () =>
            `is used by worshipers of ${religion__decorated(religion)} to induce a ${decorate_text({
              label: `${window.dice.choice(['brief', 'prolonged'])} trance`,
              tooltip: status
            })} wherein strange visions may be experienced`,
          w: 1
        },
        {
          v: () =>
            `is considered unholy and was effectively wiped out by worshipers of ${religion__decorated(
              religion
            )}`,
          w: species.rarity === scarcity.exceptional ? 1 : 0
        }
      ])()}.`
    },
    weight: ({ species }) =>
      conflicting_uses(species) ||
      species__conflicting_traits(['hazardous', 'necrotic', 'ambient', 'carnivorous', 'extinct'])
        ? 0
        : species.rarity > scarcity.abundant
        ? 1
        : 0.2
  }
}
