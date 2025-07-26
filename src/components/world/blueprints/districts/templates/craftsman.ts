import { BUILDING } from '../../buildings'
import { DistrictTemplate } from '../types'

const buildings: DistrictTemplate['buildings'] = [
  { v: 'government', w: 0.02 },
  { v: 'bath', w: 0.02 },
  { v: 'religious', w: 0.04 },
  { v: 'cistern', w: 0.01 },
  { v: 'fountain', w: 0.02 },
  { v: 'guild house', w: 0.02 },
  { v: 'residence', w: 0.1 },
  { v: 'lodging', w: 0.05 },
  ...BUILDING.shops({ weight: 0.1 }),
  { v: 'tavern', w: 0.1 },
  { v: 'tenement', w: 0.02 },
  { v: 'theater', w: 0.01 },
  { v: 'warehouse', w: 0.05 },
  { v: 'well', w: 0.01 },
  ...BUILDING.workshops({ weight: 0.4 })
]

const quality: DistrictTemplate['quality'] = [
  { v: 'B', w: 1 },
  { v: 'C', w: 2 },
  { v: 'D', w: 1 }
]

export const CRAFTSMAN: DistrictTemplate = {
  type: 'craftsman',
  wealth: 'middle',
  buildings,
  quality
}
