import { BUILDING } from '../../buildings'
import { DistrictTemplate } from '../types'

const buildings: DistrictTemplate['buildings'] = [
  { v: 'residence', w: 0.78 },
  { v: 'lodging', w: 0.01 },
  ...BUILDING.shops({ weight: 0.01 }),
  { v: 'tavern', w: 0.1 },
  { v: 'well', w: 0.01 },
  ...BUILDING.workshops({ weight: 0.1 })
]

const quality: DistrictTemplate['quality'] = [
  { v: 'C', w: 1 },
  { v: 'D', w: 3 }
]

export const RURAL: DistrictTemplate = {
  type: 'rural',
  wealth: 'lower',
  buildings,
  quality
}
