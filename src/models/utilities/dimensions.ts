const h = 800
const w = 800
export const canvasDims = { h, w, hypot: Math.hypot(w * 0.5, h * 0.5) }

export interface Dimensions {
  h: number
  w: number
  sh: number
  sw: number
}
