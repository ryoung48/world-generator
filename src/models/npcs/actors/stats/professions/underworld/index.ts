import { ageRanges } from '../../age/life_phases'
import { artisanSkills, laborerSkills, socialSkills, worldlySkills } from '../../skills/categories'
import { fighterKits } from '../soldiers/specs/fighters'
import { rangerKits } from '../soldiers/specs/ranger'
import { rogueKits } from '../soldiers/specs/rogues'
import { wizardKits } from '../soldiers/specs/wizards'
import { Profession } from '../types'
import { UnderworldProfessions } from './types'

const thiefOccurrence: Profession['occurrence'] = ({ context }) =>
  context.city ? 1 : !context.tribal ? 0.1 : 0

export const underworld: Record<UnderworldProfessions, Profession> = {
  'thief (minor)': {
    key: 'thief (minor)',
    lifestyle: 'poor',
    category: 'underclass',
    prevalence: 'common',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['streetwise'],
      secondary: ['martial'],
      tertiary: artisanSkills
    }
  },
  'thief (major)': {
    key: 'thief (major)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'rare',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['streetwise'],
      secondary: ['martial'],
      tertiary: artisanSkills
    }
  },
  'assassin (minor)': {
    key: 'assassin (minor)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'rare',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['martial'],
      secondary: ['alchemy', 'streetwise'],
      tertiary: artisanSkills
    }
  },
  'assassin (major)': {
    key: 'assassin (major)',
    lifestyle: 'comfortable',
    category: 'underclass',
    prevalence: 'rare',
    occurrence: params => thiefOccurrence(params) * 0.5,
    skills: {
      primary: ['martial'],
      secondary: ['alchemy', 'streetwise'],
      tertiary: artisanSkills
    }
  },
  'courtesan (minor)': {
    key: 'courtesan (minor)',
    lifestyle: 'poor',
    category: 'underclass',
    prevalence: 'common',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['charm', 'insight', 'perception', 'negotiate', 'carouse'],
      tertiary: [...laborerSkills, ...socialSkills, 'martial']
    }
  },
  'courtesan (major)': {
    key: 'courtesan (major)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'uncommon',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['charm', 'insight', 'perception', 'negotiate', 'carouse'],
      tertiary: [...laborerSkills, ...socialSkills, 'martial']
    }
  },
  forger: {
    key: 'forger',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'uncommon',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['streetwise', 'scribing'],
      tertiary: artisanSkills
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
      tertiary: laborerSkills
    }
  },
  smuggler: {
    key: 'smuggler',
    lifestyle: 'poor',
    category: 'underclass',
    prevalence: 'common',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['streetwise'],
      tertiary: laborerSkills
    }
  },
  'con artist': {
    key: 'con artist',
    lifestyle: 'poor',
    category: 'underclass',
    prevalence: 'uncommon',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['streetwise', 'bluff'],
      tertiary: artisanSkills
    }
  },
  fence: {
    key: 'fence',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'common',
    occurrence: params => thiefOccurrence(params),
    skills: {
      primary: ['streetwise', 'accounting', 'negotiate'],
      tertiary: artisanSkills
    }
  },
  brigand: {
    key: 'brigand',
    category: 'underclass',
    lifestyle: 'poor',
    ages: [20, 45],
    afterSpawn: ({ inventory }) => {
      inventory.currency += window.dice.randint(0, 5)
    },
    skills: ({ actor }) => {
      const spec = actor.occupation.spec
      if (spec === 'defender') return fighterKits.defender.skills
      if (spec === 'brute') return fighterKits.brute.skills
      if (spec === 'marksman') return rangerKits.marksman.skills
      if (spec === 'rogue') return rogueKits.rogue.skills
      return wizardKits.sorcerer.skills
    },
    attributes: ({ actor }) => {
      const spec = actor.occupation.spec
      if (spec === 'defender') return fighterKits.defender.attributes
      if (spec === 'brute') return fighterKits.brute.attributes
      if (spec === 'marksman') return rangerKits.marksman.attributes
      if (spec === 'rogue') return rogueKits.rogue.attributes
      return wizardKits.sorcerer.attributes
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
      tertiary: [...socialSkills, ...worldlySkills]
    },
    ages: ageRanges.expert
  },
  'boss (criminal, major)': {
    key: 'boss (criminal, major)',
    lifestyle: 'prosperous',
    category: 'underclass',
    prevalence: 'rare',
    skills: {
      primary: ['logistics', 'streetwise'],
      tertiary: [...laborerSkills, ...socialSkills]
    },
    ages: ageRanges.veteran
  },
  'advisor (criminal, major)': {
    key: 'advisor (criminal, major)',
    lifestyle: 'comfortable',
    category: 'underclass',
    prevalence: 'rare',
    skills: {
      primary: ['logistics', 'streetwise'],
      tertiary: [...laborerSkills, ...socialSkills]
    },
    ages: ageRanges.expert
  },
  'boss (criminal, minor)': {
    key: 'boss (criminal, minor)',
    lifestyle: 'comfortable',
    category: 'underclass',
    prevalence: 'rare',
    skills: {
      primary: ['logistics', 'streetwise'],
      tertiary: [...laborerSkills, ...socialSkills]
    },
    ages: ageRanges.veteran
  },
  'advisor (criminal, minor)': {
    key: 'advisor (criminal, minor)',
    lifestyle: 'modest',
    category: 'underclass',
    prevalence: 'rare',
    skills: {
      primary: ['logistics', 'streetwise'],
      tertiary: [...laborerSkills, ...socialSkills]
    },
    ages: ageRanges.expert
  }
}
