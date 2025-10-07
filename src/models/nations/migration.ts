import { Province } from '../provinces/types'
import { NATION } from '.'

const MIGRATION_RATE = 0.008

type MigrationModifiers = {
  im: number
  em: number
}

const relativeSizes = (nation: Province): Record<number, number> => {
  const neighborList = NATION.neighbors({ nation }).map(n => ({
    idx: n.idx,
    pop: NATION.population(n)
  }))
  const total = neighborList.reduce((sum, { pop }) => sum + pop, 0)
  return neighborList.reduce((dict: Record<number, number>, { idx, pop }) => {
    dict[idx] = pop / total
    return dict
  }, {})
}

const modifiers = (params: { source: Province; target: Province }): MigrationModifiers => {
  const { source, target } = params
  const unstable = source.war !== undefined
  const unstableIm = unstable ? 0.5 : 1
  const unstableEm = unstable ? 1.5 : 1
  const underdeveloped = source.development < target.development
  const devIm = underdeveloped ? 0.5 : 1
  const devEm = underdeveloped ? 1.5 : 1
  const poorer = source.desirability < target.desirability
  const economyIm = poorer ? 0.5 : 1
  const economyEm = poorer ? 1.5 : 1
  const hostile =
    source.relations[target.idx] === 'at war' || source.relations[target.idx] === 'suspicious'
  const hostileIm = hostile ? 0.5 : 1
  const hostileEm = hostile ? 0.5 : 1
  return {
    im: unstableIm * devIm * economyIm * hostileIm,
    em: unstableEm * devEm * economyEm * hostileEm
  }
}

export const MIGRATION = {
  get: (nation: Province): void => {
    const neighborhood = [nation].concat(NATION.neighbors({ nation }))
    neighborhood.forEach(source => {
      const sourcePop = NATION.population(source)
      const sourceRatio = relativeSizes(source)
      const sourceNeighbors = NATION.neighbors({ nation: source })
      sourceNeighbors.forEach(target => {
        if (!target.emigration[source.idx]) {
          const { im: sourceImMod, em: sourceEmMod } = modifiers({
            source,
            target
          })
          const { im: targetImMod, em: targetEmMod } = modifiers({
            source: target,
            target: source
          })
          // immigration
          const targetPop = NATION.population(target)
          const targetRatio = relativeSizes(target)
          const targetImmigrants =
            targetPop * targetRatio[source.idx] * MIGRATION_RATE * targetEmMod
          const maxImmigrants = sourcePop * sourceRatio[target.idx] * MIGRATION_RATE * sourceImMod
          source.immigration[target.idx] = Math.min(targetImmigrants, maxImmigrants)
          target.emigration[source.idx] = source.immigration[target.idx]
          // emigration
          const targetEmigrants = sourcePop * sourceRatio[target.idx] * MIGRATION_RATE * sourceEmMod
          const maxEmigrants = targetPop * targetRatio[source.idx] * MIGRATION_RATE * targetImMod
          source.emigration[target.idx] = Math.min(targetEmigrants, maxEmigrants)
          target.immigration[source.idx] = source.emigration[target.idx]
        }
      })
    })
  }
}
