import { all_skills } from '../../../skills/categories'
import { ProfessionKit } from '../../types'

const tertiary = [...all_skills]

export const rogue_kits: Record<'assassin' | 'trickster' | 'rogue', ProfessionKit> = {
  assassin: {
    attributes: [10, 12, 11, 12, 10, 11],
    skills: {
      primary: ['martial'],
      secondary: ['streetwise'],
      tertiary
    }
  },
  rogue: {
    attributes: [10, 12, 11, 12, 10, 11],
    skills: {
      primary: ['martial'],
      secondary: ['streetwise'],
      tertiary
    }
  },
  trickster: {
    attributes: [10, 12, 11, 12, 10, 11],
    skills: {
      primary: ['martial', 'arcana'],
      secondary: ['streetwise'],
      tertiary
    }
  }
}
