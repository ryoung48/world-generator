import { range } from 'd3'

import { REGION } from '../../regions'
import { PROVINCE } from '../../regions/provinces'
import { Region } from '../../regions/types'
import { yearMS } from '../../utilities/math/time'
import { HISTORY } from '..'
import { WarEvent } from './types'

export const WAR_EVENT = {
  spawn: (nation: Region) => {
    if (nation.exhaustion >= 0.75) return
    const strength = REGION.strength(nation)
    const targets = REGION.neighbors({ region: nation }).filter(
      neighbor => REGION.strength(neighbor) < strength
    )
    if (!targets.length) return
    let [defender] = REGION.sort({ ref: nation, regions: targets, type: 'closest' })
    const cores = targets.filter(target =>
      REGION.provinces(target).some(province => PROVINCE.region(province).idx === nation.idx)
    )
    if (cores.length > 0) defender = cores[0]
    const borders = REGION.provinces(defender).filter(p =>
      PROVINCE.neighboringRegions([p]).includes(nation.idx)
    )
    const battlegrounds = borders.slice(0, Math.max(0.5 * borders.length, 3))
    battlegrounds.forEach(p => {
      HISTORY.current().conflict[p.idx].push(nation.idx)
    })
    window.world.future.queue({
      type: 'war',
      time: window.world.date + yearMS * window.dice.uniform(1, 3),
      attacker: nation.idx,
      defender: defender.idx,
      provinces: battlegrounds.map(p => p.idx)
    })
  },
  tick: (params: WarEvent) => {
    const attacker = window.world.regions[params.attacker]
    const defender = window.world.regions[params.defender]
    if (REGION.active(attacker) && REGION.active(defender)) {
      range(window.dice.randint(0, 10)).forEach(() => {
        const prospects = Array.from(
          new Set(
            REGION.provinces(attacker)
              .map(p => PROVINCE.neighbors({ province: p, type: 'foreign' }).map(({ idx }) => idx))
              .flat()
          )
        )
          .map(p => window.world.provinces[p])
          .filter(province => PROVINCE.nation(province).idx === defender.idx)
        if (!prospects.length) return
        const target = PROVINCE.find({
          provinces: prospects,
          ref: window.world.provinces[attacker.capital],
          type: 'closest'
        })
        if (target) {
          if (PROVINCE.isCapital(target)) {
            REGION.claim({ region: PROVINCE.nation(target), nation: attacker })
          } else {
            PROVINCE.claim({ province: target, nation: attacker })
          }
        }
      })
      const strength = REGION.strength(attacker)
      const cost = REGION.strength(defender) / strength
      attacker.exhaustion += cost * window.dice.uniform(0.5, 1.5)
      if (REGION.active(defender)) defender.exhaustion += cost * window.dice.uniform(0.25, 0.5)
    }
    const current = HISTORY.current()
    params.provinces.forEach(p => {
      current.conflict[p].splice(current.conflict[p].indexOf(params.attacker), 1)
    })
  }
}
