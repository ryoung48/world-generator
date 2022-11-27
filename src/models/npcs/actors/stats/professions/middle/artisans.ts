import { location__context } from '../../../../../regions/locations/context'
import { LocationContext } from '../../../../../regions/locations/context/types'
import { Profession, ProfessionSkillKits } from '../types'
import { ArtisanSpecializations } from './types'

type Occurrence = Profession['occurrence']

const smithingOccurrence: Occurrence = ({ context }) =>
  context.smiths ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const goldOccurrence: Occurrence = ({ context }) =>
  context.gold ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const jewelsOccurrence: Occurrence = ({ context }) =>
  context.jewels ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const glassOccurrence: Occurrence = ({ context }) =>
  context.glass ? 1.5 : context.urban ? 1 : !context.tribal ? 0.1 : 0
const mechanicsOccurrence: Occurrence = ({ context }) =>
  context.mechanics ? 1.5 : !context.tribal && context.urban ? 1 : 0
const herbsOccurrence: Occurrence = ({ context }) => (context.herbs ? 1 : 0.5)
const woodworkOccurrence: Occurrence = ({ context }) =>
  context.woodwork ? 1.5 : context.urban ? 1 : 0.1
const leatherOccurrence: Occurrence = ({ context }) =>
  context.leather || context.fur ? 1.5 : context.urban ? 1 : 0.1
const textileOccurrence: Occurrence = ({ context }) =>
  context.textiles ? 1.5 : context.urban ? 1 : 0.1

const specializations: Record<
  ArtisanSpecializations,
  {
    occurrence: Profession['occurrence']
    skills: ProfessionSkillKits
    key: ArtisanSpecializations
  }
> = {
  alchemist: {
    key: 'alchemist',
    occurrence: ({ context }) => (context.alchemy ? 1.5 : context.urban ? 1 : 0),
    skills: {
      primary: ['alchemy'],
      secondary: ['nature', 'survival', 'medicine']
    }
  },
  artificer: {
    key: 'artificer',
    occurrence: ({ context }) => (context.arcane ? 1 : context.city ? 0.5 : 0),
    skills: {
      primary: ['arcana']
    }
  },
  baker: {
    key: 'baker',
    occurrence: ({ context }) => (context.grain ? 1 : 0.5),
    skills: {
      primary: ['baking']
    }
  },
  blacksmith: {
    key: 'blacksmith',
    occurrence: params => smithingOccurrence(params),
    skills: {
      primary: ['blacksmithing']
    }
  },
  brewer: {
    key: 'brewer',
    occurrence: ({ context }) => (context.alcohol || context.grain ? 1 : 0.5),
    skills: {
      primary: ['brewing'],
      secondary: ['cultivation']
    }
  },
  butcher: {
    key: 'butcher',
    occurrence: ({ context }) => (context.herders ? 1 : 0.5),
    skills: {
      primary: ['cooking'],
      secondary: ['animal (handling)']
    }
  },
  cobbler: {
    key: 'cobbler',
    occurrence: ({ context }) => (context.urban ? 1 : 0.2),
    skills: {
      primary: ['cobbling']
    }
  },
  distiller: {
    key: 'distiller',
    occurrence: ({ context }) => (context.alcohol ? 0.6 : 0.3),
    skills: {
      primary: ['distillation'],
      secondary: ['cultivation']
    }
  },
  fletcher: {
    key: 'fletcher',
    occurrence: params => woodworkOccurrence(params),
    skills: {
      primary: ['fletching'],
      secondary: ['survival']
    }
  },
  glassblower: {
    key: 'glassblower',
    occurrence: params => glassOccurrence(params),
    skills: {
      primary: ['glazing']
    }
  },
  goldsmith: {
    key: 'goldsmith',
    occurrence: params => goldOccurrence(params),
    skills: {
      primary: ['whitesmithing']
    }
  },
  herbalist: {
    key: 'herbalist',
    occurrence: params => herbsOccurrence(params),
    skills: {
      primary: ['medicine'],
      secondary: ['survival', 'alchemy', 'nature']
    }
  },
  jeweler: {
    key: 'jeweler',
    occurrence: params => jewelsOccurrence(params),
    skills: {
      primary: ['jeweling']
    }
  },
  leatherworker: {
    key: 'leatherworker',
    occurrence: params => leatherOccurrence(params),
    skills: {
      primary: ['leatherworking']
    }
  },
  locksmith: {
    key: 'locksmith',
    occurrence: ({ context }) => (context.urban ? 1 : 0),
    skills: {
      primary: ['mechanics']
    }
  },
  shipwright: {
    key: 'shipwright',
    occurrence: ({ context }) => (context.coastal && context.urban ? 1 : 0),
    skills: {
      primary: ['carpentry'],
      secondary: ['seafaring']
    }
  },
  silversmith: {
    key: 'silversmith',
    occurrence: params => goldOccurrence(params),
    skills: {
      primary: ['whitesmithing']
    }
  },
  tailor: {
    key: 'tailor',
    occurrence: params => textileOccurrence(params),
    skills: {
      primary: ['tailoring']
    }
  },
  tanner: {
    key: 'tanner',
    occurrence: ({ context }) => (context.herders ? 1.5 : 0.5),
    skills: {
      primary: ['leatherworking']
    }
  },
  mechanic: {
    key: 'mechanic',
    occurrence: params => mechanicsOccurrence(params),
    skills: {
      primary: ['mechanics']
    }
  },
  vintner: {
    key: 'vintner',
    occurrence: ({ context }) =>
      context.alcohol || context.grapes ? 1 : !context.tribal ? 0.5 : 0,
    skills: {
      primary: ['vintner'],
      secondary: ['cultivation']
    }
  },
  weaver: {
    key: 'weaver',
    occurrence: params => textileOccurrence(params),
    skills: {
      primary: ['weaving']
    }
  }
}

const unpackOccurrence = (
  occurrence: Profession['occurrence'],
  params: { context: LocationContext; time: number }
) => (typeof occurrence === 'number' ? occurrence : occurrence(params))

export const artisans: Pick<Profession, 'occurrence' | 'skills' | 'specialization'> = {
  occurrence: params =>
    Math.max(
      ...Object.values(specializations).map(({ occurrence }) =>
        unpackOccurrence(occurrence, params)
      )
    ),
  skills: ({ occupation }) => {
    const spec = occupation.spec as ArtisanSpecializations
    return specializations[spec].skills
  },
  specialization: ({ actor }) => {
    const loc = window.world.locations[actor.location.curr]
    const context = location__context(loc)
    return window.dice.weightedChoice(
      Object.values(specializations).map(({ occurrence, key }) => ({
        w: unpackOccurrence(occurrence, { context, time: window.world.date }),
        v: key
      }))
    )
  }
}
