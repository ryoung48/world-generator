import { age_ranges } from '../../../age/life_phases'
import { artistic_skills, social_skills, worldly_skills } from '../../../skills/categories'
import { gender_based_title } from '../../titles'
import { Profession } from '../../types'
import { religious_professions } from './types'

const religious_mod = 1

const religious_skills = [...worldly_skills, ...artistic_skills]

const priest_skills: Profession['skills'] = {
  primary: ['theology', 'oratory'],
  secondary: ['logistics', 'teaching'],
  tertiary: [...religious_skills, ...social_skills]
}

export const religious: Record<religious_professions, Profession> = {
  abbot: {
    ages: age_ranges.expert,
    category: 'scholars',
    key: 'abbot',
    lifestyle: 'comfortable',
    occurrence: ({ context }) =>
      (context.remote ? 0 : context.tribal ? 0.1 : context.text || context.incense ? 1 : 0.5) *
      religious_mod,
    prevalence: 'rare',
    progression: {
      monk: {
        transition: true,
        weight: 1,
        years: 15
      }
    },
    skills: priest_skills,
    subcategory: 'clergy',
    title: ({ actor }) =>
      gender_based_title({
        male: 'Abbot',
        female: 'Abbess',
        actor
      })
  },
  acolyte: {
    category: 'scholars',
    key: 'acolyte',
    lifestyle: 'poor',
    occurrence: ({ context }) =>
      (context.remote ? 0 : context.tribal ? 0.1 : context.incense ? 1 : 0.5) * religious_mod,
    prevalence: 'uncommon',
    skills: {
      primary: ['theology'],
      secondary: ['housekeeping'],
      tertiary: [...religious_skills]
    },
    subcategory: 'clergy'
  },
  inquisitor: {
    category: 'soldiers',
    key: 'inquisitor',
    lifestyle: 'comfortable',
    occurrence: ({ context }) =>
      (context.tribal || !context.urban ? 0 : context.incense ? 0.5 : 0.2) * religious_mod,
    prevalence: 'uncommon',
    skills: {
      primary: ['martial'],
      secondary: ['theology'],
      tertiary: [...religious_skills]
    },
    subcategory: 'inquisitors'
  },
  missionary: {
    category: 'scholars',
    key: 'missionary',
    lifestyle: 'modest',
    occurrence: 0.1 * religious_mod,
    prevalence: 'rare',
    skills: {
      primary: ['theology'],
      secondary: ['living language', 'teaching'],
      tertiary: [...religious_skills]
    },
    subcategory: 'clergy'
  },
  monk: {
    category: 'scholars',
    key: 'monk',
    lifestyle: 'modest',
    occurrence: ({ context }) =>
      (context.remote ? 0 : context.tribal ? 0.1 : context.text || context.incense ? 1 : 0.5) *
      religious_mod,
    prevalence: 'uncommon',
    progression: {
      acolyte: {
        transition: true,
        weight: 1,
        years: 5
      }
    },
    skills: {
      primary: ['theology'],
      secondary: ['martial'],
      tertiary: [...religious_skills]
    },
    subcategory: 'clergy',
    title: 'Monk'
  },
  'priest (petty)': {
    ages: age_ranges.seasoned,
    category: 'scholars',
    key: 'priest (petty)',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? (context.incense ? 1 : 0.5) * religious_mod : 0),
    prevalence: 'uncommon',
    progression: {
      acolyte: {
        transition: true,
        weight: 1,
        years: 5
      }
    },
    skills: priest_skills,
    subcategory: 'clergy'
  },
  'priest (minor)': {
    ages: age_ranges.seasoned,
    category: 'scholars',
    key: 'priest (minor)',
    lifestyle: 'comfortable',
    occurrence: ({ context }) => (context.urban ? (context.incense ? 1 : 0.5) * religious_mod : 0),
    prevalence: 'uncommon',
    skills: priest_skills,
    subcategory: 'clergy'
  },
  'priest (major)': {
    ages: age_ranges.expert,
    category: 'scholars',
    key: 'priest (major)',
    lifestyle: 'prosperous',
    occurrence: ({ context }) => (context.urban ? (context.incense ? 1 : 0.5) * religious_mod : 0),
    prevalence: 'uncommon',
    progression: {
      'priest (minor)': {
        transition: true,
        weight: 1,
        years: 10
      }
    },
    skills: priest_skills,
    subcategory: 'clergy'
  },
  'priest (great)': {
    ages: age_ranges.master,
    category: 'scholars',
    key: 'priest (great)',
    lifestyle: 'rich',
    occurrence: ({ context }) => (context.city ? (context.incense ? 1 : 0.5) * religious_mod : 0),
    prevalence: 'rare',
    progression: {
      'priest (major)': {
        transition: true,
        weight: 1,
        years: 10
      }
    },
    skills: priest_skills,
    subcategory: 'clergy'
  },
  templar: {
    category: 'soldiers',
    key: 'templar',
    lifestyle: 'comfortable',
    occurrence: ({ context }) =>
      (context.tribal || !context.urban ? 0 : context.incense ? 0.5 : 0.2) * religious_mod,
    prevalence: 'uncommon',
    skills: {
      primary: ['martial'],
      secondary: ['theology'],
      tertiary: [...religious_skills]
    },
    subcategory: 'templars'
  }
}
