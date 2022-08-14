import { WorldEvent } from '../../types'

export interface HealthCheckEvent extends WorldEvent {
  type: 'health_check'
}
