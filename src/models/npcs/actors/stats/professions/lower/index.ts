import { location__context } from '../../../../../regions/locations/context'
import { genderBasedTitle } from '../titles'
import { Profession } from '../types'
import { LowerStratum } from './types'

export const professions__lower: Record<LowerStratum, Profession> = {
  farmer: {
    key: 'farmer',
    stratum: 'lower',
    occurrence: ({ context }) => {
      let mod = 1
      if (context.grain || context.vegetables) mod *= 2
      if (context.remote) mod = 0
      if (context.urban) mod /= 2
      if (context.city) mod /= 2
      return mod * 4
    },
    skills: {
      primary: ['cultivation'],
      secondary: ['animal (handling)']
    }
  },
  herdsman: {
    key: 'herdsman',
    stratum: 'lower',
    occurrence: ({ context }) =>
      context.herders ? (context.remote ? 3 : 1.5) : context.tribal ? 0.5 : 0,
    skills: {
      primary: ['animal (handling)']
    },
    title: ({ actor }) =>
      genderBasedTitle({
        male: 'Herdsman',
        female: 'Herdswoman',
        actor
      })
  },
  fisherman: {
    key: 'fisherman',
    stratum: 'lower',
    occurrence: ({ context }) => (context.coastal ? (context.remote ? 3 : 1.5) : 0),
    skills: {
      primary: ['seafaring']
    },
    title: ({ actor }) =>
      genderBasedTitle({
        male: 'Fisherman',
        female: 'Fisherwoman',
        actor
      })
  },
  miner: {
    key: 'miner',
    stratum: 'lower',
    occurrence: ({ context }) => (context.remote ? 0 : context.mining ? 2 : 0),
    skills: {
      primary: ['mining']
    }
  },
  lumberjack: {
    key: 'lumberjack',
    stratum: 'lower',
    occurrence: ({ context }) => (context.remote ? 0 : context.lumber ? 2 : 0),
    skills: {
      primary: ['woodcutting']
    }
  },
  laborer: {
    key: 'laborer',
    stratum: 'lower',
    occurrence: ({ context }) => (context.remote ? 0 : context.urban ? 1 : 0.1),
    skills: {
      primary: ['masonry', 'carpentry', 'athletics']
    }
  },
  servant: {
    key: 'servant',
    stratum: 'lower',
    occurrence: ({ context }) => (context.remote ? 0 : !context.urban ? 0.5 : 1),
    skills: {
      primary: ['housekeeping']
    }
  },
  criminal: {
    key: 'criminal',
    stratum: 'lower',
    occurrence: ({ context }) => (context.city ? 0.5 : context.urban ? 0.25 : 0),
    skills: {
      primary: ['streetwise'],
      secondary: ['martial', 'bluff']
    }
  },
  missionary: {
    key: 'missionary',
    stratum: 'lower',
    occurrence: ({ context }) => (context.city ? 0.5 : context.urban ? 0.25 : 0),
    skills: {
      primary: ['theology'],
      secondary: ['teaching']
    }
  },
  sailor: {
    key: 'sailor',
    stratum: 'lower',
    occurrence: ({ context }) => (!context.coastal || context.remote ? 0 : context.urban ? 1 : 0.1),
    skills: {
      primary: ['seafaring']
    }
  },
  'dock worker': {
    key: 'dock worker',
    stratum: 'lower',
    occurrence: ({ context }) => (!context.coastal || context.remote ? 0 : context.city ? 0.5 : 0),
    skills: {
      primary: ['athletics'],
      secondary: ['seafaring']
    }
  },
  'soldier (military)': {
    key: 'soldier (military)',
    stratum: 'lower',
    occurrence: ({ context }) =>
      (context.city ? 1 : context.remote ? 0.5 : context.tribal ? 0.2 : 0) * 0.2,
    skills: {
      primary: ['martial'],
      secondary: ['athletics', 'survival', 'perception']
    }
  },
  mercenary: {
    key: 'mercenary',
    stratum: 'lower',
    title: ({ spec }) => `Mercenary (${spec})`,
    occurrence: ({ context }) => (context.mercenaries ? 0.3 : 0.1),
    skills: ({ occupation }) => {
      const spec = occupation.spec
      if (spec === 'defender' || spec === 'brute')
        return {
          primary: ['martial'],
          secondary: ['athletics', 'survival']
        }
      if (spec === 'marksman')
        return {
          primary: ['marksman'],
          secondary: ['survival', 'perception']
        }
      if (spec === 'rogue')
        return {
          primary: ['martial'],
          secondary: ['streetwise']
        }
      return {
        primary: ['arcana']
      }
    },
    attributes: ({ actor }) => {
      const spec = actor.occupation.spec
      if (spec === 'defender') return [12, 11, 12, 10, 11, 10]
      if (spec === 'brute') return [12, 11, 12, 10, 11, 10]
      if (spec === 'marksman') return [10, 12, 11, 11, 12, 10]
      if (spec === 'rogue') return [10, 12, 11, 12, 10, 11]
      return [9, 9, 9, 12, 10, 11]
    },
    specialization: () => window.dice.choice(['defender', 'brute', 'marksman', 'rogue', 'sorcerer'])
  },
  guard: {
    key: 'guard',
    stratum: 'lower',
    occurrence: ({ context }) => (context.urban ? 0.2 : 0),
    skills: {
      primary: ['martial'],
      secondary: ['athletics', 'perception']
    }
  },
  artist: {
    key: 'artist',
    stratum: 'lower',
    occurrence: ({ context }) => (context.urban ? 1 : 0.5) * 0.5,
    skills: ({ actor }) => {
      const loc = window.world.locations[actor.location.curr]
      const context = location__context(loc)
      return window.dice.weightedChoice([
        {
          w: context.urban ? 1 : 0.5,
          v: {
            primary: ['painting']
          }
        },
        {
          w: context.urban ? 0.2 : 0.1,
          v: {
            primary: ['sculpting']
          }
        },
        {
          w: context.urban ? 0.4 : 0.2,
          v: {
            primary: ['pottery']
          }
        }
      ])
    }
  },
  musician: {
    key: 'musician',
    stratum: 'lower',
    occurrence: params => {
      let weight = 0.5
      if (!params.context.urban) weight *= 0.1
      if (params.context.art) weight *= 2
      return weight
    },
    skills: () => {
      return window.dice.weightedChoice([
        {
          w: 1,
          v: {
            primary: ['instrument (music)']
          }
        },
        {
          w: 0.5,
          v: {
            primary: ['singing']
          }
        }
      ])
    }
  }
}
