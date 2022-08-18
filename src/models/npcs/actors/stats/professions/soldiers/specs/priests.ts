import { allSkills } from '../../../skills/categories'
import { scholarAttributes } from '../../scholars/academics'
import { ProfessionKit } from '../../types'

const tertiary = [...allSkills]

export const priestKits: Record<
  'priest' | 'monk' | 'templar' | 'inquisitor' | 'zealot',
  ProfessionKit
> = {
  priest: {
    attributes: scholarAttributes,
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
