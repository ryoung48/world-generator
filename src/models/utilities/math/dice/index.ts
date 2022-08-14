import { percentage_scale, range, weighted_distribution } from '..'

export function generate_id(seed = Math.random()) {
  return Math.floor(seed * Number.MAX_SAFE_INTEGER).toString(36)
}

interface Shuffler<T> {
  r: number
  e: T
}

export class Dice {
  private seed: number
  private spare: number
  constructor(seed: string) {
    this.seed = parseInt(seed, 36)
    this.spare = 0
  }
  // https://gist.github.com/blixt/f17b47c62508be59987b
  get random() {
    this.seed = Math.imul(16807, this.seed) | 0 % 2147483647
    return (this.seed & 2147483647) / 2147483648
  }
  get flip() {
    return this.random > 0.5
  }
  /**
   *
   * @param min
   * @param max excluding max
   */
  public uniform(min = 0, max = 1) {
    return this.random * (max - min) + min
  }
  /**
   *
   * @param min
   * @param max including max
   */
  public randint(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(this.random * (max - min + 1)) + min
  }
  // https://en.wikipedia.org/wiki/Marsaglia_polar_method
  public norm(mean: number, dev: number) {
    if (this.spare) {
      const spare = this.spare
      delete this.spare
      return spare * dev + mean
    }
    // tslint:disable-next-line:one-variable-per-declaration
    let s, u, v
    do {
      u = this.uniform(-1, 1)
      v = this.uniform(-1, 1)
      s = u * u + v * v
    } while (s >= 1)
    s = Math.sqrt((-2 * Math.log(s)) / s)
    this.spare = s * v
    return s * u * dev + mean
  }
  /**
   * One day I am going to find a use for this.
   * @param param0 range of the distribution
   * @param n distribution power
   */
  public power_law([x0, x1]: [number, number], n: number) {
    const exp = 1 - n
    const xp1 = x1 ** exp
    const xp0 = x0 ** exp
    return (xp1 - (xp1 - xp0) * this.random) ** (1 / exp)
  }
  /**
   * Pick a random item from an array
   * @param arr arbitrary array
   */
  public choice<T>(arr: T[]) {
    return arr[~~(this.random * arr.length)]
  }

  public weighted_choice<T>(arr: weighted_distribution<T>) {
    const keys = arr.map(({ v }) => v)
    const weights = arr.map(({ w }) => w)
    const rng = this.random
    const scaled = percentage_scale(weights)
    let acc = 0
    for (let i = 0; i < scaled.length; i++) {
      acc += scaled[i]
      if (rng <= acc) return keys[i]
    }
  }

  public shuffle<T>(arr: T[]) {
    return arr
      .map(a => ({ r: this.random, e: a } as Shuffler<T>))
      .sort((a: Shuffler<T>, b: Shuffler<T>) => a.r - b.r)
      .map(a => a.e)
  }

  public sample<T>(arr: T[], cnt: number) {
    return this.shuffle(arr).slice(0, cnt)
  }
  public weighted_sample<T>(arr: { v: T; w: number }[], num: number) {
    let items = [...arr]
    const selected: T[] = []
    let count = num
    while (count-- > 0 && items.length > 0) {
      const chosen = this.weighted_choice(items)
      selected.push(chosen)
      items = items.filter(({ v }) => v !== chosen)
    }
    return selected
  }
  public uniform_dist(count: number) {
    const rolls = range(count).map(() => this.random)
    const sum = rolls.reduce((total, roll) => total + roll, 0)
    return rolls.map(w => w / sum)
  }
  public weighted_dist(params: { weights: number[]; std: number; total?: number }) {
    const { weights, std, total = weights.reduce((sum, w) => w + sum, 0) } = params
    const rolls = weights.map(w => window.dice.norm(w, w * std))
    const sum = rolls.reduce((total, roll) => total + roll, 0)
    return rolls.map(w => (w / sum) * total)
  }
  public uniform_keys(keys: string[]) {
    const dist: Record<string, number> = {}
    keys.forEach(p => (dist[p] = 0))
    return window.dice.uniform_dist(keys.length).reduce((dict, w, i) => {
      dict[keys[i]] += w
      return dict
    }, dist)
  }
  public roll(dice: number, sides: number, drops = 0, advantage = true) {
    const rolls = Array(dice)
      .fill(0)
      .map(() => this.randint(1, sides))
      .sort((a, b) => (advantage ? b - a : a - b))
      .slice(0, dice - drops)
    return rolls.reduce((sum, i) => sum + i, 0)
  }
  public roll_metrics(dice: number, sides: number, mod = 0) {
    const mean = (dice * (1 + sides)) / 2 + mod
    const std = (dice * (sides ** 2 - 1)) ** 0.5 / (2 * 3 ** 0.5)
    const common = [mean - std, mean + std]
    const rare = [mean - 2 * std, mean + 2 * std]
    const extreme = [dice + mod, dice * sides + mod]
    return { mean, std, common, rare, extreme }
  }
  public color(target?: [number, number]) {
    const space = target ?? [0, 360]
    const hue = this.randint(...space)
    const saturation = this.randint(20, 80)
    const lum = this.randint(20, 60)
    return `hsl(${hue}, ${saturation}%, ${lum}%)`
  }
  public dark_color(target?: [number, number]) {
    const space = target ?? [0, 360]
    const hue = this.randint(...space)
    const saturation = this.randint(20, 80)
    const lum = this.randint(20, 40)
    return `hsl(${hue}, ${saturation}%, ${lum}%)`
  }
  public generate_id() {
    return generate_id(this.random)
  }
}
