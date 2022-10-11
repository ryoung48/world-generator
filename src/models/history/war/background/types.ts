import { Region } from '../../../regions/types'
import { War } from '../types'

export interface WarBackgroundArgs {
  invader: Region
  defender: Region
}

export interface WarBackground {
  tag: War['background']['type']
  spawn: (_args: WarBackgroundArgs) => number
  text: (_args: WarBackgroundArgs) => string
}
