import { Loc } from '../../../regions/locations/types'
import { decorateText } from '../decoration'

export const location__details = {
  name: (location: Loc) => decorateText({ link: location, tooltip: location.type })
}
