import { NATION } from '../../../models/nations'
import { MAP_SHAPES } from '../shapes'
import { DRAW_CACHE } from '../shapes/caching'
import { DRAW_CULTURES } from './cultures'
import { DRAW_GOVERNMENT } from './government'
import { DRAW_NATION } from './nation'
import { DRAW_RELIGIONS } from './religions'
import { DRAW_RESOURCES } from './resources'
import { DRAW_TIMEZONES } from './timezones'
import { DRAW_TOPOGRAPHY } from './topography'
import { DrawBorderParams } from './types'

export const DRAW_BORDERS = {
  regions: ({ ctx, style, projection, province, nationSet }: DrawBorderParams) => {
    const scale = MAP_SHAPES.scale.derived(projection)
    const path = MAP_SHAPES.path.linear(projection)
    const regionStyle = style === 'Nations'
    const nations = NATION.nations()
    const provinces = window.world.provinces
    // base coloration
    const wastes = provinces.filter(p => p.subjects.length > 0 && p.desolate)
    ctx.lineWidth = scale * 2
    ctx.fillStyle = '#f7eedc'
    nations.concat(wastes).forEach(nation => {
      DRAW_CACHE.paths.nation({ nation, path }).forEach(p => {
        ctx.fill(p)
      })
    })
    if (style === 'Topography') {
      DRAW_TOPOGRAPHY.coloration({ projection, ctx })
    } else if (style === 'Resources') {
      DRAW_RESOURCES.coloration({ projection, ctx })
    } else if (style !== 'Nations' && style !== 'Timezones') {
      provinces.forEach(province => {
        const coloration = DRAW_CACHE.borders.province(province)
        ctx.fillStyle =
          style === 'Cultures'
            ? coloration.culture
            : style === 'Climate'
            ? coloration.climate
            : style === 'Vegetation'
            ? coloration.vegetation
            : style === 'Development'
            ? coloration.development
            : style === 'Population'
            ? coloration.pop
            : style === 'Government'
            ? coloration.government
            : style === 'Religion'
            ? coloration.religion
            : coloration.rain
        DRAW_CACHE.paths.province({ province, path }).forEach(p => {
          ctx.fill(p)
        })
      })
    }
    // province borders
    ctx.lineWidth = scale * 0.1
    provinces.forEach(province => {
      ctx.strokeStyle = 'hsla(0, 0%, 0%, 0.1)'
      DRAW_CACHE.paths.province({ province, path }).forEach(p => {
        ctx.stroke(p)
        if (province.desolate && regionStyle) {
          ctx.fillStyle = MAP_SHAPES.color.wasteland
          ctx.fill(p)
        }
      })
    })
    if (style === 'Topography') DRAW_TOPOGRAPHY.special({ projection, ctx })
    if (style === 'Timezones') DRAW_TIMEZONES.land({ ctx, projection })
    if (style === 'Religion') DRAW_RELIGIONS.minorities({ projection, ctx })
    if (style === 'Government') DRAW_GOVERNMENT.vassals({ projection, ctx })
    if (style === 'Development' || style === 'Government')
      DRAW_GOVERNMENT.colonies({ projection, ctx })
    // nation borders
    DRAW_NATION.coloration({ projection, ctx, style, selected: province })
    if (style === 'Nations') {
      DRAW_NATION.contested({ projection, ctx })
      DRAW_NATION.walls({ projection, ctx })
    }
    if (style === 'Cultures') DRAW_CULTURES.minorities({ projection, ctx, nationSet })
  }
}
