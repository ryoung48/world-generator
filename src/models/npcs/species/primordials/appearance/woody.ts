import { Primordial } from '../types'
import { primordial_textures } from './types'

export const bark_textures: primordial_textures[] = [
  'smooth',
  'flaky',
  'rough',
  'scaly',
  'gnarled',
  'twisted',
  'dusty'
]

export const primordial__coniferous = (params: {
  foliage: Primordial['appearance']['foliage']
  environment: Primordial['environment']
}) => {
  const { foliage, environment } = params
  const cold = environment.climate === 'Cold' || environment.terrain === 'Mountains'
  return cold && foliage === 'evergreen' && window.dice.random > 0.05
}
