import { CELL } from '../../../../models/world/cells'
import { MAP } from '../../common'
import { ICON } from '..'
import { IconDef } from '../types'
import { desert__icons } from './desert'
import { element__icons } from './elements'
import { grass__icons } from './grass'
import { mountain__icons } from './mountains'
import { tree__icons } from './trees'
import { DrawTerrainIconParams, TerrainIcon } from './types'

const terrain: Record<TerrainIcon, IconDef> = {
  ...desert__icons,
  ...grass__icons,
  ...mountain__icons,
  ...tree__icons,
  ...element__icons
}

export const DRAW_TERRAIN = {
  draw: ({ ctx, cachedImages, projection, regions, lands }: DrawTerrainIconParams) => {
    const scale = MAP.scale.derived(projection)
    const pathGen = MAP.path.linear(projection)
    const globalScale = scale <= MAP.breakpoints.global
    const sortedIcons = window.world.display.icons
      .filter(m => {
        const cell = window.world.cells[m.cell]
        const valid = !CELL.isHub(cell) || scale <= 20
        const province = window.world.provinces[cell.province]
        const contained = regions.has(province.region)
        const drawnLand = cell.isWater || lands.has(cell.landmark)
        const globalMountains = globalScale && cell.isMountains
        const shouldDraw = globalMountains || (contained && drawnLand)
        return valid && shouldDraw
      })
      .sort((a, b) => {
        if (a.y === b.y) {
          return a.x - b.x
        }
        return b.y - a.y
      })
    ctx.save()
    sortedIcons.forEach(i => {
      const img = cachedImages[i.type]
      const icon = DRAW_TERRAIN.icons[i.type]
      const geojson = MAP.geojson.point(i)
      const center = pathGen.centroid(MAP.geojson.features([geojson]))
      ICON.draw({
        ctx,
        img,
        icon,
        sw: scale,
        sh: scale,
        point: {
          x: center[0],
          y: center[1]
        }
      })
    })
    ctx.restore()
  },
  icons: terrain
}
