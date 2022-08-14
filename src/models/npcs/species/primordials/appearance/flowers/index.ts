import { Primordial } from '../../types'
import { leafy_textures } from '../leaves'
import { primordial__coloration } from '../types'
import { flower__details, flower__shapes, flower__types, Flowers } from './types'

const _flower_types = [...flower__types]
const _flower_shapes = [...flower__shapes]
const _flower_details = [...flower__details]

export const primordial__random_flowers = ({ environment }: Primordial): Flowers => {
  const warm = environment.climate === 'Warm'
  const dressing: keyof Flowers = window.dice.choice(['size', 'texture', 'detail'])
  return {
    color: [window.dice.choice(primordial__coloration.floral)],
    shape: window.dice.choice(_flower_shapes),
    type: window.dice.choice(_flower_types),
    size: dressing === 'size' ? window.dice.choice(['small', 'large']) : undefined,
    texture: dressing === 'texture' ? window.dice.choice(leafy_textures) : undefined,
    detail: dressing === 'detail' ? window.dice.choice(_flower_details) : undefined,
    season:
      window.dice.random > 0.3
        ? window.dice.choice(warm ? ['drier', 'wetter'] : ['cooler', 'warmer'])
        : undefined
  }
}
