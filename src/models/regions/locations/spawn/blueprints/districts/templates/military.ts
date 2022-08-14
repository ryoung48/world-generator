import { shops, workshops } from '../../buildings'
import { DistrictTemplate } from '../types'

export const district__military: DistrictTemplate = {
  type: 'military',
  wealth: 'middle',
  buildings: [
    { v: 'government', w: 0.05 },
    { v: 'barrack', w: 0.15 },
    { v: 'bath', w: 0.01 },
    { v: 'religious', w: 0.02 },
    { v: 'coliseum', w: 0.01 },
    { v: 'livestock', w: 0.02 },
    { v: 'fountain', w: 0.01 },
    { v: 'granary', w: 0.01 },
    { v: 'residence', w: 0.1 },
    { v: 'prison', w: 0.02 },
    ...shops(0.05),
    { v: 'stable', w: 0.1 },
    { v: 'tavern', w: 0.1 },
    { v: 'warehouse', w: 0.15 },
    { v: 'well', w: 0.01 },
    ...workshops(0.18)
  ],
  quality: [
    { v: 'B', w: 1 },
    { v: 'C', w: 2 },
    { v: 'D', w: 1 }
  ]
}
