import { CULTURE } from '../../heritage'
import { NATION } from '../../nations'
import { PROVINCE } from '../../provinces'
import { DiplomaticRelation, Province } from '../../provinces/types'

export const shapeGovernments = () => {
  const nations = NATION.nations()

  const isRoyal = (n: Province) =>
    n.government === 'autocracy' || n.government === 'oligarchy' || n.government === 'theocracy'
  nations.forEach(nation => {
    const culture = window.world.cultures[nation.culture]
    const uncivilized = nation.development < 1.5
    const civilized = nation.development > 3.5
    const corrupted = nation.corruption > 0.5
    const small = NATION.provinces(nation).length < 3
    const large = nation.size === 'kingdom' || nation.size === 'empire'
    const irreligious = CULTURE.religion(culture)?.type === 'irreligious'
    const climate = PROVINCE.climate(nation)
    nation.government = window.dice.weightedChoice([
      { w: uncivilized ? 1 : 2, v: 'autocracy' },
      { w: nation.development < 2 && NATION.provinces(nation).length > 1 ? 0 : 1, v: 'republic' },
      { w: 1, v: 'oligarchy' },
      { w: small ? 0 : uncivilized ? 2 : 0.25, v: 'confederation' },
      { w: irreligious ? 0 : 0.5, v: 'theocracy' },
      {
        w: corrupted || climate === 'subarctic' ? 1000 : uncivilized ? 5 : large ? 0.25 : 0,
        v: 'fragmented'
      }
    ])
    const decentralized =
      nation.government === 'fragmented' || nation.government === 'confederation'
    if (decentralized) {
      nation.decentralization = uncivilized
        ? 'tribes'
        : nation.government === 'confederation'
        ? 'city-states'
        : 'warring states'
    }
    if (isRoyal(nation) && window.dice.random > 0.95) {
      nation.regency = true
    }
    // legal system
    if (nation.government === 'fragmented') nation.law = 'customary law'
    else if (nation.government === 'confederation')
      nation.law = window.dice.weightedChoice([
        { w: uncivilized ? 1 : 0, v: 'customary law' },
        { w: nation.size === 'city-state' ? 0 : 3, v: 'localized codes' },
        { w: 1, v: 'hierarchical law' },
        { w: civilized ? 1 : 0, v: 'bureaucratic law' }
      ])
    else
      nation.law = window.dice.weightedChoice([
        { w: uncivilized ? 1 : 0, v: 'customary law' },
        { w: nation.size === 'city-state' || civilized ? 0 : 1, v: 'localized codes' },
        { w: 3, v: 'hierarchical law' },
        { w: uncivilized ? 0 : 0.5, v: 'esoteric codified' },
        { w: civilized ? 3 : uncivilized ? 0 : 1, v: 'bureaucratic law' },
        { w: nation.government === 'autocracy' ? 1 : 0, v: 'arbitrary rule' }
      ])
    nation.policies = {}
    // religion
    const theocracy = nation.government === 'theocracy'
    nation.policies.religion = window.dice.weightedChoice([
      { w: irreligious ? 2 : 0, v: 'atheism' },
      { w: theocracy ? 0 : 1, v: 'pluralism' },
      { w: decentralized || theocracy ? 0 : 1, v: 'secularized' },
      { w: irreligious ? 0 : 2, v: 'moralism' }
    ])
    // trade
    nation.policies.trade = window.dice.weightedChoice([
      { w: 3, v: 'free trade' },
      { w: uncivilized || decentralized ? 0 : 1, v: 'mercantilism' },
      { w: uncivilized || decentralized ? 0 : 1, v: 'protectionism' },
      { w: decentralized ? 0 : 0.5, v: 'isolationist' }
    ])
    // economy
    nation.policies.economy = uncivilized
      ? 'traditionalism'
      : window.dice.weightedChoice([
          { w: 3, v: 'laissez-faire' },
          { w: decentralized ? 0 : 1, v: 'interventionism' },
          { w: decentralized ? 0 : 1, v: 'state capitalism' },
          { w: decentralized ? 0 : 1, v: 'command economy' }
        ])
    // bureaucracy
    nation.policies.bureaucracy = window.dice.weightedChoice([
      { w: decentralized ? 0 : 1, v: 'meritocratic exams' },
      { w: decentralized || !large ? 0 : 0.25, v: 'venal offices' },
      { w: 1, v: 'hereditary officials' },
      { w: decentralized || !large ? 0 : 1, v: 'court eunuchs' },
      { w: 1, v: 'appointed officials' }
    ])
    // land reform
    nation.policies.land = window.dice.weightedChoice([
      { w: civilized ? 1 : 0, v: 'commercial farms' },
      { w: uncivilized ? 3 : 0, v: 'ancestral holdings' },
      { w: civilized ? 0 : 1, v: 'serfdom' },
      { w: 1, v: 'tenant farmers' },
      { w: decentralized ? 0 : 1, v: 'collective farms' }
    ])
    // slavery
    nation.policies.slavery = window.dice.weightedChoice([
      { w: uncivilized ? 1 : 2, v: 'abolished slavery' },
      { w: uncivilized ? 1 : 2, v: 'legacy slavery' },
      { w: uncivilized ? 1 : 2, v: 'indentured labor' },
      { w: uncivilized ? 2 : 1, v: 'domestic servants' },
      { w: uncivilized ? 2 : 1, v: 'slave trade' }
    ])
  })
  // diplomacy
  nations.forEach(nation => {
    NATION.neighbors({ nation }).forEach(neighbor => {
      if (nation.relations[neighbor.idx]) return
      const relation = PROVINCE.far(nation, neighbor)
        ? 'neutral'
        : window.dice.weightedChoice<DiplomaticRelation>([
            { v: 'ally', w: 0.1 },
            { v: 'friendly', w: 0.15 },
            { v: 'neutral', w: 0.35 },
            { v: 'suspicious', w: 0.4 }
          ])
      NATION.relations.set({ relation, n1: nation, n2: neighbor })
    })
  })
  // vassals
  const union = (n: Province) => Object.values(n.relations).some(r => r === 'personal union')
  nations
    .filter(n => (n.size === 'empire' || n.size === 'kingdom') && n.government !== 'fragmented')
    .forEach(nation => {
      const condition =
        nation.size === 'kingdom'
          ? (n: Province) => n.size === 'city-state' || n.size === 'principality'
          : (n: Province) =>
              n.size === 'city-state' || n.size === 'principality' || nation.size === 'kingdom'
      NATION.neighbors({ nation })
        .filter(
          n =>
            condition(n) &&
            n.overlord === undefined &&
            n.government !== 'fragmented' &&
            window.dice.random > 0.75 &&
            !PROVINCE.far(nation, n) &&
            nation.territories.length - n.territories.length > 4
        )
        .forEach(neighbor => {
          NATION.relations.subject({
            overlord: nation,
            vassal: neighbor,
            type: window.dice.weightedChoice([
              {
                w: isRoyal(neighbor) && isRoyal(nation) && !union(nation) ? 0.25 : 0,
                v: 'personal union'
              },
              { w: 1, v: 'vassal' },
              { w: 2, v: 'tributary' }
            ])
          })
        })
    })
  // colonies
  const candidates = nations.filter(p => p.development < 2 && NATION.coastal(p))
  nations
    .filter(
      n =>
        n.size !== 'city-state' &&
        n.government !== 'fragmented' &&
        NATION.coastal(n) &&
        n.overlord === undefined &&
        n.development > 2.75
    )
    .forEach(nation => {
      window.dice
        .shuffle(candidates.filter(n => n.overlord === undefined))
        .slice(
          0,
          window.dice.randint(
            0,
            nation.size === 'principality' ? 1 : nation.size === 'kingdom' ? 2 : 3
          )
        )
        .forEach(neighbor => {
          NATION.relations.subject({
            overlord: nation,
            vassal: neighbor,
            type: window.dice.weightedChoice([
              { w: 1, v: 'colony' },
              { w: 2, v: 'chartered company' },
              { w: 2, v: 'dominion' }
            ])
          })
        })
    })
}
