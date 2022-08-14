import { shops, workshops } from '../../buildings'
import { DistrictTemplate } from '../types'

export const district__craftsman: DistrictTemplate = {
  type: 'craftsman',
  wealth: 'middle',
  buildings: [
    { v: 'government', w: 0.02 },
    { v: 'bath', w: 0.02 },
    { v: 'religious', w: 0.04 },
    { v: 'cistern', w: 0.01 },
    { v: 'fountain', w: 0.02 },
    { v: 'guild house', w: 0.02 },
    { v: 'residence', w: 0.1 },
    { v: 'lodging', w: 0.05 },
    ...shops(0.1),
    { v: 'tavern', w: 0.1 },
    { v: 'tenement', w: 0.02 },
    { v: 'theater', w: 0.01 },
    { v: 'warehouse', w: 0.05 },
    { v: 'well', w: 0.01 },
    ...workshops(0.4)
  ],
  quality: [
    { v: 'B', w: 1 },
    { v: 'C', w: 2 },
    { v: 'D', w: 1 }
  ]
}
