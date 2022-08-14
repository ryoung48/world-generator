import { canvas__circle } from '../../../../../components/maps/canvas'
import { Point } from '../../../../utilities/math/points'

interface Circle extends Point {
  r: number
  w: number
}

export interface ContinentTemplate {
  isles: Circle[]
  selected: number
}

const mirror_orientations = ['vertical', 'horizontal'] as const
export const isle_heights = { low: 0.6, high: 1 }

const circle_color = (opacity: number) => `rgb(88, 24, 13, ${opacity})`

/**
 * draws a circle of a template mold
 * @param params.ctx - canvas context
 * @param params.circle - circle (center point + radius + height)
 * @param params.selected - selected circle index
 */
export const circle__draw = (params: {
  canvas: HTMLCanvasElement
  circle: Circle
  selected: boolean
}) => {
  const { canvas, circle, selected } = params
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  // rescale the mold to the dimensions of the canvas
  const x = circle.x * canvas.width
  const y = circle.y * canvas.height
  const r = circle.r * Math.hypot(canvas.width * 0.5, canvas.height * 0.5)
  // low circles are less opaque
  const low = circle.w === isle_heights.low
  let opacity = low ? 0.3 : 1
  // selected circles are more opaque
  if (selected) opacity = 1.5
  // draw the less opaque, but bigger outer circle
  // representing outer areas that can form land when outer circles overlap
  const outer = r * (low ? 0.6 : 1)
  canvas__circle({ point: { x, y }, radius: outer, ctx, fill: circle_color(0.1 * opacity) })
  // draw the more opaque, but smaller inner circle
  // representing where land is most likely to occur
  const inner = r * (low ? 0.2 : 0.4)
  canvas__circle({ point: { x, y }, radius: inner, ctx, fill: circle_color(0.4 * opacity) })
}

/**
 * mirrors all circles in a template mold on the given axis
 * @param params.isles - isles to flip
 * @param params.axis - orientation (vertical|horizontal)
 * @returns mirrored template mold circles
 */
export const circle__mirror = (params: {
  isles: ContinentTemplate['isles']
  axis: typeof mirror_orientations[number]
}) => {
  const { isles, axis: orient } = params
  return isles.map(isle => {
    const copy = { ...isle }
    if (orient === 'vertical') copy.y = 1 - isle.y
    if (orient === 'horizontal') copy.x = 1 - isle.x
    return copy
  })
}

const circle__variants = (isles: ContinentTemplate['isles']) => {
  const horizontal = circle__mirror({
    isles: isles,
    axis: 'horizontal'
  })
  const vertical = circle__mirror({
    isles: isles,
    axis: 'vertical'
  })
  const diagonal = circle__mirror({
    isles: horizontal,
    axis: 'vertical'
  })
  return [isles, horizontal, vertical, diagonal]
}

const continent_1 = circle__variants([
  { x: 0.25, y: 0.65, r: 0.53, w: 1 },
  { x: 0.55, y: 0.4, r: 0.44, w: 1 },
  { x: 0.9, y: 0.2, r: 0.26, w: 1 },
  { x: 0.75, y: 0.1, r: 0.17, w: 1 },
  { x: 0.55, y: 0.9, r: 0.17, w: 0.6 },
  { x: 0.7, y: 0.8, r: 0.26, w: 0.6 },
  { x: 0.85, y: 0.7, r: 0.17, w: 0.6 },
  { x: 0.85, y: 0.55, r: 0.17, w: 0.6 },
  { x: 0.1, y: 0.25, r: 0.26, w: 0.6 },
  { x: 0.3, y: 0.1, r: 0.26, w: 0.6 }
])
const continent_2 = circle__variants([
  { x: 0.22374999999999978, y: 0.5149999999999965, r: 0.3186137307178599, w: 1 },
  { x: 0.42374999999999957, y: 0.7087499999999994, r: 0.44845498368000003, w: 1 },
  { x: 0.7137499999999993, y: 0.7012500000000008, r: 0.29306451646218246, w: 1 },
  { x: 0.7212500000000007, y: 0.2162500000000001, r: 0.2, w: 1 },
  { x: 0.6037500000000041, y: 0.10375000000000004, r: 0.24, w: 0.6 },
  { x: 0.12625, y: 0.20625000000000002, r: 0.2, w: 0.6 },
  { x: 0.25000000000000006, y: 0.09375, r: 0.2, w: 0.6 },
  { x: 0.3974999999999991, y: 0.17625000000000002, r: 0.2, w: 0.6 },
  { x: 0.10250000000000002, y: 0.8862499999999996, r: 0.288, w: 0.6 },
  { x: 0.8737500000000008, y: 0.4350000000000008, r: 0.2, w: 0.6 },
  { x: 0.9374999999999996, y: 0.8400000000000023, r: 0.2, w: 0.6 },
  { x: 0.6312499999999983, y: 0.3462500000000004, r: 0.192, w: 0.6 },
  { x: 0.945, y: 0.26875, r: 0.2, w: 0.6 },
  { x: 0.9075, y: 0.0675, r: 0.2, w: 0.6 },
  { x: 0.43875, y: 0.3525, r: 0.16000000000000003, w: 0.6 },
  { x: 0.9524999999999995, y: 0.6137500000000002, r: 0.16000000000000003, w: 0.6 },
  { x: 0.703750000000001, y: 0.9550000000000002, r: 0.15360000000000001, w: 0.6 },
  { x: 0.8375000000000002, y: 0.9400000000000003, r: 0.15360000000000001, w: 0.6 },
  { x: 0.05, y: 0.7024999999999999, r: 0.12800000000000003, w: 0.6 }
])
const continent_3 = circle__variants([
  { x: 0.5793996062992132, y: 0.22070866141731982, r: 0.3186137307178599, w: 1 },
  { x: 0.764242125984252, y: 0.41347440944881886, r: 0.43051678433280005, w: 1 },
  { x: 0.21932086614173307, y: 0.7691633858267724, r: 0.29306451646218246, w: 1 },
  { x: 0.20591535433070807, y: 0.22412401574803154, r: 0.2, w: 1 },
  { x: 0.13609251968503855, y: 0.43893700787401646, r: 0.2, w: 0.6 },
  { x: 0.09498031496063031, y: 0.9098818897637817, r: 0.2, w: 0.6 },
  { x: 0.3165846456692931, y: 0.43975393700787424, r: 0.192, w: 0.6 },
  { x: 0.05500000000000005, y: 0.26875000000000004, r: 0.2, w: 0.6 },
  { x: 0.0974212598425197, y: 0.13738188976377952, r: 0.2, w: 0.6 },
  { x: 0.06816929133858318, y: 0.49071850393700833, r: 0.16000000000000003, w: 0.6 },
  { x: 0.4881791338582664, y: 0.9254724409448821, r: 0.15360000000000001, w: 0.6 },
  { x: 0.3249015748031491, y: 0.9429527559055121, r: 0.15360000000000001, w: 0.6 },
  { x: 0.37421259842519694, y: 0.48301181102362234, r: 0.12800000000000003, w: 0.6 },
  { x: 0.6624015748031497, y: 0.6647637795040928, r: 0.32462531054272514, w: 1 },
  { x: 0.8651574803149606, y: 0.8429133858033054, r: 0.2, w: 0.6 },
  { x: 0.8090551181102362, y: 0.8980314960395258, r: 0.2, w: 0.6 },
  { x: 0.6437007874015748, y: 0.9492125984017304, r: 0.12800000000000003, w: 0.6 },
  { x: 0.9045275590551182, y: 0.12499999999999989, r: 0.16000000000000003, w: 0.6 },
  { x: 0.8257874015748031, y: 0.07185039370078738, r: 0.16000000000000003, w: 0.6 },
  { x: 0.9389763779527559, y: 0.6948818897637796, r: 0.2, w: 0.6 },
  { x: 0.33267716535433056, y: 0.06751968506283645, r: 0.16000000000000003, w: 0.6 }
])
const continent_4 = circle__variants([
  { x: 0.2113118617439119, y: 0.3432835820895528, r: 0.4226892064358399, w: 1 },
  { x: 0.4642576590730573, y: 0.19402985074626844, r: 0.4586471423999999, w: 0.6 },
  { x: 0.5726630007855479, y: 0.8593872741555378, r: 0.5283615080447999, w: 0.6 },
  { x: 0.7855459544383355, y: 0.6472898664571876, r: 0.3822059519999999, w: 1 },
  { x: 0.7682639434406913, y: 0.10919088766692851, r: 0.2, w: 0.6 },
  { x: 0.8240377062058128, y: 0.29457973291437534, r: 0.2, w: 0.6 },
  { x: 0.09662215239591516, y: 0.6912804399057345, r: 0.2, w: 0.6 },
  { x: 0.14139827179890027, y: 0.8955223880597023, r: 0.2, w: 0.6 },
  { x: 0.30479183032207385, y: 0.6747839748625295, r: 0.2, w: 0.6 },
  { x: 0.5027494108405347, y: 0.5051060487038495, r: 0.12800000000000003, w: 0.6 },
  { x: 0.23409269442262365, y: 0.9041633935585238, r: 0.2, w: 0.6 },
  { x: 0.6834249803613517, y: 0.31971720345640225, r: 0.11324620800000003, w: 0.6 },
  { x: 0.9277297721916734, y: 0.08326787117046329, r: 0.10240000000000003, w: 0.6 },
  { x: 0.9049489395129621, y: 0.9497250589159472, r: 0.12288000000000002, w: 0.6 },
  { x: 0.09426551453260014, y: 0.052631578947368446, r: 0.08192000000000003, w: 0.6 },
  { x: 0.17282010997643343, y: 0.04477611940298507, r: 0.08192000000000003, w: 0.6 },
  { x: 0.03456402199528673, y: 0.09505106048703843, r: 0.08192000000000003, w: 0.6 },
  { x: 0.9340141398271806, y: 0.194815396700707, r: 0.10240000000000003, w: 0.6 },
  { x: 0.9347996857816185, y: 0.38727415553809896, r: 0.10240000000000003, w: 0.6 }
])
// all 'good' shapes that are saved and used for random selection
export const shapes: Circle[][] = [...continent_1, ...continent_2, ...continent_3, ...continent_4]
