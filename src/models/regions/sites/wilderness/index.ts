import { CELL } from '../../../cells'
import { Cell } from '../../../cells/types'
import { LANGUAGE } from '../../../heritage/languages'
import { PROVINCE } from '../../provinces'
import { SITE } from '..'
import { Wilderness } from './types'

export const WILDERNESS = {
  spawn: (cell: Cell): Wilderness => {
    const province = CELL.province(cell)
    const { local } = PROVINCE.cultures(province)
    const culture = window.world.cultures[local.culture]
    const type = window.dice.weightedChoice<Wilderness['type']>([
      { v: 'ruin', w: 0.5 },
      { v: 'wilderness', w: 0.5 }
    ])
    const site = SITE.spawn({ cell, idx: province.sites.length })
    return {
      ...site,
      name: LANGUAGE.word.unique({
        lang: culture.language,
        key: type,
        len: window.dice.randint(2, 4)
      }).word,
      type
    }
  }
}
