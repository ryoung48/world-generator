import { Conflict } from '../../../conflicts/types'
import { CULTURE } from '../../../heritage'
import { LANGUAGE } from '../../../heritage/languages'
import { NATION } from '../../../nations'
import { PROVINCE } from '../../../provinces'
import { Province } from '../../../provinces/types'
import { getWeightedConflictLevel, spreadConflict } from './spread'

export const details = (
  type: Conflict['type'],
  nation: Province,
  level: number,
  conflictProvinces: Province[]
) => {
  const cultures = conflictProvinces.filter(p => p.culture !== nation.culture).map(p => p.culture)

  const minority = window.dice.choice(cultures.length > 0 ? cultures : [nation.culture])

  const faction = LANGUAGE.word.simple({
    lang: CULTURE.language(window.world.cultures[minority]),
    key: 'faction'
  })?.word

  const nationalists = LANGUAGE.word.simple({
    lang: CULTURE.language(window.world.cultures[nation.culture]),
    key: 'faction'
  })?.word

  const coastal = conflictProvinces.some(p => PROVINCE.coastal(p))
  // Intrastate / Substate
  const crime = window.dice.weightedChoice([
    { w: 1, v: 'bandits' },
    { w: 1, v: 'drug cartels' },
    { w: 1, v: 'inter-gang rivalry' },
    { w: 1, v: 'organized crime' },
    { w: coastal ? 1 : 0, v: 'pirates' }
  ])
  const criminals = crime.includes('cartel')
    ? 'cartel'
    : crime.includes('gang')
    ? 'gang'
    : crime.includes('bandit')
    ? 'bandit'
    : crime.includes('pirate')
    ? 'pirate'
    : 'syndicate'
  if (nation.decentralization === 'tribes')
    return {
      name: `${nation.name} (${window.dice.weightedChoice([
        { w: 1, v: 'inter-communal rivalry' },
        { w: 1, v: 'subclan rivalry' },
        { w: nation.size !== 'city-state' ? 1 : 0, v: 'unification war' },
        { w: NATION.colonized(nation) ? 4 : 0, v: 'indigenous groups' }
      ])})`,
      parties: conflictProvinces.slice(0, window.dice.randint(2, 3)).map(n => `${n.name} (clan)`)
    }

  const base = window.dice.weightedChoice([
    {
      w: type === 'intrastate' ? 5 : 0,
      v: {
        name: 'opposition',
        parties: [
          'government',
          `${nationalists} (${window.dice.choice(['traditional', 'progressive'])})`
        ]
      }
    },
    {
      w:
        level >= 3 && nation.policies?.slavery !== 'abolished slavery' && type === 'intrastate'
          ? 1
          : 0,
      v: {
        name: 'abolitionists',
        parties: ['government', `${nationalists} (abolitionists)`]
      }
    },
    {
      w: level >= 3 && nation.policies?.slavery === 'slave trade' && type === 'intrastate' ? 1 : 0,
      v: {
        name: 'slave revolts',
        parties: ['government', `${faction} (slaves)`]
      }
    },
    {
      w: level >= 3 && nation.policies?.land === 'serfdom' && type === 'intrastate' ? 1 : 0,
      v: {
        name: 'peasant revolts',
        parties: ['government', `${nationalists} (peasants)`]
      }
    },
    {
      w: minority !== nation.culture && nation.size !== 'city-state' ? 4 : 0,
      v: {
        name: `${window.world.cultures[minority]?.name} ${window.dice.choice([
          'separatists',
          'nationalists',
          'militants',
          'dissidents'
        ])}`,
        parties: ['government', `${window.world.cultures[minority]?.name} (separatists)`]
      }
    },
    {
      w: 1,
      v: {
        name: 'religious sects',
        parties:
          type === 'intrastate'
            ? ['government', `${faction} (${window.dice.choice(['sect', 'cult', 'heretics'])})`]
            : [
                `${nationalists} (${window.dice.choice(['sect', 'cult'])})`,
                `${faction} (${window.dice.choice(['sect', 'cult'])})`
              ]
      }
    },
    {
      w: 1,
      v: {
        name: `militant groups`,
        parties:
          type === 'intrastate'
            ? ['government', `${faction} (militants)`]
            : [`${nationalists} (militants)`, `${faction} (militants)`]
      }
    },
    {
      w: NATION.colonized(nation) ? 4 : 0,
      v: {
        name: 'indigenous groups',
        parties: ['colonial government', `${faction} (natives)`]
      }
    },
    {
      w: nation.development < 2.5 && type === 'substate' ? 1 : 0,
      v: {
        name: window.dice.choice(['inter-communal rivalry', 'subclan rivalry']),
        parties: window.dice.weightedChoice([
          { w: 5, v: conflictProvinces.slice(0, 2).map(n => `${n.hub.name} (clan)`) },
          { w: 1, v: ['farmers', 'pastoralists'] }
        ])
      }
    },
    {
      w: level > 2 && level < 5 ? 1 : 0,
      v: {
        name: crime,
        parties:
          type === 'intrastate'
            ? ['government', `${faction} (${criminals})`]
            : [`${nationalists} (${criminals})`, `${faction} (${criminals})`]
      }
    },
    {
      w: nation.government === 'autocracy' || nation.government === 'oligarchy' ? 1 : 0,
      v: {
        name: window.dice.choice(['dynastic rebels', 'succession crisis']),
        parties:
          type === 'intrastate'
            ? ['government', `${faction} (pretender)`]
            : [`${nationalists} (pretender)`, `${faction} (pretender)`]
      }
    },
    {
      w: type === 'substate' || nation.size === 'city-state' || level < 4 ? 0 : 1,
      v: {
        name: 'praetorian coup',
        parties: ['government', `${faction} (military)`]
      }
    }
  ])

  base.name = `${nation.name} (${base.name})`

  return base
}

export const createIntrastateConflicts = (
  shuffledNations: Province[],
  nationsInConflict: Set<number>,
  targetConflictRatio: number
) => {
  const nations = NATION.nations()

  const rebels = new Set()

  for (const nation of shuffledNations) {
    if (nation.decentralization === 'warring states') {
      const level = window.dice.choice([4, 5]) as 4 | 5
      const prospects = NATION.provinces(nation).filter(p => p !== nation)
      const nationProvinces = window.dice.sample(
        prospects,
        Math.max(1, Math.floor(prospects.length * 0.25))
      ).concat([nation])

      const battlegrounds = spreadConflict(nationProvinces, window.world.conflicts.length, level)
        .map(p => window.world.provinces[p])
        .sort((a, b) => PROVINCE.hub(b).population - PROVINCE.hub(a).population)

      const warlords = battlegrounds.slice(0, window.dice.randint(2, 5))

      const conflict: Conflict = {
        name: `${nation.name} (${window.dice.choice(['warlords', 'interregnum'])})`,
        level,
        provinces: battlegrounds.map(p => p.idx),
        type: 'substate',
        parties: warlords.map(w => w.hub.name),
        nations: {
          primary: [nation.idx]
        }
      }
      window.world.conflicts.push(conflict) - 1
      nationsInConflict.add(nation.idx)
      rebels.add(nation.idx)
      continue
    }

    // If we need more conflicts or random chance
    const small = nation.size === 'city-state' || nation.size === 'principality'
    if (!nationsInConflict.has(nation.idx) || (!small && window.dice.random < 0.3)) {
      if (
        nationsInConflict.size / nations.length < targetConflictRatio ||
        window.dice.random <
          (nation.size === 'empire'
            ? 0.6
            : nation.size === 'kingdom'
            ? 0.4
            : nation.size === 'principality'
            ? 0.2
            : 0)
      ) {
        const type: Conflict['type'] = nation.decentralization
          ? 'substate'
          : window.dice.choice(['intrastate', 'substate'])
        const level = getWeightedConflictLevel()

        // Pick a hotspot
        const nationProvinces = NATION.provinces(nation)
        const hotspot = window.dice.choice(nationProvinces)
        // Spread from hotspot
        // Initial provinces
        const initialProvinces = [
          hotspot,
          ...PROVINCE.neighbors({ province: hotspot, type: 'local' })
        ]

        const battlegrounds = spreadConflict(initialProvinces, window.world.conflicts.length, level)
          .map(p => window.world.provinces[p])
          .sort((a, b) => PROVINCE.hub(b).population - PROVINCE.hub(a).population)

        const conflict: Conflict = {
          ...details(type, nation, level, battlegrounds),
          level,
          provinces: battlegrounds.map(p => p.idx),
          type,
          nations: {
            primary: [nation.idx]
          }
        }

        window.world.conflicts.push(conflict)

        rebels.add(nation.idx)
        nationsInConflict.add(nation.idx)
      }
    }
  }
}
