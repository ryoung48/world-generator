import { ageRanges } from '../../age/life_phases'
import { laborerSkills } from '../../skills/categories'
import { genderBasedTitle } from '../titles'
import { Profession } from '../types'
import { LaborerProfessions } from './types'

const farmerOccurrence: Profession['occurrence'] = ({ context }) => {
  let mod = 1
  if (context.grain || context.vegetables) mod *= 2
  if (context.remote) mod = 0
  if (context.urban) mod /= 2
  if (context.city) mod /= 2
  return mod
}

const millerOccurrence: Profession['occurrence'] = ({ context }) =>
  context.remote ? 0 : context.grain ? 1 : 0.5

const carpenterSkills: Profession['skills'] = {
  primary: ['carpentry'],
  tertiary: laborerSkills
}

const animalTrainerSkills: Profession['skills'] = {
  primary: ['animal handling'],
  tertiary: laborerSkills
}

export const laborers: Record<LaborerProfessions, Profession> = {
  beekeeper: {
    category: 'laborers',
    key: 'beekeeper',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    prevalence: 'uncommon',
    skills: animalTrainerSkills,
    subcategory: 'animal handling'
  },
  carpenter: {
    category: 'laborers',
    key: 'carpenter',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : context.lumber ? 1 : 0.5),
    skills: carpenterSkills,
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
      tertiary: laborerSkills
    }
  },
  falconer: {
    category: 'laborers',
    key: 'falconer',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    prevalence: 'uncommon',
    skills: animalTrainerSkills,
    subcategory: 'animal handling'
  },
  'farmer (tenant)': {
    category: 'laborers',
    key: 'farmer (tenant)',
    lifestyle: 'poor',
    occurrence: param => farmerOccurrence(param) * 4,
    prevalence: 'abundant',
    skills: {
      primary: ['cultivation'],
      secondary: ['animal handling'],
      tertiary: laborerSkills
    }
  },
  'farmer (yeoman)': {
    category: 'laborers',
    key: 'farmer (yeoman)',
    lifestyle: 'modest',
    occurrence: param => farmerOccurrence(param) * 2,
    skills: {
      primary: ['cultivation'],
      secondary: ['animal handling'],
      tertiary: laborerSkills
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
      tertiary: laborerSkills
    },
    title: ({ actor }) =>
      genderBasedTitle({
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
      tertiary: laborerSkills
    },
    title: ({ actor }) =>
      genderBasedTitle({
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
    skills: animalTrainerSkills,
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
      tertiary: laborerSkills
    },
    subcategory: 'hunting',
    title: ({ actor }) =>
      genderBasedTitle({
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
      tertiary: laborerSkills
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
      tertiary: laborerSkills
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
      tertiary: laborerSkills
    }
  },
  mason: {
    category: 'laborers',
    key: 'mason',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban || context.stone ? 1 : 0.1),
    skills: {
      primary: ['masonry'],
      tertiary: laborerSkills
    },
    subcategory: 'construction'
  },
  miller: {
    category: 'laborers',
    key: 'miller',
    lifestyle: 'poor',
    occurrence: param => millerOccurrence(param) * 2,
    skills: {
      primary: ['milling'],
      secondary: ['cultivation'],
      tertiary: laborerSkills
    }
  },
  'miller (owner)': {
    category: 'laborers',
    key: 'miller (owner)',
    lifestyle: 'modest',
    prevalence: 'uncommon',
    occurrence: param => millerOccurrence(param) * 2,
    skills: {
      primary: ['logistics'],
      secondary: ['cultivation', 'milling'],
      tertiary: laborerSkills
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
      tertiary: laborerSkills
    },
    subcategory: 'mining'
  },
  'miner (foreman)': {
    category: 'laborers',
    key: 'miner (foreman)',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : context.mining ? 1 : 0),
    prevalence: 'uncommon',
    ages: ageRanges.seasoned,
    progression: {
      miner: { weight: 1, years: 10, transition: true }
    },
    skills: {
      primary: ['logistics'],
      secondary: ['mining'],
      tertiary: laborerSkills
    },
    subcategory: 'mining'
  },
  'stable master': {
    category: 'laborers',
    key: 'stable master',
    lifestyle: 'modest',
    ages: ageRanges.seasoned,
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    progression: {
      'stable hand': { weight: 1, years: 10, transition: true }
    },
    skills: animalTrainerSkills,
    subcategory: 'animal handling'
  },
  'stable hand': {
    category: 'laborers',
    key: 'stable hand',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    skills: animalTrainerSkills,
    subcategory: 'animal handling'
  },
  thatcher: {
    category: 'laborers',
    key: 'thatcher',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.urban ? 0.2 : 1),
    skills: carpenterSkills,
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
      tertiary: laborerSkills
    },
    subcategory: 'hunting'
  }
}
