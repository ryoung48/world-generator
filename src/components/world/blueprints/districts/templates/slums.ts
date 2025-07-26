import { BUILDING } from '../../buildings'
import { DistrictTemplate } from '../types'

const buildings: DistrictTemplate['buildings'] = [
  { v: 'government', w: 0.01 },
  { v: 'bath', w: 0.05 },
  { v: 'cemetary (large)', w: 0.0025 },
  { v: 'cemetary (small)', w: 0.0075 },
  { v: 'fountain', w: 0.01 },
  { v: 'residence', w: 0.31 },
  { v: 'lodging', w: 0.05 },
  ...BUILDING.shops({ weight: 0.05 }),
  { v: 'tavern', w: 0.1 },
  { v: 'tenement', w: 0.1 },
  { v: 'warehouse', w: 0.05 },
  { v: 'well', w: 0.01 },
  ...BUILDING.workshops({ weight: 0.17 })
]

const quality: DistrictTemplate['quality'] = [
  { v: 'C', w: 1 },
  { v: 'D', w: 3 }
]

export const SLUMS: DistrictTemplate = {
  type: 'slums',
  wealth: 'lower',
  buildings,
  quality
}
