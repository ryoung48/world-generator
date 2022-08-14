import { decorated_culture } from '../../../../npcs/species/humanoids/cultures'
import { nation__release_region } from '../../../../regions/diplomacy/claims'
import { region__formatted_wealth } from '../../../../regions/diplomacy/status'
import { province__foreign_neighbors } from '../../../../regions/provinces'
import { Region } from '../../../../regions/types'
import { decorate_text } from '../../../../utilities/text/decoration'
import { Rebellion } from '../types'
import { RebellionBackground, RebellionBackgroundArgs } from './types'

const fractured_state = (nation: Region) =>
  nation.government.structure === 'confederation' || nation.government.structure === 'autonomous'

const native_leadership = (rebellion: Rebellion) => {
  const rebels = window.world.regions[rebellion.rebels.idx]
  const { ruling, native } = rebels.culture
  const cultures = [ruling, native]
  return window.dice.choice(cultures)
}
const random_leadership = (rebellion: Rebellion) => {
  const native = native_leadership(rebellion)
  const nation = window.world.regions[rebellion.loyalists.idx]
  return window.dice.choice([native, nation.culture.ruling])
}

const separatists = ({ nation, rebels }: RebellionBackgroundArgs) =>
  nation.idx !== rebels.idx &&
  nation.provinces
    .map(t => window.world.provinces[t])
    .filter(t => t.region === rebels.idx)
    .some(province => province__foreign_neighbors(province).length > 0)

const separation = (params: { rebellion: Rebellion; culture: number }) => {
  const { rebellion, culture } = params
  const rebels = window.world.regions[rebellion.rebels.idx]
  const nation = window.world.regions[rebellion.loyalists.idx]
  // rebels secede and gain full autonomy when victorious
  nation__release_region({ nation, subject: rebels })
  const old_rulers = rebels.culture.ruling
  rebels.culture.ruling = culture
  // the amount of wealth the rebels start with as a new nation
  const rebel_funds = rebels.max_wealth * window.dice.uniform(0.3, 0.6)
  rebels.wealth = rebel_funds
  rebellion.result += ` ${decorate_text({
    link: rebels,
    tooltip: region__formatted_wealth(rebels)
  })} has seceded from ${decorate_text({
    link: nation,
    tooltip: region__formatted_wealth(nation)
  })}.${
    old_rulers !== rebels.culture.ruling
      ? ` Culture: ${decorated_culture({
          culture: window.world.cultures[old_rulers],
          title: true
        })} → ${decorated_culture({
          culture: window.world.cultures[rebels.culture.ruling],
          title: true
        })}`
      : ''
  }`
}

const rebellion__backgrounds: Record<Rebellion['background']['type'], RebellionBackground> = {
  anarchism: {
    tag: 'anarchism',
    spawn: ({ nation }) => (fractured_state(nation) || nation.development === 'remote' ? 1 : 0),
    text: ({ nation }) =>
      `Regional ${
        nation.civilized ? 'warlords' : 'chieftains'
      } fight each other over land and past crimes`,
    goal: ({ rebellion }) => {
      rebellion.result +=
        ' Land is redistributed, treaties are signed, and justice is observed as the fighting ceases.'
      const nation = window.world.regions[rebellion.loyalists.idx]
      const rebels = window.world.regions[rebellion.rebels.idx]
      if (window.dice.random > 0.5 && separatists({ nation, rebels })) {
        separation({ rebellion, culture: random_leadership(rebellion) })
      }
    }
  },
  aristocratic: {
    tag: 'aristocratic',
    spawn: ({ nation }) => (nation.development === 'remote' ? 0 : 1),
    text: ({ nation }) =>
      `Aristocrats rebel against the ineffectual ${decorate_text({
        link: nation
      })} regime`,
    goal: ({ rebellion }) => {
      rebellion.result += ' The aristocrats are granted greater autonomy.'
      const nation = window.world.regions[rebellion.loyalists.idx]
      const rebels = window.world.regions[rebellion.rebels.idx]
      if (window.dice.random > 0.5 && separatists({ nation, rebels })) {
        separation({ rebellion, culture: nation.culture.ruling })
      }
    }
  },
  arcanists: {
    tag: 'arcanists',
    spawn: ({ nation }) => (nation.law.magic === 'banned' ? 3 : 0),
    text: () => `Arcanists and templars fight over a recent edict outlawing magic`,
    goal: ({ rebellion }) => {
      rebellion.result += ' The edict banning magic is reversed.'
    }
  },
  dynastic: {
    tag: 'dynastic',
    spawn: ({ nation }) => (nation.government.succession === 'hereditary' ? 1 : 0),
    text: () => `An exiled pretender seeks to reclaim their birthright`,
    goal: ({ rebellion }) => {
      rebellion.result += ' The exile claims the throne.'
      const nation = window.world.regions[rebellion.loyalists.idx]
      const rebels = window.world.regions[rebellion.rebels.idx]
      if (window.dice.random > 0.5 && separatists({ nation, rebels })) {
        separation({ rebellion, culture: native_leadership(rebellion) })
      }
    }
  },
  ideology: {
    tag: 'ideology',
    spawn: ({ nation }) => (nation.civilized && !fractured_state(nation) ? 0.5 : 0),
    text: () => `Revolutionaries seek government reforms`,
    goal: ({ rebellion }) => {
      rebellion.result += ' The revolutionaries take power and the government is reformed.'
      const nation = window.world.regions[rebellion.loyalists.idx]
      const rebels = window.world.regions[rebellion.rebels.idx]
      if (window.dice.random > 0.5 && separatists({ nation, rebels })) {
        separation({ rebellion, culture: random_leadership(rebellion) })
      }
    }
  },
  interregnum: {
    tag: 'interregnum',
    spawn: ({ nation }) =>
      nation.government.succession === 'hereditary' && nation.government.structure !== 'republic'
        ? 1
        : 0,
    text: () => `Multiple claimants fight for a disputed throne`,
    goal: ({ rebellion }) => {
      rebellion.result += ' A single claimant remains to take the throne.'
    }
  },
  praetorian: {
    tag: 'praetorian',
    spawn: params => (separatists(params) ? 1 : 0),
    text: () => `Rogue generals seek to carve out their own state`,
    goal: params => separation({ ...params, culture: random_leadership(params.rebellion) })
  },
  schism: {
    tag: 'schism',
    spawn: ({ rebels, nation }) => (nation === rebels ? 0.5 : 0),
    text: () => `Zealots seek religious reform`,
    goal: ({ rebellion }) => {
      rebellion.result += ' Religious reforms are enacted to sate the zealots.'
    }
  },
  separatists: {
    tag: 'separatists',
    spawn: params => (separatists(params) ? 4 : 0),
    text: ({ nation, rebels }) =>
      `${decorate_text({ link: rebels })} rebels seek freedom from ${decorate_text({
        link: nation
      })} rule`,
    goal: params => separation({ ...params, culture: native_leadership(params.rebellion) })
  },
  peasants: {
    tag: 'peasants',
    spawn: ({ nation }) => (nation.development === 'remote' ? 0 : 1),
    text: () => `Peasants seek better treatment from their superiors`,
    goal: ({ rebellion }) => {
      rebellion.result += ' A number of edicts are enacted to improve peasant quality of life.'
    }
  },
  unification: {
    tag: 'unification',
    spawn: ({ nation, rebels }) =>
      nation.development === 'remote' || rebels.idx !== nation.idx || !fractured_state(nation)
        ? 0
        : 1,
    text: () => `A charismatic leader attempts to unify a fractured state`,
    goal: ({ rebellion }) => {
      rebellion.result += ' The region is unified under more centralized leadership.'
    }
  }
}

const backgrounds = Object.values(rebellion__backgrounds)

/**
 * generates the background of a rebellion event
 * @param params.nation - nation being rebelled against
 * @param params.rebels - rebelling region
 * @returns background type + text
 */
export const rebellion__background = (params: RebellionBackgroundArgs) => {
  const background = window.dice.weighted_choice(
    backgrounds.map(background => {
      return { v: background.tag, w: background.spawn(params) }
    })
  )
  if (!background) {
    console.log()
  }
  return {
    type: background,
    text: `${rebellion__backgrounds[background].text(params)}.`
  }
}

export const rebellion__achieve_goals = (rebellion: Rebellion) => {
  rebellion__backgrounds[rebellion.background.type].goal({ rebellion })
}
