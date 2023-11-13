import { BUILDING } from '../buildings'
import { DistrictTemplate } from '../types'

export const district__merchant: DistrictTemplate = {
  type: 'merchant',
  wealth: 'upper',
  buildings: [
    { v: 'government', w: 0.02 },
    { v: 'bath', w: 0.03 },
    { v: 'cemetary (large)', w: 0.0025 },
    { v: 'cemetary (small)', w: 0.0075 },
    { v: 'religious', w: 0.04 },
    { v: 'cistern', w: 0.01 },
    { v: 'fountain', w: 0.02 },
    { v: 'garden', w: 0.01 },
    { v: 'granary', w: 0.01 },
    { v: 'guild house', w: 0.02 },
    { v: 'residence', w: 0.12 },
    { v: 'lodging', w: 0.05 },
    { v: 'library', w: 0.01 },
    ...BUILDING.offices(0.05),
    { v: 'plaza', w: 0.01 },
    ...BUILDING.shops(0.15),
    { v: 'stable', w: 0.05 },
    { v: 'tavern', w: 0.1 },
    { v: 'university', w: 0.01 },
    { v: 'warehouse', w: 0.1 },
    { v: 'well', w: 0.01 },
    ...BUILDING.workshops(0.09)
  ],
  quality: [
    { v: 'A', w: 1 },
    { v: 'B', w: 2 },
    { v: 'C', w: 1 }
  ]
}
