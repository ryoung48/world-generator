import { artisan_skills, laborer_skills } from '../../skills/categories'
import { gender_based_title } from '../titles'
import { Profession } from '../types'
import { craftsman_professions } from './types'

const smithing_occurrence: Profession['occurrence'] = ({ context }) =>
  context.smiths ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const gold_occurrence: Profession['occurrence'] = ({ context }) =>
  context.gold ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const jewels_occurrence: Profession['occurrence'] = ({ context }) =>
  context.jewels ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const glass_occurrence: Profession['occurrence'] = ({ context }) =>
  context.glass ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const mechanics_occurrence: Profession['occurrence'] = ({ context }) =>
  context.mechanics ? 1.5 : !context.tribal && context.urban ? 1 : 0
const herbs_occurrence: Profession['occurrence'] = ({ context }) => (context.herbs ? 1 : 0.5)
const woodwork_occurrence: Profession['occurrence'] = ({ context }) =>
  context.woodwork ? 1.5 : context.urban ? 1 : 0.1
const leather_occurrence: Profession['occurrence'] = ({ context }) =>
  context.leather || context.fur ? 1.5 : context.urban ? 1 : 0.1
const textile_occurrence: Profession['occurrence'] = ({ context }) =>
  context.textiles ? 1.5 : context.urban ? 1 : 0.1

export const craftsman: Record<craftsman_professions, Profession> = {
  alchemist: {
    category: 'artisans',
    key: 'alchemist',
    occurrence: ({ context }) => (context.alchemy ? 1.5 : context.urban ? 1 : 0),
    prevalence: 'uncommon',
    skills: {
      primary: ['alchemy'],
      secondary: ['nature', 'survival', 'medicine'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'alchemical'
  },
  architect: {
    category: 'laborers',
    key: 'architect',
    occurrence: ({ context }) =>
      context.woodwork || context.stone ? 1 : !context.tribal && context.urban ? 0.5 : 0,
    skills: {
      primary: ['architecture'],
      secondary: ['masonry', 'carpentry'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'construction'
  },
  armorer: {
    category: 'artisans',
    key: 'armorer',
    occurrence: params => smithing_occurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['blacksmithing'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'blacksmithing'
  },
  artificer: {
    category: 'artisans',
    key: 'artificer',
    occurrence: params => smithing_occurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['arcana'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'blacksmithing'
  },
  baker: {
    category: 'artisans',
    key: 'baker',
    occurrence: ({ context }) => (context.grain ? 1 : 0.5),
    skills: {
      primary: ['baking'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'produce'
  },
  'basket weaver': {
    category: 'artisans',
    key: 'basket weaver',
    occurrence: ({ context }) => (!context.urban || context.tribal ? 1 : 0.3),
    prevalence: 'uncommon',
    skills: {
      primary: ['basketry'],
      tertiary: artisan_skills
    },
    lifestyle: 'modest'
  },
  blacksmith: {
    category: 'artisans',
    key: 'blacksmith',
    occurrence: params => smithing_occurrence(params),
    skills: {
      primary: ['blacksmithing'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'blacksmithing'
  },
  brewer: {
    category: 'artisans',
    key: 'brewer',
    occurrence: ({ context }) => (context.alcohol || context.grain ? 1 : !context.tribal ? 0.5 : 0),
    skills: {
      primary: ['brewing'],
      secondary: ['cultivation'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'produce'
  },
  butcher: {
    category: 'artisans',
    key: 'butcher',
    occurrence: ({ context }) => (context.herders ? 1 : 0.5),
    skills: {
      primary: ['cooking'],
      secondary: ['animal handling'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'produce'
  },
  cartwright: {
    category: 'artisans',
    key: 'cartwright',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban ? 1 : 0.1),
    skills: {
      primary: ['carpentry'],
      tertiary: laborer_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'woodworking'
  },
  clockmaker: {
    category: 'artisans',
    key: 'clockmaker',
    occurrence: params => mechanics_occurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['mechanics'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'mechanics'
  },
  cobbler: {
    category: 'artisans',
    key: 'cobbler',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    skills: {
      primary: ['cobbling'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'leatherworking'
  },
  distiller: {
    category: 'artisans',
    key: 'distiller',
    occurrence: ({ context }) => (context.alcohol ? 0.6 : 0.3),
    skills: {
      primary: ['distillation'],
      secondary: ['cultivation'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'produce'
  },
  fletcher: {
    category: 'artisans',
    key: 'fletcher',
    occurrence: params => woodwork_occurrence(params),
    skills: {
      primary: ['fletching'],
      secondary: ['survival'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable'
  },
  florist: {
    category: 'artisans',
    key: 'florist',
    occurrence: params => herbs_occurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['cultivation'],
      secondary: ['nature', 'survival', 'medicine'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable'
  },
  glassblower: {
    category: 'artisans',
    key: 'glassblower',
    occurrence: params => glass_occurrence(params),
    skills: {
      primary: ['glazing'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable'
  },
  goldsmith: {
    category: 'artisans',
    key: 'goldsmith',
    occurrence: params => gold_occurrence(params),
    skills: {
      primary: ['whitesmithing'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'whitesmithing'
  },
  gunsmith: {
    category: 'artisans',
    key: 'gunsmith',
    occurrence: params => mechanics_occurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['blacksmithing'],
      secondary: ['mechanics'],
      tertiary: [...artisan_skills, 'mechanics']
    },
    lifestyle: 'comfortable',
    subcategory: 'mechanics'
  },
  herbalist: {
    category: 'artisans',
    key: 'herbalist',
    occurrence: params => herbs_occurrence(params),
    skills: {
      primary: ['medicine'],
      secondary: ['survival', 'alchemy', 'nature'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'alchemical'
  },
  jeweler: {
    category: 'artisans',
    key: 'jeweler',
    occurrence: params => jewels_occurrence(params),
    skills: {
      primary: ['jeweling'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable'
  },
  leatherworker: {
    category: 'artisans',
    key: 'leatherworker',
    occurrence: params => leather_occurrence(params),
    skills: {
      primary: ['leatherworking'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'leatherworking'
  },
  locksmith: {
    category: 'artisans',
    key: 'locksmith',
    occurrence: ({ context }) => (context.urban ? 1 : 0),
    prevalence: 'uncommon',
    skills: {
      primary: ['mechanics'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'mechanics'
  },
  perfumer: {
    category: 'artisans',
    key: 'perfumer',
    occurrence: ({ context }) => (context.cosmetics ? 1.5 : context.urban ? 1 : 0),
    prevalence: 'uncommon',
    skills: {
      primary: ['alchemy'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'alchemical'
  },
  rugmaker: {
    category: 'artisans',
    key: 'rugmaker',
    occurrence: params => textile_occurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['weaving'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'textiles'
  },
  sailmaker: {
    category: 'artisans',
    key: 'sailmaker',
    occurrence: params => (params.context.coastal ? textile_occurrence(params) : 0),
    prevalence: 'uncommon',
    skills: {
      primary: ['weaving'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'textiles'
  },
  shipwright: {
    category: 'artisans',
    key: 'shipwright',
    occurrence: ({ context }) => (context.remote ? 0 : context.coastal && context.urban ? 1 : 0),
    skills: {
      primary: ['carpentry'],
      secondary: ['seafaring'],
      tertiary: laborer_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'woodworking'
  },
  silversmith: {
    category: 'artisans',
    key: 'silversmith',
    occurrence: params => gold_occurrence(params),
    skills: {
      primary: ['whitesmithing'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'whitesmithing'
  },
  surgeon: {
    category: 'artisans',
    key: 'surgeon',
    occurrence: ({ context }) => (context.urban ? 1 : 0.1),
    skills: {
      primary: ['medicine'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable'
  },
  tailor: {
    category: 'artisans',
    key: 'tailor',
    occurrence: params => textile_occurrence(params),
    skills: {
      primary: ['tailoring'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'textiles',
    title: ({ actor }) =>
      gender_based_title({
        male: 'Tailor',
        female: 'Seamstress',
        actor
      })
  },
  tanner: {
    category: 'artisans',
    key: 'tanner',
    occurrence: ({ context }) => (context.herders ? 1.5 : 0.5),
    skills: {
      primary: ['leatherworking'],
      tertiary: laborer_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'leatherworking'
  },
  tinkerer: {
    category: 'artisans',
    key: 'tinkerer',
    occurrence: params => mechanics_occurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['mechanics'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'mechanics'
  },
  vintner: {
    category: 'artisans',
    key: 'vintner',
    occurrence: ({ context }) =>
      context.alcohol || context.grapes ? 1 : !context.tribal ? 0.5 : 0,
    skills: {
      primary: ['vintner'],
      secondary: ['cultivation'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'produce'
  },
  weaponsmith: {
    category: 'artisans',
    key: 'weaponsmith',
    occurrence: params => smithing_occurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['blacksmithing'],
      tertiary: artisan_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'blacksmithing'
  },
  weaver: {
    category: 'artisans',
    key: 'weaver',
    occurrence: params => textile_occurrence(params),
    skills: {
      primary: ['weaving'],
      tertiary: laborer_skills
    },
    lifestyle: 'comfortable',
    subcategory: 'textiles'
  }
}
