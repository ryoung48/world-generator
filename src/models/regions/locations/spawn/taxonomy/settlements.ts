import { location_icon } from '../../../../../components/maps/icons/locations/types'
import { Loc } from '../../types'
import { location__templates } from '.'

const settlement_type = (city: Loc): Loc['type'] => {
  const { population } = city
  return population >= location__templates.metropolis.population[0]
    ? 'metropolis'
    : population >= location__templates['huge city'].population[0]
    ? 'huge city'
    : population >= location__templates['large city'].population[0]
    ? 'large city'
    : population >= location__templates['small city'].population[0]
    ? 'small city'
    : population >= location__templates['large town'].population[0]
    ? 'large town'
    : population >= location__templates['small town'].population[0]
    ? 'small town'
    : population >= location__templates['large village'].population[0]
    ? 'large village'
    : population >= location__templates['small village'].population[0]
    ? 'small village'
    : 'tiny village'
}

export const location__icon = (loc: Loc): location_icon => {
  if (!loc._icon) {
    const { icon } = location__templates[loc.type]
    loc._icon = typeof icon === 'string' ? icon : icon(loc)
  }
  return loc._icon
}

export const location__set_population = (city: Loc, pop: number) => {
  city.population = Math.ceil(pop)
  city.type = settlement_type(city)
}
export const location__is_city = (city: Loc) =>
  city.population >= location__templates['small city'].population[0]
export const location__is_town = (city: Loc) =>
  city.population < location__templates['small city'].population[0] &&
  city.population >= location__templates['small town'].population[0]
export const location__is_village = (city: Loc) =>
  city.population < location__templates['small town'].population[0]
