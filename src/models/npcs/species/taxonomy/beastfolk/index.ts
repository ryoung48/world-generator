import { world__gps } from '../../../../world'
import { climateLookup } from '../../../../world/climate/types'
import { humanoid__spawn } from '../common'
import { eyeColor, hairStyles, hornDressing, nosePiercings } from '../common/appearance'
import { Humanoid } from '../types'
import { beastfolk__species } from './types'

const beastfolkAppearance: Humanoid['appearance'] = point => {
  const { longitude } = world__gps(point)
  const eyes = eyeColor({ longitude })
  const skin = {
    type: 'fur',
    colors: window.dice.sample(
      [
        'mahogany',
        'dark brown',
        'light brown',
        'sandy brown',
        'pale gray',
        'greyish-blue',
        'ashen gray'
      ],
      3
    )
  }
  return {
    skin,
    eyes,
    tattoos: false
  }
}

export const humanoids__beastfolk: Record<beastfolk__species, Humanoid> = {
  gnoll: humanoid__spawn({
    name: 'gnoll',
    height: 'average',
    age: 'fleeting',
    bmi: 25,
    appearance: point => {
      return {
        ...beastfolkAppearance(point)
      }
    }
  }),
  bovine: humanoid__spawn({
    name: 'bovine',
    height: 'large',
    age: 'average',
    bmi: 25,
    appearance: point => {
      return {
        ...beastfolkAppearance(point),
        nosePiercings,
        facialHair: {
          chance: 0.3,
          styles: ['thick beard', 'braided beard']
        },
        hornDressing
      }
    }
  }),
  feline: humanoid__spawn({
    name: 'feline',
    height: 'average',
    age: 'average',
    bmi: 22,
    appearance: point => {
      return {
        ...beastfolkAppearance(point),
        facialHair: {
          chance: 0.2,
          styles: ['thick beard', 'braided beard']
        }
      }
    }
  }),
  avian: humanoid__spawn({
    name: 'avian',
    height: 'average',
    age: 'enduring',
    bmi: 23,
    appearance: point => {
      const { longitude } = world__gps(point)
      const province = window.world.provinces[point.province]
      const region = window.world.regions[province.region]
      const { zone } = climateLookup[region.climate]
      const eyes = eyeColor({ longitude })
      const skin = { type: 'feathers', colors: [''] }
      if (zone === 'Tropical') {
        skin.colors = window.dice.sample(['blue', 'green', 'golden', 'sandy brown'], 3)
      } else if (zone === 'Temperate') {
        skin.colors = window.dice.sample(['dark red', 'burgundy', 'magenta', 'red', 'orange'], 3)
      } else {
        skin.colors = window.dice.sample(['dark purple', 'indigo', 'purple', 'black'], 3)
      }
      return {
        skin,
        eyes,
        tattoos: false,
        earings: false
      }
    }
  }),
  draconic: humanoid__spawn({
    name: 'draconic',
    height: 'average',
    age: 'enduring',
    bmi: 25,
    appearance: point => {
      const { longitude } = world__gps(point)
      const province = window.world.provinces[point.province]
      const region = window.world.regions[province.region]
      const { zone } = climateLookup[region.climate]
      const eyes = eyeColor({ longitude })
      const skin = { type: 'scales', colors: [''] }
      if (zone === 'Tropical') {
        skin.colors = window.dice.sample(['vermilion', 'ochre', 'dark red', 'red'], 3)
      } else if (zone === 'Temperate') {
        skin.colors = window.dice.sample(['green', 'olive', 'dark green', 'golden'], 3)
      } else {
        skin.colors = window.dice.sample(['greyish-purple', 'blue', 'silver', 'greyish-blue'], 3)
      }
      return {
        skin,
        eyes,
        tattoos: false,
        earings: false
      }
    }
  }),
  satyr: humanoid__spawn({
    name: 'satyr',
    height: 'average',
    age: 'venerable',
    bmi: 22,
    appearance: point => {
      const { longitude } = world__gps(point)
      const province = window.world.provinces[point.province]
      const region = window.world.regions[province.region]
      const { zone } = climateLookup[region.climate]
      const eyes = eyeColor({ longitude })
      const skin = { type: 'skin', colors: ['fair'] }
      const styles = hairStyles()
      const hair = {
        textures: ['straight', 'wavy'],
        colors: ['black'],
        styles: {
          male: [
            { v: 'short', w: 30 },
            { v: 'long', w: 50 },
            { v: 'ponytail', w: 15 },
            { v: 'bald', w: 5 }
          ],
          female: styles.female
        }
      }
      if (zone === 'Tropical') {
        skin.colors = ['dark red', 'red', 'magenta']
        hair.colors = ['brown', 'black', 'auburn']
      } else if (zone === 'Temperate') {
        skin.colors = ['magenta', 'dark purple', 'purple', 'indigo']
        hair.colors = ['brown', 'black']
      } else {
        skin.colors = ['blue', 'indigo', 'dark blue']
        hair.colors = ['brown', 'black', 'blond']
      }
      return {
        skin,
        eyes,
        hair,
        facialHair: {
          chance: 0.3,
          styles: ['trimmed beard', 'full beard']
        },
        hornDressing: hornDressing,
        tattoos: true
      }
    }
  })
}
