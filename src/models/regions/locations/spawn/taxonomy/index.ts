import { recentBattleWindow } from '../../../../history/war/battles'
import { nation__hasRefugees } from '../../../diplomacy/refugees'
import { province__hub } from '../../../provinces'
import { location__pendingInvasion, location__raiders, location__recentBattle } from '../..'
import { Loc } from '../../types'
import { LocationTrait } from '../traits/types'
import { LocationTemplate } from './types'

const coastalSettlements = 0.5

/**
 * Assign location inhabitants (hostile) based on subtype
 * @param loc
 * @returns a list of inhabitant traits
 */
const assignInhabitants: LocationTemplate['traits'] = (loc: Loc) => {
  const traits: LocationTrait['tag'][] = []
  if (loc.hostile) {
    if (loc.subtype.includes('beast')) traits.push('beasts')
    if (loc.subtype.includes('primordial')) traits.push('primordials')
    if (loc.subtype.includes('aberration')) traits.push('aberrations')
    if (loc.subtype.includes('bandits')) traits.push('bandits')
    if (loc.subtype.includes('occultists')) traits.push('occultists')
    if (loc.subtype.includes('cultists')) traits.push('cultists')
    if (loc.subtype.includes('deserters')) traits.push('deserters')
    if (loc.subtype.includes('raiders')) traits.push('raiders')
    if (loc.subtype.includes('vampiric')) traits.push('vampiric')
    if (loc.subtype.includes('cursed')) traits.push('lingering curse')
    if (loc.subtype.includes('haunted')) traits.push('haunted')
    if (loc.subtype.includes('exiled')) traits.push('exiled noble')
  } else {
    if (loc.subtype.includes('vampiric')) traits.push('dark secret')
    if (loc.subtype.includes('rebels')) traits.push('rebel stronghold')
    if (loc.subtype.includes('refugees')) traits.push('foreign enclave')
    if (loc.subtype.includes('nomadic')) traits.push('nomadic populace')
    if (loc.subtype.includes('druidic')) traits.push('druidic circle')
    if (loc.subtype.includes('heretics')) traits.push('heretical faith')
    if (loc.subtype.includes('monastery')) traits.push('prominent monastery')
    if (loc.subtype.includes('temple')) traits.push('major temple')
    if (loc.subtype.includes('academy')) traits.push('prestigious academy')
    if (loc.subtype.includes('criminal')) traits.push('criminal bosses')
    if (loc.subtype.includes('crossroads')) traits.push('trade hub')
    if (loc.subtype.includes('templars')) traits.push('templar order')
  }
  return traits
}

export const location__templates: Record<Loc['type'], LocationTemplate> = {
  metropolis: {
    type: 'metropolis',
    population: [100000, 500000],
    coastal: coastalSettlements,
    alias: 'city',
    icon: 'city',
    group: 'settlement'
  },
  'huge city': {
    type: 'huge city',
    population: [50000, 99500],
    coastal: coastalSettlements,
    alias: 'city',
    icon: 'city',
    group: 'settlement'
  },
  'large city': {
    type: 'large city',
    population: [25000, 49500],
    coastal: coastalSettlements,
    alias: 'city',
    icon: 'city',
    group: 'settlement'
  },
  'small city': {
    type: 'small city',
    population: [10000, 24500],
    coastal: coastalSettlements,
    alias: 'city',
    icon: 'city',
    group: 'settlement'
  },
  'large town': {
    type: 'large town',
    population: [5000, 9500],
    coastal: coastalSettlements,
    alias: 'town',
    icon: 'town',
    group: 'settlement'
  },
  'small town': {
    type: 'small town',
    population: [1000, 4500],
    coastal: coastalSettlements,
    alias: 'town',
    icon: 'town',
    group: 'settlement'
  },
  'large village': {
    type: 'large village',
    alias: 'village',
    population: [500, 950],
    coastal: coastalSettlements,
    icon: loc => (!loc.hub && loc.coastal ? 'fishing_village' : 'village'),
    group: 'settlement',
    spawn: province => {
      const hub = province__hub(province)
      return hub.population > location__templates['small city'].population[0] ? 0.5 : 0
    }
  },
  'small village': {
    type: 'small village',
    alias: 'village',
    population: [100, 450],
    coastal: coastalSettlements,
    icon: loc => (!loc.hub && loc.coastal ? 'fishing_village' : 'village'),
    group: 'settlement',
    spawn: province => {
      const hub = province__hub(province)
      return hub.population > location__templates['large town'].population[0] ? 1 : 0
    }
  },
  'tiny village': {
    type: 'tiny village',
    alias: 'village',
    population: [30, 95],
    coastal: coastalSettlements,
    icon: loc => (!loc.hub && loc.coastal ? 'fishing_village' : 'hamlet'),
    group: 'settlement',
    spawn: province => {
      const hub = province__hub(province)
      return hub.population > location__templates['small town'].population[0] ? 2 : 0
    }
  },
  battlefield: {
    type: 'battlefield',
    icon: 'battlefield_1',
    group: 'wilderness',
    spawn: 0.5,
    finalize: loc => {
      loc.hostile = true
      const province = window.world.provinces[loc.province]
      const { lastInvasion } = province.memory
      loc.subtype = `${window.dice.choice([
        'battleground',
        'battlefield'
      ])} (${window.dice.weightedChoice([
        { v: 'recent', w: lastInvasion.time > window.world.date - recentBattleWindow ? 5 : 0 },
        { v: 'old', w: 1 },
        { v: 'ancient', w: 1 }
      ])})`
    }
  },
  cave: {
    type: 'cave',
    icon: () => window.dice.choice(['cave_1', 'cave_2']),
    group: 'wilderness',
    spawn: 1,
    traits: assignInhabitants,
    finalize: loc => {
      const raiders = location__raiders(loc)
      loc.subtype = `${window.dice.choice(['cave', 'lair'])} (${window.dice.weightedChoice([
        { v: 'beast', w: 1 },
        { v: 'primordial', w: 1 },
        { v: 'aberration', w: 1 },
        { v: 'bandits', w: 1 },
        { v: 'raiders', w: raiders.length > 0 ? 3 : 0 },
        { v: 'occultists', w: 1 },
        { v: 'vampiric', w: 1 }
      ])})`
      loc.hostile = true
    }
  },
  camp: {
    type: 'camp',
    icon: () => window.dice.choice(['camp_1', 'camp_2', 'camp_3']),
    group: 'wilderness',
    spawn: 1,
    traits: assignInhabitants,
    finalize: loc => {
      loc.hostile = window.dice.flip
      const recentBattle = location__recentBattle(loc)
      const invasion = location__pendingInvasion(loc)
      const province = window.world.provinces[loc.province]
      const refugees = nation__hasRefugees(window.world.regions[province.currNation])
      const raiders = location__raiders(loc)
      const { civilized, development } = window.world.regions[loc.region]
      const remote = development === 'remote'
      loc.subtype = `camp (${window.dice.weightedChoice(
        loc.hostile
          ? [
              { v: 'bandits', w: 1 },
              { v: 'raiders', w: raiders.length > 0 ? 3 : 0 },
              { v: 'cultists', w: 1 },
              { v: 'occultists', w: 1 },
              { v: 'deserters', w: recentBattle ? 3 : 0 },
              { v: 'ruined', w: 1 }
            ]
          : [
              { v: 'military', w: invasion || recentBattle ? 3 : 0 },
              { v: 'criminal', w: 1 },
              { v: 'refugees', w: refugees ? 3 : 0 },
              { v: 'rebels', w: 1 },
              { v: 'nomadic', w: remote ? 0 : 1 },
              { v: 'tribal', w: !civilized ? 3 : 0 }
            ]
      )})`
    }
  },
  crypt: {
    type: 'crypt',
    icon: () => window.dice.choice(['crypt_1', 'crypt_2', 'crypt_3']),
    group: 'wilderness',
    spawn: 0.5,
    traits: () => ['undeath'],
    finalize: loc => {
      loc.subtype = `${window.dice.choice([
        'crypt',
        'tomb',
        'necropolis',
        'sepulcher'
      ])} (${window.dice.choice(['small', 'large'])})`
      loc.hostile = true
    }
  },
  keep: {
    type: 'keep',
    icon: () => window.dice.choice(['keep_1', 'keep_2', 'keep_3', 'keep_4', 'keep_5']),
    group: 'wilderness',
    spawn: province => {
      const { development } = window.world.regions[province.region]
      return development === 'remote' ? 0 : 1
    },
    traits: assignInhabitants,
    finalize: loc => {
      loc.hostile = window.dice.flip
      const raiders = location__raiders(loc)
      loc.subtype = `${window.dice.choice([
        'keep',
        'fortress',
        'castle',
        'stronghold'
      ])} (${window.dice.weightedChoice(
        loc.hostile
          ? [
              { v: 'nobles, exiled', w: 1 },
              { v: 'bandits', w: 1 },
              { v: 'raiders', w: raiders.length > 0 ? 3 : 0 },
              { v: 'vampiric', w: 1 },
              { v: 'ruined', w: 1 }
            ]
          : [
              { v: 'nobles', w: 1 },
              { v: 'military', w: 1 },
              { v: 'templars', w: 1 },
              { v: 'vampiric', w: 1 },
              { v: 'rebels', w: 1 }
            ]
      )})`
    }
  },
  laboratory: {
    type: 'laboratory',
    icon: loc =>
      loc.subtype.includes('observatory')
        ? 'observatory_1'
        : loc.subtype.includes('academy')
        ? 'academy_1'
        : window.dice.choice(['lab_1', 'lab_2', 'lab_3']),
    group: 'wilderness',
    spawn: province => {
      const { civilized } = window.world.regions[province.region]
      return civilized ? 0.5 : 0
    },
    traits: assignInhabitants,
    finalize: loc => {
      loc.hostile = window.dice.flip
      loc.subtype = `${window.dice.weightedChoice([
        { w: 3, v: 'laboratory' },
        { w: 1, v: 'observatory' },
        { w: 1, v: 'academy' }
      ])} (${
        loc.hostile
          ? window.dice.choice(['ruined', 'occultists'])
          : window.dice.choice(['scholar', 'wizard'])
      })`
    }
  },
  portal: {
    type: 'portal',
    icon: () => window.dice.choice(['portal_1', 'portal_2']),
    group: 'wilderness',
    spawn: 0.1,
    traits: () => ['spirits'],
    finalize: loc => {
      loc.subtype = `portal (${window.dice.choice(['elementals', 'fiends', 'celestials', 'fey'])})`
      loc.hostile = true
    }
  },
  ruins: {
    type: 'ruins',
    alias: 'ruin',
    icon: () =>
      window.dice.choice(['ruins_1', 'ruins_2', 'ruins_3', 'ruins_4', 'ruins_5', 'ruins_6']),
    group: 'wilderness',
    spawn: 1,
    finalize: loc => {
      loc.subtype = `ruins (${window.dice.choice([
        'village',
        'town',
        'city'
      ])}, ${window.dice.choice(['ancient', 'old', 'recent'])})`
      loc.hostile = true
    }
  },
  temple: {
    type: 'temple',
    icon: () =>
      window.dice.choice([
        'temple_1',
        'temple_2',
        'temple_3',
        'temple_4',
        'temple_5',
        'temple_6',
        'temple_7',
        'temple_8',
        'temple_9',
        'temple_10',
        'temple_11'
      ]),
    group: 'wilderness',
    spawn: province => {
      const { development } = window.world.regions[province.region]
      return development === 'remote' ? 0 : 0.5
    },
    traits: assignInhabitants,
    finalize: loc => {
      loc.hostile = window.dice.flip
      loc.subtype = `${window.dice.choice(['temple', 'monastery'])} (${window.dice.choice(
        loc.hostile ? ['cultists', 'ruined'] : ['heretics', 'remote']
      )})`
    }
  },
  shrine: {
    type: 'shrine',
    icon: loc => {
      const { civilized } = window.world.regions[loc.region]
      return window.dice.choice(
        civilized
          ? ['shrine_1', 'shrine_2', 'shrine_3', 'shrine_4', 'shrine_5']
          : ['shrine_5', 'shrine_6', 'shrine_7', 'shrine_8', 'shrine_9', 'shrine_10', 'shrine_11']
      )
    },
    group: 'wilderness',
    spawn: 0.5,
    finalize: loc => {
      loc.hostile = window.dice.flip
      loc.subtype = `shrine (${window.dice.choice(loc.hostile ? ['ruined'] : ['remote'])})`
    }
  },
  farm: {
    type: 'farm',
    icon: () => window.dice.choice(['farm_1', 'farm_2', 'farm_3']),
    restrictions: cell => !cell.isMountains,
    group: 'wilderness',
    spawn: province => {
      const { development } = window.world.regions[province.region]
      return development === 'remote' ? 0 : 0.5
    },
    finalize: loc => {
      loc.hostile = window.dice.flip
      loc.subtype = `${window.dice.choice([
        'farmstead',
        'vineyard',
        'orchard'
      ])} (${window.dice.choice(loc.hostile ? ['ruined', 'overgrown'] : ['remote'])})`
    }
  },
  mine: {
    type: 'mine',
    icon: () => window.dice.choice(['mines_1', 'mines_2']),
    group: 'wilderness',
    traits: assignInhabitants,
    spawn: province => {
      const { development } = window.world.regions[province.region]
      return development === 'remote' ? 0 : 0.5
    },
    finalize: loc => {
      loc.hostile = window.dice.flip
      loc.subtype = `mines (${window.dice.choice(
        loc.hostile ? ['abandoned', 'haunted', 'cursed', 'occupied'] : ['remote']
      )})`
    }
  },
  shipwreck: {
    type: 'shipwreck',
    icon: 'shipwreck_1',
    group: 'wilderness',
    coastal: 0.5,
    spawn: province => {
      const { development } = window.world.regions[province.region]
      return province.ocean > 0 && development === 'remote' ? 0 : 0.5
    },
    finalize: loc => {
      loc.hostile = true
      loc.subtype = `shipwreck (${window.dice.choice(['military', 'merchant'])})`
    },
    restrictions: cell => cell.beach
  },
  lighthouse: {
    type: 'lighthouse',
    icon: () => window.dice.choice(['lighthouse_1', 'lighthouse_2']),
    group: 'wilderness',
    coastal: 0.5,
    traits: assignInhabitants,
    spawn: province => {
      const { civilized } = window.world.regions[province.region]
      return province.ocean > 0 && civilized ? 0.5 : 0
    },
    finalize: loc => {
      loc.hostile = window.dice.flip
      loc.subtype = `lighthouse (${
        loc.hostile ? window.dice.choice(['ruined', 'haunted', 'cursed']) : 'remote'
      })`
    },
    restrictions: cell => cell.beach
  },
  inn: {
    type: 'inn',
    icon: () => window.dice.choice(['inn_1', 'inn_2', 'inn_3']),
    group: 'wilderness',
    traits: assignInhabitants,
    spawn: province => {
      const { civilized } = window.world.regions[province.region]
      return Object.keys(province.trade.land).length > 0 && civilized ? 0.5 : 0
    },
    finalize: loc => {
      loc.hostile = window.dice.flip
      loc.subtype = `inn (${loc.hostile ? 'ruined' : 'crossroads'})`
    },
    restrictions: cell => cell.roads.land.length > 0
  },
  watchtower: {
    type: 'watchtower',
    icon: () =>
      window.dice.choice(['watchtower_1', 'watchtower_2', 'watchtower_3', 'watchtower_4']),
    group: 'wilderness',
    traits: assignInhabitants,
    spawn: province => {
      const { civilized } = window.world.regions[province.region]
      return Object.keys(province.trade.land).length > 0 && civilized ? 0.5 : 0
    },
    finalize: loc => {
      loc.hostile = window.dice.flip
      loc.subtype = `watchtower (${loc.hostile ? 'ruined' : 'guards'})`
    },
    restrictions: cell => cell.roads.land.length > 0
  }
}
