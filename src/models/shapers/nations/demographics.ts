import { scaleLinear } from 'd3'

import { PLACEMENT } from '../../cells/placement'
import { NATION } from '../../nations'
import { PROVINCE } from '../../provinces'
import { HUB } from '../../provinces/hubs'
import { POINT } from '../../utilities/math/points'
import { WindowClosed } from 'mdi-material-ui'
import { RELIGION } from '../../heritage/religions'

export const shapeDemographics = () => {
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
    if (nation.size === 'principality' || nation.development < 2) pop = Math.min(pop, hugeCityPop())
    if (nation.decentralization === 'tribes') {
      pop =
        nation.size === 'empire'
          ? largeTownPop()
          : nation.size === 'kingdom'
          ? smallTownPop()
          : Math.min(pop, largeVillagePop())
    } else if (pop < 1000) pop = window.dice.randint(1000, 5000)
    PROVINCE.hub(capital).population = pop
    if (nation.decentralization && pop <= 1000) PROVINCE.hub(capital).nomadic = true
  })
  const cityScale = scaleLinear().domain([1, 3, 4]).range([10, 6, 5]).clamp(true)
  const tribeScale = scaleLinear().domain([1, 2.5]).range([0.95, 0]).clamp(true)
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
        const cell = window.world.cells[hub.cell]
        const conflict =
          isCity &&
          PROVINCE.neighbors({ province }).some(neighbor => {
            const nHub = PROVINCE.hub(neighbor)
            return (
              HUB.isCity(nHub) &&
              POINT.distance.geo({ points: [nHub, hub] }) < PLACEMENT.spacing.provinces * 3
            )
          })
        hub.population = conflict ? rural : urban
        if (!conflict && rank <= cities) {
          rank++
          smallestCity = province
        }
        const encampment = tribeScale(province.development) * (cell.roads.land.length ? 0.5 : 1)
        hub.nomadic =
          PROVINCE.nation(province).hub.nomadic ||
          (hub.population < 1e3 && encampment > window.dice.random)
      })
    if (smallestCity !== capital) {
      PROVINCE.hub(smallestCity).population = smallestCityPop
    }
  })
  window.world.provinces.forEach(province => {
    const type = HUB.settlement(province.hub)
    if (type === 'metropolis') province.development += 1.2
    else if (type === 'huge city') province.development += 0.9
    else if (type === 'large city') province.development += 0.6
    else if (type === 'small city') province.development += 0.3
    else if (type === 'large town') province.development += 0.1
    else if (type === 'small town') province.development += 0.0
    else if (type === 'large village') province.development -= 0.1
    else if (type === 'small village') province.development -= 0.3
    else province.development -= 0.6

    const dry =
      PROVINCE.cell(province).vegetation === 'desert' ||
      PROVINCE.cell(province).vegetation === 'sparse'

    if (province.hub.population > 50e3 && !dry) {
      PROVINCE.cell(province).vegetation = 'farmlands'
      PROVINCE.neighbors({ province })
        .filter(
          n =>
            !province.hub.nomadic &&
            window.dice.random > 0.85 &&
            PROVINCE.cell(n).vegetation !== 'desert' &&
            PROVINCE.cell(n).vegetation !== 'sparse'
        )
        .forEach(neighbor => {
          PROVINCE.cell(neighbor).vegetation = 'farmlands'
        })
    }
  })
  // holy sites
  window.world.provinces
    .filter(
      p =>
        p.government === 'theocracy' ||
        (!p.desolate && !RELIGION.irreligious(PROVINCE.religion(p)) && window.dice.random > 0.96)
    )
    .forEach(province => {
      province.holySite = true
    })
}
