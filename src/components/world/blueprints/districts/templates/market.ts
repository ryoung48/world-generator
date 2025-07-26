import { BUILDING } from '../../buildings'
import { DistrictTemplate } from '../types'

const buildings: DistrictTemplate['buildings'] = [
  { v: 'government', w: 0.02 },
  { v: 'bath', w: 0.04 },
  { v: 'religious', w: 0.06 },
  { v: 'cistern', w: 0.01 },
  { v: 'fountain', w: 0.02 },
  { v: 'granary', w: 0.01 },
  { v: 'guild house', w: 0.01 },
  { v: 'residence', w: 0.06 },
  { v: 'lodging', w: 0.05 },
  ...BUILDING.offices({ weight: 0.05 }),
  { v: 'plaza', w: 0.01 },
  ...BUILDING.shops({ weight: 0.21 }),
  { v: 'stable', w: 0.05 },
  { v: 'tavern', w: 0.15 },
  { v: 'warehouse', w: 0.21 },
  { v: 'well', w: 0.01 }
]

const quality: DistrictTemplate['quality'] = [
  { v: 'A', w: 1 },
  { v: 'B', w: 2 },
  { v: 'C', w: 1 }
]

export const MARKET: DistrictTemplate = {
  type: 'market',
  wealth: 'middle',
  buildings,
  quality
}
