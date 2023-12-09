import { REGION } from '../../regions'
import { yearMS } from '../../utilities/math/time'

export const REFRESH_EVENT = {
  spawn: () => {
    window.world.future.queue({
      type: 'refresh',
      time: window.world.date + yearMS
    })
  },
  tick: () => {
    REGION.nations.forEach(nation => {
      nation.exhaustion = Math.max(0, nation.exhaustion - 0.1)
    })
    REFRESH_EVENT.spawn()
  }
}
