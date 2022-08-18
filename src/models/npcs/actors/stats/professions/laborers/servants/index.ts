import { ageRanges } from '../../../age/life_phases'
import { laborerSkills } from '../../../skills/categories'
import { genderBasedTitle } from '../../titles'
import { Profession } from '../../types'
import { ServantProfessions } from './types'

const servantOccurrence: Profession['occurrence'] = ({ context }) =>
  context.remote ? 0 : !context.urban ? 0.5 : 1

export const servants: Record<ServantProfessions, Profession> = {
  servant: {
    key: 'servant',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    occurrence: params => servantOccurrence(params) * 1.2,
    skills: {
      primary: ['housekeeping'],
      tertiary: laborerSkills
    }
  },
  porter: {
    key: 'porter',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'servants',
    prevalence: 'uncommon',
    occurrence: params => servantOccurrence(params),
    skills: {
      primary: ['athletics'],
      tertiary: laborerSkills
    }
  },
  gardner: {
    key: 'gardner',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    prevalence: 'uncommon',
    occurrence: params => servantOccurrence(params),
    skills: {
      primary: ['cultivation'],
      tertiary: laborerSkills
    }
  },
  midwife: {
    key: 'midwife',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'modest',
    occurrence: params => servantOccurrence(params),
    skills: {
      primary: ['medicine'],
      tertiary: laborerSkills
    }
  },
  cook: {
    key: 'cook',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    occurrence: params => servantOccurrence(params) * 0.5,
    skills: {
      primary: ['cooking'],
      tertiary: laborerSkills
    }
  },
  waiter: {
    key: 'waiter',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    title: ({ actor }) => genderBasedTitle({ male: 'Waiter', female: 'Waitress', actor }),
    occurrence: params => servantOccurrence(params) * 0.8,
    skills: {
      primary: ['charm'],
      tertiary: laborerSkills
    }
  },
  barkeep: {
    key: 'barkeep',
    category: 'laborers',
    subcategory: 'servants',
    lifestyle: 'poor',
    ages: ageRanges.seasoned,
    occurrence: params => servantOccurrence(params),
    skills: {
      primary: ['cooking'],
      tertiary: laborerSkills
    }
  }
}
