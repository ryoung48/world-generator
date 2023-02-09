import type { Climate } from '../../world/climate/types'
import { Culture } from '../cultures/types'

export interface Species {
  traits: {
    skin: 'skin' | 'fur' | 'scales' | 'feathers'
    height: 'average' | 'small' | 'short' | 'tall' | 'large' | 'giant'
    age: 'fleeting' | 'average' | 'enduring' | 'venerable' | 'ancient'
    horns?: boolean
    piercings?: boolean // defaults to true
  }
  appearance: (_params: { latitude: number; eastern?: boolean; zone: Climate['zone'] }) => {
    skin: Culture['appearance']['skin']
    hair?: Omit<Culture['appearance']['hair'], 'styles'>
    facialHair?: number
  }
}
