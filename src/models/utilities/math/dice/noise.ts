import SimplexNoise from 'simplex-noise'

import { scale } from '..'

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
    const size = this.res
    const data = Array.from(Array(size + 1), () => Array(size + 1).fill(0))
    let [high, low] = [-Infinity, Infinity]
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        data[i][j] = this.noise(i, j)
        high = data[i][j] > high ? data[i][j] : high
        low = data[i][j] < low ? data[i][j] : low
      }
    }
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        const d = scale([low, high], [-1, 1], data[i][j])
        data[i][j] = scale([0, 0.5], [0.6, 0.8], Math.abs(d))
      }
    }
    return data
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

class AdvSimplex extends Simplex {
  private persist: number[][]
  constructor(res: number, params: NoiseParameters, seed: string, persist: number[][]) {
    super(res, params, seed)
    this.persist = persist
  }

  public billow() {
    const size = this.res
    const data = Array.from(Array(size + 1), () => Array(size + 1).fill(0))
    let [high, low] = [-Infinity, Infinity]
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        this.params.persistence = this.persist[i][j]
        data[i][j] = this.noise(i, j)
        data[i][j] = this.noise(i + data[i][j], j + data[i][j])
        high = data[i][j] > high ? data[i][j] : high
        low = data[i][j] < low ? data[i][j] : low
      }
    }
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        const d = scale([low, high], [-1, 1], data[i][j])
        data[i][j] = Math.abs(d)
      }
    }
    return data
  }
}

class OldStyle extends Simplex {
  public billow() {
    const warp_size = 1
    const size = this.res
    const data = Array.from(Array(size + 1), () => Array(size + 1).fill(0))
    let [high, low] = [-Infinity, Infinity]
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        data[i][j] = this.noise(i * warp_size, j * warp_size)
        high = data[i][j] > high ? data[i][j] : high
        low = data[i][j] < low ? data[i][j] : low
      }
    }
    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        const d = scale([low, high], [-1, 1], data[i][j])
        data[i][j] = Math.abs(d)
      }
    }
    return data
  }
}

export default {
  simplex: (res: number, params: NoiseParameters, seed: string) =>
    new Simplex(res, params, seed).billow(),
  adv: (res: number, params: NoiseParameters, seed: string, persist: number[][]) =>
    new AdvSimplex(res, params, seed, persist).billow(),
  old: (res: number, params: NoiseParameters, seed: string) =>
    new OldStyle(res, params, seed).billow()
}
