import { ResponsiveStream } from '@nivo/stream'

import { REGION } from '../../../models/regions'
import { VIEW } from '../../context'

export function ConquestView() {
  const { state } = VIEW.context()
  const nation = window.world.regions[state.region]
  const borders = REGION.neighbors({ region: nation, depth: 2 })
  const nations = [nation].concat(borders)
  const provinces = nations.map(n => REGION.provinces(n)).flat()
  const actors = new Set<number>()
  const data = window.world.nations.slice(-100).map(record => {
    const coverage: Record<string, number> = {}
    provinces.forEach(province => {
      const ruler = window.world.regions[record.ruler[province.idx]]
      actors.add(ruler.idx)
      if (!coverage[ruler.name]) coverage[ruler.name] = 0
      coverage[ruler.name] += province.land
    })
    return coverage
  })
  const sortedActors = Array.from(actors).sort((a, b) =>
    window.world.regions[b].name.localeCompare(window.world.regions[a].name)
  )
  const actorNames = sortedActors.map(idx => window.world.regions[idx].name)
  const actorColors = sortedActors.map(idx => window.world.regions[idx].heraldry.color)
  data.forEach(record => {
    actorNames.filter(name => !record[name]).forEach(name => (record[name] = 0))
  })
  return (
    <ResponsiveStream
      keys={actorNames}
      colors={actorColors}
      data={data}
      offsetType='wiggle'
      enableStackTooltip={false}
    ></ResponsiveStream>
  )
}
