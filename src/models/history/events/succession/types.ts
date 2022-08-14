import { WorldEvent } from '../../types'

export interface SuccessionEvent extends WorldEvent {
  type: 'succession'
  nation: number
  start: number
  death: boolean
}
