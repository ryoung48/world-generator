import { IconDef } from '../types'
import { battlefield__icon } from './battlefield/types'
import { camp__icon } from './camps/types'
import { cave__icon } from './caves/types'
import { coastal__icon } from './coastal/types'
import { crypt__icon } from './crypts/types'
import { farm__icon } from './farms/types'
import { grove__icon } from './groves/types'
import { inn__icon } from './inn/types'
import { keep__icon } from './keeps/types'
import { laboratory__icon } from './laboratory/types'
import { mines__icon } from './mines/types'
import { portal__icon } from './portals/types'
import { ruins__icon } from './ruins/types'
import { settlement__icon } from './settlements/types'
import { shrine__icon } from './shrines/types'
import { temple__icon } from './temples/types'
import { watchtower__icon } from './watchtower/types'

export type location_icon =
  | battlefield__icon
  | camp__icon
  | cave__icon
  | coastal__icon
  | crypt__icon
  | farm__icon
  | grove__icon
  | inn__icon
  | keep__icon
  | laboratory__icon
  | mines__icon
  | portal__icon
  | ruins__icon
  | settlement__icon
  | shrine__icon
  | temple__icon
  | watchtower__icon

export interface LocationIcon extends IconDef {
  font_scale: number
}
