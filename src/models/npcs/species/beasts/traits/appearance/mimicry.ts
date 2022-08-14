import { Beast } from '../../types'
import { beast_traits } from '../types'

export const mimicry__conflict: beast_traits[] = [
  'armored',
  'quills',
  'bioluminescence',
  'chameleon',
  'stealth',
  'constrictor',
  'ornamentation',
  'shell',
  'arctic_coloration'
]

export const mimicry__anti_predation: beast_traits[] = ['odor', 'unpalatable', 'venomous', 'agile']

export const mimicry_valid = (model: Beast) => {
  return model.traits.some(({ tag }) => mimicry__anti_predation.includes(tag))
}
