import { region__neighbors, region__population } from '..'
import { development_map } from '../development'
import { Region } from '../types'
import { relation__is_hostile } from './relations'

const region_relative_sizes = (region: Region) => {
  const neighbors = region__neighbors(region).map(nation => ({
    idx: nation,
    pop: region__population(window.world.regions[nation])
  }))
  const total = neighbors.reduce((sum, { pop }) => sum + pop, 0)
  return neighbors.reduce((dict: Record<number, number>, { idx, pop }) => {
    dict[idx] = pop / total
    return dict
  }, {})
}

const economic_status: Record<Region['economy']['status'], number> = {
  struggling: 0,
  healthy: 1,
  prosperous: 2
}

const nation__is_unstable = (nation: Region) =>
  nation.regions
    .map(p => window.world.regions[window.world.provinces[p].region])
    .some(region => region.rebellions.current !== -1) ||
  nation.wars.current.some(w => {
    const { defender } = window.world.wars[w]
    return defender.idx === nation.idx
  })

const nation__migration_modifiers = (params: { source: Region; target: Region }) => {
  const { source, target } = params
  const unstable = nation__is_unstable(source)
  const unstable_im = unstable ? 0.5 : 1
  const unstable_em = unstable ? 1.5 : 1
  const underdeveloped = development_map[source.development] < development_map[target.development]
  const dev_im = underdeveloped ? 0.5 : 1
  const dev_em = underdeveloped ? 1.5 : 1
  const poorer = economic_status[source.economy.status] < economic_status[target.economy.status]
  const economy_im = poorer ? 0.5 : 1
  const economy_em = poorer ? 1.5 : 1
  const hostile = relation__is_hostile(source.relations[target.idx] ?? 'neutral')
  const hostile_im = hostile ? 0.5 : 1
  const hostile_em = hostile ? 0.5 : 1
  return {
    im: unstable_im * dev_im * economy_im * hostile_im,
    em: unstable_em * dev_em * economy_em * hostile_em
  }
}

const migration_rate = 0.08

export const region__migrations = (region: Region) => {
  const neighborhood = [region].concat(region__neighbors(region).map(n => window.world.regions[n]))
  neighborhood.forEach(source => {
    const source_pop = region__population(source)
    const source_ratio = region_relative_sizes(source)
    const neighbors = region__neighbors(source).map(n => window.world.regions[n])
    neighbors.forEach(target => {
      if (!target.emigration[source.idx]) {
        const { im: source_im_mod, em: source_em_mod } = nation__migration_modifiers({
          source,
          target
        })
        const { im: target_im_mod, em: target_em_mod } = nation__migration_modifiers({
          source: target,
          target: source
        })
        // immigration
        const target_pop = region__population(target)
        const target_ratio = region_relative_sizes(target)
        const target_immigrants =
          target_pop * target_ratio[source.idx] * migration_rate * target_em_mod
        const max_immigrants =
          source_pop * source_ratio[target.idx] * migration_rate * source_im_mod
        source.immigration[target.idx] = Math.min(target_immigrants, max_immigrants)
        target.emigration[source.idx] = source.immigration[target.idx]
        // emigration
        const target_emigrants =
          source_pop * source_ratio[target.idx] * migration_rate * source_em_mod
        const max_emigrants = target_pop * target_ratio[source.idx] * migration_rate * target_im_mod
        source.emigration[target.idx] = Math.min(target_emigrants, max_emigrants)
        target.immigration[source.idx] = source.emigration[target.idx]
      }
    })
  })
}

export const nation__has_refugees = (nation: Region) =>
  region__neighbors(nation)
    .concat([nation.idx])
    .some(r => nation__is_unstable(window.world.regions[r]))
