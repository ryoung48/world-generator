import SimplexNoise from 'simplex-noise'

import { MATH } from '..'
import { Point } from '../points/types'

interface NoiseParameters {
  octaves: number
  frequency: number
  persistence: number
}

class Simplex {
  protected res: number
  protected params: NoiseParameters
  protected n: SimplexNoise
  constructor(res: number, params: NoiseParameters, seed: string) {
    this.res = res
    this.params = params
    this.n = new SimplexNoise(seed)
  }
  public billow() {
    const warpSize = 1
    const size = this.res
    const data = Array.from(Array(size + 1), () => Array(size + 1).fill(0))
    let [high, low] = [-Infinity, Infinity]
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        data[i][j] = this.noise(i * warpSize, j * warpSize)
        high = data[i][j] > high ? data[i][j] : high
        low = data[i][j] < low ? data[i][j] : low
      }
    }
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        const d = MATH.scale([low, high], [-1, 1], data[i][j])
        data[i][j] = Math.abs(d)
      }
    }
    return data
  }
  public sphere(points: Point[]) {
    const data: number[] = []
    let [high, low] = [-Infinity, Infinity]
    for (const { x: lon, y: lat } of points) {
      const latRadians = MATH.radians(lat)
      const lonRadians = MATH.radians(lon - 180)
      const x = Math.cos(latRadians) * Math.cos(lonRadians)
      const y = Math.cos(latRadians) * Math.sin(lonRadians)
      const z = Math.sin(latRadians)
      const val = this.noise3d(x, y, z)
      data.push(val)
      high = val > high ? val : high
      low = val < low ? val : low
    }
    for (const i in data) {
      data[i] = MATH.scale([low, high], [0, 1], Math.abs(data[i])) ** 3
    }
    return data
  }
  protected noise3d(i: number, j: number, k: number) {
    const { octaves, frequency, persistence } = this.params
    const amplitudes = Array.from({ length: octaves }, (_, octave) => Math.pow(persistence, octave))
    let [f, maxValue, res] = [frequency, 0, 0]
    for (let octave = 1; octave <= octaves; octave++) {
      res += this.n.noise3D(i * f, j * f, k * f) * amplitudes[octave - 1]
      maxValue += amplitudes[octave - 1]
      f *= 2
    }
    return res / maxValue
  }
  protected noise(i: number, j: number) {
    const { octaves, frequency, persistence } = this.params
    let [amp, f, maxValue, res] = [1, frequency, 0, 0]
    for (let k = 1; k <= octaves; k++) {
      res += this.n.noise2D(i * f, j * f) * amp
      maxValue += amp
      f *= 2
      amp *= persistence
    }
    return res / maxValue
  }
}

export default {
  simplex: (res: number, params: NoiseParameters, seed: string) =>
    new Simplex(res, params, seed).billow(),
  sphere: (points: Point[], params: NoiseParameters, seed: string) =>
    new Simplex(1, params, seed).sphere(points)
}
