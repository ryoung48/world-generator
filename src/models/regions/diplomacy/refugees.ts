import { region__neighbors } from '..'
import { Region } from '../types'

const nation__isUnstable = (nation: Region) =>
  nation.regions
    .map(p => window.world.regions[window.world.provinces[p].region])
    .some(region => region.rebellions.current !== -1) ||
  nation.wars.current.some(w => {
    const { defender } = window.world.wars[w]
    return defender.idx === nation.idx
  })

export const nation__hasRefugees = (nation: Region) =>
  region__neighbors(nation)
    .concat([nation.idx])
    .some(r => nation__isUnstable(window.world.regions[r]))
