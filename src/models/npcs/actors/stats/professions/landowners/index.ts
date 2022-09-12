import { academicSkills, artisanSkills, socialSkills } from '../../skills/categories'
import { Profession } from '../types'
import { AristocratProfessions } from './types'

const nobleSkills: Profession['skills'] = {
  primary: [...socialSkills],
  tertiary: [...academicSkills, ...artisanSkills, 'martial', 'logistics']
}

export const aristocracy: Record<AristocratProfessions, Profession> = {
  'noble (major)': {
    key: 'noble (major)',
    lifestyle: 'rich',
    category: 'aristocrats',
    prevalence: 'rare',
    occurrence: params => (params.context.city ? 1 : 0),
    skills: nobleSkills
  },
  'noble (minor)': {
    key: 'noble (minor)',
    lifestyle: 'prosperous',
    category: 'aristocrats',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.village ? 0 : 1.5),
    skills: nobleSkills
  },
  'gentry (major)': {
    key: 'gentry (major)',
    lifestyle: 'prosperous',
    category: 'aristocrats',
    prevalence: 'uncommon',
    occurrence: params => (params.context.village ? 0.5 : 1.5),
    skills: nobleSkills
  },
  'gentry (minor)': {
    key: 'gentry (minor)',
    lifestyle: 'comfortable',
    category: 'aristocrats',
    occurrence: 1.5,
    skills: nobleSkills
  }
}
