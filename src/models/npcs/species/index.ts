import { world__gps } from '../../world'
import { climates } from '../../world/climate/types'
import { Culture } from '../cultures/types'
import { Species } from './types'

type HairTextures = Culture['appearance']['hair']['textures'][number][]

const furColoration: Species['appearance'] = () => ({
  skin: {
    colors: window.dice.sample(
      ['mahogany', 'dark brown', 'light brown', 'pale grey', 'greyish-blue', 'dark grey'],
      3
    ),
    facialHair: false
  }
})

export const species__map: Record<Culture['species'], Species> = {
  human: {
    traits: { skin: 'skin', height: 'average', age: 'average' },
    appearance: ({ latitude: lat, eastern }) => {
      if (lat <= 18) {
        return {
          skin: { colors: ['light brown', 'dark brown'] },
          hair: { colors: ['brown', 'black'], textures: ['wavy', 'curly', 'kinky'] }
        }
      } else if (lat > 18 && lat <= 32) {
        return {
          skin: { colors: ['dark tan', 'light brown'] },
          hair: { colors: ['brown', 'black'], textures: ['straight', 'wavy', 'curly'] }
        }
      } else if (lat > 32 && lat <= 50) {
        return {
          skin: { colors: ['light tan', 'dark tan'] },
          hair: { colors: ['auburn', 'brown', 'black'], textures: ['straight', 'wavy', 'curly'] }
        }
      } else if (lat > 50 && lat <= 72) {
        return {
          skin: { colors: ['fair', 'light tan'] },
          hair: { colors: ['blond', 'red', 'brown', 'black'], textures: ['straight', 'wavy'] }
        }
      } else {
        return {
          skin: { colors: eastern ? ['light tan', 'dark tan'] : ['fair', 'light tan'] },
          hair: {
            colors: eastern ? ['auburn', 'brown', 'black'] : ['blond', 'red', 'brown'],
            textures: ['straight']
          }
        }
      }
    }
  },
  elf: {
    traits: { skin: 'skin', height: 'average', age: 'ancient' },
    appearance: ({ zone }) => {
      const textures: HairTextures = ['straight', 'wavy']
      if (zone === 'tropical') {
        return {
          skin: { colors: ['dark purple', 'dark blue', 'greyish-purple', 'greyish-blue'] },
          hair: { colors: ['white', 'blond', 'brown', 'black'], textures }
        }
      } else if (zone === 'temperate') {
        return {
          skin: { colors: ['fair', 'light tan', 'dark tan'] },
          hair: { colors: ['auburn', 'red', 'black', 'blond'], textures }
        }
      } else {
        return {
          skin: { colors: ['fair', 'pale'] },
          hair: { colors: ['blond', 'white'], textures }
        }
      }
    }
  },
  dwarf: {
    traits: { skin: 'skin', height: 'short', age: 'venerable' },
    appearance: ({ latitude: lat }) => {
      const textures: HairTextures = ['straight', 'wavy', 'curly']
      if (lat <= 18) {
        return {
          skin: { colors: ['pale grey', 'dark grey'] },
          hair: { colors: ['auburn', 'red', 'black'], textures },
          facialHair: 1
        }
      } else if (lat > 18 && lat <= 32) {
        return {
          skin: { colors: ['dark tan', 'light brown'] },
          hair: { colors: ['brown', 'black'], textures },
          facialHair: 1
        }
      } else if (lat > 32 && lat <= 45) {
        return {
          skin: { colors: ['light tan', 'dark tan'] },
          hair: { colors: ['auburn', 'brown', 'black'], textures },
          facialHair: 1
        }
      } else if (lat > 45 && lat <= 65) {
        return {
          skin: { colors: ['fair', 'light tan'] },
          hair: { colors: ['blond', 'red', 'brown'], textures },
          facialHair: 1
        }
      } else {
        return {
          skin: { colors: ['light tan', 'dark tan'] },
          hair: { colors: ['auburn', 'brown', 'black'], textures },
          facialHair: 1
        }
      }
    }
  },
  orc: {
    traits: { skin: 'skin', height: 'tall', age: 'fleeting' },
    appearance: ({ zone }) => {
      const textures: HairTextures = window.dice.choice([
        ['straight', 'wavy'],
        ['wavy', 'curly']
      ])
      if (zone === 'tropical') {
        return {
          skin: { colors: ['mahogany', 'copper', 'ochre'] },
          hair: { colors: ['brown', 'black'], textures }
        }
      } else if (zone === 'temperate') {
        return {
          skin: { colors: ['greyish-green', 'olive', 'dark green'] },
          hair: { colors: ['auburn', 'brown', 'black'], textures }
        }
      } else {
        return {
          skin: { colors: ['dark grey', 'greyish-blue', 'pale grey'] },
          hair: { colors: ['auburn', 'brown', 'black'], textures }
        }
      }
    }
  },
  orlan: {
    traits: { skin: 'skin', height: 'small', age: 'fleeting' },
    appearance: ({ zone }) => {
      const textures: HairTextures = ['straight', 'wavy', 'curly']
      if (zone === 'tropical') {
        return {
          skin: { colors: ['dark green', 'olive', 'greyish-green'] },
          hair: { colors: ['auburn', 'brown', 'blond'], textures }
        }
      } else if (zone === 'temperate') {
        return {
          skin: { colors: ['fair', 'light tan'], texture: '50% fur' },
          hair: { colors: ['auburn', 'brown', 'black'], textures }
        }
      } else {
        return {
          skin: { colors: ['fair', 'light tan'], texture: '90% fur' },
          hair: { colors: ['auburn', 'brown', 'blond'], textures }
        }
      }
    }
  },
  bovine: {
    traits: { skin: 'fur', height: 'large', age: 'average', horns: true },
    appearance: furColoration
  },
  feline: {
    traits: { skin: 'fur', height: 'average', age: 'average' },
    appearance: furColoration
  },
  avian: {
    traits: { skin: 'feathers', height: 'average', age: 'enduring', piercings: false },
    appearance: ({ zone }) => {
      if (zone === 'tropical') {
        return {
          skin: { colors: window.dice.sample(['blue', 'green', 'olive', 'light brown'], 3) },
          facialHair: false
        }
      } else if (zone === 'temperate') {
        return {
          skin: {
            colors: window.dice.sample(['dark red', 'burgundy', 'magenta', 'red', 'orange'], 3),
            facialHair: false
          }
        }
      } else {
        return {
          skin: { colors: window.dice.sample(['dark purple', 'indigo', 'purple', 'black'], 3) },
          facialHair: false
        }
      }
    }
  },
  draconic: {
    traits: { skin: 'scales', height: 'average', age: 'enduring', piercings: false },
    appearance: ({ zone }) => {
      if (zone === 'tropical') {
        return {
          skin: { colors: window.dice.sample(['vermilion', 'ochre', 'dark red', 'red'], 3) },
          facialHair: false
        }
      } else if (zone === 'temperate') {
        return {
          skin: {
            colors: window.dice.sample(['green', 'olive', 'dark green', 'teal'], 3),
            facialHair: false
          }
        }
      } else {
        return { skin: { colors: ['greyish-purple', 'blue', 'greyish-blue'] }, facialHair: false }
      }
    }
  }
}

const hairStyles__female = ['long', 'short', 'ponytail', 'topknot', 'braided', 'bun'] as const
const species__hairStyles = (): Culture['appearance']['hair']['styles'] => {
  const dist = window.dice.uniformDist(4)
  return {
    male: [
      { v: 'short', w: 70 },
      { v: 'long', w: 20 },
      { v: window.dice.choice(['ponytail', 'braided']), w: 10 }
    ],
    female: window.dice
      .sample([...hairStyles__female], 4)
      .map((style, i) => ({ v: style, w: dist[i] }))
  }
}

const species__facialHair = (chance = window.dice.choice([0.3, 0.6, 0.9])) => {
  const base = {
    chance,
    styles: ['trimmed beard'] as Culture['appearance']['facialHair']['styles']
  }
  if (base.chance > 0.3) base.styles.push('full beard')
  if (base.chance > 0.5) base.styles.push(window.dice.choice(['thick beard', 'braided beard']))
  return base
}

const eyeColors: Record<'common' | 'uncommon' | 'rare', Culture['appearance']['eyes']['colors']> = {
  common: ['brown', 'hazel'],
  uncommon: ['blue', 'green', 'copper', 'olive', 'burgundy'],
  rare: ['yellow', 'amber', 'ochre', 'purple', 'indigo', 'magenta']
}
const species__eyes = () => {
  const common = window.dice.shuffle(eyeColors.common)
  const colors = common.splice(0, 1)
  const uncommon = window.dice.shuffle([...common, ...eyeColors.uncommon])
  colors.push(...uncommon.splice(0, 3))
  const rare = window.dice.shuffle([...uncommon, ...window.dice.sample(eyeColors.rare, 2)])
  colors.push(rare.pop())
  return {
    colors
  }
}

export const species__appearance = (culture: Culture) => {
  const origin = window.world.regions[culture.origin]
  const capital = window.world.provinces[origin.capital]
  const { latitude } = world__gps(capital.hub)
  const { zone } = climates[origin.climate]
  const { skin, hair, facialHair } = species__map[culture.species].appearance({
    latitude: Math.abs(latitude),
    zone
  })
  culture.appearance = {
    skin,
    eyes: species__eyes(),
    hair: hair ? { ...hair, styles: species__hairStyles() } : undefined,
    facialHair: facialHair === false ? undefined : species__facialHair(facialHair)
  }
}
