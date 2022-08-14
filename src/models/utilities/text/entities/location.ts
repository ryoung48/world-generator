import { Loc } from '../../../regions/locations/types'
import { decorate_text } from '../decoration'

export const location__details = {
  name: (location: Loc) => decorate_text({ link: location, tooltip: location.type })
}
