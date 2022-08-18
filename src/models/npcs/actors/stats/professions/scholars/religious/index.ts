import { ageRanges } from '../../../age/life_phases'
import { artisticSkills, socialSkills, worldlySkills } from '../../../skills/categories'
import { genderBasedTitle } from '../../titles'
import { Profession } from '../../types'
import { ReligiousProfessions } from './types'

const religiousMod = 1

const religiousSkills = [...worldlySkills, ...artisticSkills]

const priestSkills: Profession['skills'] = {
  primary: ['theology', 'oratory'],
  secondary: ['logistics', 'teaching'],
  tertiary: [...religiousSkills, ...socialSkills]
}

export const religious: Record<ReligiousProfessions, Profession> = {
  abbot: {
    ages: ageRanges.expert,
    category: 'scholars',
    key: 'abbot',
    lifestyle: 'comfortable',
    occurrence: ({ context }) =>
      (context.remote ? 0 : context.tribal ? 0.1 : context.text || context.incense ? 1 : 0.5) *
      religiousMod,
    prevalence: 'rare',
    progression: {
      monk: {
        transition: true,
        weight: 1,
        years: 15
      }
    },
    skills: priestSkills,
    subcategory: 'clergy',
    title: ({ actor }) =>
      genderBasedTitle({
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
      (context.remote ? 0 : context.tribal ? 0.1 : context.incense ? 1 : 0.5) * religiousMod,
    prevalence: 'uncommon',
    skills: {
      primary: ['theology'],
      secondary: ['housekeeping'],
      tertiary: [...religiousSkills]
    },
    subcategory: 'clergy'
  },
  inquisitor: {
    category: 'soldiers',
    key: 'inquisitor',
    lifestyle: 'comfortable',
    occurrence: ({ context }) =>
      (context.tribal || !context.urban ? 0 : context.incense ? 0.5 : 0.2) * religiousMod,
    prevalence: 'uncommon',
    skills: {
      primary: ['martial'],
      secondary: ['theology'],
      tertiary: [...religiousSkills]
    },
    subcategory: 'inquisitors'
  },
  missionary: {
    category: 'scholars',
    key: 'missionary',
    lifestyle: 'modest',
    occurrence: 0.1 * religiousMod,
    prevalence: 'rare',
    skills: {
      primary: ['theology'],
      secondary: ['living language', 'teaching'],
      tertiary: [...religiousSkills]
    },
    subcategory: 'clergy'
  },
  monk: {
    category: 'scholars',
    key: 'monk',
    lifestyle: 'modest',
    occurrence: ({ context }) =>
      (context.remote ? 0 : context.tribal ? 0.1 : context.text || context.incense ? 1 : 0.5) *
      religiousMod,
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
      tertiary: [...religiousSkills]
    },
    subcategory: 'clergy',
    title: 'Monk'
  },
  'priest (petty)': {
    ages: ageRanges.seasoned,
    category: 'scholars',
    key: 'priest (petty)',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? (context.incense ? 1 : 0.5) * religiousMod : 0),
    prevalence: 'uncommon',
    progression: {
      acolyte: {
        transition: true,
        weight: 1,
        years: 5
      }
    },
    skills: priestSkills,
    subcategory: 'clergy'
  },
  'priest (minor)': {
    ages: ageRanges.seasoned,
    category: 'scholars',
    key: 'priest (minor)',
    lifestyle: 'comfortable',
    occurrence: ({ context }) => (context.urban ? (context.incense ? 1 : 0.5) * religiousMod : 0),
    prevalence: 'uncommon',
    skills: priestSkills,
    subcategory: 'clergy'
  },
  'priest (major)': {
    ages: ageRanges.expert,
    category: 'scholars',
    key: 'priest (major)',
    lifestyle: 'prosperous',
    occurrence: ({ context }) => (context.urban ? (context.incense ? 1 : 0.5) * religiousMod : 0),
    prevalence: 'uncommon',
    progression: {
      'priest (minor)': {
        transition: true,
        weight: 1,
        years: 10
      }
    },
    skills: priestSkills,
    subcategory: 'clergy'
  },
  'priest (great)': {
    ages: ageRanges.master,
    category: 'scholars',
    key: 'priest (great)',
    lifestyle: 'rich',
    occurrence: ({ context }) => (context.city ? (context.incense ? 1 : 0.5) * religiousMod : 0),
    prevalence: 'rare',
    progression: {
      'priest (major)': {
        transition: true,
        weight: 1,
        years: 10
      }
    },
    skills: priestSkills,
    subcategory: 'clergy'
  },
  templar: {
    category: 'soldiers',
    key: 'templar',
    lifestyle: 'comfortable',
    occurrence: ({ context }) =>
      (context.tribal || !context.urban ? 0 : context.incense ? 0.5 : 0.2) * religiousMod,
    prevalence: 'uncommon',
    skills: {
      primary: ['martial'],
      secondary: ['theology'],
      tertiary: [...religiousSkills]
    },
    subcategory: 'templars'
  }
}
