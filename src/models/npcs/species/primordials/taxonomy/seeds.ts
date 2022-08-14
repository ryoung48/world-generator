import { terrain__is_aquatic } from '../../../../world/climate/terrain'
import { Primordial } from '../types'

const primordial__random_dispersal = (
  environment: Primordial['environment']
): Primordial['reproduction']['dispersal'] => {
  const aquatic = terrain__is_aquatic(environment.terrain)
  return window.dice.choice(aquatic ? ['animal', 'water'] : ['animal', 'wind', 'gravity'])
}

export const primordial__random_seeds = (params: {
  environment: Primordial['environment']
  reproduction: Primordial['reproduction']
  appearance: Primordial['appearance']
}) => {
  const { environment, reproduction, appearance } = params
  reproduction.seeds = window.dice.choice(
    appearance.flowers ? ['nuts', 'fruit', 'berries', 'seeds'] : ['nuts', 'seeds']
  )
  reproduction.dispersal = primordial__random_dispersal(environment)
}
