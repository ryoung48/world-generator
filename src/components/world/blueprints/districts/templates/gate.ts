import { BUILDING } from '../../buildings'
import { DistrictTemplate } from '../types'

const buildings: DistrictTemplate['buildings'] = [
  { v: 'government', w: 0.03 },
  { v: 'bath', w: 0.01 },
  { v: 'religious', w: 0.04 },
  { v: 'livestock', w: 0.02 },
  { v: 'fountain', w: 0.01 },
  { v: 'residence', w: 0.11 },
  { v: 'lodging', w: 0.15 },
  ...BUILDING.offices({ weight: 0.02 }),
  ...BUILDING.shops({ weight: 0.05 }),
  { v: 'stable', w: 0.1 },
  { v: 'tavern', w: 0.15 },
  { v: 'warehouse', w: 0.15 },
  { v: 'well', w: 0.01 },
  ...BUILDING.workshops({ weight: 0.13 })
]

const quality: DistrictTemplate['quality'] = [
  { v: 'B', w: 1 },
  { v: 'C', w: 2 },
  { v: 'D', w: 1 }
]

export const GATE: DistrictTemplate = {
  type: 'gate',
  wealth: 'middle',
  buildings,
  quality
}
