import { BUILDING } from '../buildings'
import { DistrictTemplate } from '../types'

export const district__rural: DistrictTemplate = {
  type: 'rural',
  wealth: 'lower',
  buildings: [
    { v: 'residence', w: 0.78 },
    { v: 'lodging', w: 0.01 },
    ...BUILDING.shops(0.01),
    { v: 'tavern', w: 0.1 },
    { v: 'well', w: 0.01 },
    ...BUILDING.workshops(0.1)
  ],
  quality: [
    { v: 'C', w: 1 },
    { v: 'D', w: 3 }
  ]
}
