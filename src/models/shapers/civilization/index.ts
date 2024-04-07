import { NAVIGATION } from '../../cells/navigation'
import { HERITAGE } from '../../heritage'
import { CULTURE } from '../../heritage/cultures'
import { RELIGION } from '../../heritage/religions'
import { REGION } from '../../regions'
import { PROVINCE } from '../../regions/provinces'
import { ARRAY } from '../../utilities/array'
import { PERFORMANCE } from '../../utilities/performance'
import { DistributeCulturesParams, DistributeReligionsPArams } from './types'
import { URBANIZATION as URBANIZATION_BUILDER } from './urbanization'

const distributeCultures = ({ groups, dist }: DistributeCulturesParams) => {
  const species = window.dice.distribute({ dist, count: groups.length })
  groups.forEach(regions => {
    const heritage = HERITAGE.spawn({ regions, species: species.pop() })
    regions.forEach(region => {
      CULTURE.spawn({ region, heritage })
    })
  })
}

const distributeReligions = ({ groups, dist }: DistributeReligionsPArams) => {
  const type = window.dice.distribute({ dist, count: groups.length })
  groups.forEach(heritage => {
    RELIGION.spawn({
      regions: heritage.regions.map(region => window.world.regions[region]),
      type: type.pop()
    })
  })
}

export const CIVILIZATION_BUILDER = PERFORMANCE.profile.wrapper({
  label: 'CIVILIZATION',
  o: {
    _development: () => {
      REGION.nations.forEach(region => {
        const climate = REGION.climate(region)
        region.civilized = climate.habitability > 0.5
      })
    },
    _cultures: () => {
      const nations = REGION.nations
      const groups = ARRAY.partition.bfs({
        items: nations,
        target: nations.length * 0.012,
        // regions in the same culture must have the same climate
        neighbors: region =>
          REGION.borders(region).filter(n => REGION.zone(n) === REGION.zone(region) && !n.desolate),
        relaxed: region => REGION.borders(region).filter(n => !n.desolate)
      })
      const civilized = groups.filter(([region]) => region.civilized)
      distributeCultures({
        groups: civilized,
        dist: [
          { v: 'human', w: 8 },
          { v: 'dwarf', w: 1 },
          { v: 'orc', w: 1 },
          { v: 'elf', w: 1 }
        ]
      })
      const uncivilized = groups.filter(([region]) => !region.civilized)
      distributeCultures({
        groups: uncivilized,
        dist: [
          { v: 'human', w: 5 },
          { v: 'dwarf', w: 1 },
          { v: 'orc', w: 1 },
          { v: 'elf', w: 1 },
          { v: 'orlan', w: 1 },
          { v: 'bovine', w: 1 },
          { v: 'feline', w: 1 },
          { v: 'avian', w: 1 },
          { v: 'draconic', w: 1 },
          { v: 'gnoll', w: 1 }
        ]
      })
    },
    _imperialRoads: () => {
      const cache: Record<number, Record<number, boolean>> = {}
      const { blacklist } = NAVIGATION.blacklist
      REGION.nations.forEach(region => {
        const src = window.world.provinces[region.capital]
        const targets = region.landBorders
          .map(i => {
            const border = window.world.regions[i]
            return window.world.provinces[border.capital]
          })
          .filter(target => !cache[src.idx]?.[target.idx] && !PROVINCE.region(target).desolate)
        targets.forEach(dst => {
          if (!cache[src.idx]) cache[src.idx] = {}
          cache[src.idx][dst.idx] = true
          if (!cache[dst.idx]) cache[dst.idx] = {}
          cache[dst.idx][src.idx] = true
          NAVIGATION.addRoute({ src, dst, blacklist, type: 'land', imperial: true })
        })
      })
    },
    _religions: () => {
      const civilized = window.world.heritages.filter(h => HERITAGE.civilized(h))
      distributeReligions({
        groups: civilized,
        dist: [
          { v: 'atheistic', w: 0.15 },
          { v: 'nontheistic', w: 1 },
          { v: 'monotheistic', w: 1 },
          { v: 'polytheistic', w: 0.5 }
        ]
      })
      const uncivilized = window.world.heritages.filter(h => !HERITAGE.civilized(h))
      distributeReligions({
        groups: uncivilized,
        dist: [
          { v: 'monotheistic', w: 1 },
          { v: 'dualistic', w: 0.25 },
          { v: 'polytheistic', w: 2 },
          { v: 'animistic', w: 2 }
        ]
      })
    },
    build: () => {
      URBANIZATION_BUILDER.build()
      CIVILIZATION_BUILDER._development()
      CIVILIZATION_BUILDER._cultures()
      CIVILIZATION_BUILDER._religions()
      CIVILIZATION_BUILDER._imperialRoads()
    }
  }
})
