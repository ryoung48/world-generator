import { CELL } from '../../../cells'
import { Cell } from '../../../cells/types'
import { PLACE } from '..'
import { HOOK } from '../hooks'
import { TRADE_GOODS } from './trade'
import { Hub } from './types'

export const HUB = {
  city: (hub: Hub) => hub.population > 10e3,
  finalize: (hub: Hub) => {
    if (!hub.finalized) {
      hub.finalized = true
      TRADE_GOODS.spawn(hub)
      hub.leadership = window.dice.weightedChoice([
        { v: 'Hereditary lord', w: 1 },
        { v: 'Merchant prince', w: 1 },
        { v: 'Council of oligarchs', w: 1 },
        { v: 'Allied noble heads', w: 1 },
        { v: 'Royal viceroy', w: 1 },
        { v: 'Gentry-elected mayor', w: 1 },
        { v: 'Major clerical figure', w: 1 },
        { v: 'Occult power wielder', w: 1 },
        { v: 'Criminal group catspaw', w: 1 },
        { v: 'Ethnic group’s ruler', w: 1 },
        { v: 'Military strongman', w: 1 },
        { v: 'Chief magistrate', w: 1 }
      ])
      const province = PLACE.province(hub)
      const region = PLACE.region(hub)
      HOOK.spawn({
        place: hub,
        hooks: HOOK.communities,
        samples: 2,
        constraints: {
          urban: true,
          warfare: province.conflict >= 0,
          coastal: hub.coastal,
          tribal: !region.civilized,
          capital: province.capital
        }
      })
    }
  },
  population: {
    set: (hub: Hub, pop: number) => {
      hub.population = Math.ceil(pop)
      hub.subtype =
        pop > 200e3
          ? 'metropolis'
          : pop > 50e3
          ? 'huge city'
          : pop > 20e3
          ? 'large city'
          : pop > 10e3
          ? 'small city'
          : pop > 5e3
          ? 'large town'
          : 'small town'
    }
  },
  spawn: (cell: Cell) => {
    const base = PLACE.spawn(cell)
    const province = CELL.province(cell)
    const hub: Hub = { ...base, type: 'hub', population: 0 }
    province.places[base.idx] = hub
    PLACE.coastal.set(province.places[base.idx])
    return hub
  }
}
