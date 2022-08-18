import { academicSkills, scholarSkills } from '../../../skills/categories'
import { Profession } from '../../types'
import { ScholarProfessions } from './types'

const academicOccurrence: Profession['occurrence'] = ({ context }) =>
  context.text ? 0.5 : context.city ? 0.2 : 0

export const scholarAttributes = [9, 9, 9, 12, 10, 11]

export const scholars: Record<ScholarProfessions, Profession> = {
  historian: {
    key: 'historian',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academicOccurrence(params),
    attributes: scholarAttributes,
    skills: {
      primary: ['history'],
      secondary: ['teaching'],
      tertiary: scholarSkills
    }
  },
  botanist: {
    key: 'botanist',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academicOccurrence(params),
    attributes: scholarAttributes,
    skills: {
      primary: ['nature'],
      secondary: ['teaching'],
      tertiary: scholarSkills
    }
  },
  astronomer: {
    key: 'astronomer',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academicOccurrence(params),
    attributes: scholarAttributes,
    skills: {
      primary: ['astronomy'],
      secondary: ['teaching'],
      tertiary: scholarSkills
    }
  },
  philosopher: {
    key: 'philosopher',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academicOccurrence(params),
    attributes: scholarAttributes,
    skills: {
      primary: ['philosophy'],
      secondary: ['teaching'],
      tertiary: scholarSkills
    }
  },
  linguist: {
    key: 'linguist',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academicOccurrence(params),
    attributes: scholarAttributes,
    skills: {
      primary: ['linguistics', 'history'],
      secondary: ['teaching'],
      tertiary: scholarSkills
    }
  },
  archivist: {
    key: 'archivist',
    lifestyle: 'modest',
    category: 'scholars',
    subcategory: 'academic',
    occurrence: ({ context }) => (context.text ? 1 : context.city ? 0.5 : 0),
    attributes: scholarAttributes,
    skills: {
      primary: [...academicSkills],
      secondary: ['teaching'],
      tertiary: scholarSkills
    }
  }
}
