import { climates } from '../../world/climate/types'
import { hub__alias, hub__isCity, hub__isVillage } from '../hubs'
import { Province } from '../provinces/types'
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
    { v: 'mercantile', w: 1 }
  ])}, ${quality})`
}

const shops = (quality: string) => {
  return `shop (${window.dice.weightedChoice([
    { v: 'textiles', w: 4 },
    { v: 'metalwork', w: 2 },
    { v: 'woodwork', w: 2 },
    { v: 'culinary', w: 2 },
    { v: 'alchemy', w: 1 },
    { v: 'general', w: 1 }
  ])}, ${quality})`
}

const workshops = (quality: string) => {
  return `workshop (${window.dice.weightedChoice([
    { v: 'artisan', w: 4 },
    { v: 'surgeon', w: 1 },
    { v: 'artistic', w: 1 }
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
    { v: 'monastery', w: 1 }
  ])} (${quality})`
}

const hospitality = (quality: string) => {
  return `${window.dice.weightedChoice([
    { v: 'tavern', w: 4 },
    { v: 'lodging', w: 4 },
    { v: 'bathhouse', w: 1 },
    { v: 'brothel', w: 1 }
  ])} (${quality})`
}

const academic = (quality: string) => {
  return `${window.dice.weightedChoice([
    { v: 'museum', w: 1 },
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
    { v: `underground market`, w: 2 },
    { v: `underground arena`, w: 1 },
    { v: `criminal ${window.dice.choice(['den', 'hideout'])}`, w: 2 }
  ])} (${quality})`
}

const battleground = () => window.dice.choice(['battlefield', 'battleground'])

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
        { v: workshops(quality), w: 0.1 },
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
        { v: `market (${quality})`, w: 0.05 },
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
        { v: shops(quality), w: 0.1 },
        { v: workshops(quality), w: 0.3 },
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
        { v: `market (${quality})`, w: 0.05 },
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
        { v: 'poor', w: 1 }
      ])
      const site = window.dice.weightedChoice([
        { v: government(quality), w: 0.01 },
        { v: shops(quality), w: 0.05 },
        { v: workshops(quality), w: 0.2 },
        { v: hospitality(quality), w: 0.2 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: true }), w: 0.05 },
        { v: artistic(quality), w: 0.05 },
        { v: `residence (${quality})`, w: 0.2 },
        { v: `tenement (${quality})`, w: 0.1 },
        { v: `barracks (guards, ${quality})`, w: 0.01 },
        { v: `warehouse (${quality})`, w: 0.1 },
        { v: storehouse(quality), w: 0.02 },
        { v: `market (${quality})`, w: 0.05 },
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
        { v: 'poor', w: 3 }
      ])
      const site = window.dice.weightedChoice([
        { v: government(quality), w: 0.01 },
        { v: shops(quality), w: 0.05 },
        { v: workshops(quality), w: 0.2 },
        { v: hospitality(quality), w: 0.2 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: true }), w: 0.05 },
        { v: artistic(quality), w: 0.05 },
        { v: `residence (${quality})`, w: 0.1 },
        { v: `tenement (${quality})`, w: 0.2 },
        { v: `warehouse (${quality})`, w: 0.1 },
        { v: storehouse(quality), w: 0.02 },
        { v: `market (${quality})`, w: 0.05 },
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
        { v: 'poor', w: 2 }
      ])
      const site = window.dice.weightedChoice([
        { v: shops(quality), w: 0.01 },
        { v: workshops(quality), w: 0.05 },
        { v: cemetary(quality), w: 0.01 },
        { v: religious({ quality, rich: true }), w: 0.05 },
        { v: `lodging (${quality})`, w: 0.05 },
        { v: `tavern (${quality})`, w: 0.05 },
        { v: `residence (${quality})`, w: 0.6 },
        { v: `residence (wealthy)`, w: 0.1 },
        { v: storehouse(quality), w: 0.02 },
        { v: `festival (${quality})`, w: 0.01 }
      ])
      return site
    }
  },
  outskirts: {
    district: 'outskirts',
    site: ({ loc }) => {
      const { terrain } = loc
      const site = window.dice.weightedChoice([
        {
          v: `${window.dice.choice(['stronghold', 'outpost', 'fortress'])} (military)`,
          w: 0.1
        },
        {
          v: `${window.dice.choice(['castle', 'keep'])} (noble)`,
          w: 0.1
        },
        {
          v: `road (${window.dice.weightedChoice([
            {
              v:
                loc.hub.type === 'small village' || loc.hub.type === 'tiny village'
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
              w: terrain === 'marsh' || terrain === 'forest' || terrain === 'jungle' ? 0 : 1
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
        { v: 'crossroads inn', w: hub__isVillage(loc.hub) ? 0 : 0.1 },
        { v: 'farmstead', w: 0.1 },
        { v: 'monastery', w: 0.02 },
        { v: 'shrine', w: 0.02 },
        {
          v: `camp (${window.dice.choice(['nomadic', 'caravan', 'refugees', 'performers'])})`,
          w: 0.02
        },
        { v: 'mining camp', w: 0.05 },
        { v: 'lumberyard', w: 0.05 },
        { v: `${battleground()} (recent ruins)`, w: 0.05 },
        { v: 'shantytown', w: hub__isCity(loc.hub) ? 0.1 : 0 },
        { v: `${hub__alias(loc.hub)} gates`, w: 0.1 }
      ])
      return site
    }
  },
  wilderness: {
    district: 'wilderness',
    site: ({ loc }) => {
      const { terrain } = loc
      const region = window.world.regions[loc.region]
      const climate = climates[region.climate]
      const mountainous = terrain === 'mountains' || terrain === 'highlands'
      const site = window.dice.weightedChoice([
        {
          v: `${window.dice.choice([
            'city',
            'town',
            'village',
            'monument',
            battleground()
          ])} (ancient ruins)`,
          w: 0.1
        },
        {
          v: `${window.dice.choice(['shrine', 'temple', 'monastery'])} (${window.dice.choice([
            'ancient ruins',
            'abandoned',
            'remote'
          ])})`,
          w: 0.1
        },
        {
          v: `${window.dice.choice([
            'stronghold',
            'outpost',
            'fortress',
            'castle'
          ])} (${window.dice.choice(['ancient ruins', 'abandoned'])})`,
          w: 0.1
        },
        {
          v: `${window.dice.choice(['village', 'compound'])} (${window.dice.choice([
            'abandoned',
            'warped',
            'savage',
            'feral'
          ])})`,
          w: 0.1
        },
        {
          v: `mining camp (${window.dice.choice(['ancient ruins', 'abandoned', 'cursed'])})`,
          w: 0.1
        },
        {
          v: `beach (${window.dice.choice(['sandy', 'rocky'])}, shipwreck)`,
          w: loc.hub.coastal ? 0.05 : 0
        },
        {
          v: `${window.dice.choice(['cave', 'cavern', 'lair'])} (${window.dice.weightedChoice([
            { v: 'treacherous', w: 1 },
            { v: 'subterranean', w: 2 },
            { v: 'hidden', w: 1 },
            { v: 'volcanic', w: 0.05 },
            { v: 'coastal', w: loc.hub.coastal ? 0.05 : 0 }
          ])})`,
          w: 0.05
        },
        {
          v: window.dice.weightedChoice([
            {
              v: `${terrain} (${window.dice.spin(
                '{tangled|labyrinthine|treacherous|cursed|scorched|fungal}'
              )})`,
              w: terrain === 'forest' || terrain === 'jungle' ? 1 : 0
            },
            {
              v: `${terrain} (${window.dice.spin('{vast|treacherous|cursed}')})`,
              w: terrain === 'tundra' || terrain === 'glacier' ? 1 : 0
            },
            {
              v: `${window.dice.spin('{marsh|swamp|big|fens}')} (${window.dice.spin(
                '{labyrinthine|treacherous|cursed|fungal}'
              )})`,
              w: terrain === 'marsh' ? 1 : 0
            },
            {
              v: `desert (${window.dice.spin('{sandy|rocky}')}, ${window.dice.spin(
                '{canyons|ravine|cursed|wastes|scorched}'
              )})`,
              w: terrain === 'desert' ? 1 : 0
            },
            {
              v: `desert (sandy, ${window.dice.spin('{oasis|dunes}')})`,
              w: terrain === 'desert' && climate.zone === 'tropical' ? 1 : 0
            },
            {
              v: `plains (${window.dice.spin('{vast|cursed|parched}')})`,
              w: terrain === 'plains' ? 1 : 0
            },
            {
              v: `mountains (${window.dice.spin('{high|low} pass')})`,
              w: mountainous ? 1 : 0
            },
            {
              v: `mountains (${window.dice.spin('{caldera|volcanic|hot springs}')})`,
              w: mountainous ? 0.02 : 0
            }
          ]),
          w: 0.1
        }
      ])
      return site
    }
  }
}

export const location__spawn = (params: { loc: Province }) => {
  const { loc } = params
  const city = hub__isCity(loc.hub)
  const village = hub__isVillage(loc.hub)
  const district = window.dice.weightedChoice<Loc['district']>([
    { v: 'noble district', w: village ? 0 : 0.1 },
    { v: 'merchant district', w: village ? 0 : 0.2 },
    { v: 'craftsman district', w: village ? 0 : 0.2 },
    { v: 'docks', w: !village && loc.hub.coastal ? 0.2 : 0 },
    { v: 'slums', w: city ? 0.2 : 0 },
    { v: 'rural', w: village ? 0.5 : 0 },
    { v: 'outskirts', w: 0.3 }
  ])
  const site = places[district].site({ loc })
  const tag = district === 'docks' || district === 'slums' ? ` (${district})` : ''
  return { district: district === 'outskirts' ? district : `${hub__alias(loc.hub)}${tag}`, site }
}
