import { Point } from '../../../models/utilities/math/points/types'
import { PERFORMANCE } from '../../../models/utilities/performance'
import { IconDef } from './types'

export const iconPath = `${window.location.href}assets/`

export const canvas__drawIcon = (params: {
  ctx: CanvasRenderingContext2D
  img: HTMLImageElement
  icon: IconDef
  sw: number
  sh: number
  point: Point
  bigger?: boolean
}) => {
  const { ctx, img, icon, sw, sh, point, bigger } = params
  const h = icon.height * (bigger ? 2 : 1)
  const scale = img.height / h
  const w = img.width / scale
  const height = h * sh
  const width = w * sw
  ctx.globalAlpha = icon.opacity
  try {
    ctx.drawImage(img, point.x - width / 2, point.y - height / 2, width, height)
  } catch (e) {
    console.log(icon)
    throw e
  }
  return { width: width * sw, height: height * sh }
}

export const icon__scaling = PERFORMANCE.memoize.decorate({
  f: () => {
    const { h, w } = window.world.dim
    const av = (h + w) / 2
    const s = (window.world.dim.cells / 16000) * 100 + 300
    return { sh: av / s, sw: av / s }
  }
})
