import { ageRanges } from '../../age/life_phases'
import { professions__middle } from '../middle'
import { Profession } from '../types'
import { UpperStratum } from './types'

export const professions__upper: Record<UpperStratum, Profession> = {
  noble: {
    key: 'noble',
    stratum: 'upper',
    occurrence: ({ context }) => (context.village ? 0 : 1),
    skills: professions__middle.gentry.skills
  },
  courtier: {
    key: 'courtier',
    stratum: 'upper',
    occurrence: ({ context }) => (context.village ? 0 : 1),
    skills: professions__middle.bureaucrat.skills,
    ages: ageRanges.veteran
  },
  'merchant (prince)': {
    key: 'merchant (prince)',
    stratum: 'upper',
    occurrence: ({ context }) => (context.city ? 0.6 : 0),
    skills: {
      primary: ['logistics'],
      secondary: ['accounting']
    },
    ages: ageRanges.veteran
  },
  'high priest': {
    key: 'high priest',
    stratum: 'upper',
    occurrence: ({ context }) => (context.city ? (context.incense ? 0.4 : 0.2) : 0),
    skills: professions__middle.priest.skills,
    ages: ageRanges.master
  },
  archmage: {
    key: 'archmage',
    stratum: 'upper',
    occurrence: ({ context }) => (context.city ? (context.arcane ? 0.2 : 0.1) : 0),
    skills: professions__middle.sorcerer.skills,
    ages: ageRanges.master
  },
  'general (military)': {
    key: 'general (military)',
    stratum: 'upper',
    occurrence: ({ context }) => (context.city ? 0.1 : 0),
    skills: professions__middle['officer (military)'].skills,
    ages: ageRanges.master
  }
}
