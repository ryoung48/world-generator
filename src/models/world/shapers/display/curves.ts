import { curveCatmullRom, curveLinear, line, scaleLinear } from 'd3'

export const CURVES = {
  linear: () => {
    const x = scaleLinear().domain([0, window.world.dim.w]).range([0, window.world.dim.w])
    const y = scaleLinear().domain([0, window.world.dim.h]).range([0, window.world.dim.h])
    return line()
      .x((d: number[]) => x(d[0]))
      .y((d: number[]) => y(d[1]))
      .curve(curveLinear)
  },
  paths: () => {
    const x = scaleLinear().domain([0, window.world.dim.w]).range([0, window.world.dim.w])
    const y = scaleLinear().domain([0, window.world.dim.h]).range([0, window.world.dim.h])
    const curve = line()
      .x((d: number[]) => x(d[0]))
      .y((d: number[]) => y(d[1]))
      .curve(curveCatmullRom.alpha(0.1))
    return curve
  }
}
