import { LocationContext } from '../../../../../../regions/locations/context/types'
import { artisan_skills } from '../../../skills/categories'
import { gender_based_title } from '../../titles'
import { Profession } from '../../types'
import { performer_professions } from './types'

const performer_occurrence = (rural: number) => (params: { context: LocationContext }) => {
  let weight = 0.5
  if (!params.context.urban) weight *= rural
  if (params.context.art) weight *= 2
  return weight
}

export const performers: Record<performer_professions, Profession> = {
  actor: {
    category: 'artistic',
    key: 'actor',
    lifestyle: 'poor',
    occurrence: params => performer_occurrence(0)(params),
    skills: {
      primary: ['acting'],
      tertiary: artisan_skills
    },
    subcategory: 'performers',
    title: ({ actor }) =>
      gender_based_title({
        male: 'Actor',
        female: 'Actress',
        actor
      })
  },
  composer: {
    category: 'artistic',
    key: 'composer',
    lifestyle: 'modest',
    occurrence: params => performer_occurrence(0)(params),
    skills: {
      primary: ['composition'],
      secondary: ['instrumental'],
      tertiary: artisan_skills
    },
    subcategory: 'performers',
    title: 'Composer (music)'
  },
  dancer: {
    category: 'artistic',
    key: 'dancer',
    lifestyle: 'poor',
    occurrence: params => performer_occurrence(0.1)(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['dancing'],
      tertiary: artisan_skills
    },
    subcategory: 'performers'
  },
  musician: {
    category: 'artistic',
    key: 'musician',
    lifestyle: 'poor',
    occurrence: params => performer_occurrence(0.1)(params),
    skills: {
      primary: ['instrumental'],
      tertiary: artisan_skills
    },
    subcategory: 'performers'
  },
  singer: {
    category: 'artistic',
    key: 'singer',
    lifestyle: 'poor',
    occurrence: params => performer_occurrence(0.1)(params),
    skills: {
      primary: ['singing'],
      tertiary: artisan_skills
    },
    subcategory: 'performers'
  },
  stagehand: {
    category: 'artistic',
    key: 'stagehand',
    lifestyle: 'poor',
    occurrence: params => performer_occurrence(0)(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['athletics', 'acting'],
      tertiary: artisan_skills
    },
    subcategory: 'performers'
  }
}
