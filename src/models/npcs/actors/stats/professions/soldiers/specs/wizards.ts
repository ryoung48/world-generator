import { scholar_skills } from '../../../skills/categories'
import { scholar_attributes } from '../../scholars/academics'
import { ProfessionKit } from '../../types'

const wizard: ProfessionKit = {
  attributes: scholar_attributes,
  skills: {
    primary: ['arcana'],
    tertiary: scholar_skills
  }
}

export const wizard_kits: Record<'wizard' | 'sorcerer' | 'witch' | 'druid', ProfessionKit> = {
  wizard,
  sorcerer: {
    ...wizard
  },
  witch: {
    ...wizard,
    skills: {
      primary: ['arcana'],
      secondary: ['alchemy', 'nature', 'survival'],
      tertiary: scholar_skills
    }
  },
  druid: {
    attributes: [9, 9, 9, 12, 11, 10],
    skills: {
      primary: ['arcana'],
      secondary: ['nature', 'survival'],
      tertiary: scholar_skills
    }
  }
}
