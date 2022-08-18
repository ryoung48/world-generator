import { quadtree } from 'd3'

import { profile } from '../../../utilities/performance'
import { Cell, ExteriorCell } from '../../cells/types'
import { seaLevelCutoff } from '../../types'

export class Shaper {
  private static _land: ExteriorCell[] = []
  private static _mountains: ExteriorCell[] = []
  private static _water: ExteriorCell[] = []
  public static regionLand: Record<number, ExteriorCell[]> = {}
  // pipeline for shaper actions
  get pipeline(): Array<{ name: string; action: () => void }> {
    return []
  }
  public build() {
    // iterate and run each action in the pipeline with profiling
    this.pipeline.forEach(({ name: label, action }: { name: string; action: () => void }) => {
      profile({ label, f: () => action.bind(this)() })
    })
  }
  public static get land() {
    if (Shaper._land.length <= 0) {
      Shaper._land = window.world.cells.filter(e => {
        return e.h >= seaLevelCutoff && e.n.length > 0
      })
    }
    return Shaper._land
  }
  public static reset(type: 'water' | 'land') {
    if (type === 'land') Shaper._land = []
    if (type === 'water') Shaper._water = []
  }
  public static get mountains() {
    if (Shaper._mountains.length <= 0) {
      Shaper._mountains = Shaper.land.filter(poly => poly.mountain !== undefined)
    }
    return Shaper._mountains
  }
  public static get water() {
    if (Shaper._water.length <= 0) {
      Shaper._water = window.world.cells.filter(e => {
        return e.h < seaLevelCutoff
      })
    }
    return Shaper._water
  }
  public static coreCells<T extends Cell>(cells: T[], spacing: number) {
    const { w, h } = window.world.dim
    return cells.filter(
      ({ x, y }) => x > spacing && x < w - spacing && y > spacing && y < h - spacing
    )
  }
  // place cities on the map given spacing constraints
  public static placeLocs<T extends Cell>(params: {
    count: number
    spacing: number
    whitelist: T[]
    blacklist?: T[]
  }) {
    const placed: T[] = []
    // create a quad tree to quickly find the nearest city
    const tree = quadtree().extent([
      [0, 0],
      [window.world.dim.w, window.world.dim.h]
    ])
    const { blacklist = [], whitelist, count, spacing } = params
    // everything in the blacklist starts in the quad tree
    blacklist.forEach(({ x, y }) => {
      tree.add([x, y])
    })
    // place cities by iterating through the (pre-sorted) whitelist
    for (let i = 0; i < whitelist.length && placed.length < count; i++) {
      const cell = whitelist[i]
      const { x, y } = cell
      const closest = tree.find(x, y)
      const dist = closest ? Math.hypot(x - closest[0], y - closest[1]) : Infinity
      if (dist > spacing) {
        placed.push(cell)
        tree.add([x, y])
      }
    }
    return placed
  }
}
