import { Conflict, ConflictType } from '../../../conflicts/types'
import { NATION } from '../../../nations'
import { PROVINCE } from '../../../provinces'
import { Province } from '../../../provinces/types'
import { findAllies, findVassals } from './alliances'
import {
  addConflictToProvince,
  fairWars,
  getBorderScore,
  getWeightedConflictLevel,
  spreadConflict
} from './spread'

export const getConflictName = (
  invader: Province,
  defender: Province | undefined,
  level: number
): string => {
  return `${invader.name} – ${defender.name} (${window.dice.weightedChoice([
    { w: 5, v: 'border dispute' },
    { w: 1, v: 'resource dispute' },
    { w: level > 2 && level < 5 ? 1 : 0, v: 'raiders' },
    { w: level >= 3 ? 1 : 0, v: 'holy crusade' },
    {
      w: invader.development > 2.5 && defender.development > 2.5 && level < 5 ? 1 : 0,
      v: 'trade war'
    }
  ])})`
}

export const createInterstateConflicts = (
  shuffledNations: Province[],
  nationsInConflict: Set<number>,
  targetConflictRatio: number
) => {
  const nations = NATION.nations()
  const interstateCandidates = shuffledNations.filter(n => n.government !== 'fragmented')

  // Pair up nations
  for (let i = 0; i < interstateCandidates.length; i++) {
    const nation = interstateCandidates[i]
    if (nationsInConflict.has(nation.idx)) continue
    if (nationsInConflict.size / nations.length >= targetConflictRatio && window.dice.random < 0.9)
      continue
    // Find a neighbor to fight
    const neighbors = NATION.neighbors({ nation })
    const validTargets = neighbors.filter(
      n =>
        NATION.relations.get({ n1: nation, n2: n }) !== 'at war' &&
        NATION.relations.get({ n1: nation, n2: n }) !== 'suzerain' &&
        NATION.relations.get({ n1: nation, n2: n }) !== 'vassal' &&
        NATION.relations.get({ n1: nation, n2: n }) !== 'tributary' &&
        NATION.relations.get({ n1: nation, n2: n }) !== 'personal union' &&
        !nationsInConflict.has(n.idx) &&
        fairWars[nation.size]?.includes(n.size) &&
        !PROVINCE.far(nation, n)
    )

    if (validTargets.length > 0) {
      const weightedTargets = validTargets.map(t => ({
        v: t,
        w: getBorderScore(nation, t)
      }))
      const target = window.dice.weightedChoice(weightedTargets) || validTargets[0]
      const level = getWeightedConflictLevel()
      const invader = window.dice.choice([nation, target])
      const defender = invader === nation ? target : nation

      // Find allies and vassals for both sides
      const invaderAllies = findAllies(invader, defender).filter(a => !nationsInConflict.has(a.idx))
      const defenderAllies = findAllies(defender, invader).filter(
        a => !nationsInConflict.has(a.idx)
      )

      const invaderVassals = findVassals(invader)
      const defenderVassals = findVassals(defender)

      // Combine allies and vassals
      const allInvaderSupporters = [...invaderAllies, ...invaderVassals]
      const allDefenderSupporters = [...defenderAllies, ...defenderVassals]

      let conflictProvinces: Province[] = []

      if (level <= 3) {
        // Border conflict
        const nationBorderProvinces = NATION.provinces(nation).filter(p =>
          PROVINCE.neighbors({ province: p, type: 'foreign' }).some(
            neighbor => neighbor.nation === target.idx
          )
        )
        const targetBorderProvinces = NATION.provinces(target).filter(p =>
          PROVINCE.neighbors({ province: p, type: 'foreign' }).some(
            neighbor => neighbor.nation === nation.idx
          )
        )

        // Pick a few border provinces
        conflictProvinces = [
          ...window.dice.shuffle(nationBorderProvinces).slice(0, 3),
          ...window.dice.shuffle(targetBorderProvinces).slice(0, 3)
        ]

        // Don't spread border disputes, just add them
        conflictProvinces.forEach(p =>
          addConflictToProvince(p, window.world.conflicts.length, level)
        )
      } else {
        // Start at border
        const defenderBorderProvinces = NATION.provinces(defender).filter(p =>
          PROVINCE.neighbors({ province: p, type: 'foreign' }).some(
            neighbor => neighbor.nation === invader.idx
          )
        )

        // Pick some border provinces as the start
        conflictProvinces = window.dice.shuffle(defenderBorderProvinces).slice(0, 3)

        // Spread from there
        const conflictIdx = window.world.conflicts.length
        spreadConflict(conflictProvinces, conflictIdx, level)

        // If allies are involved, add their border provinces too
        if (allInvaderSupporters.length > 0 || allDefenderSupporters.length > 0) {
          for (const ally of allInvaderSupporters) {
            const allyBorderProvinces = NATION.provinces(ally)
              .filter(p =>
                PROVINCE.neighbors({ province: p, type: 'foreign' }).some(
                  neighbor =>
                    neighbor.nation === target.idx ||
                    allDefenderSupporters.some(s => s.idx === neighbor.nation)
                )
              )
              .slice(0, 2)
            allyBorderProvinces.forEach(p =>
              addConflictToProvince(p, conflictIdx, Math.max(1, level - 1))
            )
            conflictProvinces.push(...allyBorderProvinces)
          }

          for (const ally of allDefenderSupporters) {
            const allyBorderProvinces = NATION.provinces(ally)
              .filter(p =>
                PROVINCE.neighbors({ province: p, type: 'foreign' }).some(
                  neighbor =>
                    neighbor.nation === nation.idx ||
                    allInvaderSupporters.some(s => s.idx === neighbor.nation)
                )
              )
              .slice(0, 2)
            allyBorderProvinces.forEach(p =>
              addConflictToProvince(p, conflictIdx, Math.max(1, level - 1))
            )
            conflictProvinces.push(...allyBorderProvinces)
          }
        }
      }

      // Get smart issues based on cultural analysis
      const conflict: Conflict = {
        name: getConflictName(invader, defender, level),
        level,
        provinces: conflictProvinces.map(p => p.idx),
        type: 'interstate',
        parties: [
          `${[invader, ...allInvaderSupporters].map(p => p.name).join(', ')}`,
          `${[defender, ...allDefenderSupporters].map(p => p.name).join(', ')}`
        ],
        nations: {
          primary: [nation.idx, target.idx],
          allied:
            allInvaderSupporters.length > 0 || allDefenderSupporters.length > 0
              ? [...allInvaderSupporters.map(a => a.idx), ...allDefenderSupporters.map(a => a.idx)]
              : undefined
        }
      }

      window.world.conflicts.push(conflict)

      // Update diplomatic relations based on conflict level
      if (level >= 3) {
        NATION.relations.set({ relation: 'at war', n1: invader, n2: defender })

        // Allies also go to war with each other
        for (const ally of allInvaderSupporters) {
          NATION.relations.set({ relation: 'at war', n1: ally, n2: defender })
          for (const enemyAlly of allDefenderSupporters) {
            NATION.relations.set({ relation: 'at war', n1: ally, n2: enemyAlly })
          }
        }
        for (const ally of allDefenderSupporters) {
          NATION.relations.set({ relation: 'at war', n1: ally, n2: invader })
        }
      } else {
        NATION.relations.set({ relation: 'suspicious', n1: invader, n2: invader })
      }

      // Mark all involved nations as in conflict
      nationsInConflict.add(nation.idx)
      nationsInConflict.add(target.idx)
      allInvaderSupporters.forEach(a => nationsInConflict.add(a.idx))
      allDefenderSupporters.forEach(a => nationsInConflict.add(a.idx))
    }
  }
}
