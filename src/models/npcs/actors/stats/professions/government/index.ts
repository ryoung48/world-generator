import { ageRanges } from '../../age/life_phases'
import { artisanSkills, laborerSkills, scholarSkills, socialSkills } from '../../skills/categories'
import { scholarAttributes } from '../scholars/academics'
import { Profession } from '../types'
import { GovernmentProfessions } from './types'

export const government: Record<GovernmentProfessions, Profession> = {
  advocate: {
    attributes: scholarAttributes,
    category: 'bureaucrats',
    key: 'advocate',
    lifestyle: 'comfortable',
    occurrence: ({ context }) => (context.text ? 1 : context.city ? 0.5 : 0),
    skills: {
      primary: ['law'],
      secondary: ['teaching'],
      tertiary: scholarSkills
    }
  },
  constable: {
    category: 'bureaucrats',
    key: 'constable',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote || !context.urban ? 0.1 : 1),
    prevalence: 'uncommon',
    skills: {
      primary: ['investigation'],
      tertiary: artisanSkills
    }
  },
  courier: {
    category: 'bureaucrats',
    key: 'courier',
    lifestyle: 'poor',
    occurrence: ({ context }) => (context.remote || !context.urban ? 0.1 : 1),
    prevalence: 'uncommon',
    skills: {
      primary: ['athletics'],
      tertiary: laborerSkills
    }
  },
  diplomat: {
    ages: ageRanges.expert,
    category: 'bureaucrats',
    key: 'diplomat',
    lifestyle: 'prosperous',
    skills: {
      primary: ['living language', 'negotiate'],
      tertiary: scholarSkills
    }
  },
  executioner: {
    category: 'bureaucrats',
    key: 'executioner',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote || !context.urban ? 0 : 1),
    prevalence: 'rare',
    skills: {
      primary: ['medicine'],
      tertiary: [...laborerSkills, ...socialSkills]
    }
  },
  herald: {
    category: 'bureaucrats',
    key: 'herald',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote || !context.urban ? 0.1 : 1),
    prevalence: 'uncommon',
    skills: {
      primary: ['oratory'],
      tertiary: laborerSkills
    }
  },
  interpreter: {
    attributes: scholarAttributes,
    category: 'bureaucrats',
    key: 'interpreter',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? 0.5 : 0),
    skills: {
      primary: ['etiquette', 'negotiate', 'living language'],
      tertiary: artisanSkills
    }
  },
  magistrate: {
    ages: ageRanges.expert,
    category: 'bureaucrats',
    key: 'magistrate',
    lifestyle: 'prosperous',
    skills: {
      primary: ['law'],
      tertiary: scholarSkills
    }
  },
  scribe: {
    category: 'bureaucrats',
    key: 'scribe',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : !context.urban ? 0.1 : 1),
    skills: {
      primary: ['scribing'],
      tertiary: artisanSkills
    }
  },
  spy: {
    category: 'bureaucrats',
    key: 'spy',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : !context.urban ? 0.05 : 0.5),
    prevalence: 'uncommon',
    skills: {
      primary: ['streetwise', 'intrigue'],
      tertiary: artisanSkills
    }
  },
  'tax collector': {
    category: 'bureaucrats',
    key: 'tax collector',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : !context.urban ? 0.05 : 0.5),
    prevalence: 'uncommon',
    skills: {
      primary: ['accounting'],
      tertiary: artisanSkills
    }
  },
  'bureaucrat (village)': {
    category: 'bureaucrats',
    key: 'bureaucrat (village)',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : !context.urban ? 1 : 0),
    prevalence: 'rare',
    skills: {
      primary: ['logistics'],
      tertiary: artisanSkills
    }
  },
  'bureaucrat (town)': {
    category: 'bureaucrats',
    key: 'bureaucrat (town)',
    lifestyle: 'comfortable',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban && !context.city ? 1 : 0),
    prevalence: 'rare',
    skills: {
      primary: ['logistics'],
      tertiary: artisanSkills
    }
  },
  'bureaucrat (city)': {
    category: 'bureaucrats',
    key: 'bureaucrat (city)',
    lifestyle: 'prosperous',
    occurrence: ({ context }) => (context.remote ? 0 : context.city ? 1 : 0),
    prevalence: 'rare',
    skills: {
      primary: ['logistics'],
      tertiary: artisanSkills
    }
  },
  'advisor (noble)': {
    category: 'bureaucrats',
    key: 'advisor (noble)',
    lifestyle: 'prosperous',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban ? 1 : 0),
    prevalence: 'rare',
    skills: {
      primary: ['logistics'],
      tertiary: artisanSkills
    }
  },
  'advisor (state)': {
    category: 'bureaucrats',
    key: 'advisor (noble)',
    lifestyle: 'rich',
    skills: {
      primary: ['logistics'],
      tertiary: artisanSkills
    }
  }
}
