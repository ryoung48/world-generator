import { terrain_types } from '../../world/climate/terrain'
import { basic_climates } from '../../world/climate/types'

type species_types = 'humanoid' | 'beast' | 'primordial' | 'spirit' | 'vessel'

export interface Species {
  name: string
  tag: species_types
  size: number // size rank
  // habitat
  environment: { terrain: terrain_types; climate: basic_climates; key: string }
  regions: number[]
}

type commensalism = 'transport' | 'housing' | 'protection'
type parasitism = 'vampirism' | 'brood parasitism' | 'infestation'

export interface Symbiotic {
  partner?: { idx: number; tag: 'beast' | 'primordial' }
  symbiosis?: {
    tag: 'beast' | 'primordial'
    species: number[]
    type: 'mutualistic' | 'commensalistic' | 'parasitic'
    subtype?: commensalism | parasitism
  }
}
