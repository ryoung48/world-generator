import { offices, shops, workshops } from '../../buildings'
import { DistrictTemplate } from '../types'

export const district__gate: DistrictTemplate = {
  type: 'gate',
  wealth: 'middle',
  buildings: [
    { v: 'government', w: 0.03 },
    { v: 'bath', w: 0.01 },
    { v: 'religious', w: 0.04 },
    { v: 'livestock', w: 0.02 },
    { v: 'fountain', w: 0.01 },
    { v: 'residence', w: 0.11 },
    { v: 'lodging', w: 0.15 },
    ...offices(0.02),
    ...shops(0.05),
    { v: 'stable', w: 0.1 },
    { v: 'tavern', w: 0.15 },
    { v: 'warehouse', w: 0.15 },
    { v: 'well', w: 0.01 },
    ...workshops(0.13)
  ],
  quality: [
    { v: 'B', w: 1 },
    { v: 'C', w: 2 },
    { v: 'D', w: 1 }
  ]
}
