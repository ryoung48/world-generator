import { age_ranges } from '../../../age/life_phases'
import { laborer_skills } from '../../../skills/categories'
import { gender_based_title } from '../../titles'
import { Profession } from '../../types'
import { servant_professions } from './types'

const servant_occurrence: Profession['occurrence'] = ({ context }) =>
  context.remote ? 0 : !context.urban ? 0.5 : 1

export const servants: Record<servant_professions, Profession> = {
  servant: {
    key: 'servant',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    occurrence: params => servant_occurrence(params) * 1.2,
    skills: {
      primary: ['housekeeping'],
      tertiary: laborer_skills
    }
  },
  porter: {
    key: 'porter',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'servants',
    prevalence: 'uncommon',
    occurrence: params => servant_occurrence(params),
    skills: {
      primary: ['athletics'],
      tertiary: laborer_skills
    }
  },
  gardner: {
    key: 'gardner',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    prevalence: 'uncommon',
    occurrence: params => servant_occurrence(params),
    skills: {
      primary: ['cultivation'],
      tertiary: laborer_skills
    }
  },
  midwife: {
    key: 'midwife',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'modest',
    occurrence: params => servant_occurrence(params),
    skills: {
      primary: ['medicine'],
      tertiary: laborer_skills
    }
  },
  cook: {
    key: 'cook',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    occurrence: params => servant_occurrence(params) * 0.5,
    skills: {
      primary: ['cooking'],
      tertiary: laborer_skills
    }
  },
  waiter: {
    key: 'waiter',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    title: ({ actor }) => gender_based_title({ male: 'Waiter', female: 'Waitress', actor }),
    occurrence: params => servant_occurrence(params) * 0.8,
    skills: {
      primary: ['charm'],
      tertiary: laborer_skills
    }
  },
  barkeep: {
    key: 'barkeep',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    ages: age_ranges.seasoned,
    occurrence: params => servant_occurrence(params),
    skills: {
      primary: ['cooking'],
      tertiary: laborer_skills
    }
  }
}
