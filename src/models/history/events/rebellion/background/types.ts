import { Region } from '../../../../regions/types'
import { Rebellion } from '../types'

export interface RebellionBackgroundArgs {
  nation: Region
  rebels: Region
}

export interface RebellionBackground {
  tag: Rebellion['background']['type']
  spawn: (_args: RebellionBackgroundArgs) => number
  text: (_args: RebellionBackgroundArgs) => string
  goal: (_params: { rebellion: Rebellion }) => void
}
