import { range } from 'd3'
import { Conflict, ConflictLevel } from '../../../conflicts/types'
import { CULTURE } from '../../../heritage'
import { LANGUAGE } from '../../../heritage/languages'
import { PROVINCE } from '../../../provinces'
import { Province } from '../../../provinces/types'
import { spreadConflict } from './spread'

export const details = (
  nation: Province,
  target: Province | undefined,
  conflictProvinces: Province[]
) => {
  const n1Name = PROVINCE.nation(nation).name
  const n2Name = PROVINCE.nation(target).name
  const coastal = conflictProvinces.some(p => PROVINCE.coastal(p))

  const minorities = conflictProvinces
    .filter(p => p.minority && p.minority !== nation.culture)
    .map(p => p.minority)
  const cultures = conflictProvinces.filter(p => p.culture !== nation.culture).map(p => p.culture)

  const minority = window.dice.choice(
    minorities.length > 0 ? minorities : cultures.length > 0 ? cultures : [nation.culture]
  )

  const type = window.dice.weightedChoice([
    { w: 5, v: 'militants' },
    { w: 1, v: 'bandits' },
    { w: coastal ? 1 : 0, v: 'pirates' }
  ])

  return {
    name: `${n1Name}, ${n2Name} (${type})`,
    parties: range(2).map(() => `${LANGUAGE.word.simple({
    lang: CULTURE.language(window.world.cultures[minority]),
    key: 'faction'
  })?.word} (${type})`)
  }
}

export const createTransstateConflicts = (nations: Province[]) => {
  // Along borders, max level 3
  // Iterate through some borders
  const borderProvinces = window.world.provinces.filter(
    p => PROVINCE.neighbors({ province: p, type: 'foreign' }).length > 0
  )
  const shuffledBorders = window.dice.shuffle(borderProvinces)

  // Limit number of transstate conflicts
  const maxTransstate = Math.floor(nations.length * 0.05)
  let transstateCount = 0

  for (const p of shuffledBorders) {
    if (transstateCount >= maxTransstate) break
    if (window.dice.random < 0.05) {
      const neighbors = PROVINCE.neighbors({ province: p, type: 'foreign' })
      const neighbor = window.dice.choice(neighbors)

      const level = window.dice.randint(1, 3) as ConflictLevel
      const conflictProvinces = [p, neighbor]

      const conflict: Conflict = {
        ...details(p, neighbor, conflictProvinces),
        level,
        provinces: [p.idx, neighbor.idx],
        type: 'transstate',
        nations: {
          primary: [p.nation ?? p.idx, neighbor.nation ?? neighbor.idx]
        }
      }

      const conflictIdx = window.world.conflicts.push(conflict) - 1
      spreadConflict(conflictProvinces, conflictIdx, level)
      transstateCount++
    }
  }
}
