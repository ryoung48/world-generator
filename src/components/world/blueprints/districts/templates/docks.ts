import { BUILDING } from '../../buildings'
import { DistrictTemplate } from '../types'

const buildings: DistrictTemplate['buildings'] = [
  { v: 'government', w: 0.01 },
  { v: 'bath', w: 0.05 },
  { v: 'religious', w: 0.02 },
  { v: 'livestock', w: 0.02 },
  { v: 'fountain', w: 0.01 },
  { v: 'granary', w: 0.01 },
  { v: 'residence', w: 0.16 },
  { v: 'lodging', w: 0.1 },
  ...BUILDING.offices({ weight: 0.02 }),
  ...BUILDING.shops({ weight: 0.05 }),
  { v: 'tavern', w: 0.15 },
  { v: 'tenement', w: 0.05 },
  { v: 'warehouse', w: 0.1 },
  { v: 'well', w: 0.01 },
  ...BUILDING.workshops({ weight: 0.17 })
]

const quality: DistrictTemplate['quality'] = [
  { v: 'C', w: 1 },
  { v: 'D', w: 2 }
]

export const DOCKS: DistrictTemplate = {
  type: 'docks',
  wealth: 'lower',
  buildings,
  quality
}
