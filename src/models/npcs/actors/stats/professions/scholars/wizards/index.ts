import { age_ranges } from '../../../age/life_phases'
import { scholar_skills } from '../../../skills/categories'
import { wizard_kits } from '../../soldiers/specs/wizards'
import { Profession } from '../../types'
import { scholar_attributes } from '../academics'
import { wizard_professions } from './types'

const wizard_occurrence: Profession['occurrence'] = ({ context }) =>
  context.tribal ? 0 : context.arcane ? 0.5 : context.urban ? 0.2 : 0

const diviner_occurrence: Profession['occurrence'] = ({ context }) =>
  context.arcane ? 0.5 : context.urban ? 0.2 : 0

export const wizards: Record<wizard_professions, Profession> = {
  'wizard (petty)': {
    key: 'wizard (petty)',
    lifestyle: 'modest',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.seasoned,
    prevalence: 'uncommon',
    occurrence: params => wizard_occurrence(params),
    ...wizard_kits.wizard
  },
  'wizard (minor)': {
    key: 'wizard (minor)',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.seasoned,
    prevalence: 'uncommon',
    occurrence: params => wizard_occurrence(params),
    ...wizard_kits.wizard
  },
  'wizard (major)': {
    key: 'wizard (minor)',
    lifestyle: 'prosperous',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.expert,
    prevalence: 'uncommon',
    occurrence: params => wizard_occurrence(params),
    progression: {
      'wizard (minor)': { weight: 1, years: 10, transition: true }
    },
    ...wizard_kits.wizard
  },
  'wizard (great)': {
    key: 'wizard (great)',
    lifestyle: 'rich',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.master,
    prevalence: 'rare',
    occurrence: params => wizard_occurrence(params),
    progression: {
      'wizard (major)': { weight: 1, years: 10, transition: true }
    },
    ...wizard_kits.wizard,
    skills: {
      ...wizard_kits.wizard.skills,
      secondary: ['logistics']
    }
  },
  'druid (petty)': {
    key: 'druid (petty)',
    lifestyle: 'modest',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.seasoned,
    prevalence: 'uncommon',
    occurrence: params => wizard_occurrence(params),
    ...wizard_kits.druid
  },
  'druid (minor)': {
    key: 'druid (minor)',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.seasoned,
    prevalence: 'uncommon',
    occurrence: params => wizard_occurrence(params),
    ...wizard_kits.druid
  },
  'druid (major)': {
    key: 'druid (major)',
    lifestyle: 'prosperous',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.expert,
    prevalence: 'uncommon',
    occurrence: params => wizard_occurrence(params),
    progression: {
      'druid (minor)': { weight: 1, years: 10, transition: true }
    },
    ...wizard_kits.druid
  },
  'druid (great)': {
    key: 'druid (great)',
    lifestyle: 'rich',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.veteran,
    prevalence: 'rare',
    occurrence: params => wizard_occurrence(params),
    progression: {
      'druid (major)': { weight: 1, years: 10, transition: true }
    },
    ...wizard_kits.druid,
    skills: {
      ...wizard_kits.druid.skills,
      secondary: ['logistics']
    }
  },
  oracle: {
    key: 'oracle',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.expert,
    prevalence: 'uncommon',
    occurrence: params => diviner_occurrence(params),
    attributes: scholar_attributes,
    skills: {
      primary: ['divination'],
      tertiary: scholar_skills
    }
  },
  'fortune teller': {
    key: 'fortune teller',
    lifestyle: 'modest',
    category: 'scholars',
    subcategory: 'wizards',
    ages: age_ranges.expert,
    prevalence: 'uncommon',
    occurrence: params => diviner_occurrence(params),
    attributes: scholar_attributes,
    skills: {
      primary: ['divination'],
      tertiary: scholar_skills
    }
  }
}
