import { BUILDING } from '../../buildings'
import { DistrictTemplate } from '../types'

const buildings: DistrictTemplate['buildings'] = [
  { v: 'government', w: 0.1 },
  { v: 'asylum', w: 0.01 },
  { v: 'bath', w: 0.04 },
  { v: 'cemetary (large)', w: 0.0025 },
  { v: 'cemetary (small)', w: 0.0075 },
  { v: 'religious', w: 0.04 },
  { v: 'cistern', w: 0.01 },
  { v: 'fountain', w: 0.02 },
  { v: 'granary', w: 0.01 },
  { v: 'guild house', w: 0.01 },
  { v: 'residence', w: 0.16 },
  { v: 'lodging', w: 0.05 },
  { v: 'library', w: 0.01 },
  ...BUILDING.offices({ weight: 0.05 }),
  { v: 'prison', w: 0.01 },
  ...BUILDING.shops({ weight: 0.05 }),
  { v: 'stable', w: 0.05 },
  { v: 'tavern', w: 0.1 },
  { v: 'university', w: 0.01 },
  { v: 'warehouse', w: 0.07 },
  { v: 'well', w: 0.01 },
  ...BUILDING.workshops({ weight: 0.1 })
]

const quality: DistrictTemplate['quality'] = [
  { v: 'B', w: 1 },
  { v: 'C', w: 2 }
]

export const ADMIN: DistrictTemplate = {
  type: 'administration',
  wealth: 'upper',
  buildings,
  quality
}
