import { scholarSkills } from '../../../skills/categories'
import { scholarAttributes } from '../../scholars/academics'
import { ProfessionKit } from '../../types'

const wizard: ProfessionKit = {
  attributes: scholarAttributes,
  skills: {
    primary: ['arcana'],
    tertiary: scholarSkills
  }
}

export const wizardKits: Record<'wizard' | 'sorcerer' | 'witch' | 'druid', ProfessionKit> = {
  wizard,
  sorcerer: {
    ...wizard
  },
  witch: {
    ...wizard,
    skills: {
      primary: ['arcana'],
      secondary: ['alchemy', 'nature', 'survival'],
      tertiary: scholarSkills
    }
  },
  druid: {
    attributes: [9, 9, 9, 12, 11, 10],
    skills: {
      primary: ['arcana'],
      secondary: ['nature', 'survival'],
      tertiary: scholarSkills
    }
  }
}
