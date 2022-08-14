import { offices, shops, workshops } from '../../buildings'
import { DistrictTemplate } from '../types'

const quality: DistrictTemplate['quality'] = [
  { v: 'C', w: 1 },
  { v: 'D', w: 2 }
]

export const district__docks: DistrictTemplate = {
  type: 'docks',
  wealth: 'lower',
  buildings: [
    { v: 'government', w: 0.01 },
    { v: 'bath', w: 0.05 },
    { v: 'religious', w: 0.02 },
    { v: 'livestock', w: 0.02 },
    { v: 'fountain', w: 0.01 },
    { v: 'granary', w: 0.01 },
    { v: 'residence', w: 0.16 },
    { v: 'lodging', w: 0.1 },
    ...offices(0.02),
    ...shops(0.05),
    { v: 'tavern', w: 0.15 },
    { v: 'tenement', w: 0.05 },
    { v: 'warehouse', w: 0.1 },
    { v: 'well', w: 0.01 },
    ...workshops(0.17)
  ],
  quality
}
