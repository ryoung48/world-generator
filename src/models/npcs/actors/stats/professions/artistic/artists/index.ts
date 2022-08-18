import { artisanSkills } from '../../../skills/categories'
import { genderBasedTitle } from '../../titles'
import { Profession } from '../../types'
import { ArtistProfessions } from './types'

const ruralArtists: Profession['occurrence'] = ({ context }) =>
  !context.urban || context.tribal ? 1 : 0.3
const urbanArtists: Profession['occurrence'] = ({ context }) => (context.urban ? 1 : 0.1)
const urbanOnly: Profession['occurrence'] = ({ context }) => (context.urban ? 1 : 0)

const writerOccurrence: Profession['occurrence'] = params =>
  params.context.tribal ? 0 : urbanArtists(params)

const artistsMod = 0.5

export const artists: Record<ArtistProfessions, Profession> = {
  woodcarver: {
    key: 'woodcarver',
    category: 'artistic',
    subcategory: 'artists',
    lifestyle: 'modest',
    occurrence: params => ruralArtists(params) * artistsMod,
    skills: {
      primary: ['carving'],
      tertiary: artisanSkills
    }
  },
  barber: {
    key: 'barber',
    category: 'artistic',
    subcategory: 'artists',
    lifestyle: 'modest',
    title: ({ actor }) => genderBasedTitle({ male: 'Barber', female: 'Stylist', actor }),
    occurrence: ({ context }) => (context.urban && !context.tribal ? 1 : 0.5) * artistsMod,
    skills: {
      primary: ['hair styling'],
      tertiary: artisanSkills
    }
  },
  artist: {
    key: 'artist',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => urbanArtists(params) * artistsMod,
    skills: {
      primary: ['painting', 'sketching', 'engraving', 'sculpting', 'carving'],
      tertiary: artisanSkills
    }
  },
  painter: {
    key: 'painter',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => urbanArtists(params) * artistsMod,
    skills: {
      primary: ['painting'],
      tertiary: artisanSkills
    }
  },
  potter: {
    key: 'potter',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: ({ context }) => (context.ceramics ? 1 : 0.5) * artistsMod,
    skills: {
      primary: ['pottery'],
      tertiary: artisanSkills
    }
  },
  sculptor: {
    key: 'sculptor',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => urbanArtists(params) * artistsMod,
    skills: {
      primary: ['sculpting'],
      tertiary: artisanSkills
    }
  },
  tattooer: {
    key: 'tattooer',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => urbanArtists(params) * artistsMod,
    skills: {
      primary: ['painting'],
      tertiary: artisanSkills
    }
  },
  cartographer: {
    key: 'cartographer',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => writerOccurrence(params) * artistsMod,
    skills: {
      primary: ['painting'],
      tertiary: artisanSkills
    }
  },
  illuminator: {
    key: 'illuminator',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => writerOccurrence(params) * artistsMod,
    skills: {
      primary: ['painting'],
      tertiary: artisanSkills
    }
  },
  writer: {
    key: 'writer',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => writerOccurrence(params) * artistsMod,
    skills: {
      primary: ['literature'],
      secondary: ['scribing'],
      tertiary: artisanSkills
    }
  },
  poet: {
    key: 'poet',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    occurrence: params => writerOccurrence(params) * artistsMod,
    skills: {
      primary: ['literature'],
      secondary: ['scribing'],
      tertiary: artisanSkills
    }
  },
  calligrapher: {
    key: 'calligrapher',
    lifestyle: 'modest',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => writerOccurrence(params) * artistsMod,
    skills: {
      primary: ['scribing'],
      tertiary: artisanSkills
    }
  },
  curator: {
    key: 'curator',
    lifestyle: 'comfortable',
    category: 'artistic',
    subcategory: 'artists',
    prevalence: 'uncommon',
    occurrence: params => urbanOnly(params) * artistsMod,
    skills: {
      primary: ['history'],
      secondary: ['painting'],
      tertiary: artisanSkills
    }
  }
}
