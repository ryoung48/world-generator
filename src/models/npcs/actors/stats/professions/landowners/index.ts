import { academic_skills, artisan_skills, social_skills } from '../../skills/categories'
import { Profession } from '../types'
import { aristocrat_professions } from './types'

const noble_skills: Profession['skills'] = {
  primary: [...social_skills],
  tertiary: [...academic_skills, ...artisan_skills, 'martial', 'logistics']
}

export const aristocracy: Record<aristocrat_professions, Profession> = {
  'noble (major)': {
    key: 'noble (major)',
    lifestyle: 'rich',
    category: 'aristocrats',
    prevalence: 'rare',
    occurrence: params => (params.context.city ? 1 : 0),
    skills: noble_skills
  },
  'noble (minor)': {
    key: 'noble (minor)',
    lifestyle: 'prosperous',
    category: 'aristocrats',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.village ? 0 : 1.5),
    skills: noble_skills
  },
  'gentry (major)': {
    key: 'gentry (major)',
    lifestyle: 'prosperous',
    category: 'aristocrats',
    prevalence: 'uncommon',
    occurrence: params => (params.context.village ? 0.5 : 1.5),
    skills: noble_skills
  },
  'gentry (minor)': {
    key: 'gentry (major)',
    lifestyle: 'comfortable',
    category: 'aristocrats',
    occurrence: 1.5,
    skills: noble_skills
  }
}
