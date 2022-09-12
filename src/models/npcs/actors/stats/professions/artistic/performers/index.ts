import { LocationContext } from '../../../../../../regions/locations/context/types'
import { artisanSkills } from '../../../skills/categories'
import { genderBasedTitle } from '../../titles'
import { Profession } from '../../types'
import { PerformerProfessions } from './types'

const performerOccurrence = (rural: number) => (params: { context: LocationContext }) => {
  let weight = 0.5
  if (!params.context.urban) weight *= rural
  if (params.context.art) weight *= 2
  return weight
}

export const performers: Record<PerformerProfessions, Profession> = {
  actor: {
    category: 'artistic',
    key: 'actor',
    lifestyle: 'poor',
    occurrence: params => performerOccurrence(0)(params),
    skills: {
      primary: ['acting'],
      tertiary: artisanSkills
    },
    subcategory: 'performers',
    title: ({ actor }) =>
      genderBasedTitle({
        male: 'Actor',
        female: 'Actress',
        actor
      })
  },
  composer: {
    category: 'artistic',
    key: 'composer',
    lifestyle: 'modest',
    occurrence: params => performerOccurrence(0)(params),
    skills: {
      primary: ['composition (music)'],
      secondary: ['instrumental'],
      tertiary: artisanSkills
    },
    subcategory: 'performers',
    title: 'Composer (music)'
  },
  dancer: {
    category: 'artistic',
    key: 'dancer',
    lifestyle: 'poor',
    occurrence: params => performerOccurrence(0.1)(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['dancing'],
      tertiary: artisanSkills
    },
    subcategory: 'performers'
  },
  musician: {
    category: 'artistic',
    key: 'musician',
    lifestyle: 'poor',
    occurrence: params => performerOccurrence(0.1)(params),
    skills: {
      primary: ['instrumental'],
      tertiary: artisanSkills
    },
    subcategory: 'performers'
  },
  singer: {
    category: 'artistic',
    key: 'singer',
    lifestyle: 'poor',
    occurrence: params => performerOccurrence(0.1)(params),
    skills: {
      primary: ['singing'],
      tertiary: artisanSkills
    },
    subcategory: 'performers'
  },
  stagehand: {
    category: 'artistic',
    key: 'stagehand',
    lifestyle: 'poor',
    occurrence: params => performerOccurrence(0)(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['athletics', 'acting'],
      tertiary: artisanSkills
    },
    subcategory: 'performers'
  }
}
