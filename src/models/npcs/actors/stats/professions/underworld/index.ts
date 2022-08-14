import { age_ranges } from '../../age/life_phases'
import {
  artisan_skills,
  laborer_skills,
  social_skills,
  worldly_skills
} from '../../skills/categories'
import { fighter_kits } from '../soldiers/specs/fighters'
import { ranger_kits } from '../soldiers/specs/ranger'
import { rogue_kits } from '../soldiers/specs/rogues'
import { wizard_kits } from '../soldiers/specs/wizards'
import { Profession } from '../types'
import { underworld_professions } from './types'

const thief_occurrence: Profession['occurrence'] = ({ context }) =>
  context.city ? 1 : !context.tribal ? 0.1 : 0

export const underworld: Record<underworld_professions, Profession> = {
  'thief (minor)': {
    key: 'thief (minor)',
    lifestyle: 'poor',
    category: 'underclass',
    prevalence: 'common',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['streetwise'],
      secondary: ['martial'],
      tertiary: artisan_skills
    }
  },
  'thief (major)': {
    key: 'thief (major)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'rare',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['streetwise'],
      secondary: ['martial'],
      tertiary: artisan_skills
    }
  },
  'assassin (minor)': {
    key: 'assassin (minor)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'rare',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['martial'],
      secondary: ['alchemy', 'streetwise'],
      tertiary: artisan_skills
    }
  },
  'assassin (major)': {
    key: 'assassin (major)',
    lifestyle: 'comfortable',
    category: 'underclass',
    prevalence: 'rare',
    occurrence: params => thief_occurrence(params) * 0.5,
    skills: {
      primary: ['martial'],
      secondary: ['alchemy', 'streetwise'],
      tertiary: artisan_skills
    }
  },
  'courtesan (minor)': {
    key: 'courtesan (minor)',
    lifestyle: 'poor',
    category: 'underclass',
    prevalence: 'common',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['charm', 'insight', 'perception', 'negotiate', 'carouse'],
      tertiary: [...laborer_skills, ...social_skills, 'martial']
    }
  },
  'courtesan (major)': {
    key: 'courtesan (major)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'uncommon',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['charm', 'insight', 'perception', 'negotiate', 'carouse'],
      tertiary: [...laborer_skills, ...social_skills, 'martial']
    }
  },
  forger: {
    key: 'forger',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'uncommon',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['streetwise', 'scribing'],
      tertiary: artisan_skills
    }
  },
  beggar: {
    key: 'beggar',
    lifestyle: 'impoverished',
    category: 'underclass',
    prevalence: 'common',
    occurrence: ({ context }) => (context.city ? 1 : 0),
    skills: {
      primary: ['survival', 'streetwise'],
      tertiary: laborer_skills
    }
  },
  smuggler: {
    key: 'smuggler',
    lifestyle: 'poor',
    category: 'underclass',
    prevalence: 'common',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['streetwise'],
      tertiary: laborer_skills
    }
  },
  'con artist': {
    key: 'con artist',
    lifestyle: 'poor',
    category: 'underclass',
    prevalence: 'uncommon',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['streetwise', 'bluff'],
      tertiary: artisan_skills
    }
  },
  fence: {
    key: 'fence',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'common',
    occurrence: params => thief_occurrence(params),
    skills: {
      primary: ['streetwise', 'accounting', 'negotiate'],
      tertiary: artisan_skills
    }
  },
  brigand: {
    key: 'brigand',
    category: 'underclass',
    lifestyle: 'poor',
    ages: [20, 45],
    after_spawn: ({ inventory }) => {
      inventory.currency += window.dice.randint(0, 5)
    },
    skills: ({ actor }) => {
      const spec = actor.occupation.spec
      if (spec === 'defender') return fighter_kits.defender.skills
      if (spec === 'brute') return fighter_kits.brute.skills
      if (spec === 'marksman') return ranger_kits.marksman.skills
      if (spec === 'rogue') return rogue_kits.rogue.skills
      return wizard_kits.sorcerer.skills
    },
    attributes: ({ actor }) => {
      const spec = actor.occupation.spec
      if (spec === 'defender') return fighter_kits.defender.attributes
      if (spec === 'brute') return fighter_kits.brute.attributes
      if (spec === 'marksman') return ranger_kits.marksman.attributes
      if (spec === 'rogue') return rogue_kits.rogue.attributes
      return wizard_kits.sorcerer.attributes
    },
    specialization: () => window.dice.choice(['defender', 'brute', 'marksman', 'rogue', 'sorcerer'])
  },
  'brigand (chief)': {
    key: 'brigand (chief)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'rare',
    progression: {
      'soldier (rebels, recruit)': { years: 5, weight: 1, transition: true },
      'soldier (military, recruit)': { years: 5, weight: 1, transition: true },
      'soldier (rebels, seasoned)': { years: 1, weight: 1, transition: true },
      'soldier (military, seasoned)': { years: 1, weight: 1, transition: true },
      mercenary: { years: 5, weight: 1, transition: true },
      brigand: { years: 5, weight: 10, transition: true }
    },
    skills: {
      primary: ['logistics'],
      secondary: ['martial', 'oratory', 'intimidate'],
      tertiary: [...social_skills, ...worldly_skills]
    },
    ages: age_ranges.expert
  },
  'boss (criminal, major)': {
    key: 'boss (criminal, major)',
    lifestyle: 'prosperous',
    category: 'underclass',
    prevalence: 'rare',
    skills: {
      primary: ['logistics', 'streetwise'],
      tertiary: [...laborer_skills, ...social_skills]
    },
    ages: age_ranges.veteran
  },
  'advisor (criminal, major)': {
    key: 'advisor (criminal, major)',
    lifestyle: 'comfortable',
    category: 'underclass',
    prevalence: 'rare',
    skills: {
      primary: ['logistics', 'streetwise'],
      tertiary: [...laborer_skills, ...social_skills]
    },
    ages: age_ranges.expert
  },
  'boss (criminal, minor)': {
    key: 'boss (criminal, minor)',
    lifestyle: 'comfortable',
    category: 'underclass',
    prevalence: 'rare',
    skills: {
      primary: ['logistics', 'streetwise'],
      tertiary: [...laborer_skills, ...social_skills]
    },
    ages: age_ranges.veteran
  },
  'advisor (criminal, minor)': {
    key: 'advisor (criminal, minor)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'rare',
    skills: {
      primary: ['logistics', 'streetwise'],
      tertiary: [...laborer_skills, ...social_skills]
    },
    ages: age_ranges.expert
  }
}
