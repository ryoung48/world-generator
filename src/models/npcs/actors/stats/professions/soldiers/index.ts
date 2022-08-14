import { recent_battle_window } from '../../../../../history/events/war/battles'
import { age_ranges } from '../../age/life_phases'
import { laborer_skills, social_skills, worldly_skills } from '../../skills/categories'
import { Profession } from '../types'
import { fighter_kits } from './specs/fighters'
import { ranger_kits } from './specs/ranger'
import { rogue_kits } from './specs/rogues'
import { wizard_kits } from './specs/wizards'
import { martial_professions } from './types'

const soldier_mod = 0.2

export const navy_occurrence: Profession['occurrence'] = ({ context }) =>
  !context.coastal || context.tribal ? 0 : context.city ? 0.5 : 0

const soldier_occurrence: Profession['occurrence'] = ({ context }) =>
  context.city ? 1 : context.remote ? 0.5 : context.tribal ? 0.2 : 0

const soldier_skills: Profession['skills'] = {
  primary: ['martial'],
  secondary: ['athletics', 'survival', 'perception'],
  tertiary: laborer_skills
}

const militia_skills: Profession['skills'] = {
  primary: ['martial', 'cultivation'],
  secondary: ['athletics', 'survival', 'perception'],
  tertiary: laborer_skills
}

const military_officer_skills: Profession['skills'] = {
  primary: ['logistics'],
  secondary: ['martial', 'oratory', 'intimidate'],
  tertiary: [...social_skills, ...worldly_skills]
}

const rebel__occurrence: Profession['occurrence'] = ({ context, time }) => {
  const loc = window.world.locations[context.idx]
  const stronghold = loc.traits.some(({ tag }) => tag === 'rebel stronghold')
  const region = window.world.regions[loc.region]
  const ongoing = region.rebellions.current !== -1
  const recent =
    window.world.rebellions[region.rebellions.past.slice(-1)[0]]?.end > time - recent_battle_window
  return stronghold || ongoing || recent ? 0.2 : 0
}

const soldier_title = (params: { title: string; spec: string }) => {
  const { title, spec } = params
  return title.replace('seasoned', spec)
}

const soldier_specialization: Profession['specialization'] = () => {
  return window.dice.weighted_choice([
    { v: 'infantry', w: 10 },
    { v: 'cavalry', w: 3 },
    { v: 'scout', w: 1 },
    { v: 'artillery', w: 1 },
    { v: 'sapper', w: 1 }
  ])
}

export const soldiers: Record<martial_professions, Profession> = {
  'soldier (military, recruit)': {
    key: 'soldier (military, recruit)',
    lifestyle: 'poor',
    category: 'soldiers',
    subcategory: 'military',
    skills: soldier_skills,
    ages: age_ranges.recruit
  },
  'soldier (military, seasoned)': {
    key: 'soldier (military, seasoned)',
    title: ({ spec }) => soldier_title({ title: 'soldier (military, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'soldiers',
    subcategory: 'military',
    occurrence: params => soldier_occurrence(params) * soldier_mod,
    specialization: soldier_specialization,
    progression: {
      'soldier (military, recruit)': { years: 3, weight: 10, transition: true },
      'soldier (rebels, seasoned)': { years: 1, weight: 1, transition: true },
      guard: { years: 3, weight: 1, transition: true },
      militia: { years: 3, weight: 1, transition: true },
      mercenary: { years: 3, weight: 1, transition: true }
    },
    skills: soldier_skills
  },
  'officer (military, minor)': {
    key: 'officer (military, minor)',
    lifestyle: 'comfortable',
    category: 'soldiers',
    subcategory: 'military',
    prevalence: 'rare',
    progression: {
      'soldier (military, seasoned)': { years: 10, weight: 10, transition: true },
      'gentry (major)': { years: 5, weight: 1, transition: false },
      'gentry (minor)': { years: 5, weight: 1, transition: false }
    },
    occurrence: params => soldier_occurrence(params) * soldier_mod,
    skills: military_officer_skills,
    ages: age_ranges.seasoned
  },
  'officer (military, major)': {
    key: 'officer (military, major)',
    lifestyle: 'prosperous',
    category: 'soldiers',
    subcategory: 'military',
    prevalence: 'rare',
    progression: {
      'officer (military, minor)': { years: 5, weight: 10, transition: true },
      'noble (minor)': { years: 5, weight: 1, transition: false },
      'gentry (major)': { years: 5, weight: 1, transition: false }
    },
    occurrence: params => soldier_occurrence(params) * soldier_mod,
    skills: military_officer_skills,
    ages: age_ranges.seasoned
  },
  'general (military)': {
    key: 'general (military)',
    lifestyle: 'rich',
    category: 'soldiers',
    progression: {
      'officer (military, major)': { years: 10, weight: 1, transition: true }
    },
    subcategory: 'military',
    skills: military_officer_skills,
    ages: age_ranges.master
  },
  'soldier (rebels, recruit)': {
    key: 'soldier (rebels, recruit)',
    lifestyle: 'poor',
    category: 'soldiers',
    subcategory: 'military',
    ages: age_ranges.recruit,
    skills: soldier_skills
  },
  'soldier (rebels, seasoned)': {
    key: 'soldier (rebels, seasoned)',
    title: ({ spec }) => soldier_title({ title: 'soldier (rebels, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'soldiers',
    subcategory: 'rebels',
    occurrence: params => rebel__occurrence(params) * soldier_mod,
    specialization: soldier_specialization,
    progression: {
      'soldier (rebels, recruit)': { years: 3, weight: 10, transition: true },
      'soldier (military, seasoned)': { years: 1, weight: 1, transition: true },
      guard: { years: 3, weight: 1, transition: true },
      militia: { years: 3, weight: 1, transition: true },
      mercenary: { years: 3, weight: 1, transition: true }
    },
    skills: soldier_skills
  },
  'officer (rebels, minor)': {
    key: 'officer (rebels, minor)',
    lifestyle: 'comfortable',
    category: 'soldiers',
    subcategory: 'rebels',
    prevalence: 'rare',
    progression: {
      'soldier (rebels, seasoned)': { years: 10, weight: 10, transition: true },
      'soldier (military, seasoned)': { years: 10, weight: 3, transition: true },
      'gentry (major)': { years: 5, weight: 1, transition: false },
      'gentry (minor)': { years: 5, weight: 1, transition: false }
    },
    occurrence: params => rebel__occurrence(params) * soldier_mod,
    skills: military_officer_skills,
    ages: age_ranges.seasoned
  },
  'officer (rebels, major)': {
    key: 'officer (rebels, major)',
    lifestyle: 'comfortable',
    category: 'soldiers',
    subcategory: 'rebels',
    prevalence: 'rare',
    progression: {
      'officer (rebels, minor)': { years: 5, weight: 10, transition: true },
      'officer (military, minor)': { years: 5, weight: 3, transition: true },
      'noble (minor)': { years: 5, weight: 1, transition: false },
      'gentry (major)': { years: 5, weight: 1, transition: false }
    },
    occurrence: params => rebel__occurrence(params) * soldier_mod,
    skills: military_officer_skills,
    ages: age_ranges.seasoned
  },
  'general (rebels)': {
    key: 'general (rebels)',
    lifestyle: 'rich',
    category: 'soldiers',
    progression: {
      'officer (rebels, major)': { years: 10, weight: 5, transition: true },
      'officer (military, major)': { years: 10, weight: 1, transition: true }
    },
    subcategory: 'military',
    skills: military_officer_skills,
    ages: age_ranges.master
  },
  militia: {
    key: 'militia',
    lifestyle: 'poor',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.urban ? 0 : 1.5),
    skills: militia_skills
  },
  'militia (captain)': {
    key: 'militia (captain)',
    lifestyle: 'modest',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'rare',
    progression: {
      'officer (military, minor)': { years: 1, weight: 1, transition: true },
      'soldier (military, seasoned)': { years: 1, weight: 1, transition: true },
      'soldier (military, recruit)': { years: 5, weight: 1, transition: true },
      guard: { years: 5, weight: 1, transition: true },
      militia: { years: 5, weight: 10, transition: true }
    },
    occurrence: ({ context }) => (context.urban ? 0 : 1.5),
    skills: military_officer_skills,
    ages: age_ranges.expert
  },
  guard: {
    key: 'guard',
    lifestyle: 'modest',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.urban ? 1.5 : 0),
    skills: soldier_skills
  },
  'guard (captain)': {
    key: 'guard (captain)',
    lifestyle: 'comfortable',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'rare',
    progression: {
      'officer (military, minor)': { years: 1, weight: 1, transition: true },
      'soldier (military, seasoned)': { years: 1, weight: 1, transition: true },
      'soldier (military, recruit)': { years: 5, weight: 1, transition: true },
      guard: { years: 5, weight: 10, transition: true }
    },
    occurrence: ({ context }) => (context.urban ? 1.5 : 0),
    skills: military_officer_skills,
    ages: age_ranges.expert
  },
  'guard (noble)': {
    key: 'guard (noble)',
    lifestyle: 'comfortable',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.urban ? 1 : 0),
    skills: soldier_skills
  },
  'guard (noble, captain)': {
    key: 'guard (noble, captain)',
    lifestyle: 'prosperous',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'rare',
    progression: {
      'officer (military, minor)': { years: 1, weight: 1, transition: true },
      'soldier (military, seasoned)': { years: 1, weight: 1, transition: true },
      'soldier (military, recruit)': { years: 5, weight: 1, transition: true },
      guard: { years: 5, weight: 10, transition: true }
    },
    occurrence: ({ context }) => (context.urban ? 1 : 0),
    skills: military_officer_skills,
    ages: age_ranges.expert
  },
  mercenary: {
    key: 'mercenary',
    title: ({ spec }) => `Mercenary (${spec})`,
    lifestyle: 'modest',
    category: 'soldiers',
    subcategory: 'mercenary',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.mercenaries ? 0.3 : 0.1),
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
  'mercenary (captain)': {
    key: 'mercenary (captain)',
    lifestyle: 'comfortable',
    category: 'soldiers',
    subcategory: 'mercenary',
    prevalence: 'rare',
    progression: {
      'officer (military, minor)': { years: 1, weight: 1, transition: true },
      'soldier (military, seasoned)': { years: 1, weight: 1, transition: true },
      'soldier (military, recruit)': { years: 5, weight: 1, transition: true },
      mercenary: { years: 5, weight: 10, transition: true }
    },
    occurrence: ({ context }) => (context.urban ? 1.5 : 0),
    skills: military_officer_skills,
    ages: age_ranges.expert
  }
}
