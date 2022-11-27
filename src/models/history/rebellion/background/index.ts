import { culture__decorations } from '../../../npcs/species/cultures'
import { nation__releaseRegion } from '../../../regions/diplomacy/claims'
import { region__formattedWealth } from '../../../regions/diplomacy/status'
import { province__foreignNeighbors } from '../../../regions/provinces'
import { Region } from '../../../regions/types'
import { decorateText } from '../../../utilities/text/decoration'
import { Rebellion } from '../types'
import { RebellionBackground, RebellionBackgroundArgs } from './types'

const fracturedState = (nation: Region) =>
  nation.government.structure === 'confederation' || nation.government.structure === 'anarchic'

const nativeLeadership = (rebellion: Rebellion) => {
  const rebels = window.world.regions[rebellion.rebels.idx]
  const { ruling, native } = rebels.culture
  const cultures = [ruling, native]
  return window.dice.choice(cultures)
}
const randomLeadership = (rebellion: Rebellion) => {
  const native = nativeLeadership(rebellion)
  const nation = window.world.regions[rebellion.loyalists.idx]
  return window.dice.choice([native, nation.culture.ruling])
}

const separatists = ({ nation, rebels }: RebellionBackgroundArgs) =>
  nation.idx !== rebels.idx &&
  nation.provinces
    .map(t => window.world.provinces[t])
    .filter(t => t.region === rebels.idx)
    .some(province => province__foreignNeighbors(province).length > 0)

const separation = (params: { rebellion: Rebellion; culture: number }) => {
  const { rebellion, culture } = params
  const rebels = window.world.regions[rebellion.rebels.idx]
  const nation = window.world.regions[rebellion.loyalists.idx]
  // rebels secede and gain full autonomy when victorious
  nation__releaseRegion({ nation, subject: rebels })
  const oldRulers = rebels.culture.ruling
  rebels.culture.ruling = culture
  // the amount of wealth the rebels start with as a new nation
  const rebelFunds = rebels.maxWealth * window.dice.uniform(0.3, 0.6)
  rebels.wealth = rebelFunds
  rebellion.result += ` ${decorateText({
    link: rebels,
    tooltip: region__formattedWealth(rebels)
  })} has seceded from ${decorateText({
    link: nation,
    tooltip: region__formattedWealth(nation)
  })}.${
    oldRulers !== rebels.culture.ruling
      ? ` Culture: ${culture__decorations({
          culture: window.world.cultures[oldRulers],
          title: true
        })} → ${culture__decorations({
          culture: window.world.cultures[rebels.culture.ruling],
          title: true
        })}`
      : ''
  }`
}

const rebellion__backgrounds: Record<Rebellion['background']['type'], RebellionBackground> = {
  anarchism: {
    tag: 'anarchism',
    spawn: ({ nation }) => (fracturedState(nation) || nation.development === 'remote' ? 1 : 0),
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
        separation({ rebellion, culture: randomLeadership(rebellion) })
      }
    }
  },
  aristocratic: {
    tag: 'aristocratic',
    spawn: ({ nation }) => (nation.development === 'remote' ? 0 : 1),
    text: ({ nation }) =>
      `Aristocrats rebel against the ineffectual ${decorateText({
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
    spawn: ({ nation }) => (nation.development === 'remote' ? 0 : 1),
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
        separation({ rebellion, culture: nativeLeadership(rebellion) })
      }
    }
  },
  ideology: {
    tag: 'ideology',
    spawn: ({ nation }) => (nation.civilized && !fracturedState(nation) ? 0.5 : 0),
    text: () => `Revolutionaries seek government reforms`,
    goal: ({ rebellion }) => {
      rebellion.result += ' The revolutionaries take power and the government is reformed.'
      const nation = window.world.regions[rebellion.loyalists.idx]
      const rebels = window.world.regions[rebellion.rebels.idx]
      if (window.dice.random > 0.5 && separatists({ nation, rebels })) {
        separation({ rebellion, culture: randomLeadership(rebellion) })
      }
    }
  },
  interregnum: {
    tag: 'interregnum',
    spawn: ({ nation }) => (nation.government.succession === 'hereditary' ? 1 : 0),
    text: () => `Multiple claimants fight for a disputed throne`,
    goal: ({ rebellion }) => {
      rebellion.result += ' A single claimant remains to take the throne.'
    }
  },
  praetorian: {
    tag: 'praetorian',
    spawn: params => (separatists(params) ? 1 : 0),
    text: () => `Rogue generals seek to carve out their own state`,
    goal: params => separation({ ...params, culture: randomLeadership(params.rebellion) })
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
      `${decorateText({ link: rebels })} rebels seek freedom from ${decorateText({
        link: nation
      })} rule`,
    goal: params => separation({ ...params, culture: nativeLeadership(params.rebellion) })
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
    spawn: ({ nation, rebels }) => (rebels.idx !== nation.idx || !fracturedState(nation) ? 0 : 1),
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
  const background = window.dice.weightedChoice(
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

export const rebellion__achieveGoals = (rebellion: Rebellion) => {
  rebellion__backgrounds[rebellion.background.type].goal({ rebellion })
}
