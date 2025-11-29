import { NATION } from '../../../nations'
import { createInterstateConflicts } from './interstate'
import { createIntrastateConflicts } from './intrastate'
import { createTransstateConflicts } from './transstate'

export const shapeConflicts = () => {
  window.world.conflicts = []
  const nations = NATION.nations().sort(
    (a, b) => NATION.provinces(b).length - NATION.provinces(a).length
  )
  const nationsInConflict = new Set<number>()

  // 1. Interstate Conflicts
  createInterstateConflicts(nations, nationsInConflict, 0.25)

  console.log(nationsInConflict.size / nations.length)

  // 2. Intrastate & Substate Conflicts
  createIntrastateConflicts(nations, nationsInConflict, 0.6)

  console.log(nationsInConflict.size / nations.length)

  // 3. Transstate Conflicts
  createTransstateConflicts(nations)
}
