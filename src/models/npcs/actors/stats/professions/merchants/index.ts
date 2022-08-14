import { location__context } from '../../../../../regions/locations/context'
import { LocationContext } from '../../../../../regions/locations/context/types'
import { weighted_distribution } from '../../../../../utilities/math'
import { age_ranges } from '../../age/life_phases'
import { actor_skills, all_skills } from '../../skills/categories'
import { Profession, profession__skill_kits, profession__specialization } from '../types'
import { merchant_professions } from './types'

const merchant_title = (spec: string) => `Merchant (${spec})`

const merchant_attributes = [9, 9, 9, 11, 10, 12]

const merchant_skills = [...all_skills]

const merchant_skill_kit = (
  secondary: profession__skill_kits['secondary']
): profession__skill_kits => ({
  primary: ['accounting'],
  secondary: [...secondary],
  tertiary: merchant_skills
})

const merchant_occurrence = (
  context: LocationContext
): weighted_distribution<profession__specialization> => [
  { w: context.alchemy ? 0.5 : context.urban ? 0.1 : 0, v: 'alchemical' },
  { w: context.arcane ? 0.5 : context.urban ? 0.1 : 0, v: 'arcane' },
  { w: context.smiths ? 0.5 : context.urban ? 0.1 : 0, v: 'armor' },
  { w: context.text ? 0.5 : context.urban ? 0.1 : 0, v: 'books' },
  { w: context.textiles ? 1 : context.urban ? 0.2 : 0, v: 'clothing' },
  { w: context.cosmetics ? 0.5 : context.urban ? 0.1 : 0, v: 'cosmetics' },
  { w: context.urban ? 0.5 : 0.1, v: 'general' },
  {
    w: context.art || context.woodwork ? 0.5 : context.urban ? 0.1 : 0,
    v: 'instruments'
  },
  { w: context.leather ? 0.5 : context.urban ? 0.1 : 0, v: 'leather' },
  {
    w: context.grain || context.herders || context.vegetables ? 5 : context.urban ? 1 : 0,
    v: 'produce'
  },
  {
    w: context.incense ? 0.5 : context.urban ? 0.1 : 0,
    v: 'religious'
  },
  { w: context.ships ? 0.5 : context.urban ? 0.1 : 0, v: 'ships' },
  { w: context.smiths ? 0.5 : context.urban ? 0.1 : 0, v: 'weapons' }
]

const merchant_template = (params: {
  key: Profession['key']
  lifestyle: Profession['lifestyle']
  occurrence: Profession['occurrence']
  title: Profession['title']
}): Profession => {
  const { key, lifestyle, occurrence, title } = params
  return {
    key,
    title,
    category: 'merchants',
    lifestyle,
    occurrence,
    attributes: merchant_attributes,
    skills: ({ actor: { occupation: profession } }) => {
      const skills: actor_skills[] = []
      const { spec } = profession
      if (spec === 'alchemical') skills.push('alchemy')
      else if (spec === 'arcane') skills.push('arcana')
      else if (spec === 'armor') skills.push('blacksmithing')
      else if (spec === 'books') skills.push('bookbinding')
      else if (spec === 'clothing') skills.push('tailoring')
      else if (spec === 'cosmetics') skills.push('alchemy')
      else if (spec === 'instruments') skills.push('instrumental')
      else if (spec === 'leather') skills.push('leatherworking')
      else if (spec === 'produce') skills.push('cultivation')
      else if (spec === 'religious') skills.push('theology')
      else if (spec === 'ships') skills.push('seafaring')
      else if (spec === 'weapons') skills.push('blacksmithing')
      return merchant_skill_kit(skills)
    },
    specialization: ({ actor }) => {
      const loc = window.world.locations[actor.location.residence]
      const context = location__context(loc)
      return window.dice.weighted_choice(merchant_occurrence(context))
    }
  }
}

export const merchants: Record<merchant_professions, Profession> = {
  'merchant (prince)': {
    key: 'merchant (prince)',
    lifestyle: 'prosperous',
    category: 'merchants',
    occurrence: ({ context }) => (context.city ? 1 : 0),
    prevalence: 'uncommon',
    attributes: merchant_attributes,
    skills: {
      primary: ['logistics'],
      secondary: ['accounting'],
      tertiary: merchant_skills
    }
  },
  merchant: merchant_template({
    key: 'merchant',
    title: ({ spec }) => `Merchant (${spec})`,
    lifestyle: 'comfortable',
    occurrence: ({ context }) => merchant_occurrence(context).reduce((sum, { w }) => sum + w, 0)
  }),
  'caravan (trader)': {
    key: 'caravan (trader)',
    lifestyle: 'comfortable',
    category: 'merchants',
    title: merchant_title('Exotic Goods'),
    prevalence: 'uncommon',
    attributes: merchant_attributes,
    skills: merchant_skill_kit([])
  },
  'caravan (master)': {
    key: 'caravan (master)',
    lifestyle: 'comfortable',
    category: 'merchants',
    ages: age_ranges.expert,
    prevalence: 'rare',
    skills: {
      primary: ['logistics'],
      ...merchant_skill_kit([])
    }
  },
  innkeeper: {
    key: 'innkeeper',
    lifestyle: 'comfortable',
    category: 'merchants',
    occurrence: 1,
    attributes: merchant_attributes,
    skills: merchant_skill_kit(['cooking', 'logistics'])
  },
  'tavern keeper': {
    key: 'tavern keeper',
    lifestyle: 'modest',
    category: 'merchants',
    occurrence: 1,
    prevalence: 'uncommon',
    attributes: merchant_attributes,
    skills: merchant_skill_kit(['cooking', 'logistics'])
  },
  banker: {
    key: 'banker',
    lifestyle: 'prosperous',
    category: 'merchants',
    ages: age_ranges.expert,
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.city && context.tribal ? 1 : 0),
    attributes: merchant_attributes,
    skills: merchant_skill_kit([])
  }
}
