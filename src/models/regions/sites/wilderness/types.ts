import { Site } from '../type'

export interface Wilderness extends Site {
  type: 'wilderness' | 'ruin'
}
