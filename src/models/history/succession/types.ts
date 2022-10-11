import { WorldEvent } from '../types'

export interface SuccessionEvent extends WorldEvent {
  type: 'succession'
  nation: number
  death: boolean
  ruler: number
}
