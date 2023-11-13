import { BUILDING } from '../buildings'
import { DistrictTemplate } from '../types'

export const district__noble: DistrictTemplate = {
  type: 'noble',
  wealth: 'upper',
  buildings: [
    { v: 'government', w: 0.02 },
    { v: 'bath', w: 0.05 },
    { v: 'cemetary (large)', w: 0.0025 },
    { v: 'cemetary (small)', w: 0.0075 },
    { v: 'religious', w: 0.05 },
    { v: 'cistern', w: 0.01 },
    { v: 'fountain', w: 0.02 },
    { v: 'garden', w: 0.02 },
    { v: 'granary', w: 0.01 },
    { v: 'residence', w: 0.22 },
    { v: 'lodging', w: 0.05 },
    { v: 'library', w: 0.02 },
    ...BUILDING.offices(0.05),
    { v: 'plaza', w: 0.01 },
    ...BUILDING.shops(0.1),
    { v: 'stable', w: 0.05 },
    { v: 'tavern', w: 0.1 },
    { v: 'university', w: 0.01 },
    { v: 'warehouse', w: 0.12 },
    { v: 'well', w: 0.01 }
  ],
  quality: [
    { v: 'A', w: 1 },
    { v: 'B', w: 2 }
  ]
}
