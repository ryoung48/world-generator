import { IconDef } from '../types'
import { BattlefieldIcon } from './battlefield/types'
import { CampIcon } from './camps/types'
import { CaveIcon } from './caves/types'
import { CoastalIcon } from './coastal/types'
import { CryptIcon } from './crypts/types'
import { FarmIcon } from './farms/types'
import { GroveIcon } from './groves/types'
import { InnIcon } from './inn/types'
import { KeepIcon } from './keeps/types'
import { LaboratoryIcon } from './laboratory/types'
import { MinesIcon } from './mines/types'
import { PortalIcon } from './portals/types'
import { RuinsIcon } from './ruins/types'
import { SettlementIcon } from './settlements/types'
import { ShrineIcon } from './shrines/types'
import { TempleIcon } from './temples/types'
import { WatchtowerIcon } from './watchtower/types'
import { WildernessIcon } from './wilderness/types'

export type LocationIcon =
  | BattlefieldIcon
  | CampIcon
  | CaveIcon
  | CoastalIcon
  | CryptIcon
  | FarmIcon
  | GroveIcon
  | InnIcon
  | KeepIcon
  | LaboratoryIcon
  | MinesIcon
  | PortalIcon
  | RuinsIcon
  | SettlementIcon
  | ShrineIcon
  | TempleIcon
  | WatchtowerIcon
  | WildernessIcon

export interface LocationIconDef extends IconDef {
  fontScale: number
}
