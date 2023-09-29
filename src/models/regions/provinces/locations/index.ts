import { PROVINCE } from '..'
import { HUB } from '../hubs'
import { Province } from '../types'
import { Loc } from './types'

const offices = (quality: string) => {
  return `office (${window.dice.weightedChoice([
    { v: 'bureaucratic', w: 2 },
    { v: 'banking', w: 1 },
    { v: 'mercantile', w: 1 }
  ])}, ${quality})`
}

const guildhalls = (quality: string) => {
  return `guild hall (${window.dice.weightedChoice([
    { v: 'artisan', w: 2 },
    { v: 'arcana', w: 1 },
    { v: 'mercantile', w: 1 },
    { v: 'mercenary', w: 1 }
  ])}, ${quality})`
}

const shops = (quality: string) => {
  return `workshop (${window.dice.weightedChoice([
    { v: 'textiles', w: 4 },
    { v: 'metalwork', w: 2 },
    { v: 'leatherwork', w: 2 },
    { v: 'woodwork', w: 2 },
    { v: 'culinary', w: 2 },
    { v: 'apothecary', w: 2 },
    { v: 'arcana', w: 1 },
    { v: 'general', w: 1 }
  ])}, ${quality})`
}

const cemetary = (quality: string) => {
  return `${window.dice.choice([
    'cemetary',
    'graveyard',
    'crypts',
    'tombs'
  ])} (${window.dice.weightedChoice([
    { v: 'small', w: 2 },
    { v: 'large', w: 1 }
  ])}, ${quality})`
}

const religious = (params: { quality: string; rich: boolean }) => {
  const { quality, rich } = params
  return `${window.dice.weightedChoice([
    { v: 'shrine', w: rich ? 3 : 6 },
    { v: 'temple', w: rich ? 6 : 3 },
    { v: 'cathedral', w: rich ? 0.1 : 0 },
    { v: 'monastery', w: 1 }
  ])} (${quality})`
}

const hospitality = (quality: string) => {
  return `${window.dice.weightedChoice([
    { v: 'tavern', w: 4 },
    { v: 'lodging', w: 4 },
    { v: 'bathhouse', w: 1 },
    { v: 'brothel', w: 1 },
    { v: 'clinic', w: 1 }
  ])} (${quality})`
}

const academic = (quality: string) => {
  return `${window.dice.weightedChoice([
    { v: 'museum', w: 0.5 },
    { v: 'art gallery', w: 0.5 },
    { v: 'library', w: 4 },
    { v: 'archive', w: 4 },
    { v: 'laboratory', w: 1 },
    { v: 'observatory', w: 1 },
    { v: 'academy', w: 2 },
    { v: 'university', w: 1 }
  ])} (${quality})`
}

const artistic = (quality: string) => {
  const subject = window.dice.choice([
    'political',
    'military',
    'memorial',
    'religious',
    'cultural',
    'artistic'
  ])
  return `${window.dice.weightedChoice([
    { v: `monument (${subject}, ${quality})`, w: 1 },
    { v: `statue (${subject}, ${quality})`, w: 1 },
    { v: `gardens (${quality})`, w: 1 },
    { v: `fountain (${quality})`, w: 1 },
    { v: `plaza (${quality})`, w: 1 }
  ])}`
}

const storehouse = (quality: string) => {
  return `${window.dice.weightedChoice([
    { v: 'well', w: 1 },
    { v: 'granary', w: 1 }
  ])} (${quality})`
}

const government = (quality: string) => {
  return `${window.dice.weightedChoice([
    { v: 'courtroom', w: 2 },
    { v: 'asylum', w: 1 },
    { v: 'prison', w: 1 },
    { v: 'orphanage', w: 1 }
  ])} (${quality})`
}

const docks = (quality: string) => {
  return `${window.dice.weightedChoice([
    { v: 'shipyard', w: 5 },
    { v: 'lighthouse', w: 1 }
  ])} (${quality})`
}

const criminal = (quality: string) => {
  return `${window.dice.weightedChoice([
    { v: `underground {market|bazaar}`, w: 2 },
    { v: `underground arena`, w: 1 },
    { v: `criminal {den|hideout}`, w: 2 }
  ])} (${quality})`
}

const battleground = `{battlefield|battleground}`

const places: Record<Loc['district'], Loc> = {
  'noble district': {
    district: 'noble district',
    site: () => {
      const quality = window.dice.weightedChoice([
        { v: 'luxurious', w: 1 },
        { v: 'wealthy', w: 2 }
      ])
      const site = window.dice.weightedChoice([
        { v: offices(quality), w: 0.05 },
        { v: shops(quality), w: 0.1 },
        { v: academic(quality), w: 0.01 },
        { v: hospitality(quality), w: 0.2 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: true }), w: 0.05 },
        { v: artistic(quality), w: 0.05 },
        { v: `residence (${quality})`, w: 0.4 },
        { v: `barracks (guards, ${quality})`, w: 0.01 },
        { v: `underground sewers`, w: 0.01 }
      ])
      return site
    }
  },
  'merchant district': {
    district: 'merchant district',
    site: () => {
      const quality = window.dice.weightedChoice([
        { v: 'wealthy', w: 1 },
        { v: 'comfortable', w: 2 }
      ])
      const site = window.dice.weightedChoice([
        { v: government(quality), w: 0.05 },
        { v: offices(quality), w: 0.05 },
        { v: guildhalls(quality), w: 0.05 },
        { v: shops(quality), w: 0.15 },
        { v: academic(quality), w: 0.01 },
        { v: hospitality(quality), w: 0.2 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: true }), w: 0.05 },
        { v: artistic(quality), w: 0.05 },
        { v: `residence (${quality})`, w: 0.3 },
        { v: `barracks (guards, ${quality})`, w: 0.01 },
        { v: `warehouse (${quality})`, w: 0.07 },
        { v: storehouse(quality), w: 0.02 },
        { v: `stables (${quality})`, w: 0.01 },
        { v: `{market|bazaar} (${quality})`, w: 0.05 },
        { v: `festival (${quality})`, w: 0.01 },
        { v: criminal(quality), w: 0.01 },
        { v: `underground sewers`, w: 0.01 }
      ])
      return site
    }
  },
  'craftsman district': {
    district: 'craftsman district',
    site: () => {
      const quality = window.dice.weightedChoice([
        { v: 'comfortable', w: 1 },
        { v: 'modest', w: 2 }
      ])
      const site = window.dice.weightedChoice([
        { v: government(quality), w: 0.05 },
        { v: shops(quality), w: 0.3 },
        { v: hospitality(quality), w: 0.2 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: true }), w: 0.05 },
        { v: artistic(quality), w: 0.05 },
        { v: `residence (${quality})`, w: 0.2 },
        { v: `tenement (${quality})`, w: 0.05 },
        { v: `barracks (guards, ${quality})`, w: 0.01 },
        { v: `warehouse (${quality})`, w: 0.05 },
        { v: storehouse(quality), w: 0.02 },
        { v: `stables (${quality})`, w: 0.01 },
        { v: `{market|bazaar} (${quality})`, w: 0.05 },
        { v: `theatre (${quality})`, w: 0.01 },
        { v: `festival (${quality})`, w: 0.01 },
        { v: criminal(quality), w: 0.01 },
        { v: `underground sewers`, w: 0.01 }
      ])
      return site
    }
  },
  docks: {
    district: 'docks',
    site: () => {
      const quality = window.dice.weightedChoice([
        { v: 'modest', w: 2 },
        { v: 'poor', w: 1 },
        { v: 'abandoned', w: 0.1 }
      ])
      const site = window.dice.weightedChoice([
        { v: government(quality), w: 0.01 },
        { v: shops(quality), w: 0.2 },
        { v: hospitality(quality), w: 0.2 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: true }), w: 0.05 },
        { v: artistic(quality), w: 0.05 },
        { v: `residence (${quality})`, w: 0.2 },
        { v: `tenement (${quality})`, w: 0.1 },
        { v: `barracks (guards, ${quality})`, w: 0.01 },
        { v: `warehouse (${quality})`, w: 0.1 },
        { v: storehouse(quality), w: 0.02 },
        { v: `{market|bazaar} (${quality})`, w: 0.05 },
        { v: `theatre (${quality})`, w: 0.01 },
        { v: `festival (${quality})`, w: 0.01 },
        { v: criminal(quality), w: 0.01 },
        { v: `underground sewers`, w: 0.01 },
        { v: docks(quality), w: 0.2 }
      ])
      return site
    }
  },
  slums: {
    district: 'slums',
    site: () => {
      const quality = window.dice.weightedChoice([
        { v: 'modest', w: 1 },
        { v: 'poor', w: 3 },
        { v: 'abandoned', w: 0.1 }
      ])
      const site = window.dice.weightedChoice([
        { v: government(quality), w: 0.01 },
        { v: shops(quality), w: 0.2 },
        { v: hospitality(quality), w: 0.2 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: true }), w: 0.05 },
        { v: artistic(quality), w: 0.05 },
        { v: `residence (${quality})`, w: 0.1 },
        { v: `tenement (${quality})`, w: 0.2 },
        { v: `warehouse (${quality})`, w: 0.1 },
        { v: storehouse(quality), w: 0.02 },
        { v: `{market|bazaar} (${quality})`, w: 0.05 },
        { v: criminal(quality), w: 0.05 },
        { v: `festival (${quality})`, w: 0.01 },
        { v: `underground sewers`, w: 0.01 }
      ])
      return site
    }
  },
  rural: {
    district: 'rural',
    site: () => {
      const quality = window.dice.weightedChoice([
        { v: 'modest', w: 1 },
        { v: 'poor', w: 2 },
        { v: 'abandoned', w: 0.1 }
      ])
      const site = window.dice.weightedChoice([
        { v: shops(quality), w: 0.05 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: false }), w: 0.05 },
        { v: `lodging (${quality})`, w: 0.05 },
        { v: `tavern (${quality})`, w: 0.05 },
        { v: `residence (${quality})`, w: 0.6 },
        { v: `residence (wealthy)`, w: 0.1 },
        { v: storehouse(quality), w: 0.02 },
        { v: `windmill ({rustic|creaky})`, w: 0.01 },
        { v: `gnarled tree`, w: 0.01 },
        {
          v: `{fields|orchard|vineyard} ({overgrown|bountiful|parched|scarecrow|withered})`,
          w: 0.1
        },
        { v: `market (${quality})`, w: 0.01 },
        { v: `festival (${quality})`, w: 0.01 }
      ])
      return site
    }
  },
  tribal: {
    district: 'tribal',
    site: () => {
      const quality = window.dice.weightedChoice([
        { v: 'modest', w: 1 },
        { v: 'poor', w: 2 }
      ])
      const site = window.dice.weightedChoice([
        { v: `tent (${quality})`, w: 10 },
        { v: `tent (comfortable)`, w: 1 },
        { v: `shrine (${quality})`, w: 1 },
        { v: `communal {bonfire|cooking pot}`, w: 1 },
        { v: `livestock {enclosure|pen}`, w: 1 },
        {
          v: `{burial mound|ritual clearing|training ground (warriors)|food preparation site}`,
          w: 1
        },
        { v: `festival (${quality})`, w: 0.01 }
      ])
      return site
    }
  },
  outskirts: {
    district: 'outskirts',
    site: ({ loc }) => {
      const site = window.dice.weightedChoice([
        {
          v: `{stronghold|outpost|fortress} (military)`,
          w: 0.1
        },
        {
          v: `{castle|keep} (noble)`,
          w: 0.1
        },
        {
          v: `road (${window.dice.weightedChoice([
            {
              v:
                loc.hub.type === 'small village' ||
                loc.hub.type === 'tiny village' ||
                loc.hub.type === 'tribal camp'
                  ? 'trail'
                  : loc.hub.type === 'large village'
                  ? 'path'
                  : loc.hub.type === 'small town'
                  ? 'dirt'
                  : loc.hub.type === 'large town'
                  ? 'cobbled'
                  : loc.hub.type === 'small city'
                  ? 'low'
                  : 'high',
              w: 1
            },
            {
              v: 'river crossing',
              w: 0.3
            }
          ])})`,
          w: 0.1
        },
        {
          v: `watchtower (${window.dice.weightedChoice([
            { v: 'guards', w: 3 },
            { v: 'ruined', w: 1 }
          ])})`,
          w: 0.1
        },
        { v: 'crossroads inn', w: HUB.village(loc.hub) ? 0 : 0.1 },
        { v: 'wagon ({broken|abandoned})', w: 0.1 },
        { v: 'farmstead', w: 0.1 },
        { v: 'monastery', w: 0.02 },
        { v: 'shrine', w: 0.02 },
        {
          v: `camp ({nomadic|caravan|refugees|performers})`,
          w: 0.02
        },
        { v: `druidic grove`, w: 0.02 },
        { v: 'mining camp', w: 0.05 },
        { v: 'lumberyard', w: 0.05 },
        { v: `${battleground} (recent ruins)`, w: 0.05 },
        { v: 'shantytown', w: HUB.city(loc.hub) ? 0.1 : 0 },
        { v: `${HUB.alias(loc.hub)} gates`, w: 0.1 }
      ])
      return site
    }
  },
  wilderness: {
    district: 'wilderness',
    site: ({ loc }) => {
      const site = window.dice.weightedChoice([
        {
          v: `{city|town|village|monument|{necropolis|crypt}|vault|${battleground}} (ancient ruins)`,
          w: 0.1
        },
        {
          v: `{laboratory|academy|archive} ({occult|ruined|ancient})`,
          w: 0.05
        },
        {
          v: `{shrine|monastery|temple} ({ancient|abandoned|remote})`,
          w: 0.1
        },
        {
          v: `{stronghold|outpost|fortress|castle} ({abandoned|ancient})`,
          w: 0.1
        },
        {
          v: `{village|compound} ({abandoned|remote|savage|warped})`,
          w: 0.1
        },
        {
          v: `mining tunnels ({abandoned|ancient})`,
          w: 0.1
        },
        {
          v: `magical disaster site`,
          w: 0.05
        },
        {
          v: `beach ({sandy|rocky}, shipwreck)`,
          w: loc.hub.coastal ? 0.05 : 0
        },
        {
          v: `{cave|cavern|lair} (${window.dice.weightedChoice([
            { v: 'treacherous', w: 1 },
            { v: 'subterranean', w: 2 },
            { v: 'hidden', w: 1 },
            { v: 'volcanic', w: 0.05 },
            { v: 'coastal', w: loc.hub.coastal ? 0.05 : 0 }
          ])})`,
          w: 0.05
        },
        {
          v: PROVINCE.terrain(loc),
          w: 0.1
        }
      ])
      return site
    }
  }
}

export const location__spawn = (params: { loc: Province }) => {
  const { loc } = params
  const city = HUB.city(loc.hub)
  const village = HUB.village(loc.hub)
  const district = window.dice.weightedChoice<Loc['district']>([
    { v: 'noble district', w: village ? 0 : 0.1 },
    { v: 'merchant district', w: village ? 0 : 0.2 },
    { v: 'craftsman district', w: village ? 0 : 0.2 },
    { v: 'docks', w: !village && loc.hub.coastal ? 0.2 : 0 },
    { v: 'slums', w: city ? 0.2 : 0 },
    { v: 'rural', w: village ? 0.5 : 0 },
    { v: 'outskirts', w: 0.3 },
    { v: 'wilderness', w: 0.3 }
  ])
  const site = window.dice.spin(places[district].site({ loc }))
  const tag = district === 'docks' || district === 'slums' ? ` (${district})` : ''
  return {
    type: district === 'outskirts' || district === 'wilderness' ? 'wilderness' : 'community',
    district:
      district === 'outskirts' || district === 'wilderness'
        ? district
        : `${HUB.alias(loc.hub)}${tag}`,
    site
  }
}
