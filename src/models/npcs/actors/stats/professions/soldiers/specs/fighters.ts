import { allSkills } from '../../../skills/categories'
import { ProfessionKit as SpecializationKit } from '../../types'

const tertiary = [...allSkills]

const fighterSkills: SpecializationKit['skills'] = {
  primary: ['martial'],
  secondary: ['athletics', 'survival'],
  tertiary
}

export const fighterKits: Record<
  'defender' | 'brute' | 'berserker' | 'battlemage',
  SpecializationKit
> = {
  defender: {
    attributes: [12, 11, 12, 10, 11, 10],
    skills: fighterSkills
  },
  berserker: {
    attributes: [12, 11, 12, 10, 11, 10],
    skills: fighterSkills
  },
  brute: {
    attributes: [12, 11, 12, 10, 11, 10],
    skills: fighterSkills
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
