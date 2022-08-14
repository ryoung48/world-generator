import { academic_skills, scholar_skills } from '../../../skills/categories'
import { Profession } from '../../types'
import { scholar_professions } from './types'

const academic_occurrence: Profession['occurrence'] = ({ context }) =>
  context.text ? 0.5 : context.city ? 0.2 : 0

export const scholar_attributes = [9, 9, 9, 12, 10, 11]

export const scholars: Record<scholar_professions, Profession> = {
  historian: {
    key: 'historian',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academic_occurrence(params),
    attributes: scholar_attributes,
    skills: {
      primary: ['history'],
      secondary: ['teaching'],
      tertiary: scholar_skills
    }
  },
  botanist: {
    key: 'botanist',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academic_occurrence(params),
    attributes: scholar_attributes,
    skills: {
      primary: ['nature'],
      secondary: ['teaching'],
      tertiary: scholar_skills
    }
  },
  astronomer: {
    key: 'astronomer',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academic_occurrence(params),
    attributes: scholar_attributes,
    skills: {
      primary: ['astronomy'],
      secondary: ['teaching'],
      tertiary: scholar_skills
    }
  },
  philosopher: {
    key: 'philosopher',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academic_occurrence(params),
    attributes: scholar_attributes,
    skills: {
      primary: ['philosophy'],
      secondary: ['teaching'],
      tertiary: scholar_skills
    }
  },
  linguist: {
    key: 'linguist',
    lifestyle: 'comfortable',
    category: 'scholars',
    subcategory: 'academic',
    prevalence: 'uncommon',
    occurrence: params => academic_occurrence(params),
    attributes: scholar_attributes,
    skills: {
      primary: ['linguistics', 'history'],
      secondary: ['teaching'],
      tertiary: scholar_skills
    }
  },
  archivist: {
    key: 'archivist',
    lifestyle: 'modest',
    category: 'scholars',
    subcategory: 'academic',
    occurrence: ({ context }) => (context.text ? 1 : context.city ? 0.5 : 0),
    attributes: scholar_attributes,
    skills: {
      primary: [...academic_skills],
      secondary: ['teaching'],
      tertiary: scholar_skills
    }
  }
}
