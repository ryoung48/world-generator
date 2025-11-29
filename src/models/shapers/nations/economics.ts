import { NATION } from '../../nations'

export const shapeGdp = () => {
  const nations = NATION.nations()
  nations.forEach(nation => {
    const population = NATION.population(nation)
    const development = nation.development
    const gdp = population * 900 * Math.exp(0.53 * (development - 2)) * window.dice.norm(1, 0.1)
    const gdpPerCapita = gdp / population
    nation.gdp = { total: gdp, capita: gdpPerCapita }
  })
}
