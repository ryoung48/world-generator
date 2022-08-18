import { artisanSkills, laborerSkills } from '../../skills/categories'
import { genderBasedTitle } from '../titles'
import { Profession } from '../types'
import { CraftsmanProfessions } from './types'

const smithingOccurrence: Profession['occurrence'] = ({ context }) =>
  context.smiths ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const goldOccurrence: Profession['occurrence'] = ({ context }) =>
  context.gold ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const jewelsOccurrence: Profession['occurrence'] = ({ context }) =>
  context.jewels ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const glassOccurrence: Profession['occurrence'] = ({ context }) =>
  context.glass ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const mechanicsOccurrence: Profession['occurrence'] = ({ context }) =>
  context.mechanics ? 1.5 : !context.tribal && context.urban ? 1 : 0
const herbsOccurrence: Profession['occurrence'] = ({ context }) => (context.herbs ? 1 : 0.5)
const woodworkOccurrence: Profession['occurrence'] = ({ context }) =>
  context.woodwork ? 1.5 : context.urban ? 1 : 0.1
const leatherOccurrence: Profession['occurrence'] = ({ context }) =>
  context.leather || context.fur ? 1.5 : context.urban ? 1 : 0.1
const textileOccurrence: Profession['occurrence'] = ({ context }) =>
  context.textiles ? 1.5 : context.urban ? 1 : 0.1

export const craftsman: Record<CraftsmanProfessions, Profession> = {
  alchemist: {
    category: 'artisans',
    key: 'alchemist',
    occurrence: ({ context }) => (context.alchemy ? 1.5 : context.urban ? 1 : 0),
    prevalence: 'uncommon',
    skills: {
      primary: ['alchemy'],
      secondary: ['nature', 'survival', 'medicine'],
      tertiary: artisanSkills
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
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'construction'
  },
  armorer: {
    category: 'artisans',
    key: 'armorer',
    occurrence: params => smithingOccurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['blacksmithing'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'blacksmithing'
  },
  artificer: {
    category: 'artisans',
    key: 'artificer',
    occurrence: params => smithingOccurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['arcana'],
      tertiary: artisanSkills
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
      tertiary: artisanSkills
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
      tertiary: artisanSkills
    },
    lifestyle: 'modest'
  },
  blacksmith: {
    category: 'artisans',
    key: 'blacksmith',
    occurrence: params => smithingOccurrence(params),
    skills: {
      primary: ['blacksmithing'],
      tertiary: artisanSkills
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
      tertiary: artisanSkills
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
      tertiary: artisanSkills
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
      tertiary: laborerSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'woodworking'
  },
  clockmaker: {
    category: 'artisans',
    key: 'clockmaker',
    occurrence: params => mechanicsOccurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['mechanics'],
      tertiary: artisanSkills
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
      tertiary: artisanSkills
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
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'produce'
  },
  fletcher: {
    category: 'artisans',
    key: 'fletcher',
    occurrence: params => woodworkOccurrence(params),
    skills: {
      primary: ['fletching'],
      secondary: ['survival'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable'
  },
  florist: {
    category: 'artisans',
    key: 'florist',
    occurrence: params => herbsOccurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['cultivation'],
      secondary: ['nature', 'survival', 'medicine'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable'
  },
  glassblower: {
    category: 'artisans',
    key: 'glassblower',
    occurrence: params => glassOccurrence(params),
    skills: {
      primary: ['glazing'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable'
  },
  goldsmith: {
    category: 'artisans',
    key: 'goldsmith',
    occurrence: params => goldOccurrence(params),
    skills: {
      primary: ['whitesmithing'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'whitesmithing'
  },
  gunsmith: {
    category: 'artisans',
    key: 'gunsmith',
    occurrence: params => mechanicsOccurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['blacksmithing'],
      secondary: ['mechanics'],
      tertiary: [...artisanSkills, 'mechanics']
    },
    lifestyle: 'comfortable',
    subcategory: 'mechanics'
  },
  herbalist: {
    category: 'artisans',
    key: 'herbalist',
    occurrence: params => herbsOccurrence(params),
    skills: {
      primary: ['medicine'],
      secondary: ['survival', 'alchemy', 'nature'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'alchemical'
  },
  jeweler: {
    category: 'artisans',
    key: 'jeweler',
    occurrence: params => jewelsOccurrence(params),
    skills: {
      primary: ['jeweling'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable'
  },
  leatherworker: {
    category: 'artisans',
    key: 'leatherworker',
    occurrence: params => leatherOccurrence(params),
    skills: {
      primary: ['leatherworking'],
      tertiary: artisanSkills
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
      tertiary: artisanSkills
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
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'alchemical'
  },
  rugmaker: {
    category: 'artisans',
    key: 'rugmaker',
    occurrence: params => textileOccurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['weaving'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'textiles'
  },
  sailmaker: {
    category: 'artisans',
    key: 'sailmaker',
    occurrence: params => (params.context.coastal ? textileOccurrence(params) : 0),
    prevalence: 'uncommon',
    skills: {
      primary: ['weaving'],
      tertiary: artisanSkills
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
      tertiary: laborerSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'woodworking'
  },
  silversmith: {
    category: 'artisans',
    key: 'silversmith',
    occurrence: params => goldOccurrence(params),
    skills: {
      primary: ['whitesmithing'],
      tertiary: artisanSkills
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
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable'
  },
  tailor: {
    category: 'artisans',
    key: 'tailor',
    occurrence: params => textileOccurrence(params),
    skills: {
      primary: ['tailoring'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'textiles',
    title: ({ actor }) =>
      genderBasedTitle({
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
      tertiary: laborerSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'leatherworking'
  },
  tinkerer: {
    category: 'artisans',
    key: 'tinkerer',
    occurrence: params => mechanicsOccurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['mechanics'],
      tertiary: artisanSkills
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
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'produce'
  },
  weaponsmith: {
    category: 'artisans',
    key: 'weaponsmith',
    occurrence: params => smithingOccurrence(params),
    prevalence: 'uncommon',
    skills: {
      primary: ['blacksmithing'],
      tertiary: artisanSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'blacksmithing'
  },
  weaver: {
    category: 'artisans',
    key: 'weaver',
    occurrence: params => textileOccurrence(params),
    skills: {
      primary: ['weaving'],
      tertiary: laborerSkills
    },
    lifestyle: 'comfortable',
    subcategory: 'textiles'
  }
}
