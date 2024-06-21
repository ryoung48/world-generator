import { range } from 'd3'

import { ACTOR } from '../../../actors'
import { CELL } from '../../../cells'
import { Cell } from '../../../cells/types'
import { PLACE } from '..'
import { Camp } from './types'

export const CAMP = {
  finalize: (camp: Camp) => {
    if (!camp.finalized) {
      camp.finalized = true
      camp.leadership = window.dice.weightedChoice([
        { v: `Bestially savage tyrant`, w: 1 },
        { v: `Wizened elder`, w: 1 },
        { v: `Magically-gifted chief`, w: 1 },
        { v: `Holy man or woman`, w: 1 },
        { v: `Hereditary chieftain`, w: 1 },
        { v: `Outsider or alien lord`, w: 0.1 },
        { v: `Brutal but cunning chief`, w: 1 },
        { v: `Foreigner turned ruler`, w: 1 },
        { v: `Council of elders`, w: 1 },
        { v: `No ruler past clan heads`, w: 1 },
        { v: `Envoy of a patron power`, w: 1 },
        { v: `Most charismatic native`, w: 1 }
      ])
      camp.locals = range(10).map(() => ACTOR.spawn({ place: camp }).idx)
    }
  },
  spawn: (cell: Cell) => {
    const base = PLACE.spawn(cell)
    const province = CELL.province(cell)
    const population = window.dice.randint(30, 150)
    const camp: Camp = { ...base, type: 'camp', subtype: `tribal camp`, population }
    province.places[base.idx] = camp
    return camp
  }
}
