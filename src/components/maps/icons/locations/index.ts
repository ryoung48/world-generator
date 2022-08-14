import { battlefield__icons } from './battlefield'
import { camp__icons } from './camps'
import { cave__icons } from './caves'
import { coastal__icons } from './coastal'
import { crypt__icons } from './crypts'
import { farm__icons } from './farms'
import { grove__icons } from './groves'
import { inn__icons } from './inn'
import { keep__icons } from './keeps'
import { laboratory__icons } from './laboratory'
import { mines__icons } from './mines'
import { portal__icons } from './portals'
import { ruins__icons } from './ruins'
import { settlement__icons } from './settlements'
import { shrine__icons } from './shrines'
import { temple__icons } from './temples'
import { location_icon, LocationIcon } from './types'
import { watchtower__icons } from './watchtower'

export const location__icons: Record<location_icon, LocationIcon> = {
  ...battlefield__icons,
  ...camp__icons,
  ...cave__icons,
  ...coastal__icons,
  ...crypt__icons,
  ...farm__icons,
  ...grove__icons,
  ...inn__icons,
  ...keep__icons,
  ...laboratory__icons,
  ...mines__icons,
  ...portal__icons,
  ...ruins__icons,
  ...settlement__icons,
  ...shrine__icons,
  ...temple__icons,
  ...watchtower__icons
}
