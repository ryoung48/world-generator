import { recentBattleWindow } from '../../../../../history/events/war/battles'
import { ageRanges } from '../../age/life_phases'
import { laborerSkills, socialSkills, worldlySkills } from '../../skills/categories'
import { Profession } from '../types'
import { fighterKits } from './specs/fighters'
import { rangerKits } from './specs/ranger'
import { rogueKits } from './specs/rogues'
import { wizardKits } from './specs/wizards'
import { MartialProfessions } from './types'

const soldierMod = 0.2

export const navyOccurrence: Profession['occurrence'] = ({ context }) =>
  !context.coastal || context.tribal ? 0 : context.city ? 0.5 : 0

const soldierOccurrence: Profession['occurrence'] = ({ context }) =>
  context.city ? 1 : context.remote ? 0.5 : context.tribal ? 0.2 : 0

const soldierSkills: Profession['skills'] = {
  primary: ['martial'],
  secondary: ['athletics', 'survival', 'perception'],
  tertiary: laborerSkills
}

const militiaSkills: Profession['skills'] = {
  primary: ['martial', 'cultivation'],
  secondary: ['athletics', 'survival', 'perception'],
  tertiary: laborerSkills
}

const militaryOfficerSkills: Profession['skills'] = {
  primary: ['logistics'],
  secondary: ['martial', 'oratory', 'intimidate'],
  tertiary: [...socialSkills, ...worldlySkills]
}

const rebel__occurrence: Profession['occurrence'] = ({ context, time }) => {
  const loc = window.world.locations[context.idx]
  const stronghold = loc.traits.some(({ tag }) => tag === 'rebel stronghold')
  const region = window.world.regions[loc.region]
  const ongoing = region.rebellions.current !== -1
  const recent =
    window.world.rebellions[region.rebellions.past.slice(-1)[0]]?.end > time - recentBattleWindow
  return stronghold || ongoing || recent ? 0.2 : 0
}

const soldierTitle = (params: { title: string; spec: string }) => {
  const { title, spec } = params
  return title.replace('seasoned', spec)
}

const soldierSpecialization: Profession['specialization'] = () => {
  return window.dice.weightedChoice([
    { v: 'infantry', w: 10 },
    { v: 'cavalry', w: 3 },
    { v: 'scout', w: 1 },
    { v: 'artillery', w: 1 },
    { v: 'sapper', w: 1 }
  ])
}

export const soldiers: Record<MartialProfessions, Profession> = {
  'soldier (military, recruit)': {
    key: 'soldier (military, recruit)',
    lifestyle: 'poor',
    category: 'soldiers',
    subcategory: 'military',
    skills: soldierSkills,
    ages: ageRanges.recruit
  },
  'soldier (military, seasoned)': {
    key: 'soldier (military, seasoned)',
    title: ({ spec }) => soldierTitle({ title: 'soldier (military, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'soldiers',
    subcategory: 'military',
    occurrence: params => soldierOccurrence(params) * soldierMod,
    specialization: soldierSpecialization,
    progression: {
      'soldier (military, recruit)': { years: 3, weight: 10, transition: true },
      'soldier (rebels, seasoned)': { years: 1, weight: 1, transition: true },
      guard: { years: 3, weight: 1, transition: true },
      militia: { years: 3, weight: 1, transition: true },
      mercenary: { years: 3, weight: 1, transition: true }
    },
    skills: soldierSkills
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
    occurrence: params => soldierOccurrence(params) * soldierMod,
    skills: militaryOfficerSkills,
    ages: ageRanges.seasoned
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
    occurrence: params => soldierOccurrence(params) * soldierMod,
    skills: militaryOfficerSkills,
    ages: ageRanges.seasoned
  },
  'general (military)': {
    key: 'general (military)',
    lifestyle: 'rich',
    category: 'soldiers',
    progression: {
      'officer (military, major)': { years: 10, weight: 1, transition: true }
    },
    subcategory: 'military',
    skills: militaryOfficerSkills,
    ages: ageRanges.master
  },
  'soldier (rebels, recruit)': {
    key: 'soldier (rebels, recruit)',
    lifestyle: 'poor',
    category: 'soldiers',
    subcategory: 'military',
    ages: ageRanges.recruit,
    skills: soldierSkills
  },
  'soldier (rebels, seasoned)': {
    key: 'soldier (rebels, seasoned)',
    title: ({ spec }) => soldierTitle({ title: 'soldier (rebels, seasoned)', spec }),
    lifestyle: 'modest',
    category: 'soldiers',
    subcategory: 'rebels',
    occurrence: params => rebel__occurrence(params) * soldierMod,
    specialization: soldierSpecialization,
    progression: {
      'soldier (rebels, recruit)': { years: 3, weight: 10, transition: true },
      'soldier (military, seasoned)': { years: 1, weight: 1, transition: true },
      guard: { years: 3, weight: 1, transition: true },
      militia: { years: 3, weight: 1, transition: true },
      mercenary: { years: 3, weight: 1, transition: true }
    },
    skills: soldierSkills
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
    occurrence: params => rebel__occurrence(params) * soldierMod,
    skills: militaryOfficerSkills,
    ages: ageRanges.seasoned
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
    occurrence: params => rebel__occurrence(params) * soldierMod,
    skills: militaryOfficerSkills,
    ages: ageRanges.seasoned
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
    skills: militaryOfficerSkills,
    ages: ageRanges.master
  },
  militia: {
    key: 'militia',
    lifestyle: 'poor',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.urban ? 0 : 1.5),
    skills: militiaSkills
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
    skills: militaryOfficerSkills,
    ages: ageRanges.expert
  },
  guard: {
    key: 'guard',
    lifestyle: 'modest',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.urban ? 1.5 : 0),
    skills: soldierSkills
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
    skills: militaryOfficerSkills,
    ages: ageRanges.expert
  },
  'guard (noble)': {
    key: 'guard (noble)',
    lifestyle: 'comfortable',
    category: 'soldiers',
    subcategory: 'guards',
    prevalence: 'uncommon',
    occurrence: ({ context }) => (context.urban ? 1 : 0),
    skills: soldierSkills
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
    skills: militaryOfficerSkills,
    ages: ageRanges.expert
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
    skills: militaryOfficerSkills,
    ages: ageRanges.expert
  }
}
