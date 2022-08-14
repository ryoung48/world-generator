import { age_ranges } from '../../../age/life_phases'
import { laborer_skills, social_skills } from '../../../skills/categories'
import { Profession } from '../../types'
import { transport_professions } from './types'

const sailor_occurrence: Profession['occurrence'] = ({ context }) =>
  !context.coastal || context.remote ? 0 : context.urban ? 1 : 0.1
const dock_occurrence: Profession['occurrence'] = ({ context }) =>
  !context.coastal || context.remote ? 0 : context.city ? 0.5 : 0

const sailor_skills: Profession['skills'] = {
  primary: ['seafaring'],
  tertiary: laborer_skills
}

const captain_skills: Profession['skills'] = {
  primary: ['logistics'],
  secondary: ['seafaring', 'accounting'],
  tertiary: [...laborer_skills, ...social_skills]
}

const coachman_skills: Profession['skills'] = {
  primary: ['wagoneering'],
  tertiary: laborer_skills
}

const sailor_title = (params: { title: string; spec: string }) => {
  const { title, spec } = params
  return title.replace('seasoned', spec)
}

const sailor_specialization: Profession['specialization'] = () => {
  return window.dice.weighted_choice([
    { v: 'deckhand', w: 5 },
    { v: 'cannoneer', w: 1 },
    { v: 'navigator', w: 1 },
    { v: 'boatswain', w: 1 },
    { v: 'helmsman', w: 1 }
  ])
}

export const transport: Record<transport_professions, Profession> = {
  'sailor (merchant, novice)': {
    key: 'sailor (merchant, novice)',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'docks',
    skills: sailor_skills
  },
  'sailor (merchant, seasoned)': {
    key: 'sailor (merchant, seasoned)',
    title: ({ spec }) => sailor_title({ title: 'sailor (merchant, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'laborers',
    subcategory: 'docks',
    occurrence: params => sailor_occurrence(params),
    specialization: sailor_specialization,
    skills: sailor_skills,
    progression: {
      'sailor (merchant, novice)': { weight: 10, years: 5, transition: true },
      'sailor (navy, seasoned)': { weight: 1, years: 1, transition: true },
      'sailor (pirate, seasoned)': { weight: 1, years: 1, transition: true }
    }
  },
  'ship captain (merchant)': {
    key: 'ship captain (merchant)',
    lifestyle: 'comfortable',
    category: 'merchants',
    occurrence: params => sailor_occurrence(params),
    skills: captain_skills,
    progression: {
      'sailor (merchant, seasoned)': { weight: 10, years: 5, transition: true },
      'sailor (navy, seasoned)': { weight: 1, years: 5, transition: true },
      'sailor (pirate, seasoned)': { weight: 1, years: 5, transition: true }
    },
    ages: age_ranges.expert
  },
  'sailor (navy, novice)': {
    key: 'sailor (navy, novice)',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'docks',
    prevalence: 'uncommon',
    skills: sailor_skills
  },
  'sailor (navy, seasoned)': {
    key: 'sailor (navy, seasoned)',
    title: ({ spec }) => sailor_title({ title: 'sailor (navy, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'laborers',
    subcategory: 'docks',
    prevalence: 'uncommon',
    occurrence: params => (params.context.city ? sailor_occurrence(params) : 0),
    specialization: sailor_specialization,
    skills: sailor_skills,
    progression: {
      'sailor (merchant, seasoned)': { weight: 1, years: 1, transition: true },
      'sailor (navy, novice)': { weight: 10, years: 5, transition: true },
      'sailor (pirate, seasoned)': { weight: 1, years: 1, transition: true }
    }
  },
  'ship captain (navy)': {
    key: 'ship captain (navy)',
    lifestyle: 'comfortable',
    category: 'merchants',
    prevalence: 'uncommon',
    occurrence: params => (params.context.city ? sailor_occurrence(params) : 0),
    skills: captain_skills,
    progression: {
      'sailor (merchant, seasoned)': { weight: 1, years: 5, transition: true },
      'sailor (navy, seasoned)': { weight: 10, years: 5, transition: true },
      'sailor (pirate, seasoned)': { weight: 1, years: 5, transition: true }
    },
    ages: age_ranges.expert
  },
  'sailor (pirate, novice)': {
    key: 'sailor (pirate, novice)',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'docks',
    prevalence: 'uncommon',
    skills: sailor_skills
  },
  'sailor (pirate, seasoned)': {
    key: 'sailor (pirate, seasoned)',
    title: ({ spec }) => sailor_title({ title: 'sailor (pirate, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'laborers',
    subcategory: 'docks',
    prevalence: 'uncommon',
    skills: sailor_skills,
    specialization: sailor_specialization,
    progression: {
      'sailor (merchant, seasoned)': { weight: 1, years: 1, transition: true },
      'sailor (navy, seasoned)': { weight: 1, years: 1, transition: true },
      'sailor (pirate, novice)': { weight: 10, years: 5, transition: true }
    }
  },
  'ship captain (pirate)': {
    key: 'ship captain (pirate)',
    lifestyle: 'comfortable',
    category: 'merchants',
    prevalence: 'uncommon',
    skills: captain_skills,
    progression: {
      'sailor (merchant, seasoned)': { weight: 1, years: 5, transition: true },
      'sailor (navy, seasoned)': { weight: 1, years: 5, transition: true },
      'sailor (pirate, seasoned)': { weight: 10, years: 5, transition: true }
    },
    ages: age_ranges.expert
  },
  'dock worker': {
    key: 'dock worker',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'docks',
    occurrence: params => dock_occurrence(params) * 1.5,
    skills: {
      primary: ['athletics'],
      secondary: ['seafaring'],
      tertiary: laborer_skills
    }
  },
  'dock master': {
    key: 'dock master',
    lifestyle: 'comfortable',
    category: 'laborers',
    subcategory: 'docks',
    ages: age_ranges.expert,
    prevalence: 'uncommon',
    occurrence: params => dock_occurrence(params),
    skills: {
      primary: ['logistics'],
      secondary: ['seafaring'],
      tertiary: [...laborer_skills, ...social_skills]
    }
  },
  ferryman: {
    key: 'ferryman',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'transportation',
    occurrence: ({ context }) => (context.coastal ? 0.2 : 0),
    skills: sailor_skills
  },
  coachman: {
    key: 'coachman',
    lifestyle: 'modest',
    category: 'laborers',
    subcategory: 'transportation',
    occurrence: ({ context }) => (context.tribal || !context.urban ? 0 : 0.1),
    skills: coachman_skills
  },
  waggoner: {
    key: 'waggoner',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'transportation',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban ? 0.3 : 0.1),
    skills: coachman_skills
  }
}
