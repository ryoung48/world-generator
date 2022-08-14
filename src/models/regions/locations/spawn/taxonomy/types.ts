import { location_icon } from '../../../../../components/maps/icons/locations/types'
import { ExteriorCell } from '../../../../world/cells/types'
import { Province } from '../../../provinces/types'
import { Loc } from '../../types'
import { LocationTrait } from '../traits/types'

export interface LocationTemplate {
  type: Loc['type']
  population?: [number, number]
  coastal?: number
  icon: ((_loc: Loc) => location_icon) | location_icon
  group: 'settlement' | 'wilderness'
  spawn?: ((_province: Province) => number) | number
  hostile?: boolean
  finalize?: (_loc: Loc) => void
  restrictions?: (_cell: ExteriorCell) => boolean
  traits?: (_loc: Loc) => LocationTrait['tag'][]
}
