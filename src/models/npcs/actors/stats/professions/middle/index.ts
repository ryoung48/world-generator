import { ageRanges } from '../../age/life_phases'
import { ActorSkills, socialSkills } from '../../skills/categories'
import { professions__lower } from '../lower'
import { Profession } from '../types'
import { artisans } from './artisans'
import { MiddleStratum } from './types'

export const professions__middle: Record<MiddleStratum, Profession> = {
  gentry: {
    key: 'gentry',
    stratum: 'middle',
    occurrence: 1.5,
    skills: {
      primary: [...socialSkills.filter(skill => skill !== 'teaching')]
    }
  },
  priest: {
    key: 'priest',
    stratum: 'middle',
    occurrence: ({ context }) => (context.incense ? 1 : 0.5),
    skills: {
      primary: ['theology', 'oratory'],
      secondary: ['logistics', 'teaching']
    }
  },
  sorcerer: {
    key: 'sorcerer',
    stratum: 'middle',
    occurrence: ({ context }) => (context.arcane ? 0.5 : context.urban ? 0.25 : 0.12),
    attributes: [9, 9, 9, 12, 10, 11],
    skills: {
      primary: ['arcana']
    }
  },
  scholar: {
    key: 'scholar',
    stratum: 'middle',
    occurrence: ({ context }) => (context.arcane ? 0.5 : context.urban ? 0.25 : 0.12),
    attributes: [9, 9, 9, 12, 10, 11],
    skills: () => {
      return {
        primary: window.dice.choice<ActorSkills[]>([
          ['history'],
          ['nature'],
          ['astronomy'],
          ['philosophy']
        ]),
        secondary: ['teaching']
      }
    }
  },
  artisan: {
    key: 'artisan',
    stratum: 'middle',
    title: ({ spec }) => `artisan (${spec})`,
    ...artisans
  },
  surgeon: {
    key: 'surgeon',
    stratum: 'middle',
    occurrence: ({ context }) => (context.urban ? 1 : 0.1),
    skills: {
      primary: ['medicine']
    }
  },
  merchant: {
    key: 'merchant',
    stratum: 'middle',
    occurrence: ({ context }) => (context.urban ? 0.5 : 0.1),
    skills: () => {
      return {
        primary: ['accounting'],
        secondary: window.dice.choice<ActorSkills[]>([
          ['alchemy'],
          ['arcana'],
          ['blacksmithing'],
          ['bookbinding'],
          ['tailoring'],
          ['instrument (music)'],
          ['leatherworking'],
          ['cultivation'],
          ['theology']
        ])
      }
    }
  },
  'ship captain': {
    key: 'ship captain',
    stratum: 'middle',
    occurrence: professions__lower.sailor.occurrence,
    skills: {
      primary: ['logistics'],
      secondary: ['seafaring', 'accounting']
    },
    ages: ageRanges.expert
  },
  bureaucrat: {
    key: 'bureaucrat',
    stratum: 'middle',
    occurrence: ({ context }) => (!context.urban ? 0 : 1),
    skills: {
      primary: ['logistics']
    }
  },
  'officer (military)': {
    key: 'officer (military)',
    stratum: 'middle',
    occurrence: professions__lower['soldier (military)'].occurrence,
    skills: {
      primary: ['logistics', 'tactics'],
      secondary: ['martial', 'oratory', 'intimidate']
    },
    ages: ageRanges.seasoned
  },
  'criminal (boss)': {
    key: 'criminal (boss)',
    stratum: 'middle',
    occurrence: professions__lower.criminal.occurrence,
    skills: {
      primary: ['logistics', 'streetwise']
    },
    ages: ageRanges.veteran
  }
}
