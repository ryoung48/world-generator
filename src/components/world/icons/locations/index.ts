import * as turf from '@turf/turf'

import { MAP_SHAPES } from '../../shapes'
import { ICON } from '..'
import { DrawIcon } from '../terrain/types'
import { battlefieldIcons } from './battlefield'
import { campIcons } from './camps'
import { caveIcons } from './caves'
import { coastalIcons } from './coastal'
import { cryptIcons } from './crypts'
import { farmIcons } from './farms'
import { groveIcons } from './groves'
import { innIcons } from './inn'
import { keepIcons } from './keeps'
import { laboratoryIcons } from './laboratory'
import { minesIcons } from './mines'
import { portalIcons } from './portals'
import { ruinsIcons } from './ruins'
import { settlementIcons } from './settlements'
import { shrineIcons } from './shrines'
import { templeIcons } from './temples'
import { LocationIcon, LocationIconDef } from './types'
import { watchtowerIcons } from './watchtower'
import { wildernessIcons } from './wilderness'

const icons: Record<LocationIcon, LocationIconDef> = {
  ...battlefieldIcons,
  ...campIcons,
  ...caveIcons,
  ...coastalIcons,
  ...cryptIcons,
  ...farmIcons,
  ...groveIcons,
  ...innIcons,
  ...keepIcons,
  ...laboratoryIcons,
  ...minesIcons,
  ...portalIcons,
  ...ruinsIcons,
  ...settlementIcons,
  ...shrineIcons,
  ...templeIcons,
  ...watchtowerIcons,
  ...wildernessIcons
}

export const DRAW_LOCATION = {
  definitions: icons,
  draw: ({ ctx, cachedImages, projection, icon, point }: DrawIcon<LocationIcon>) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    const pathGen = MAP_SHAPES.path.linear(projection)
    const geojson = turf.point([point.x, point.y])
    const center = pathGen.centroid(geojson)
    ICON.draw({
      ctx,
      img: cachedImages[icon],
      icon: DRAW_LOCATION.definitions[icon],
      sw: scale,
      sh: scale,
      point: {
        x: center[0],
        y: center[1]
      }
    })
  }
}
