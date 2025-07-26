import { range, scaleLinear } from 'd3'

import { cssColors } from '../../../components/theme/colors'
import { PLACEMENT } from '../../cells/placement'
import { CULTURE } from '../../heritage'
import { NATION } from '../../nations'
import { WAR } from '../../nations/wars'
import { PROVINCE } from '../../provinces'
import { HUB } from '../../provinces/hubs'
import { TRADE_GOODS } from '../../provinces/trade'
import { DiplomaticRelation, Province } from '../../provinces/types'
import { ARRAY } from '../../utilities/array'
import { POINT } from '../../utilities/math/points'
import { PERFORMANCE } from '../../utilities/performance'
import { TEXT } from '../../utilities/text'
import { NATION_ATTRIBUTES } from './quirks'

const distribute = <Item>(params: {
  items: Item[]
  percentages: number[]
  buckets: [number, number][]
  neighbors: (_item: Item) => Item[]
  sorted?: (_items: Item[]) => Item[]
}) => {
  const { items, percentages, buckets, neighbors, sorted } = params
  const N = items.length // total number of items

  // Average sizes for each category
  const averageSizes = buckets.map(b => (b[0] + b[1]) / 2)

  // Compute D
  const D = percentages.reduce((sum, p, i) => sum + p * averageSizes[i], 0)

  // Total number of nations
  const M = N / D

  // Initial number of nations in each category
  const categories = percentages.map(p => Math.floor(M * p))

  // Adjust to ensure total groups sum to M
  let totalGroups = categories.reduce((sum, n) => sum + n, 0)
  const remainingGroups = Math.round(M) - totalGroups
  categories[0] += remainingGroups

  // Generate group sizes
  const groupSizes: number[] = categories
    .map((n, i) => range(n).map(() => window.dice.randint(...buckets[i])))
    .flat()
    .reverse()

  // Create a set of unassigned provinces
  const unassignedItems = new Set(items)

  // create assignments for later
  const assignments = new Map<Item, number>()

  // create the final result
  const groups: Item[][] = []

  // For each group size, create a group
  for (const groupSize of groupSizes) {
    const sortedItems = sorted ? sorted([...unassignedItems]) : [...unassignedItems]
    for (let attempt = 0; attempt < 20; attempt++) {
      // Pick a random starting province
      const startingItem = attempt > 10 ? window.dice.choice(sortedItems) : sortedItems[attempt]
      if (!startingItem) break
      const groupItems = [startingItem]

      const itemQueue = [startingItem]
      const visited = new Set([startingItem])

      while (groupItems.length < groupSize && itemQueue.length > 0) {
        const currentItem = itemQueue.shift()!
        const nextItems = neighbors(currentItem)

        for (const nextItem of nextItems) {
          const unassigned = unassignedItems.has(nextItem)
          if (unassigned && !visited.has(nextItem)) {
            groupItems.push(nextItem)
            itemQueue.push(nextItem)
            visited.add(nextItem)
            if (groupItems.length >= groupSize) break
          }
        }
      }

      if (groupItems.length >= groupSize) {
        groups.push(groupItems)
        // Remove assigned provinces from unassignedProvinces
        for (const item of groupItems) {
          unassignedItems.delete(item)
          assignments.set(item, groups.length - 1)
        }
        break
      }
    }
  }

  Array.from(unassignedItems).forEach(item => {
    if (unassignedItems.has(item)) {
      const candidates = neighbors(item).filter(p => assignments.has(p))
      if (candidates.length > 0) {
        const neighbor = window.dice.choice(candidates)
        assignments.set(item, assignments.get(neighbor)!)
        groups[assignments.get(neighbor)!].push(item)
        unassignedItems.delete(item)
      }
    }
  })

  return { groups, unassigned: Array.from(unassignedItems) }
}

export const NATION_SHAPER = PERFORMANCE.profile.wrapper({
  label: 'NATION_SHAPER',
  o: {
    cultures: () => {
      const provinces = window.world.provinces.filter(p => !p.desolate)
      const { groups, unassigned } = distribute({
        items: window.dice.shuffle(provinces),
        percentages: [0.4, 0.3, 0.2, 0.08, 0.02],
        buckets: [
          [1, 1],
          [2, 4],
          [5, 14],
          [15, 29],
          [30, 60]
        ],
        neighbors: province =>
          PROVINCE.neighbors({ province }).filter(p => !PROVINCE.far(p, province))
      })
      groups.concat(unassigned.map(p => [p])).forEach(group => {
        CULTURE.spawn({ provinces: group })
      })
      window.world.cultures.forEach(culture => {
        culture.neighbors = ARRAY.unique(
          culture.provinces
            .map(p => PROVINCE.neighbors({ province: window.world.provinces[p] }))
            .flat()
            .map(province => province.culture)
            .filter(c => c !== culture.idx)
        )
      })
    },
    minorities: () => {
      window.world.provinces
        .filter(
          province =>
            !province.desolate && province.colonists === undefined && window.dice.random > 0.6
        )
        .forEach(province => {
          const candidates = PROVINCE.neighbors({ province }).filter(
            neighbor => neighbor.culture !== province.culture && !PROVINCE.far(province, neighbor)
          )
          if (candidates.length > 0) {
            const neighbor = window.dice.choice(candidates)
            province.minority = neighbor.culture
          }
        })
    },
    governments: () => {
      const nations = NATION.nations()
      // nations.forEach(nation => {
      //   if (nation.development < 2) {
      //     nation.corruption = window.dice.uniform(0, 0.8)
      //     if (nation.corruption < 0.5) {
      //       nation.corruption = 0
      //     } else {
      //       nation.corruption += 0.1
      //     }
      //     NATION.provinces(nation).forEach(province => {
      //       province.corruption = nation.corruption
      //     })
      //   }
      // })
      nations.forEach(nation => {
        const culture = window.world.cultures[nation.culture]
        const uncivilized = nation.development < 1.5
        const corrupted = nation.corruption > 0.5
        const small = NATION.provinces(nation).length < 3
        const irreligious = culture.religion === 'atheistic' || culture.religion === 'pluralistic'
        nation.government = window.dice.weightedChoice([
          { w: uncivilized ? 1 : 2, v: 'autocracy' },
          { w: nation.development < 2 ? 0 : 1, v: 'republic' },
          { w: 1, v: 'oligarchy' },
          { w: small ? 0 : uncivilized ? 2 : 0.25, v: 'confederation' },
          { w: irreligious ? 0 : 0.5, v: 'theocracy' },
          { w: corrupted ? 1000 : uncivilized ? 5 : 0, v: 'fragmented' }
        ])
        if (
          nation.government === 'fragmented' ||
          (nation.government === 'confederation' && uncivilized)
        ) {
          nation.decentralization = 'tribes'
        }
      })
      // diplomacy
      nations.forEach(nation => {
        NATION.neighbors({ nation }).forEach(neighbor => {
          if (nation.relations[neighbor.idx]) return
          const relation = PROVINCE.far(nation, neighbor)
            ? 'neutral'
            : window.dice.weightedChoice<DiplomaticRelation>([
                { v: 'ally', w: 0.1 },
                { v: 'friendly', w: 0.15 },
                { v: 'neutral', w: 0.35 },
                { v: 'suspicious', w: 0.4 }
              ])
          NATION.relations.set({ relation, n1: nation, n2: neighbor })
        })
      })
      // vassals
      nations
        .filter(
          n => (n.size === 'empire' || n.size === 'kingdom') && n.decentralization !== 'tribes'
        )
        .forEach(nation => {
          const condition =
            nation.size === 'kingdom'
              ? (n: Province) => n.size === 'city-state'
              : (n: Province) => n.size === 'city-state' || n.size === 'principality'
          NATION.neighbors({ nation })
            .filter(
              n =>
                condition(n) &&
                n.suzerain === undefined &&
                window.dice.random > 0.5 &&
                !PROVINCE.far(nation, n)
            )
            .forEach(neighbor => {
              NATION.relations.vassalage({ overlord: nation, vassal: neighbor })
            })
        })
      // colonies
      const candidates = nations.filter(p => p.development < 1.5 && NATION.coastal(p))
      nations
        .filter(
          n =>
            n.size !== 'city-state' &&
            n.government !== 'fragmented' &&
            NATION.coastal(n) &&
            n.suzerain === undefined &&
            n.development > 2.75
        )
        .forEach(nation => {
          window.dice
            .shuffle(candidates.filter(n => n.suzerain === undefined && !n.colonial))
            .slice(0, window.dice.randint(0, 8))
            .forEach(neighbor => {
              const candidates = NATION.provinces(neighbor).filter(
                p => p.colonists === undefined && p.ocean > 0
              )
              if (candidates.length === 0) return
              window.dice.sample(candidates, window.dice.randint(1, 10)).forEach(p => {
                NATION.relations.colonize({ overlord: nation, colony: p })
              })
            })
        })
    },
    nations: () => {
      const provinces = window.world.provinces.filter(p => !p.desolate)

      const { groups, unassigned } = distribute({
        items: provinces,
        percentages: [0.4, 0.3, 0.2, 0.08, 0.02],
        buckets: [
          [1, 1],
          [2, 4],
          [5, 14],
          [15, 29],
          [30, 60]
        ],
        neighbors: province =>
          PROVINCE.neighbors({ province }).filter(p => !PROVINCE.far(p, province, 2))
      })
      groups.forEach(group => {
        // Assign overlord and vassals
        const overlordProvince = group[0]
        overlordProvince.nation = undefined
        overlordProvince.subjects = []
        for (let i = 1; i < group.length; i++) {
          const vassalProvince = group[i]
          vassalProvince.nation = overlordProvince.idx
          vassalProvince.subjects = []
          overlordProvince.subjects.push(vassalProvince.idx)
        }
      })
      Array.from(unassigned).forEach(province => {
        if (province.nation === undefined && province.subjects.length === 0) {
          const neighbors = PROVINCE.neighbors({ province }).map(n => PROVINCE.nation(n))
          if (neighbors.length > 0) {
            const neighbor = window.dice.choice(neighbors)
            province.nation = neighbor.idx
            neighbor.subjects.push(province.idx)
          }
        }
      })
      const nations = NATION.nations()
      // realm titles
      nations.forEach(nation => {
        if (NATION.provinces(nation).length === 1) {
          nation.size = 'city-state'
        } else if (NATION.provinces(nation).length <= 10) {
          nation.size = 'principality'
        } else if (NATION.provinces(nation).length <= 30) {
          nation.size = 'kingdom'
        } else nation.size = 'empire'
      })
      // attributes:
      nations.forEach(nation => {
        const economic = window.dice.choice(NATION_ATTRIBUTES.economic)
        const cultural = window.dice.choice(NATION_ATTRIBUTES.cultural)
        const military = window.dice.choice(NATION_ATTRIBUTES.military)
        nation.quirks = window.dice
          .shuffle([economic, cultural, military])
          .map(q =>
            TEXT.decorate({
              label: q.title,
              tooltip: q.text,
              underlineColor: q.type === 'problem' ? cssColors.primary : 'blue'
            })
          )
          .slice(0, nation.size === 'city-state' ? 1 : nation.size === 'principality' ? 2 : 3)
      })
    },
    demographics: () => {
      const hugeCityPop = () => window.dice.randint(50e3, 150e3)
      const largeCityPop = () => window.dice.randint(20e3, 50e3)
      const smallCityPop = () => window.dice.randint(10e3, 15e3)
      const largeTownPop = () => window.dice.randint(5000, 10000)
      const smallTownPop = () => window.dice.randint(1000, 5000)
      const largeVillagePop = () => window.dice.randint(500, 1000)
      const smallVillagePop = () => window.dice.randint(150, 500)
      NATION.nations().forEach(nation => {
        const capital = nation
        const climate = PROVINCE.climate(capital)
        const subjects = NATION.provinces(nation).slice(1)
        // set the capital's population
        const capitalMod = window.dice.uniform(0.02, 0.03)
        const total = capital.population + subjects.reduce((sum, p) => sum + p.population, 0)
        let pop = total * capitalMod
        if (climate === 'subarctic' || nation.decentralization) pop *= 0.5
        if (nation.size === 'city-state') pop = Math.min(pop, largeCityPop())
        if (nation.size === 'principality' || nation.development < 2)
          pop = Math.min(pop, hugeCityPop())
        if (pop > 10e3 && nation.decentralization === 'tribes') pop = largeTownPop()
        if (pop < 1000) pop = window.dice.randint(1000, 5000)
        PROVINCE.hub(capital).population = pop
      })
      const cityScale = scaleLinear().domain([1, 3, 4]).range([10, 6, 5]).clamp(true)
      NATION.nations().forEach(nation => {
        const capital = nation
        const provinces = NATION.provinces(nation)
        const subjects = provinces.slice(1)
        const capitalPop = PROVINCE.hub(capital).population
        const cities = Math.round(provinces.length / cityScale(nation.development))
        const smallestCityPop = smallCityPop()

        // Calculate harmonic sequence parameters
        const n = cities + 1 // +1 for capital
        const a = capitalPop // first term (capital)
        const b = smallestCityPop // last term (smallest city)

        // Calculate harmonic sequence constant
        const k = (a - b) / (1 - 1 / n)

        // Function to get population for a given rank
        const getPopulation = (rank: number) => a - k * (1 - 1 / rank)

        let rank = smallestCityPop * 1.5 > capitalPop ? cities + 1 : 2
        let smallestCity = capital
        const scores = subjects.reduce((acc, province) => {
          acc[province.idx] =
            province.development *
            (PROVINCE.cell(province).beach && PROVINCE.hub(province).coastal ? 1 : 0.6)
          return acc
        }, {} as Record<number, number>)
        subjects
          .sort((a, b) => scores[b.idx] - scores[a.idx])
          .forEach(province => {
            const rural = window.dice.weightedChoice([
              { w: capitalPop < 10e3 ? 0 : 1, v: largeTownPop },
              { w: capitalPop < 5e3 ? 0 : 1, v: smallTownPop },
              { w: 1, v: largeVillagePop },
              { w: 1, v: smallVillagePop }
            ])()

            const urban = rank <= cities ? getPopulation(rank) : rural
            const isCity = urban > 10e3
            const hub = PROVINCE.hub(province)
            const conflict =
              isCity &&
              PROVINCE.neighbors({ province }).some(neighbor => {
                const nHub = PROVINCE.hub(neighbor)
                return (
                  HUB.isCity(nHub) &&
                  POINT.distance.geo({ points: [nHub, hub] }) < PLACEMENT.spacing.provinces * 2
                )
              })
            hub.population = conflict ? rural : urban
            if (!conflict && rank <= cities) {
              rank++
              smallestCity = province
            }
          })
        if (smallestCity !== capital) {
          PROVINCE.hub(smallestCity).population = smallestCityPop
        }
      })
    },
    walls: () => {
      const nations = NATION.nations()
      const target = 0.2
      const walls = { target, current: 0, total: nations.length }
      window.dice.shuffle(nations).forEach(nation => {
        const { current, target, total } = walls
        if (
          current / total < target &&
          (nation.size === 'kingdom' || nation.size === 'empire') &&
          !nation.decentralization
        ) {
          const neighbors = NATION.provinces(nation)
            .map(p =>
              PROVINCE.neighbors({ province: p, type: 'foreign' }).map(i => PROVINCE.nation(i).idx)
            )
            .flat()
            .reduce((acc, i) => {
              acc[i] = (acc[i] || 0) + 1
              return acc
            }, {} as Record<number, number>)
          const prospects = Object.entries(neighbors)
            .filter(neighbor => {
              const other = window.world.provinces[parseInt(neighbor[0])]
              const relation = NATION.relations.get({ n1: nation, n2: other })
              return (
                relation !== 'suzerain' &&
                relation !== 'vassal' &&
                !PROVINCE.far(nation, other) &&
                other.size !== 'city-state' &&
                other.size !== 'principality' &&
                other.government === 'fragmented' &&
                other.decentralization
              )
            })
            .sort((a, b) => b[1] - a[1])
            .map(neighbor => window.world.provinces[parseInt(neighbor[0])])
          if (prospects.length > 0) {
            const [raiders] = prospects
            walls.current++
            nation.walls = raiders.idx
            NATION.relations.set({ relation: 'suspicious', n1: nation, n2: raiders })
          }
        }
      })
    },
    war: () => {
      const fairWars: Record<Province['size'], Province['size'][]> = {
        'city-state': ['city-state'],
        principality: ['city-state', 'principality'],
        kingdom: ['principality', 'kingdom'],
        empire: ['kingdom', 'empire']
      }
      const nations = NATION.nations()
      const target = 0.1
      const wars = { target, current: 0, total: nations.length }
      window.dice.shuffle(nations).forEach(nation => {
        const { current, target, total } = wars
        if (current / total < target && !NATION.atWar(nation)) {
          const size = NATION.provinces(nation).length
          const neighbors = NATION.provinces(nation)
            .map(p =>
              PROVINCE.neighbors({ province: p, type: 'foreign' }).map(i => PROVINCE.nation(i).idx)
            )
            .flat()
            .reduce((acc, i) => {
              acc[i] = (acc[i] || 0) + 1
              return acc
            }, {} as Record<number, number>)
          const prospects = Object.entries(neighbors)
            .filter(neighbor => {
              const other = window.world.provinces[parseInt(neighbor[0])]
              const relation = NATION.relations.get({ n1: nation, n2: other })
              return (
                relation !== 'at war' &&
                relation !== 'suzerain' &&
                relation !== 'vassal' &&
                !NATION.atWar(other) &&
                fairWars[nation.size].includes(other.size) &&
                NATION.provinces(other).length <= size &&
                !PROVINCE.far(nation, other)
              )
            })
            .sort((a, b) => b[1] - a[1])
            .map(neighbor => window.world.provinces[parseInt(neighbor[0])])
          if (prospects.length > 0) {
            const [defender] = prospects
            wars.current++
            WAR.spawn({ defender, attacker: nation })
          }
        }
      })
    },
    build: () => {
      NATION_SHAPER.nations()
      NATION_SHAPER.cultures()
      NATION_SHAPER.governments()
      NATION_SHAPER.minorities()
      // NATION_SHAPER.walls()
      NATION_SHAPER.war()
      NATION_SHAPER.demographics()
      TRADE_GOODS.spawn()
    }
  }
})
