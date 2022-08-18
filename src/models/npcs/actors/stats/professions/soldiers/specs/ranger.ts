import { allSkills } from '../../../skills/categories'
import { ProfessionKit } from '../../types'

const tertiary = [...allSkills]

export const rangerKits: Record<'marksman' | 'arcane archer' | 'witch hunter', ProfessionKit> = {
  marksman: {
    attributes: [10, 12, 11, 11, 12, 10],
    skills: {
      primary: ['marksman'],
      secondary: ['survival', 'perception'],
      tertiary
    }
  },
  'arcane archer': {
    attributes: [10, 12, 11, 12, 11, 10],
    skills: {
      primary: ['marksman'],
      secondary: ['survival', 'arcana'],
      tertiary
    }
  },
  'witch hunter': {
    attributes: [10, 12, 11, 12, 11, 10],
    skills: {
      primary: ['marksman'],
      secondary: ['folklore', 'theology'],
      tertiary
    }
  }
}
