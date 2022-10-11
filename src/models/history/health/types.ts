import { WorldEvent } from '../types'

export interface HealthCheckEvent extends WorldEvent {
  type: 'healthCheck'
}
