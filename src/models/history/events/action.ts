import { scaleLinear } from 'd3'

import { REGION } from '../../regions'
import { Region } from '../../regions/types'
import { yearMS } from '../../utilities/math/time'
import { REBELLION_EVENT } from './rebellion'
import { ActionEvent } from './types'
import { WAR_EVENT } from './war'

const rebelChance = scaleLinear([0, 30, 60, 120, 1000], [0, 0.3, 0.6, 0.9, 0.99])

export const ACTION_EVENT = {
  spawn: (nation: Region) => {
    window.world.future.queue({
      type: 'action',
      time: window.world.date + yearMS * window.dice.uniform(1, 3),
      nation: nation.idx
    })
  },
  tick: ({ nation: idx }: ActionEvent) => {
    const nation = window.world.regions[idx]
    if (REGION.active(nation)) {
      const rebellion =
        REGION.domains(nation).length > 1 &&
        window.dice.random < rebelChance(REGION.provinces(nation).length) + nation.exhaustion * 0.5
      if (rebellion) {
        REBELLION_EVENT.spawn(nation)
      } else if (window.dice.random > 0.6) {
        WAR_EVENT.spawn(nation)
      }
    }
    ACTION_EVENT.spawn(nation)
  }
}
