import { actor__spawn } from '../../../npcs/actors/spawn'
import { npc__CRToLvl } from '../../../npcs/stats'
import { Loc } from '../../../regions/locations/types'
import { percentageScale } from '../../../utilities/math'

const bandit__spawn = (params: { loc: Loc; cr: number; boss?: boolean }) => {
  const { loc, cr, boss } = params
  const level = npc__CRToLvl(cr)
  const tier = boss
    ? 'boss'
    : level < 1
    ? 'vagrant'
    : level < 2
    ? 'common'
    : level < 3
    ? 'thug'
    : level < 4
    ? 'professional'
    : level < 5
    ? 'veteran'
    : 'elite'
  const bandit = actor__spawn({
    location: loc,
    occupation: { key: 'brigand' },
    living: true,
    tier,
    level
  })
  return bandit.idx
}

export const banditGroup__spawn = (params: { loc: Loc; cr: number }) => {
  const { loc, cr } = params
  const numElites = Math.max(
    0,
    window.dice.weightedChoice([
      { v: 0, w: 0.2 },
      { v: 1, w: 0.6 },
      { v: 2, w: 0.2 }
    ])
  )
  const minions = Array<number>(window.dice.randint(3, 8) - numElites).fill(1)
  const elites = Array<number>(numElites).fill(2)
  return percentageScale(minions.concat(elites)).map(weight =>
    bandit__spawn({
      loc,
      cr: cr * weight
    })
  )
}
