import { range } from 'd3'

import { CELL } from '../../../cells'
import { Cell } from '../../../cells/types'
import { ACTOR } from '../../../npcs'
import { PLACE } from '..'
import { HOOK } from '../hooks'
import { Village } from './types'

export const VILLAGE = {
  finalize: (village: Village) => {
    if (!village.finalized) {
      village.finalized = true
      village.leadership = window.dice.weightedChoice([
        { v: 'Hereditary headman', w: 1 },
        { v: 'Reeve picked by a lord', w: 1 },
        { v: 'Council of elders', w: 1 },
        { v: 'Temple representative', w: 1 },
        { v: 'Cruel and feared bully', w: 1 },
        { v: 'Popularly-chosen chief', w: 1 },
        { v: 'Dreaded sorcerer', w: 1 },
        { v: 'Pragmatic warlord', w: 1 },
        { v: 'The riches native there', w: 1 },
        { v: 'A matriarch or patriarch', w: 1 },
        { v: 'Traditional squire', w: 1 }
      ])
      village.locals = range(10).map(() => ACTOR.spawn({ place: village }).idx)
      const province = PLACE.province(village)
      const region = PLACE.region(village)
      HOOK.spawn({
        place: village,
        hooks: HOOK.communities,
        samples: 2,
        constraints: {
          urban: false,
          warfare: province.conflict >= 0,
          coastal: village.coastal,
          tribal: !region.civilized,
          capital: false
        }
      })
    }
  },
  spawn: (cell: Cell) => {
    const base = PLACE.spawn(cell)
    const province = CELL.province(cell)
    const population = window.dice.randint(100, 1000)
    const village: Village = {
      ...base,
      type: 'village',
      subtype: `${population > 500 ? 'large' : 'small'} village`,
      population
    }
    province.places[base.idx] = village
    return village
  }
}
