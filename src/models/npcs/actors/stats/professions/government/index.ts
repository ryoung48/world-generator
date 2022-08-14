import { age_ranges } from '../../age/life_phases'
import {
  artisan_skills,
  laborer_skills,
  scholar_skills,
  social_skills
} from '../../skills/categories'
import { scholar_attributes } from '../scholars/academics'
import { Profession } from '../types'
import { government_professions } from './types'

export const government: Record<government_professions, Profession> = {
  advocate: {
    attributes: scholar_attributes,
    category: 'bureaucrats',
    key: 'advocate',
    lifestyle: 'comfortable',
    occurrence: ({ context }) => (context.text ? 1 : context.city ? 0.5 : 0),
    skills: {
      primary: ['law'],
      secondary: ['teaching'],
      tertiary: scholar_skills
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
      tertiary: artisan_skills
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
      tertiary: laborer_skills
    }
  },
  diplomat: {
    ages: age_ranges.expert,
    category: 'bureaucrats',
    key: 'diplomat',
    lifestyle: 'prosperous',
    skills: {
      primary: ['living language', 'negotiate'],
      tertiary: scholar_skills
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
      tertiary: [...laborer_skills, ...social_skills]
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
      tertiary: laborer_skills
    }
  },
  interpreter: {
    attributes: scholar_attributes,
    category: 'bureaucrats',
    key: 'interpreter',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.urban ? 0.5 : 0),
    skills: {
      primary: ['etiquette', 'negotiate', 'living language'],
      tertiary: artisan_skills
    }
  },
  magistrate: {
    ages: age_ranges.expert,
    category: 'bureaucrats',
    key: 'magistrate',
    lifestyle: 'prosperous',
    skills: {
      primary: ['law'],
      tertiary: scholar_skills
    }
  },
  scribe: {
    category: 'bureaucrats',
    key: 'scribe',
    lifestyle: 'modest',
    occurrence: ({ context }) => (context.remote ? 0 : !context.urban ? 0.1 : 1),
    skills: {
      primary: ['scribing'],
      tertiary: artisan_skills
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
      tertiary: artisan_skills
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
      tertiary: artisan_skills
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
      tertiary: artisan_skills
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
      tertiary: artisan_skills
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
      tertiary: artisan_skills
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
      tertiary: artisan_skills
    }
  },
  'advisor (state)': {
    category: 'bureaucrats',
    key: 'advisor (noble)',
    lifestyle: 'rich',
    skills: {
      primary: ['logistics'],
      tertiary: artisan_skills
    }
  }
}
