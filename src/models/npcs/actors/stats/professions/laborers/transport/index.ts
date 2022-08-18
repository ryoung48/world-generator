import { ageRanges } from '../../../age/life_phases'
import { laborerSkills, socialSkills } from '../../../skills/categories'
import { Profession } from '../../types'
import { TransportProfessions } from './types'

const sailorOccurrence: Profession['occurrence'] = ({ context }) =>
  !context.coastal || context.remote ? 0 : context.urban ? 1 : 0.1
const dockOccurrence: Profession['occurrence'] = ({ context }) =>
  !context.coastal || context.remote ? 0 : context.city ? 0.5 : 0

const sailorSkills: Profession['skills'] = {
  primary: ['seafaring'],
  tertiary: laborerSkills
}

const captainSkills: Profession['skills'] = {
  primary: ['logistics'],
  secondary: ['seafaring', 'accounting'],
  tertiary: [...laborerSkills, ...socialSkills]
}

const coachmanSkills: Profession['skills'] = {
  primary: ['wagoneering'],
  tertiary: laborerSkills
}

const sailorTitle = (params: { title: string; spec: string }) => {
  const { title, spec } = params
  return title.replace('seasoned', spec)
}

const sailorSpecialization: Profession['specialization'] = () => {
  return window.dice.weightedChoice([
    { v: 'deckhand', w: 5 },
    { v: 'cannoneer', w: 1 },
    { v: 'navigator', w: 1 },
    { v: 'boatswain', w: 1 },
    { v: 'helmsman', w: 1 }
  ])
}

export const transport: Record<TransportProfessions, Profession> = {
  'sailor (merchant, novice)': {
    key: 'sailor (merchant, novice)',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'docks',
    skills: sailorSkills
  },
  'sailor (merchant, seasoned)': {
    key: 'sailor (merchant, seasoned)',
    title: ({ spec }) => sailorTitle({ title: 'sailor (merchant, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'laborers',
    subcategory: 'docks',
    occurrence: params => sailorOccurrence(params),
    specialization: sailorSpecialization,
    skills: sailorSkills,
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
    occurrence: params => sailorOccurrence(params),
    skills: captainSkills,
    progression: {
      'sailor (merchant, seasoned)': { weight: 10, years: 5, transition: true },
      'sailor (navy, seasoned)': { weight: 1, years: 5, transition: true },
      'sailor (pirate, seasoned)': { weight: 1, years: 5, transition: true }
    },
    ages: ageRanges.expert
  },
  'sailor (navy, novice)': {
    key: 'sailor (navy, novice)',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'docks',
    prevalence: 'uncommon',
    skills: sailorSkills
  },
  'sailor (navy, seasoned)': {
    key: 'sailor (navy, seasoned)',
    title: ({ spec }) => sailorTitle({ title: 'sailor (navy, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'laborers',
    subcategory: 'docks',
    prevalence: 'uncommon',
    occurrence: params => (params.context.city ? sailorOccurrence(params) : 0),
    specialization: sailorSpecialization,
    skills: sailorSkills,
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
    occurrence: params => (params.context.city ? sailorOccurrence(params) : 0),
    skills: captainSkills,
    progression: {
      'sailor (merchant, seasoned)': { weight: 1, years: 5, transition: true },
      'sailor (navy, seasoned)': { weight: 10, years: 5, transition: true },
      'sailor (pirate, seasoned)': { weight: 1, years: 5, transition: true }
    },
    ages: ageRanges.expert
  },
  'sailor (pirate, novice)': {
    key: 'sailor (pirate, novice)',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'docks',
    prevalence: 'uncommon',
    skills: sailorSkills
  },
  'sailor (pirate, seasoned)': {
    key: 'sailor (pirate, seasoned)',
    title: ({ spec }) => sailorTitle({ title: 'sailor (pirate, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'laborers',
    subcategory: 'docks',
    prevalence: 'uncommon',
    skills: sailorSkills,
    specialization: sailorSpecialization,
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
    skills: captainSkills,
    progression: {
      'sailor (merchant, seasoned)': { weight: 1, years: 5, transition: true },
      'sailor (navy, seasoned)': { weight: 1, years: 5, transition: true },
      'sailor (pirate, seasoned)': { weight: 10, years: 5, transition: true }
    },
    ages: ageRanges.expert
  },
  'dock worker': {
    key: 'dock worker',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'docks',
    occurrence: params => dockOccurrence(params) * 1.5,
    skills: {
      primary: ['athletics'],
      secondary: ['seafaring'],
      tertiary: laborerSkills
    }
  },
  'dock master': {
    key: 'dock master',
    lifestyle: 'comfortable',
    category: 'laborers',
    subcategory: 'docks',
    ages: ageRanges.expert,
    prevalence: 'uncommon',
    occurrence: params => dockOccurrence(params),
    skills: {
      primary: ['logistics'],
      secondary: ['seafaring'],
      tertiary: [...laborerSkills, ...socialSkills]
    }
  },
  ferryman: {
    key: 'ferryman',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'transportation',
    occurrence: ({ context }) => (context.coastal ? 0.2 : 0),
    skills: sailorSkills
  },
  coachman: {
    key: 'coachman',
    lifestyle: 'modest',
    category: 'laborers',
    subcategory: 'transportation',
    occurrence: ({ context }) => (context.tribal || !context.urban ? 0 : 0.1),
    skills: coachmanSkills
  },
  waggoner: {
    key: 'waggoner',
    lifestyle: 'poor',
    category: 'laborers',
    subcategory: 'transportation',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban ? 0.3 : 0.1),
    skills: coachmanSkills
  }
}
