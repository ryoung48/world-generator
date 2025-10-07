import { Gender } from '../../actors/types'
import { Cell } from '../../cells/types'
import { Province } from '../../provinces/types'
import { ColorHue } from '../../utilities/color'
import { WeightedDistribution } from '../../utilities/math/dice/types'

// Expanded species list inspired by D&D 5e and fantasy settings
export type Species =
  | 'human'
  | 'ogre'
  | 'orc'
  | 'goblin'
  | 'orlan'
  | 'dwarf'
  | 'elf'
  | 'satyr'
  | 'bovine'
  | 'feline'
  | 'gnoll'
  | 'draconic'
  | 'avian'
  | 'centaur'

export type SpeciesAppearance = {
  skin: {
    colors: string[]
    texture?: string
  }
  eyes: {
    colors: (ColorHue | 'hazel')[]
  }
  hair?: {
    textures: ('straight' | 'wavy' | 'curly' | 'kinky')[]
    colors: ('white' | 'blond' | 'red' | 'auburn' | 'brown' | 'black' | 'green')[]
    styles?: Record<
      Gender,
      WeightedDistribution<'long' | 'short' | 'ponytail' | 'topknot' | 'braided' | 'bun'>
    >
  }
  facialHair?: {
    chance: number
    styles: `${'trimmed' | 'full' | 'thick' | 'braided'} beard`[]
  }
}

export interface SpeciesBuilder {
  traits: {
    skin: 'skin' | 'fur' | 'scales' | 'feathers' | 'carapace'
    age: 'fleeting' | 'average' | 'enduring' | 'venerable' | 'ancient'
    height: 'short' | 'small' | 'average' | 'tall' | 'large' | 'giant'
    bmi: number
    horns?: boolean
    piercings?: boolean // defaults to true
    facialHair?: number
  }
  appearance: (_params: { latitude: number; eastern?: boolean; zone: Cell['climate'] }) => {
    skin: SpeciesAppearance['skin']
    hair?: Omit<SpeciesAppearance['hair'], 'styles'>
  }
}

export type SpeciesAppearanceParams = {
  province: Province
  species: Species
}
