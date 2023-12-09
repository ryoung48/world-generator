import { range } from 'd3'

import { REGION } from '../../regions'
import { PROVINCE } from '../../regions/provinces'
import { Region } from '../../regions/types'
import { ARRAY } from '../../utilities/array'
import { RebellionEvent } from './types'

export const REBELLION_EVENT = {
  spawn: (nation: Region) => {
    window.world.future.queue({
      type: 'rebellion',
      time: window.world.date,
      nation: nation.idx
    })
  },
  tick: ({ nation: idx }: RebellionEvent) => {
    const overlord = window.world.regions[idx]
    const domains = REGION.domains(overlord)
    range(window.dice.randint(0, domains.length)).forEach(() => {
      const borders = ARRAY.unique(
        REGION.provinces(overlord)
          .filter(PROVINCE.isBorder)
          .map(p => p.region)
      )
        .map(r => window.world.regions[r])
        .filter(r => domains.includes(r))
      if (!borders.length) return
      const rebel = window.dice.choice(borders)
      REGION.provinces(overlord)
        .filter(p => PROVINCE.region(p).idx === rebel.idx)
        .forEach(p => {
          PROVINCE.claim({ province: p, nation: rebel })
        })
      rebel.exhaustion = 0.5
    })
  }
}
