import { age_ranges } from '../../age/life_phases'
import { laborer_skills } from '../../skills/categories'
import { gender_based_title } from '../titles'
import { Profession } from '../types'
import { laborer_professions } from './types'

const farmer_occurrence: Profession['occurrence'] = ({ context }) => {
  let mod = 1
  if (context.grain || context.vegetables) mod *= 2
  if (context.remote) mod = 0
  if (context.urban) mod /= 2
  if (context.city) mod /= 2
  return mod
}

const miller_occurrence: Profession['occurrence'] = ({ context }) =>
  context.remote ? 0 : context.grain ? 1 : 0.5

const carpenter_skills: Profession['skills'] = {
  primary: ['carpentry'],
  tertiary: laborer_skills
}

const animal_trainer_skills: Profession['skills'] = {
  primary: ['animal handling'],
  tertiary: laborer_skills
}

export const laborers: Record<laborer_professions, Profession> = {
  beekeeper: {
    category: 'laborers',
    key: 'beekeeper',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    prevalence: 'uncommon',
    skills: animal_trainer_skills,
    subcategory: 'animal handling'
  },
  carpenter: {
    category: 'laborers',
    key: 'carpenter',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : context.lumber ? 1 : 0.5),
    skills: carpenter_skills,
    subcategory: 'construction'
  },
  embalmer: {
    category: 'laborers',
    key: 'embalmer',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0.1 : 1),
    prevalence: 'uncommon',
    skills: {
      primary: ['embalming'],
      secondary: ['alchemy'],
      tertiary: laborer_skills
    }
  },
  falconer: {
    category: 'laborers',
    key: 'falconer',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    prevalence: 'uncommon',
    skills: animal_trainer_skills,
    subcategory: 'animal handling'
  },
  'farmer (tenant)': {
    category: 'laborers',
    key: 'farmer (tenant)',
    lifestyle: 'poor',
    occurrence: param => farmer_occurrence(param) * 4,
    prevalence: 'abundant',
    skills: {
      primary: ['cultivation'],
      secondary: ['animal handling'],
      tertiary: laborer_skills
    }
  },
  'farmer (yeoman)': {
    category: 'laborers',
    key: 'farmer (yeoman)',
    lifestyle: 'modest',
    occurrence: param => farmer_occurrence(param) * 2,
    skills: {
      primary: ['cultivation'],
      secondary: ['animal handling'],
      tertiary: laborer_skills
    }
  },
  fisherman: {
    category: 'laborers',
    key: 'fisherman',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.coastal ? 1.5 : 0),
    prevalence: 'abundant',
    skills: {
      primary: ['seafaring'],
      tertiary: laborer_skills
    },
    title: ({ actor }) =>
      gender_based_title({
        male: 'Fisherman',
        female: 'Fisherwoman',
        actor
      })
  },
  herdsman: {
    category: 'laborers',
    key: 'herdsman',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.herders ? 1.5 : context.tribal ? 0.5 : 0),
    prevalence: 'abundant',
    skills: {
      primary: ['animal handling'],
      tertiary: laborer_skills
    },
    title: ({ actor }) =>
      gender_based_title({
        male: 'Herdsman',
        female: 'Herdswoman',
        actor
      })
  },
  'hound master': {
    category: 'laborers',
    key: 'hound master',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    prevalence: 'uncommon',
    skills: animal_trainer_skills,
    subcategory: 'animal handling'
  },
  hunter: {
    category: 'laborers',
    key: 'hunter',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.remote ? 2 : !context.urban ? 0.5 : 0.1),
    skills: {
      primary: ['survival', 'marksman'],
      secondary: ['animal handling', 'perception'],
      tertiary: laborer_skills
    },
    subcategory: 'hunting',
    title: ({ actor }) =>
      gender_based_title({
        male: 'Hunter',
        female: 'Huntress',
        actor
      })
  },
  laborer: {
    category: 'laborers',
    key: 'laborer',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban ? 1 : 0.1),
    skills: {
      primary: ['masonry', 'carpentry', 'athletics'],
      tertiary: laborer_skills
    },
    subcategory: 'construction'
  },
  lumberjack: {
    category: 'laborers',
    key: 'lumberjack',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.remote ? 0 : context.lumber ? 2 : 0),
    prevalence: 'abundant',
    skills: {
      primary: ['woodcutting'],
      tertiary: laborer_skills
    }
  },
  'lumberjack (foreman)': {
    category: 'laborers',
    key: 'lumberjack (foreman)',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : context.lumber ? 1 : 0),
    prevalence: 'uncommon',
    skills: {
      primary: ['woodcutting'],
      tertiary: laborer_skills
    }
  },
  mason: {
    category: 'laborers',
    key: 'mason',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban || context.stone ? 1 : 0.1),
    skills: {
      primary: ['masonry'],
      tertiary: laborer_skills
    },
    subcategory: 'construction'
  },
  miller: {
    category: 'laborers',
    key: 'miller',
    lifestyle: 'poor',
    occurrence: param => miller_occurrence(param) * 2,
    skills: {
      primary: ['milling'],
      secondary: ['cultivation'],
      tertiary: laborer_skills
    }
  },
  'miller (owner)': {
    category: 'laborers',
    key: 'miller (owner)',
    lifestyle: 'modest',
    prevalence: 'uncommon',
    occurrence: param => miller_occurrence(param) * 2,
    skills: {
      primary: ['logistics'],
      secondary: ['cultivation', 'milling'],
      tertiary: laborer_skills
    }
  },
  miner: {
    category: 'laborers',
    key: 'miner',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.remote ? 0 : context.mining ? 2 : 0),
    prevalence: 'abundant',
    skills: {
      primary: ['mining'],
      tertiary: laborer_skills
    },
    subcategory: 'mining'
  },
  'miner (foreman)': {
    category: 'laborers',
    key: 'miner (foreman)',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : context.mining ? 1 : 0),
    prevalence: 'uncommon',
    ages: age_ranges.seasoned,
    progression: {
      miner: { weight: 1, years: 10, transition: true }
    },
    skills: {
      primary: ['logistics'],
      secondary: ['mining'],
      tertiary: laborer_skills
    },
    subcategory: 'mining'
  },
  'stable master': {
    category: 'laborers',
    key: 'stable master',
    lifestyle: 'modest',
    ages: age_ranges.seasoned,
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    progression: {
      'stable hand': { weight: 1, years: 10, transition: true }
    },
    skills: animal_trainer_skills,
    subcategory: 'animal handling'
  },
  'stable hand': {
    category: 'laborers',
    key: 'stable hand',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    skills: animal_trainer_skills,
    subcategory: 'animal handling'
  },
  thatcher: {
    category: 'laborers',
    key: 'thatcher',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.urban ? 0.2 : 1),
    skills: carpenter_skills,
    subcategory: 'construction'
  },
  trapper: {
    category: 'laborers',
    key: 'trapper',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.fur || context.lumber ? 1 : 0),
    prevalence: 'common',
    skills: {
      primary: ['survival'],
      tertiary: laborer_skills
    },
    subcategory: 'hunting'
  }
}
