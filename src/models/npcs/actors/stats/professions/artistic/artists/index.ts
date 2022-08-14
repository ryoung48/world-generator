import { artisan_skills } from '../../../skills/categories'
import { gender_based_title } from '../../titles'
import { Profession } from '../../types'
import { artist_professions } from './types'

const rural_artists: Profession['occurrence'] = ({ context }) =>
  !context.urban || context.tribal ? 1 : 0.3
const urban_artists: Profession['occurrence'] = ({ context }) => (context.urban ? 1 : 0.1)
const urban_only: Profession['occurrence'] = ({ context }) => (context.urban ? 1 : 0)

const writer_occurrence: Profession['occurrence'] = params =>
  params.context.tribal ? 0 : urban_artists(params)

const artists_mod = 0.5

export const artists: Record<artist_professions, Profession> = {
  woodcarver: {
    key: 'woodcarver',
    category: 'artistic',
    subcategory: 'artists',
    lifestyle: 'modest',
    occurrence: params => rural_artists(params) * artists_mod,
    skills: {
      primary: ['carving'],
      tertiary: artisan_skills
    }
  },
  barber: {
    key: 'barber',
    category: 'artistic',
    subcategory: 'artists',
    lifestyle: 'modest',
    title: ({ actor }) => gender_based_title({ male: 'Barber', female: 'Stylist', actor }),
    occurrence: ({ context }) => (context.urban && !context.tribal ? 1 : 0.5) * artists_mod,
    skills: {
      primary: ['hair styling'],
      tertiary: artisan_skills
    }
  },
  artist: {
    key: 'artist',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => urban_artists(params) * artists_mod,
    skills: {
      primary: ['painting', 'sketching', 'engraving', 'sculpting', 'carving'],
      tertiary: artisan_skills
    }
  },
  painter: {
    key: 'painter',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => urban_artists(params) * artists_mod,
    skills: {
      primary: ['painting'],
      tertiary: artisan_skills
    }
  },
  potter: {
    key: 'potter',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: ({ context }) => (context.ceramics ? 1 : 0.5) * artists_mod,
    skills: {
      primary: ['pottery'],
      tertiary: artisan_skills
    }
  },
  sculptor: {
    key: 'sculptor',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => urban_artists(params) * artists_mod,
    skills: {
      primary: ['sculpting'],
      tertiary: artisan_skills
    }
  },
  tattooer: {
    key: 'tattooer',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => urban_artists(params) * artists_mod,
    skills: {
      primary: ['painting'],
      tertiary: artisan_skills
    }
  },
  cartographer: {
    key: 'cartographer',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => writer_occurrence(params) * artists_mod,
    skills: {
      primary: ['painting'],
      tertiary: artisan_skills
    }
  },
  illuminator: {
    key: 'illuminator',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => writer_occurrence(params) * artists_mod,
    skills: {
      primary: ['painting'],
      tertiary: artisan_skills
    }
  },
  writer: {
    key: 'writer',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => writer_occurrence(params) * artists_mod,
    skills: {
      primary: ['literature'],
      secondary: ['scribing'],
      tertiary: artisan_skills
    }
  },
  poet: {
    key: 'poet',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => writer_occurrence(params) * artists_mod,
    skills: {
      primary: ['literature'],
      secondary: ['scribing'],
      tertiary: artisan_skills
    }
  },
  calligrapher: {
    key: 'calligrapher',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => writer_occurrence(params) * artists_mod,
    skills: {
      primary: ['scribing'],
      tertiary: artisan_skills
    }
  },
  curator: {
    key: 'curator',
    lifestyle: 'comfortable',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => urban_only(params) * artists_mod,
    skills: {
      primary: ['history'],
      secondary: ['painting'],
      tertiary: artisan_skills
    }
  }
}
