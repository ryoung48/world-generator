import { Profiles } from '../../models/utilities/performance/types'

export type Stat =
  | keyof Profiles
  | 'world'
  | 'resources'
  | 'vegetation'
  | 'climate'
  | 'development'
  | 'topography'
