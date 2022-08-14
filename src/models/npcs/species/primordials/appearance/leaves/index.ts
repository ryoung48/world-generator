import { Primordial } from '../../types'
import { primordial_textures } from '../types'
import { Leaves } from './types'

export const leafy_textures: primordial_textures[] = [
  'waxy',
  'flaky',
  'velvety',
  'dusty',
  'ragged',
  'fluffy'
]

export const primordial__random_leaves = (): Leaves => {
  const dressing: (keyof Leaves)[] = window.dice.sample(['size', 'sparsity', 'texture', 'veins'], 2)
  return {
    color: window.dice.choice(['green', 'green', 'green', 'greyish-green']),
    size: dressing.includes('size') ? window.dice.choice(['small', 'large']) : undefined,
    sparsity: dressing.includes('sparsity')
      ? window.dice.choice(['numerous', 'sparse'])
      : undefined,
    texture: dressing.includes('texture') ? window.dice.choice(leafy_textures) : undefined,
    veins: dressing.includes('veins')
      ? window.dice.choice([
          'purple',
          'magenta',
          'red',
          'vermilion',
          'orange',
          'amber',
          'green',
          'blue',
          'teal'
        ])
      : undefined
  }
}

export const primordial__random_foliage = ({
  environment
}: Primordial): Primordial['appearance']['foliage'] => {
  const mod = environment.climate === 'Cold' ? 0.2 : 0.5
  return window.dice.random > mod ? 'evergreen' : 'deciduous'
}
