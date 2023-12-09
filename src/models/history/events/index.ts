import { REGION } from '../../regions'
import { yearMS } from '../../utilities/math/time'
import { HISTORY } from '..'
import { ACTION_EVENT } from './action'
import { REBELLION_EVENT } from './rebellion'
import { REFRESH_EVENT } from './refresh'
import { WAR_EVENT } from './war'

export const EVENTS = {
  init: () => {
    window.world.nations.push({
      idx: 0,
      ruler: window.world.provinces.map(p => p.nation),
      conflict: window.world.provinces.map(() => []),
      subjects: window.world.regions.map(r => [...r.provinces])
    })
    REFRESH_EVENT.spawn()
    REGION.nations.forEach(nation => {
      ACTION_EVENT.spawn(nation)
    })
  },
  tick: () => {
    const current = HISTORY.current()
    window.world.nations.push({
      idx: window.world.nations.length,
      ruler: [...current.ruler],
      conflict: current.conflict.map(s => [...s]),
      subjects: current.subjects.map(s => [...s])
    })
    REGION.nations.forEach(nation => {
      nation.exhaustion = Math.max(0, nation.exhaustion - 0.1)
    })
    const time = window.world.date + yearMS
    while (window.world.future.peek().time <= time) {
      const event = window.world.future.dequeue()
      window.world.date = event.time
      switch (event.type) {
        case 'action': {
          ACTION_EVENT.tick(event)
          break
        }
        case 'refresh': {
          REFRESH_EVENT.tick()
          break
        }
        case 'rebellion': {
          REBELLION_EVENT.tick(event)
          break
        }
        case 'war': {
          WAR_EVENT.tick(event)
          break
        }
      }
    }
    window.world.date = time
  }
}
