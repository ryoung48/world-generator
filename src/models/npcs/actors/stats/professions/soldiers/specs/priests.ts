import { all_skills } from '../../../skills/categories'
import { scholar_attributes } from '../../scholars/academics'
import { ProfessionKit } from '../../types'

const tertiary = [...all_skills]

export const priest_kits: Record<
  'priest' | 'monk' | 'templar' | 'inquisitor' | 'zealot',
  ProfessionKit
> = {
  priest: {
    attributes: scholar_attributes,
    skills: {
      primary: ['theology'],
      secondary: ['arcana'],
      tertiary
    }
  },
  monk: {
    attributes: [10, 12, 11, 11, 12, 10],
    skills: {
      primary: ['theology'],
      secondary: ['martial'],
      tertiary
    }
  },
  templar: {
    attributes: [12, 10, 12, 11, 10, 11],
    skills: {
      primary: ['martial'],
      secondary: ['theology'],
      tertiary
    }
  },
  inquisitor: {
    attributes: [12, 10, 12, 11, 10, 11],
    skills: {
      primary: ['martial'],
      secondary: ['folklore', 'theology'],
      tertiary
    }
  },
  zealot: {
    attributes: [12, 11, 12, 11, 10, 10],
    skills: {
      primary: ['martial'],
      secondary: ['theology'],
      tertiary
    }
  }
}
