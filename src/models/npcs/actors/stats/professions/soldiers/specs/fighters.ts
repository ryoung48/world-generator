import { all_skills } from '../../../skills/categories'
import { ProfessionKit as SpecializationKit } from '../../types'

const tertiary = [...all_skills]

const fighter_skills: SpecializationKit['skills'] = {
  primary: ['martial'],
  secondary: ['athletics', 'survival'],
  tertiary
}

export const fighter_kits: Record<
  'defender' | 'brute' | 'berserker' | 'battlemage',
  SpecializationKit
> = {
  defender: {
    attributes: [12, 11, 12, 10, 11, 10],
    skills: fighter_skills
  },
  berserker: {
    attributes: [12, 11, 12, 10, 11, 10],
    skills: fighter_skills
  },
  brute: {
    attributes: [12, 11, 12, 10, 11, 10],
    skills: fighter_skills
  },
  battlemage: {
    attributes: [12, 10, 11, 12, 10, 11],
    skills: {
      primary: ['martial'],
      secondary: ['arcana', 'athletics'],
      tertiary
    }
  }
}
