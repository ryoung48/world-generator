import { ageRanges } from '../../../age/life_phases'
import { scholarSkills } from '../../../skills/categories'
import { wizardKits } from '../../soldiers/specs/wizards'
import { Profession } from '../../types'
import { scholarAttributes } from '../academics'
import { WizardProfessions } from './types'

const wizardOccurrence: Profession['occurrence'] = ({ context }) =>
  context.tribal ? 0 : context.arcane ? 0.5 : context.urban ? 0.2 : 0

const divinerOccurrence: Profession['occurrence'] = ({ context }) =>
  context.arcane ? 0.5 : context.urban ? 0.2 : 0

export const wizards: Record<WizardProfessions, Profession> = {
  'wizard (petty)': {
    key: 'wizard (petty)',
    lifestyle: 'modest',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.seasoned,
    prevalence: 'uncommon',
    occurrence: params => wizardOccurrence(params),
    ...wizardKits.wizard
  },
  'wizard (minor)': {
    key: 'wizard (minor)',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.seasoned,
    prevalence: 'uncommon',
    occurrence: params => wizardOccurrence(params),
    ...wizardKits.wizard
  },
  'wizard (major)': {
    key: 'wizard (minor)',
    lifestyle: 'prosperous',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.expert,
    prevalence: 'uncommon',
    occurrence: params => wizardOccurrence(params),
    progression: {
      'wizard (minor)': { weight: 1, years: 10, transition: true }
    },
    ...wizardKits.wizard
  },
  'wizard (great)': {
    key: 'wizard (great)',
    lifestyle: 'rich',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.master,
    prevalence: 'rare',
    occurrence: params => wizardOccurrence(params),
    progression: {
      'wizard (major)': { weight: 1, years: 10, transition: true }
    },
    ...wizardKits.wizard,
    skills: {
      ...wizardKits.wizard.skills,
      secondary: ['logistics']
    }
  },
  'druid (petty)': {
    key: 'druid (petty)',
    lifestyle: 'modest',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.seasoned,
    prevalence: 'uncommon',
    occurrence: params => wizardOccurrence(params),
    ...wizardKits.druid
  },
  'druid (minor)': {
    key: 'druid (minor)',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.seasoned,
    prevalence: 'uncommon',
    occurrence: params => wizardOccurrence(params),
    ...wizardKits.druid
  },
  'druid (major)': {
    key: 'druid (major)',
    lifestyle: 'prosperous',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.expert,
    prevalence: 'uncommon',
    occurrence: params => wizardOccurrence(params),
    progression: {
      'druid (minor)': { weight: 1, years: 10, transition: true }
    },
    ...wizardKits.druid
  },
  'druid (great)': {
    key: 'druid (great)',
    lifestyle: 'rich',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.veteran,
    prevalence: 'rare',
    occurrence: params => wizardOccurrence(params),
    progression: {
      'druid (major)': { weight: 1, years: 10, transition: true }
    },
    ...wizardKits.druid,
    skills: {
      ...wizardKits.druid.skills,
      secondary: ['logistics']
    }
  },
  oracle: {
    key: 'oracle',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.expert,
    prevalence: 'uncommon',
    occurrence: params => divinerOccurrence(params),
    attributes: scholarAttributes,
    skills: {
      primary: ['divination'],
      tertiary: scholarSkills
    }
  },
  'fortune teller': {
    key: 'fortune teller',
    lifestyle: 'modest',
    category: 'scholars',
    subcategory: 'wizards',
    ages: ageRanges.expert,
    prevalence: 'uncommon',
    occurrence: params => divinerOccurrence(params),
    attributes: scholarAttributes,
    skills: {
      primary: ['divination'],
      tertiary: scholarSkills
    }
  }
}
